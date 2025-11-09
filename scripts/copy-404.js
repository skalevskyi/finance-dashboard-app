import { copyFileSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');
const distDir = join(rootDir, 'dist');

try {
  copyFileSync(join(distDir, 'index.html'), join(distDir, '404.html'));
  console.log('✓ Copied index.html to 404.html for GitHub Pages');
} catch (error) {
  console.error('Error copying 404.html:', error);
  process.exit(1);
}

