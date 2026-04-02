import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { Marked } from 'marked';

const REPO_ROOT = process.cwd();
const IGNORED_DIRS = new Set(['.git', '.github', '.obsidian', 'node_modules', 'dist', '.astro', 'public']);

function toPosix(p) {
  return p.split(path.sep).join('/');
}

function walkMarkdownFiles(dirAbs, out) {
  const entries = fs.readdirSync(dirAbs, { withFileTypes: true });
  for (const entry of entries) {
    const absPath = path.join(dirAbs, entry.name);
    const relPath = toPosix(path.relative(REPO_ROOT, absPath));

    if (entry.isDirectory()) {
      if (IGNORED_DIRS.has(entry.name)) continue;
      walkMarkdownFiles(absPath, out);
      continue;
    }

    if (!entry.isFile()) continue;
    if (!entry.name.toLowerCase().endsWith('.md')) continue;
    out.push(relPath);
  }
}

function markdownPathToUrl(relPath) {
  const normalized = toPosix(relPath);
  const base = path.posix.basename(normalized).toLowerCase();

  if (base === 'readme.md') {
    const dir = path.posix.dirname(normalized);
    if (dir === '.' || dir === '') return '/';
    return `/${dir}/`;
  }

  return `/${normalized.replace(/\.md$/i, '')}`;
}

function resolveAssetUrl(ref, sourceRelPath) {
  if (/^(https?:|mailto:|tel:|#)/i.test(ref)) return ref;

  const sourceDir = path.posix.dirname(sourceRelPath);
  const resolved = ref.startsWith('/')
    ? ref.replace(/^\/+/, '')
    : path.posix.normalize(path.posix.join(sourceDir, ref));

  if (/\.md$/i.test(resolved)) {
    return markdownPathToUrl(resolved);
  }

  return `/${resolved.replace(/^\/+/, '')}`;
}

function buildMarkedForDoc(sourceRelPath) {
  const marked = new Marked({ gfm: true, breaks: true });

  marked.use({
    renderer: {
      link(token) {
        const href = token.href ?? '';
        const title = token.title ? ` title="${token.title}"` : '';
        const text = token.text ?? href;
        const resolved = resolveAssetUrl(href, sourceRelPath);
        const external = /^(https?:|mailto:|tel:)/i.test(href);
        const externalAttrs = external ? ' target="_blank" rel="noopener noreferrer"' : '';
        return `<a href="${resolved}"${title}${externalAttrs}>${text}</a>`;
      },
      image(token) {
        const href = token.href ?? '';
        const title = token.title ? ` title="${token.title}"` : '';
        const alt = token.text ?? '';
        const src = resolveAssetUrl(href, sourceRelPath);
        return `<img src="${src}" alt="${alt}"${title} loading="lazy" />`;
      }
    }
  });

  return marked;
}

function toTitle(relPath) {
  const base = path.posix.basename(relPath, '.md');
  if (base.toLowerCase() === 'readme') {
    const dirName = path.posix.basename(path.posix.dirname(relPath));
    if (!dirName || dirName === '.') return 'Home';
    return dirName.replace(/[-_]/g, ' ');
  }
  return base.replace(/[-_]/g, ' ');
}

export function loadDoc(relPath) {
  const absPath = path.join(REPO_ROOT, relPath);
  const raw = fs.readFileSync(absPath, 'utf8');

  let parsedContent = raw;
  let parsedData = {};

  try {
    const parsed = matter(raw);
    parsedContent = parsed.content;
    parsedData = parsed.data;
  } catch {
    // Some markdown files contain invalid YAML front matter.
    // Fall back to rendering the entire raw markdown body.
  }

  const marked = buildMarkedForDoc(relPath);
  const html = marked.parse(parsedContent);

  return {
    relPath,
    urlPath: markdownPathToUrl(relPath),
    html,
    title: String(parsedData.title ?? toTitle(relPath)),
    description: parsedData.description ? String(parsedData.description) : undefined
  };
}

export function getAllDocs() {
  const mdFiles = [];
  walkMarkdownFiles(REPO_ROOT, mdFiles);

  return mdFiles
    .filter((p) => !p.startsWith('memories/'))
    .filter((p) => p !== 'ASTRO_MIGRATION_PLAN.md')
    .map((p) => loadDoc(p))
    .sort((a, b) => a.urlPath.localeCompare(b.urlPath));
}

export function getDocByUrl(urlPath) {
  const all = getAllDocs();
  return all.find((doc) => doc.urlPath === urlPath);
}
