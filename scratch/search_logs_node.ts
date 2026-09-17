import fs from 'fs';
import readline from 'readline';

async function search() {
  const logPath = "C:\\Users\\MyBook Hype AMD\\.gemini\\antigravity\\brain\\e336cf46-61d0-4260-abf3-31aea713f26d\\.system_generated\\logs\\transcript.jsonl";
  
  if (!fs.existsSync(logPath)) {
    console.log("Log file does not exist.");
    return;
  }

  const fileStream = fs.createReadStream(logPath);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  let lineNum = 0;
  for await (const line of rl) {
    lineNum++;
    if (line.includes("curriculum.ts")) {
      try {
        const obj = JSON.parse(line);
        if (obj.tool_calls) {
          for (const tc of obj.tool_calls) {
            if (tc.name === 'replace_file_content' || tc.name === 'write_to_file' || tc.name === 'multi_replace_file_content') {
              console.log(`Line ${lineNum}: tool=${tc.name}`);
              console.log(`  Args:`, JSON.stringify(tc.arguments).substring(0, 500));
            }
          }
        }
      } catch (e) {}
    }
  }
}

search();
