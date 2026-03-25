// Genera data.json escaneando assets/obras/{jardines,juegos,lazos}
// Uso: node tools/generate_data.js

const fs = require('fs');
const path = require('path');

const IMAGE_EXTS = new Set(['.jpg', '.jpeg', '.png', '.gif', '.webp']);

const OBRAS_DIR = path.join(__dirname, '..', 'assets', 'obras');
const OUTPUT    = path.join(__dirname, '..', 'data.json');

function isImage(filename) {
  return IMAGE_EXTS.has(path.extname(filename).toLowerCase());
}

// Devuelve { base, suffix } o null si el nombre no sigue la convención.
// Ej: "la1"  -> { base: "la1", suffix: "" }
//     "la1a" -> { base: "la1", suffix: "a" }
//     "ja32" -> { base: "ja32", suffix: "" }
function parseFilename(filename) {
  const stem = path.basename(filename, path.extname(filename));
  const match = stem.match(/^([a-zA-Z]+\d+)([a-zA-Z]*)$/);
  if (!match) return null;
  return { base: match[1], suffix: match[2] };
}

// Ordena bases numéricamente (ja9 < ja10)
function numericBase(base) {
  const n = base.match(/\d+/);
  return n ? parseInt(n[0], 10) : 0;
}

const categories = fs.readdirSync(OBRAS_DIR)
  .filter(name => fs.statSync(path.join(OBRAS_DIR, name)).isDirectory())
  .sort();

const artworks = [];

for (const category of categories) {
  const categoryDir = path.join(OBRAS_DIR, category);
  const files = fs.readdirSync(categoryDir).filter(isImage);

  // Agrupar por base
  const groups = new Map();
  for (const file of files) {
    const parsed = parseFilename(file);
    if (!parsed) continue;
    const { base, suffix } = parsed;
    if (!groups.has(base)) groups.set(base, []);
    groups.get(base).push({ file, suffix });
  }

  // Ordenar bases numéricamente
  const sortedBases = [...groups.keys()].sort((a, b) => numericBase(a) - numericBase(b));

  for (const base of sortedBases) {
    const group = groups.get(base);

    // Principal (sin sufijo) primero; extras en orden alfabético de sufijo
    group.sort((a, b) => {
      if (a.suffix === '' && b.suffix !== '') return -1;
      if (a.suffix !== '' && b.suffix === '') return 1;
      return a.suffix.localeCompare(b.suffix);
    });

    const images = group.map(({ file }) => `assets/obras/${category}/${file}`);

    artworks.push({
      id: base,
      category,
      images,
      title: '',
      year: '',
      medium: '',
      size: '',
    });
  }
}

fs.writeFileSync(OUTPUT, JSON.stringify(artworks, null, 2));
console.log(`Generadas ${artworks.length} obras en data.json`);
