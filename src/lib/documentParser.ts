import JSZip from 'jszip';
import { AssessmentQuestion } from '../services/assessmentService';

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
    // We keep empty spaces if needed, but filter out pure empty paragraphs to simplify parsing
    textList.push(text);
  }
  return textList;
}

/**
 * Extracts slide texts from a .pptx file using JSZip and DOMParser.
 */
export async function extractPptxSlides(file: File): Promise<{ slideNumber: number; texts: string[] }[]> {
  const zip = await JSZip.loadAsync(file);
  const slides: { slideNumber: number; texts: string[] }[] = [];
  
  // Find all slide XML files
  const slideFiles = Object.keys(zip.files).filter(
    name => name.startsWith("ppt/slides/slide") && name.endsWith(".xml")
  );
  
  // Sort by slide number (ppt/slides/slide1.xml -> 1)
  slideFiles.sort((a, b) => {
    const numA = parseInt(a.replace("ppt/slides/slide", "").replace(".xml", ""), 10);
    const numB = parseInt(b.replace("ppt/slides/slide", "").replace(".xml", ""), 10);
    return numA - numB;
  });

  const parser = new DOMParser();
  
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
    
    if (texts.length > 0) {
      slides.push({ slideNumber, texts });
    }
  }
  
  return slides;
}

/**
 * Parses Pre-Test and Post-Test Word file paragraphs.
 */
export function parsePrePostTest(paragraphs: string[], filename: string): Omit<AssessmentQuestion, 'id'>[] {
  const questions: Omit<AssessmentQuestion, 'id'>[] = [];
  
  // 1. Determine Module number from filename (e.g. Post Test M1.docx -> Module 1)
  const modMatch = filename.match(/M(?:odul)?\s*(\d+)/i);
  const moduleAssociation = modMatch ? parseInt(modMatch[1], 10) : null;
  
  // 2. Determine Pre-Test or Post-Test
  const isPreTest = filename.toLowerCase().includes("pre");
  const menuType = isPreTest ? "pre_test" : "post_test";
  
  let currentDifficulty: 'easy' | 'medium' | 'hard' = 'easy';
  let currentQuestionText = "";
  let isOpsiMode = false;
  let currentOpsiTitle = "";
  let currentOpsiInstruction = "";

  for (let i = 0; i < paragraphs.length; i++) {
    const text = paragraphs[i].trim();
    if (!text) continue;
    
    // Detect Level Headers
    if (text.toLowerCase().includes("level easy")) {
      currentDifficulty = 'easy';
      isOpsiMode = false;
      continue;
    } else if (text.toLowerCase().includes("level medium")) {
      currentDifficulty = 'medium';
      isOpsiMode = false;
      continue;
    } else if (text.toLowerCase().includes("level hard")) {
      currentDifficulty = 'hard';
      isOpsiMode = false;
      continue;
    }
    
    // Skip general title headers
    if (text.toLowerCase().startsWith("bank soal") || 
        text.toLowerCase().startsWith("pre-test") || 
        text.toLowerCase().startsWith("post-test")) {
      continue;
    }

    // Handle Opsi / Coding options in Hard level of Post Test
    const opsiMatch = text.match(/^Opsi\s*(\d+)\s*:\s*(.*)/i);
    if (opsiMatch) {
      // Save previous coding question if any
      if (isOpsiMode && currentOpsiTitle && currentOpsiInstruction) {
        questions.push({
          menu_type: menuType,
          difficulty: 'hard',
          type: 'coding',
          title: currentOpsiTitle,
          instruction: currentOpsiInstruction.trim(),
          module_association: moduleAssociation,
          test_cases: [],
          validation_rules: []
        });
      }
      isOpsiMode = true;
      currentOpsiTitle = opsiMatch[2].trim();
      currentOpsiInstruction = "";
      continue;
    }
    
    if (isOpsiMode) {
      currentOpsiInstruction += text + "\n";
    } else {
      // Normal Question/Answer parsing (Easy / Medium / Pre-Test Hard)
      if (text.toLowerCase().startsWith("kunci jawaban")) {
        const answer = text.replace(/^kunci\s+jawaban\s*:\s*/i, "").trim();
        if (currentQuestionText) {
          questions.push({
            menu_type: menuType,
            difficulty: currentDifficulty,
            type: 'essay', // Default type for theory questions
            title: currentQuestionText.substring(0, 50) + (currentQuestionText.length > 50 ? "..." : ""),
            instruction: currentQuestionText.trim(),
            reference_solution: answer,
            module_association: moduleAssociation,
            test_cases: [],
            validation_rules: []
          });
          currentQuestionText = "";
        }
      } else {
        if (currentQuestionText) {
          currentQuestionText += "\n" + text;
        } else {
          currentQuestionText = text;
        }
      }
    }
  }

  // Push the final coding question if we were in opsi mode
  if (isOpsiMode && currentOpsiTitle && currentOpsiInstruction) {
    questions.push({
      menu_type: menuType,
      difficulty: 'hard',
      type: 'coding',
      title: currentOpsiTitle,
      instruction: currentOpsiInstruction.trim(),
      module_association: moduleAssociation,
      test_cases: [],
      validation_rules: []
    });
  }
  
  return questions;
}

/**
 * Parses Program Keterampilan Word file paragraphs.
 */
export function parseProgramKeterampilan(paragraphs: string[], filename: string): Omit<AssessmentQuestion, 'id'>[] {
  // Parse Module number from filename (e.g. Program Keterampilan Modul 1.docx)
  const modMatch = filename.match(/(?:Modul|M)\s*(\d+)/i);
  const moduleAssociation = modMatch ? parseInt(modMatch[1], 10) : null;

  let title = "Program Keterampilan";
  let instruction = "";
  let solution = "";
  let isSolutionMode = false;

  for (let i = 0; i < paragraphs.length; i++) {
    const line = paragraphs[i];
    const text = line.trim();
    if (!text && !isSolutionMode) continue; // Skip empty lines in instructions, preserve in code

    if (text.toLowerCase().startsWith("judul")) {
      title = text.replace(/^judul\s*:\s*/i, "").trim();
      continue;
    }

    if (text.toLowerCase().startsWith("kunci jawaban")) {
      isSolutionMode = true;
      continue;
    }

    if (isSolutionMode) {
      solution += line + "\n";
    } else {
      if (text.toLowerCase().startsWith("program keterampilan modul") || text.toLowerCase().startsWith("instruksi rinci")) {
        continue;
      }
      instruction += text + "\n";
    }
  }

  return [{
    menu_type: 'program_keterampilan',
    difficulty: 'medium',
    type: 'coding',
    title: title,
    instruction: instruction.trim(),
    reference_solution: solution.trim(),
    module_association: moduleAssociation,
    test_cases: [],
    validation_rules: []
  }];
}

/**
 * Parses Ujian Praktik PPTX slides.
 */
export function parseUjianPraktik(slides: { slideNumber: number; texts: string[] }[], filename: string): Omit<AssessmentQuestion, 'id'>[] {
  const questions: Omit<AssessmentQuestion, 'id'>[] = [];

  // Extract package code from filename (e.g. A.pptx -> A)
  const baseName = filename.split('.').slice(0, -1).join('.');
  const pkgCode = baseName.toUpperCase();

  // Slide 1 is usually title, Slide 8 is usually Thank You.
  // We parse slide contents.
  for (const slide of slides) {
    const texts = slide.texts;
    if (texts.length < 2) continue; // Skip empty slides
    
    const header = texts[0].trim();
    
    // Check if slide header indicates it is a question slide
    const isModul = header.toLowerCase().startsWith("modul");
    const isFlowchart = header.toLowerCase().includes("fc to program") || header.toLowerCase().includes("flowchart");
    
    if (!isModul && !isFlowchart) {
      continue; // Skip non-question slides like Slide 1 (Ujian Praktik) or final slide
    }

    // Parse Module Association
    let moduleAssociation: number | null = null;
    const modMatch = header.match(/modul\s*(\d+)/i);
    if (modMatch) {
      moduleAssociation = parseInt(modMatch[1], 10);
    } else if (header.toLowerCase().includes("modul 4&5")) {
      moduleAssociation = 4; // association with Modul 4
    } else if (isFlowchart) {
      moduleAssociation = 6; // flowchart translation corresponds to module 6 logic
    }

    // Extract Title and Instruction
    let title = texts[1].trim();
    let instructionText = "";
    
    if (isFlowchart) {
      title = "Flowchart to Program Modul 6";
      instructionText = texts.slice(1).join("\n"); // Entire slide text
    } else {
      instructionText = texts.slice(2).join("\n"); // Everything after header and title
    }

    // Append package code to title if present
    const finalTitle = pkgCode ? `[Kode ${pkgCode}] ${title}` : title;

    questions.push({
      menu_type: 'ujian_praktik',
      difficulty: 'hard',
      type: isFlowchart ? 'flowchart_translation' : 'coding',
      title: finalTitle,
      instruction: instructionText.trim(),
      module_association: moduleAssociation,
      test_cases: [],
      validation_rules: []
    });
  }

  return questions;
}

/**
 * Parses Pre-Test or Post-Test from PowerPoint slides.
 * The slides represent questions ordered by difficulty.
 */
export function parsePrePostTestPpt(
  slides: { slideNumber: number; texts: string[] }[],
  filename: string,
  menuType: 'pre_test' | 'post_test'
): Omit<AssessmentQuestion, 'id'>[] {
  const questions: Omit<AssessmentQuestion, 'id'>[] = [];

  // Determine package code from filename (e.g. A.pptx -> Kode A)
  const baseName = filename.split('.').slice(0, -1).join('.');
  const pkgCode = baseName.toUpperCase();

  // Filter out non-question slides (Title slide, Thank You slide)
  const questionSlides = slides.filter(slide => {
    const texts = slide.texts;
    if (texts.length === 0) return false;
    const firstText = texts[0].toLowerCase();
    
    // Skip slide if it contains title-like headers
    if (firstText.includes("thank you") || firstText.includes("terima kasih") || firstText.includes("ujian") || firstText.includes("pre-test") || firstText.includes("post-test")) {
      if (slide.slideNumber === 1 || texts.length < 2) {
        return false;
      }
    }
    return true;
  });

  for (let idx = 0; idx < questionSlides.length; idx++) {
    const slide = questionSlides[idx];
    const texts = slide.texts;
    
    const header = texts[0].trim();
    let title = texts[1] ? texts[1].trim() : header;
    let instructionText = texts.slice(2).join("\n").trim();
    if (!instructionText && texts[1]) {
      instructionText = texts[1].trim();
      title = header;
    }

    // Determine difficulty based on index
    let difficulty: 'easy' | 'medium' | 'hard' = 'medium';
    if (menuType === 'post_test') {
      // Post-test sequence: 1 (hard), 2 (medium), 3 (hard)
      if (idx === 0) difficulty = 'hard';
      else if (idx === 1) difficulty = 'medium';
      else if (idx === 2) difficulty = 'hard';
    } else {
      // Pre-test sequence: 1 (easy), 2 (medium), 3 (medium), 4 (hard), 5 (hard)
      if (idx === 0) difficulty = 'easy';
      else if (idx === 1 || idx === 2) difficulty = 'medium';
      else if (idx === 3 || idx === 4) difficulty = 'hard';
    }

    // Extract Module association from header or slide content
    let moduleAssociation: number | null = null;
    const modMatch = (header + " " + title).match(/(?:Modul|M)\s*(\d+)/i);
    if (modMatch) {
      moduleAssociation = parseInt(modMatch[1], 10);
    } else {
      // fallback to extracting module from filename, e.g. "Pre Test M1.pptx"
      const fileModMatch = filename.match(/M(?:odul)?\s*(\d+)/i);
      if (fileModMatch) {
        moduleAssociation = parseInt(fileModMatch[1], 10);
      }
    }

    // Determine type: coding vs essay
    const type = (instructionText.toLowerCase().includes("program") || 
                  instructionText.toLowerCase().includes("buatlah kode") || 
                  instructionText.toLowerCase().includes("bahasa c") || 
                  instructionText.toLowerCase().includes("python") ||
                  difficulty === 'hard') ? 'coding' : 'essay';

    // Append package code to title
    const finalTitle = pkgCode ? `[Kode ${pkgCode}] ${title}` : title;

    questions.push({
      menu_type: menuType,
      difficulty,
      type,
      title: finalTitle,
      instruction: instructionText,
      module_association: moduleAssociation,
      test_cases: [],
      validation_rules: []
    });
  }

  return questions;
}
