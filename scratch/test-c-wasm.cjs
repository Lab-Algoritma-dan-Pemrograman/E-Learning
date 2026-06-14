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
  let code = fs.readFileSync(path.join(__dirname, '../public', file), 'utf8');
  // Expose API globally
  code = code.replace('const API = (function()', 'global.API = (function()');
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
int main(){
    setbuf(stdout, NULL);
    setbuf(stdin, NULL);
    
    // 1. Tulis ke file
    FILE *fp = fopen("pesan.txt", "w");
    if (fp == NULL) {
        printf("Gagal membuka file untuk menulis!\\n");
        return 1;
    }
    fprintf(fp, "Halo dari Wasm File System!");
    fclose(fp);
    printf("File berhasil ditulis!\\n");

    // 2. Baca dari file
    fp = fopen("pesan.txt", "r");
    if (fp == NULL) {
        printf("Gagal membuka file untuk membaca!\\n");
        return 1;
    }
    char buffer[1024];
    if (fgets(buffer, sizeof(buffer), fp) != NULL) {
        printf("Isi file yang dibaca: %s\\n", buffer);
    }
    fclose(fp);

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

  api.memfs.setStdinStr('da d\n');
  console.log("Initial state:", {
    waitingForInput: api.memfs.waitingForInput,
    stdoutLenAtInputRequest: api.memfs.stdoutLenAtInputRequest,
    stdoutStr: api.memfs.stdoutStr,
    inputOffsets: api.memfs.inputOffsets
  });

  const original_copy_out = api.memfs.copy_out;
  api.memfs.copy_out = function(clang_dst, memfs_src, size) {
    console.log(`[copy_out] clang_dst=${clang_dst}, memfs_src=${memfs_src} (unsigned: ${memfs_src >>> 0}), size=${size}, memfs.byteLength=${this.mem.buffer.byteLength}`);
    return original_copy_out.call(this, clang_dst, memfs_src, size);
  };

  const original_host_read = api.memfs.host_read;
  api.memfs.host_read = function(fd, iovs, iovs_len, nread) {
    console.log(`[HOST_READ] Entering: fd=${fd}, iovs_len=${iovs_len}, stdinStrPos=${this.stdinStrPos}, stdinStr.length=${this.stdinStr.length}`);
    const res = original_host_read.call(this, fd, iovs, iovs_len, nread);
    console.log(`[HOST_READ] Exiting: nread=${this.hostMem_.read32(nread)}, new stdinStrPos=${this.stdinStrPos}`);
    return res;
  };

  // Run the app
  try {
    await api.run(module, wasm);
  } catch (e) {
    console.log("Process finished with error:", e.message);
  }

  const stdin = 'da d\n';
  const inputsCount = stdin ? (stdin.endsWith('\n') ? stdin.slice(0, -1).split('\n').length : stdin.split('\n').length) : 0;
  const rawWaiting = api.memfs.waitingForInput || false;
  const len = api.memfs.stdoutLenAtInputRequest || 0;
  let offsets = api.memfs.inputOffsets || [];
  if (rawWaiting && !offsets.includes(len)) {
    offsets = [...offsets, len];
  }
  const isWaiting = rawWaiting && (offsets.length > inputsCount);

  console.log("Final state:", {
    waitingForInput: api.memfs.waitingForInput,
    stdoutLenAtInputRequest: api.memfs.stdoutLenAtInputRequest,
    stdoutStr: api.memfs.stdoutStr,
    inputOffsets: api.memfs.inputOffsets
  });

  console.log("Calculated results:", {
    inputsCount,
    rawWaiting,
    len,
    offsets,
    isWaiting
  });
}

test().catch(console.error);
