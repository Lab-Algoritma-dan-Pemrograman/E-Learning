const fs = require('fs');
const path = require('path');
const { URL } = require('url');

// Mock fetch for node
global.fetch = async (url) => {
  const filename = path.basename(new URL(url, 'file:///').pathname);
  const filePath = path.join(__dirname, '../public', filename);
  if (!fs.existsSync(filePath)) {
    throw new Error(`File not found: ${filePath}`);
  }
  const buffer = fs.readFileSync(filePath);
  return {
    arrayBuffer: async () => buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength)
  };
};

global.self = global;
global.importScripts = (file) => {
  const code = fs.readFileSync(path.join(__dirname, '../public', file), 'utf8');
  // Evaluate the code in global context
  const runCode = new Function(code);
  runCode();
};

// Load shared.js which registers API globally
global.importScripts('shared.js');

async function test() {
  const apiOptions = {
    async readBuffer(filename) {
      const response = await fetch(filename);
      return response.arrayBuffer();
    },
    async compileStreaming(filename) {
      const response = await fetch(filename);
      return WebAssembly.compile(await response.arrayBuffer());
    },
    hostWrite(s) {
      console.log(`[HOST_WRITE] ${JSON.stringify(s)}`);
    }
  };

  console.log("Initializing API...");
  const api = new API(apiOptions);
  await api.ready;
  console.log("API ready!");

  const cCode = `#include <stdio.h>
int main() {
    char nama[100];
    printf("Siapa nama kamu? ");
    scanf("%[^\\n]", nama);
    printf("Halo, %s! Selamat datang!\\n", nama);
    return 0;
}`;

  console.log("Compiling code...");
  const input = 'main.c';
  const obj = 'main.o';
  const wasm = 'main.wasm';
  await api.compile({input, contents: cCode, obj});
  await api.link(obj, wasm);

  console.log("Running module...");
  const buffer = api.memfs.getFileContents(wasm);
  const module = await WebAssembly.compile(buffer);

  api.memfs.setStdinStr('');
  console.log("Initial state:", {
    waitingForInput: api.memfs.waitingForInput,
    stdoutLenAtInputRequest: api.memfs.stdoutLenAtInputRequest,
    stdoutStr: api.memfs.stdoutStr
  });

  // Run the app
  try {
    await api.run(module, wasm);
  } catch (e) {
    console.log("Process finished with error:", e.message);
  }

  console.log("Final state:", {
    waitingForInput: api.memfs.waitingForInput,
    stdoutLenAtInputRequest: api.memfs.stdoutLenAtInputRequest,
    stdoutStr: api.memfs.stdoutStr
  });
}

test().catch(console.error);
