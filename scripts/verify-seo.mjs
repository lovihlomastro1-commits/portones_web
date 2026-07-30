import { existsSync, readFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, '..');

const expectedDomain = 'https://portotones.online';
const checks = [
  {
    label: 'robots.txt',
    file: path.join(root, 'public', 'robots.txt'),
    validator: (content) => content.includes('Sitemap: https://portotones.online/sitemap.xml'),
    error: 'robots.txt must point to the canonical sitemap URL.',
  },
  {
    label: 'sitemap.xml',
    file: path.join(root, 'public', 'sitemap.xml'),
    validator: (content) => content.includes('https://portotones.online/sitemap-0.xml') || content.includes('https://portotones.online/sitemap.xml'),
    error: 'sitemap.xml must reference the canonical domain.',
  },
  {
    label: 'sitemap-0.xml',
    file: path.join(root, 'public', 'sitemap-0.xml'),
    validator: (content) => content.includes('/contacto') && content.includes(expectedDomain),
    error: 'sitemap-0.xml must include the contact page and the canonical domain.',
  },
  {
    label: 'contact page',
    file: path.join(root, 'app', 'contacto', 'page.tsx'),
    validator: (content) => content.includes('Contacto PRO-PORTONES'),
    error: 'The contact page must exist and include SEO metadata.',
  },
  {
    label: 'canonical domain config',
    file: path.join(root, 'next-sitemap.config.js'),
    validator: (content) => content.includes(expectedDomain),
    error: 'next-sitemap must use the canonical domain.',
  },
];

let failed = false;
for (const check of checks) {
  if (!existsSync(check.file)) {
    console.error(`❌ Missing ${check.label}: ${check.file}`);
    failed = true;
    continue;
  }

  const content = readFileSync(check.file, 'utf8');
  if (!check.validator(content)) {
    console.error(`❌ ${check.error}`);
    failed = true;
  }
}

if (failed) {
  process.exit(1);
}

console.log('✅ SEO files and canonical domain checks passed.');
