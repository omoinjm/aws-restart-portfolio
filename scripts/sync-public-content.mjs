import fs from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const publicDir = path.join(root, 'public');

const COPY_TARGETS = [
  { src: 'assets', dest: 'assets' },
  { src: 'docs/Labs', dest: 'Labs' },
  { src: 'docs/Projects', dest: 'Projects' },
  { src: 'docs/Certs-Badges', dest: 'Certs-Badges' },
  { src: 'nav.json', dest: 'nav.json' }
];

async function removeIfExists(targetPath) {
  try {
    await fs.rm(targetPath, { recursive: true, force: true });
  } catch {
    // Ignore cleanup errors for non-existent paths.
  }
}

async function copyTarget(srcRelPath, destRelPath) {
  const src = path.join(root, srcRelPath);
  const dest = path.join(publicDir, destRelPath);
  await fs.cp(src, dest, { recursive: true });
}

async function main() {
  await fs.mkdir(publicDir, { recursive: true });

  for (const target of COPY_TARGETS) {
    await removeIfExists(path.join(publicDir, target.dest));
    await copyTarget(target.src, target.dest);
  }

  // Keep custom domain in Astro public dir for Pages deployment.
  await fs.writeFile(path.join(publicDir, 'CNAME'), 'aws.njmtech.co.za\n', 'utf8');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
