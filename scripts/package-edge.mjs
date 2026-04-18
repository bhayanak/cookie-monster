import { execSync } from 'child_process';
import { mkdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');
const distDir = resolve(root, 'dist');
const outDir = resolve(root, 'dist-edge');

mkdirSync(outDir, { recursive: true });

const zipName = `cookie-sentinel-edge-v${process.env.npm_package_version || '1.0.0'}.zip`;
execSync(`cd "${distDir}" && zip -r "${resolve(outDir, zipName)}" .`, { stdio: 'inherit' });

console.log(`✅ Edge package created: dist-edge/${zipName}`);
