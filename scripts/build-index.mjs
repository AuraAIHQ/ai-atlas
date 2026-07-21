// 扫描 cards/*/card.json，生成 cards/index.json（站点消费的聚合索引）。
// 用法：node scripts/build-index.mjs
import { readdirSync, readFileSync, writeFileSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const cardsDir = join(root, 'cards');
const pick = (c) => ({
  slug: c.slug, title: c.title, category: c.category, categoryLabel: c.categoryLabel,
  difficulty: c.difficulty, ageBands: c.ageBands, experiments: c.experiments,
  summary: c.summary, playground: c.playground, source: c.source,
  companion: c.companion, status: c.status,
});

const cards = [];
for (const slug of readdirSync(cardsDir)) {
  const dir = join(cardsDir, slug);
  if (!statSync(dir).isDirectory()) continue;
  const f = join(dir, 'card.json');
  try { cards.push(pick(JSON.parse(readFileSync(f, 'utf8')))); }
  catch { console.warn('skip', slug); }
}
cards.sort((a, b) => a.slug.localeCompare(b.slug));
writeFileSync(join(cardsDir, 'index.json'),
  JSON.stringify({ schema: 1, count: cards.length, cards }, null, 2) + '\n');
console.log(`index: ${cards.length} cards`);
