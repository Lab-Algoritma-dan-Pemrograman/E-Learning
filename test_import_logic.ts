import fs from 'fs';
import path from 'path';
import JSZip from 'jszip';
import { parsePrePostTest } from './src/lib/documentParser.js';

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

async function test() {
  const filename = "Pre Test M1.docx";
  const filePath = path.join(sampleDir, filename);
  const data = fs.readFileSync(filePath);
  
  const zip = await JSZip.loadAsync(data);
  const docXmlFile = zip.file("word/document.xml");
  if (!docXmlFile) throw new Error("Missing document.xml");
  const xmlText = await docXmlFile.async("text");
  
  const parser = new MockDOMParser();
  const xmlDoc = parser.parseFromString(xmlText, "application/xml");
  const paragraphs = xmlDoc.getElementsByTagName("w:p");
  const textList: string[] = [];
  
  for (let i = 0; i < paragraphs.length; i++) {
    const p = paragraphs[i];
    const textRuns = p.getElementsByTagName("w:t");
    let text = "";
    for (let j = 0; j < textRuns.length; j++) {
      text += textRuns[j].textContent || "";
    }
    textList.push(text);
  }
  
  const result = parsePrePostTest(textList, filename);
  console.log(`Parsed result menu_type for Pre Test M1.docx: ${result[0]?.menu_type}`);
}

test();
