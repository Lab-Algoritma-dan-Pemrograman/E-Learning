import fs from 'fs';
import path from 'path';
import JSZip from 'jszip';

// Mock DOMParser
class MockDOMParser {
  parseFromString(xmlText: string, mimeType: string) {
    return {
      getElementsByTagName: (name: string) => {
        const results: any[] = [];
        const cleanTagName = name.replace(':', '\\:');
        const regex = new RegExp(`<${cleanTagName}\\b[^>]*>([\\s\\S]*?)<\\/${cleanTagName}>`, 'g');
        let match;
        while ((match = regex.exec(xmlText)) !== null) {
          const content = match[1];
          results.push({
            textContent: content.replace(/<[^>]+>/g, ''), // strip tags
            getElementsByTagName: (subName: string) => {
              const subClean = subName.replace(':', '\\:');
              const subRegex = new RegExp(`<${subClean}\\b[^>]*>([\\s\\S]*?)<\\/${subClean}>`, 'g');
              const subResults: any[] = [];
              let subMatch;
              while ((subMatch = subRegex.exec(content)) !== null) {
                subResults.push({
                  textContent: subMatch[1].replace(/<[^>]+>/g, '')
                });
              }
              return subResults;
            }
          });
        }
        return results;
      }
    };
  }
}
(global as any).DOMParser = MockDOMParser;

const sampleDir = "C:\\Users\\MyBook Hype AMD\\Documents\\File Faqod\\Program\\Asesmen Prak AP";

async function run() {
  const filename = "A.pptx";
  const filePath = path.join(sampleDir, filename);
  const data = fs.readFileSync(filePath);
  
  const zip = await JSZip.loadAsync(data);
  const slideFiles = Object.keys(zip.files).filter(
    name => name.startsWith("ppt/slides/slide") && name.endsWith(".xml")
  );
  
  slideFiles.sort((a, b) => {
    const numA = parseInt(a.replace("ppt/slides/slide", "").replace(".xml", ""), 10);
    const numB = parseInt(b.replace("ppt/slides/slide", "").replace(".xml", ""), 10);
    return numA - numB;
  });

  const parser = new MockDOMParser();
  const slides: { slideNumber: number; texts: string[] }[] = [];
  
  for (const slidePath of slideFiles) {
    const slideFile = zip.file(slidePath);
    if (!slideFile) continue;
    
    const xmlText = await slideFile.async("text");
    const xmlDoc = parser.parseFromString(xmlText, "application/xml");
    const slideNumber = parseInt(slidePath.replace("ppt/slides/slide", "").replace(".xml", ""), 10);
    
    const texts: string[] = [];
    const pTags = xmlDoc.getElementsByTagName("a:p");
    
    for (let i = 0; i < pTags.length; i++) {
      const p = pTags[i];
      const tRuns = p.getElementsByTagName("a:t");
      let pText = "";
      for (let j = 0; j < tRuns.length; j++) {
        pText += tRuns[j].textContent || "";
      }
      if (pText.trim()) {
        texts.push(pText.trim());
      }
    }
    slides.push({ slideNumber, texts });
  }

  console.log(`Total slides in A.pptx: ${slides.length}`);
  for (const slide of slides) {
    console.log(`\nSlide ${slide.slideNumber}:`);
    console.log(slide.texts.join(' | '));
  }
}

run();
