const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const ignored = new Set(['.git', 'node_modules', '.venv']);
const files = [];
function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (ignored.has(entry.name)) continue;
    const target = path.join(dir, entry.name);
    entry.isDirectory() ? walk(target) : files.push(target);
  }
}
walk(root);
const errors = [];
for (const file of files) {
  const relative = path.relative(root, file);
  if (file.endsWith('.json')) {
    try { JSON.parse(fs.readFileSync(file, 'utf8')); } catch (error) { errors.push(`${relative}: JSON inválido (${error.message})`); }
  }
  if (/\.(md|js|json|ya?ml)$/.test(file)) {
    const text = fs.readFileSync(file, 'utf8');
    if (/SEU_USUARIO|SEU_REPOSITORIO/.test(text)) errors.push(`${relative}: placeholder não substituído`);
    if (/[^\r\n\t ]+[ \t]+\r?$/m.test(text)) errors.push(`${relative}: espaço no fim da linha`);
  }
}
if (errors.length) { console.error(errors.join('\n')); process.exit(1); }
console.log(`Quality check aprovado: ${files.length} arquivos inspecionados.`);
