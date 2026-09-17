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
    try {
      const obj = JSON.parse(line);
      // Look for user messages or model responses containing proposed curriculum structures
      if (obj.source === 'MODEL' && obj.type === 'PLANNER_RESPONSE') {
        // We only care about text responses, which might be in content
        if (obj.content && (obj.content.includes("Level 1") || obj.content.includes("c-level-1") || obj.content.includes("curriculum"))) {
          console.log(`\n--- Line ${lineNum} (PLANNER_RESPONSE from MODEL) ---`);
          console.log(obj.content.substring(0, 1000));
          if (obj.content.length > 1000) console.log("... [TRUNCATED]");
        }
      }
    } catch (e) {}
  }
}

search();
