import React, { useEffect, useRef } from 'react';
import katex from 'katex';
import renderMathInElement from 'katex/dist/contrib/auto-render';
import 'katex/dist/katex.min.css';

interface RichTextRendererProps {
  content: string;
  className?: string;
}

const cleanContent = (html: string): string => {
  if (!html) return '';
  
  // Pre-replace ampersands that are double-escaped, if any
  let cleaned = html
    .replace(/&amp;lt;/gi, '&lt;')
    .replace(/&amp;gt;/gi, '&gt;')
    .replace(/&amp;quot;/gi, '&quot;')
    .replace(/&amp;amp;/gi, '&amp;');

  // Decode quotes so that attributes inside decoded tags will have actual quotes
  cleaned = cleaned.replace(/&quot;/g, '"').replace(/&#39;/g, "'");

  // Decode only allowed HTML tags
  const tagRegex = /&lt;(\/?(div|pre|code|span|p|br|h1|h2|h3|h4|h5|h6|ul|ol|li|strong|em|table|thead|tbody|tr|td|th|a|img|blockquote|svg|path|hr)[^>]*?)&gt;/gi;
  cleaned = cleaned.replace(tagRegex, '<$1>');

  // Sanitize decoded tags to prevent XSS:
  // 1. Remove inline event handlers (any attribute starting with 'on', e.g., onload, onerror, onclick)
  cleaned = cleaned.replace(/\s+on[a-zA-Z]+\s*=\s*(?:'[^']*'|"[^"]*"|[^\s>]+)/gi, '');

  // 2. Remove javascript:, data:, and vbscript: protocols from href, src, and action attributes
  cleaned = cleaned.replace(/\s+(href|src|action)\s*=\s*(?:'[^']*(?:javascript|data|vbscript):[^']*'|"[^"]*(?:javascript|data|vbscript):[^"]*"|[^\s>]+(?:javascript|data|vbscript):[^\s>]+)/gi, ' $1="#"');

  // 3. Remove script tags entirely just in case
  cleaned = cleaned.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');

  // Clean terminal artifacts and strip command lines along with surrounding whitespace to prevent empty spaces/newlines
  cleaned = cleaned
    .replace(/Output Terminal\s*\(Mac\):/gi, 'Output Terminal:')
    .replace(/macbook-pro\s*—\s*~user\/workspace/gi, 'Terminal')
    .replace(/\s*<span class="text-zinc-500">\s*\$\s*[^<]*<\/span>\s*/gi, '');

  // Wrap code blocks (pre class="bg-zinc-950...") in a premium Mac terminal styled container
  const preRegex = /<pre class="bg-zinc-950 text-zinc-100 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-zinc-800">\s*<code>([\s\S]*?)<\/code>\s*<\/pre>/gi;
  cleaned = cleaned.replace(preRegex, (_match, codeContent) => {
    return `
      <div class="bg-zinc-950 p-4 rounded-2xl font-mono text-xs shadow-xl border border-zinc-800 max-w-xl my-4">
        <div class="flex items-center gap-1.5 mb-2.5 border-b border-zinc-800 pb-2 text-zinc-500">
          <span class="w-2.5 h-2.5 rounded-full bg-[#ff5f56]"></span>
          <span class="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]"></span>
          <span class="w-2.5 h-2.5 rounded-full bg-[#27c93f]"></span>
          <span class="ml-2 text-[10px] font-bold text-zinc-400">Source Code</span>
        </div>
        <pre class="overflow-x-auto bg-transparent p-0 border-0 text-zinc-100 font-mono text-xs"><code>${codeContent}</code></pre>
      </div>
    `.trim();
  });

  return cleaned;
};

export const RichTextRenderer: React.FC<RichTextRendererProps> = ({ content, className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      try {
        // Melakukan render otomatis untuk ekspresi matematika LaTeX
        // Mendeteksi delimiter $...$ untuk inline dan $$...$$ untuk display
        renderMathInElement(containerRef.current, {
          delimiters: [
            { left: '$$', right: '$$', display: true },
            { left: '$', right: '$', display: false },
            { left: '\\(', right: '\\)', display: false },
            { left: '\\[', right: '\\]', display: true },
          ],
          throwOnError: false,
        });
      } catch (err) {
        console.error('Error rendering math equations with Katex:', err);
      }
    }
  }, [content]);

  return (
    <div 
      ref={containerRef}
      className={`prose prose-zinc max-w-none 
        prose-headings:font-bold prose-h1:text-3xl prose-h2:text-2xl 
        prose-p:text-zinc-700 prose-p:leading-relaxed 
        prose-code:bg-zinc-100 prose-code:text-rose-700 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:font-mono prose-code:text-sm
        prose-pre:bg-zinc-900 prose-pre:text-zinc-100 prose-pre:p-4 prose-pre:rounded-xl
        prose-table:border-collapse prose-th:border prose-th:border-zinc-200 prose-th:bg-zinc-50 prose-th:p-2 prose-td:border prose-td:border-zinc-200 prose-td:p-2
        ${className}`}
      dangerouslySetInnerHTML={{ __html: cleanContent(content) }}
    />
  );
};
