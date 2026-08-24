export interface ParsedOutput {
  cleanText: string;
  images: string[];
}

/**
 * Parses raw stdout text and extracts any embedded __IMAGE_DATA__:data:image/... base64 strings.
 * Returns clean text and an array of image data URLs.
 */
export function parseOutputWithImages(rawOutput: string): ParsedOutput {
  if (!rawOutput) {
    return { cleanText: '', images: [] };
  }

  const images: string[] = [];
  const imageRegex = /__IMAGE_DATA__:(data:image\/[a-zA-Z]+;base64,[^\s\r\n]+)/g;

  let match;
  while ((match = imageRegex.exec(rawOutput)) !== null) {
    if (match[1]) {
      images.push(match[1]);
    }
  }

  const cleanText = rawOutput
    .replace(/__IMAGE_DATA__:(data:image\/[a-zA-Z]+;base64,[^\s\r\n]+)/g, '')
    .trimEnd();

  return { cleanText, images };
}
