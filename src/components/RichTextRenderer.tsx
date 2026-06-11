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

  // Clean terminal artifacts
  cleaned = cleaned
    .replace(/Output Terminal\s*\(Mac\):/gi, 'Output Terminal:')
    .replace(/macbook-pro\s*—\s*~user\/workspace/gi, 'Terminal')
    // Remove command spans starting with $
    .replace(/<span class="text-zinc-500">\s*\$\s*[^<]*<\/span>/gi, '');

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
