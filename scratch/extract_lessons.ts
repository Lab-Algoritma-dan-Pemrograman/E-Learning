import { curriculum } from '../src/data/curriculum';

for (const level of curriculum) {
  console.log(`=== LEVEL: ${level.id} ===`);
  for (const mod of level.modules) {
    for (const lesson of mod.lessons) {
      console.log(`ID: ${lesson.id}`);
      console.log(`Title: ${lesson.title}`);
      console.log(`Code:\n${lesson.codeExample}`);
      console.log('---');
    }
  }
}
