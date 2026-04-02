/**
 * portfolio.js
 * ─────────────────────────────────────────────────────────────
 * Client-side logic for the AWS re/Start Portfolio viewer.
 * Responsible for:
 *   - Parsing and rendering markdown files via marked.js
 *   - Hash-based client-side routing
 *   - Collapsible sidebar navigation
 *   - Markdown preview modal (Instructions / Architecture files)
 *   - PDF preview modal
 *   - GitHub API badge resolution
 *   - Front matter parsing and meta card rendering
 */

/* ── Front matter parser and meta card builder ───────────── */
function parseFrontMatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!match) return { meta: {}, body: raw };

  const metaRaw = match[1];
  const body = raw.slice(match[0].length);
  const meta = {};

  metaRaw.split('\n').forEach(line => {
    const colon = line.indexOf(':');
    if (colon === -1) return;
    const key = line.slice(0, colon).trim();
    let val = line.slice(colon + 1).trim();
    // Parse tag arrays like [ec2, compute, aws]
    if (val.startsWith('[') && val.endsWith(']')) {
      val = val.slice(1, -1).split(',').map(t => t.trim()).filter(Boolean);
    }
    meta[key] = val;
  });

  return { meta, body };
}

function buildMetaCard(meta) {
  if (!meta.title && !meta.description && !meta.tags) return '';
  const tags = Array.isArray(meta.tags)
    ? meta.tags.map(t => `<span class="meta-tag">${t}</span>`).join('')
    : '';
  return `
    <div class="meta-card">
      ${meta.title       ? `<div class="meta-title">${meta.title}</div>` : ''}
      ${meta.description ? `<div class="meta-desc">${meta.description}</div>` : ''}
      ${tags             ? `<div class="meta-tags">${tags}</div>` : ''}
    </div>`;
}

function stripNavigation(body) {
  // Remove the ## 🔗 Navigation section and its trailing --- divider
  return body
    .replace(/^##[^\n]*Navigation[^\n]*\n[\s\S]*?\n---/m, '')
    // Remove any line that contains only shields.io badge markdown (images/links pointing to img.shields.io)
    .replace(/^[^\n]*img\.shields\.io[^\n]*$/gm, '');
}

/* ── marked.js configuration and custom renderers (heading, image, link) ── */
marked.setOptions({
  breaks: true,
  gfm: true,
});

// Custom renderer: open external links in new tab, intercept internal .md links
const renderer = new marked.Renderer();

renderer.heading = function({ text, depth }) {
  // If heading content is purely images/links with no readable text (e.g. badge lines), suppress it entirely.
  const textOnly = text.replace(/<[^>]+>/g, '').trim();
  if (!textOnly) return '';
  const id = textOnly.toLowerCase().replace(/[^\w]+/g, '-');
  return `<h${depth} id="${id}">${text}</h${depth}>\n`;
};

renderer.image = function({ href, title, text }) {
  // Intercept shields.io badges → styled CSS pill
  if (href && href.includes('img.shields.io')) {
    const id = 'gh-badge-' + (ghBadgeCounter++);
    pendingBadges.push({ id, src: href });
    return `<span class="gh-badge" id="${id}" title="${text}">` +
           `<span class="gh-badge-label">${text}</span>` +
           `<span class="gh-badge-value loading">…</span>` +
           `</span>`;
  }

  const isExternal = href && (href.startsWith('http://') || href.startsWith('https://'));
  const src = isExternal ? href : resolvePath(currentPath, href);
  const titleAttr = title ? ` title="${title}"` : '';
  return `<img src="${src}" alt="${text}"${titleAttr} style="max-width:100%" />`;
};

renderer.link = function({ href, title, text }) {
  const isExternal = href && (href.startsWith('http://') || href.startsWith('https://'));
  const isPdf = href && href.toLowerCase().endsWith('.pdf') && !isExternal;
  const isMd  = href && href.endsWith('.md') && !isExternal;

  if (isPdf) {
    const resolved = resolvePath(currentPath, href);
    const label = text || title || 'View PDF';
    return `<button class="pdf-btn" onclick="openPdf('${resolved}', '${label}')">📄 ${label}</button>`;
  }

  const isMdPopup = !isExternal && (
    href.endsWith('Instructions.md') || href.endsWith('ARCHITECTURE.md')
  );

  if (isMdPopup) {
    const resolved = resolvePath(currentPath, href);
    const label = text || title || href.split('/').pop().replace('.md', '');
    return `<button class="md-link-btn" onclick="openMdModal('${resolved}', '${label}')">${label}</button>`;
  }

  if (isMd) {
    // Resolve relative path against current file's directory
    const resolved = resolvePath(currentPath, href);
    return `<a href="#${resolved}" data-path="${resolved}" onclick="navigate('${resolved}'); return false;"${title ? ` title="${title}"` : ''}>${text}</a>`;
  }

  if (isExternal) {
    return `<a href="${href}" target="_blank" rel="noopener noreferrer"${title ? ` title="${title}"` : ''}>${text}</a>`;
  }

  return `<a href="${href}"${title ? ` title="${title}"` : ''}>${text}</a>`;
};

marked.use({ renderer });

/* ── State variables ─────────────────────────────────────── */
let currentPath = 'README.md';
let ghBadgeCounter = 0;
let pendingBadges  = [];

/* ── Path helpers ────────────────────────────────────────── */
function resolvePath(base, relative) {
  if (relative.startsWith('/')) return relative.slice(1);
  const parts = base.split('/');
  parts.pop(); // remove filename
  relative.split('/').forEach(seg => {
    if (seg === '..') parts.pop();
    else if (seg !== '.') parts.push(seg);
  });
  return parts.join('/');
}

function pathToLabel(path) {
  const parts = path.split('/');
  if (parts.length === 1) return 'Home';
  // Build breadcrumb from directory parts, excluding filename
  return parts.slice(0, -1).map(p =>
    p.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
  ).join(' › ');
}

/* ── GitHub badge resolver ───────────────────────────────── */
const GH_REPO = 'omoinjm/aws-restart-portfolio';
let ghCache = null; // cache API response for the session

async function resolveGhBadges(badges) {
  if (!badges.length) return;
  try {
    if (!ghCache) {
      const [repo, contribs] = await Promise.all([
        fetch(`https://api.github.com/repos/${GH_REPO}`).then(r => r.json()),
        fetch(`https://api.github.com/repos/${GH_REPO}/contributors?per_page=100`).then(r => r.json()),
      ]);
      ghCache = { stars: repo.stargazers_count, contributors: Array.isArray(contribs) ? contribs.length : '—' };
    }

    badges.forEach(({ id, src }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const val = el.querySelector('.gh-badge-value');
      if (src.includes('stars'))        { val.textContent = '★ ' + ghCache.stars; }
      else if (src.includes('contributors')) { val.textContent = '👥 ' + ghCache.contributors; }
      else                              { val.textContent = '—'; }
      val.classList.remove('loading');
    });
  } catch { /* fail silently — badges just stay as … */ }
}

/* ── Fetch helper ────────────────────────────────────────── */
async function fetchMd(path) {
  const res = await fetch(path);
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
  return await res.text();
}

function renderHtml(markdown) {
  const { meta, body } = parseFrontMatter(markdown);
  return buildMetaCard(meta) + marked.parse(body);
}

/* ── Main navigate function ──────────────────────────────── */
async function navigate(path, appendInstr = false) {
  currentPath = path;
  pendingBadges = [];
  ghBadgeCounter = 0;

  // Update hash without triggering hashchange loop
  history.replaceState(null, '', '#' + path);

  // Update breadcrumb
  document.getElementById('breadcrumb-text').textContent = pathToLabel(path);

  // Highlight active nav item
  document.querySelectorAll('.nav-item').forEach(el => {
    el.classList.toggle('active', el.dataset.path === path);
  });

  // Reset instr toggle buttons
  document.querySelectorAll('.instr-toggle').forEach(btn => btn.classList.remove('active'));

  // Scroll content to top
  document.getElementById('content-wrap').scrollTop = 0;

  const contentEl = document.getElementById('content');
  contentEl.innerHTML = `<div class="state-msg"><div class="icon">⏳</div><p>Loading…</p></div>`;

  try {
    const md = await fetchMd(path);
    const { meta, body } = parseFrontMatter(md);
    // Update breadcrumb with front matter title if available
    if (meta.title) {
      document.getElementById('breadcrumb-text').textContent =
        pathToLabel(path) + (pathToLabel(path) !== 'Home' ? ' › ' + meta.title : meta.title);
    }
    contentEl.innerHTML = buildMetaCard(meta) + marked.parse(stripNavigation(body));
    contentEl.querySelectorAll('pre code').forEach(block => hljs.highlightElement(block));
    resolveGhBadges(pendingBadges);
  } catch (e) {
    contentEl.innerHTML = `
      <div class="state-msg">
        <div class="icon">⚠️</div>
        <p>Could not load <code>${path}</code></p>
        <p style="font-size:12px;color:var(--muted)">${e.message}</p>
      </div>`;
  }
}

/* ── Markdown modal controls ─────────────────────────────── */
async function openMdModal(path, title) {
  const modal   = document.getElementById('md-modal');
  const content = document.getElementById('md-modal-content');

  document.getElementById('md-modal-title').textContent = title || 'Preview';
  content.innerHTML = `<div class="state-msg"><div class="icon">⏳</div><p>Loading…</p></div>`;
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
  document.getElementById('md-modal-wrap').scrollTop = 0;

  try {
    const md = await fetchMd(path);
    const { meta, body } = parseFrontMatter(md);
    content.innerHTML = buildMetaCard(meta) + marked.parse(stripNavigation(body));
    content.querySelectorAll('pre code').forEach(block => hljs.highlightElement(block));
  } catch (e) {
    content.innerHTML = `
      <div class="state-msg">
        <div class="icon">⚠️</div>
        <p>Could not load <code>${path}</code></p>
        <p style="font-size:12px;color:var(--muted)">${e.message}</p>
      </div>`;
  }
}

function closeMdModal() {
  document.getElementById('md-modal').classList.remove('open');
  document.getElementById('md-modal-content').innerHTML = '';
  document.body.style.overflow = '';
}

// Close on overlay click
document.getElementById('md-modal').addEventListener('click', e => {
  if (e.target === document.getElementById('md-modal')) closeMdModal();
});

/* ── Nav click delegation ────────────────────────────────── */
document.getElementById('nav').addEventListener('click', e => {
  const item = e.target.closest('a.nav-item[data-path]');
  if (!item) return;
  e.preventDefault();
  navigate(item.dataset.path);

  // Close sidebar on mobile
  if (window.innerWidth <= 768) {
    document.getElementById('sidebar').classList.remove('open');
  }
});

/* ── Collapsible section toggle + parent auto-open ───────── */
/* ── Sidebar builder ─────────────────────────────────────── */

// Builds a leaf row (nav-item + optional instructions toggle)
function buildLeaf(entry) {
  const readmePath = `${entry.path}/README.md`;
  const instrPath  = `${entry.path}/Instructions.md`;
  const instr = entry.instructions
    ? `<button class="instr-toggle"
         data-readme="${readmePath}"
         data-instr="${instrPath}"
         onclick="openMdModal(this.dataset.instr, 'Instructions')"
         title="Show Instructions">📄</button>`
    : '';
  return `
    <div class="nav-leaf">
      <a class="nav-item" data-path="${readmePath}" href="#${readmePath}">${entry.label}</a>
      ${instr}
    </div>`;
}

// Builds a collapsible sub-section (e.g. Labs > Compute)
function buildSubSection(child) {
  const overviewItem = child.overview
    ? `<a class="nav-item" data-path="${child.overview}" href="#${child.overview}" style="padding-left:40px">
         <span class="icon">📋</span> Overview
       </a>`
    : '';
  const entries = (child.entries || []).map(buildLeaf).join('');
  return `
    <div class="nav-sub-section" id="${child.id}">
      <div class="nav-sub-header" onclick="toggleSection('${child.id}')">
        <span>${child.icon}</span> ${child.label}
        <span class="chevron">▶</span>
      </div>
      <div class="nav-sub-body">
        ${overviewItem}
        ${entries}
      </div>
    </div>`;
}

// Builds a top-level section (Labs, Projects, Certs & Badges)
function buildSection(section) {
  const overviewItem = section.overview
    ? `<a class="nav-item" data-path="${section.overview}" href="#${section.overview}">
         <span class="icon">📋</span> Overview
       </a>`
    : '';

  // Sections can have either direct entries (flat) or nested children (categorised)
  const body = section.children
    ? (section.children.map(buildSubSection).join(''))
    : (section.entries || []).map(buildLeaf).join('');

  return `
    <div class="nav-section" id="${section.id}">
      <div class="nav-section-header" onclick="toggleSection('${section.id}')">
        <span>${section.icon}</span> ${section.label}
        <span class="chevron">▶</span>
      </div>
      <div class="nav-section-body">
        ${overviewItem}
        ${body}
      </div>
    </div>
    <div class="nav-divider"></div>`;
}

// Fetches nav.json and renders the full sidebar
async function buildSidebar(nav) {
  const navEl = document.getElementById('nav');
  let html = `
    <a class="nav-item" data-path="${nav.home}" href="#${nav.home}">
      <span class="icon">🏠</span> Home
    </a>
    <div class="nav-divider"></div>`;

  html += nav.sections.map(buildSection).join('');
  navEl.innerHTML = html;
}

/* ── Collapsible section toggle + parent auto-open ───────── */
function toggleSection(id) {
  document.getElementById(id).classList.toggle('open');
}

// Auto-open parent sections for the active path by matching segment → section id
function openParentsForPath(path) {
  // Collect all section ids from nav elements in the DOM
  document.querySelectorAll('[id^="sec-"]').forEach(el => {
    // Check if any nav-item inside this section matches the path
    const match = el.querySelector(`a.nav-item[data-path="${path}"]`);
    if (match) el.classList.add('open');
    // Also open parent by checking if path starts with any child's data-path prefix
    el.querySelectorAll('a.nav-item[data-path]').forEach(a => {
      if (path.startsWith(a.dataset.path.split('/').slice(0, -1).join('/'))) {
        el.classList.add('open');
      }
    });
  });
}

/* ── Hash routing ────────────────────────────────────────── */
function loadFromHash() {
  const hash = window.location.hash.slice(1);
  const path = hash || 'README.md';
  openParentsForPath(path);
  navigate(path);
}

window.addEventListener('hashchange', loadFromHash);

/* ── Mobile hamburger ────────────────────────────────────── */
document.getElementById('hamburger').addEventListener('click', () => {
  document.getElementById('sidebar').classList.toggle('open');
});

/* ── PDF modal controls ──────────────────────────────────── */
function openPdf(path, label) {
  document.getElementById('pdf-frame').src = path;
  document.getElementById('pdf-modal-title').textContent = label || 'Certificate Preview';
  document.getElementById('pdf-modal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closePdf() {
  document.getElementById('pdf-modal').classList.remove('open');
  document.getElementById('pdf-frame').src = '';
  document.body.style.overflow = '';
}

// Close on overlay click
document.getElementById('pdf-modal').addEventListener('click', e => {
  if (e.target === document.getElementById('pdf-modal')) closePdf();
});

// Close both modals on Escape
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') { closePdf(); closeMdModal(); }
});

/* ── Initialisation ──────────────────────────────────────── */
// Fetch nav.json, build the sidebar, then load the current hash
(async () => {
  try {
    const res = await fetch('nav.json');
    const nav = await res.json();
    await buildSidebar(nav);
  } catch (e) {
    document.getElementById('nav').innerHTML =
      `<div class="state-msg" style="height:auto;padding:1em"><p style="font-size:12px;color:var(--muted)">⚠️ Could not load nav.json</p></div>`;
  }
  loadFromHash();
})();