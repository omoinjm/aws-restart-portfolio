import fs from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const publicDir = path.join(root, 'public');

const COPY_TARGETS = [
  'assets',
  'Labs',
  'Projects',
  'Certs-Badges',
  'nav.json'
];

async function removeIfExists(targetPath) {
  try {
    await fs.rm(targetPath, { recursive: true, force: true });
  } catch {
    // Ignore cleanup errors for non-existent paths.
  }
}

async function copyTarget(relPath) {
  const src = path.join(root, relPath);
  const dest = path.join(publicDir, relPath);
  await fs.cp(src, dest, { recursive: true });
}

async function main() {
  await fs.mkdir(publicDir, { recursive: true });

  for (const target of COPY_TARGETS) {
    await removeIfExists(path.join(publicDir, target));
    await copyTarget(target);
  }

  // Keep custom domain in Astro public dir for Pages deployment.
  await fs.writeFile(path.join(publicDir, 'CNAME'), 'aws.njmtech.co.za\n', 'utf8');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
