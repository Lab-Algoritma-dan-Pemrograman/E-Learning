/**
 * Utilitas Preprocessor Kode
 * Digunakan untuk membersihkan komentar dan string literal dari kode program (C/Python)
 * sebelum dilakukan validasi berbasis regular expression (regex).
 */

/**
 * Menghapus komentar dari kode C (//... dan /*...*\/)
 */
export function stripCommentsC(code: string): string {
  return code.replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, '');
}

/**
 * Menghapus komentar dari kode Python (#... dan '''...''' / """...""")
 */
export function stripCommentsPython(code: string): string {
  return code.replace(/#.*|"""[\s\S]*?"""|'''[\s\S]*?'''/g, '');
}

/**
 * Menghapus string literal agar siswa tidak dapat mencurangi validasi output dengan hardcode.
 * Contoh: printf("Hasil: 100") menjadi printf("")
 */
export function stripStringLiterals(code: string, language: 'c' | 'python'): string {
  if (language === 'c') {
    return code.replace(/"(\\.|[^"\\])*"/g, '""');
  } else {
    // Python mendukung single quote dan double quote, serta triple quotes (yang sudah ditangani oleh stripComments jika berupa docstring)
    return code.replace(/"(\\.|[^"\\])*"|'(\\.|[^'\\])*'/g, '""');
  }
}

/**
 * Menghasilkan kode bersih ter-preprocessing
 */
export function preprocessCode(code: string, language: 'c' | 'python', options?: { stripComments?: boolean; stripStrings?: boolean }): string {
  const { stripComments = true, stripStrings = false } = options || {};
  let cleanCode = code;

  if (stripComments) {
    cleanCode = language === 'c' ? stripCommentsC(cleanCode) : stripCommentsPython(cleanCode);
  }

  if (stripStrings) {
    cleanCode = stripStringLiterals(cleanCode, language);
  }

  return cleanCode;
}
