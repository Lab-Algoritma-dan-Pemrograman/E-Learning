import JSZip from 'jszip';

/**
 * Extracts paragraphs from a .docx file using JSZip and DOMParser.
 */
export async function extractDocxText(file: File): Promise<string[]> {
  const zip = await JSZip.loadAsync(file);
  const docXmlFile = zip.file("word/document.xml");
  if (!docXmlFile) throw new Error("Not a valid DOCX file (missing word/document.xml)");
  const xmlText = await docXmlFile.async("text");
  
  const parser = new DOMParser();
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
  return textList;
}
