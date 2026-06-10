import React from 'react';
import Markdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

interface MarkdownRendererProps {
  content: string;
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  return (
    <div className="prose prose-zinc max-w-none prose-headings:font-bold prose-h1:text-3xl prose-h2:text-2xl prose-p:text-zinc-600 prose-code:bg-zinc-100 prose-code:px-1 prose-code:rounded prose-pre:bg-zinc-900 prose-pre:text-zinc-100">
      <Markdown
        rehypePlugins={[rehypeRaw]}
        components={{
          code(props) {
            const { children, className, node, ...rest } = props;
            const match = /language-(\w+)/.exec(className || '');
            const lang = match ? match[1] : '';

            if (className && (lang === 'terminal' || lang === 'output')) {
              return (
                <div className="bg-zinc-950 rounded-2xl overflow-hidden border border-zinc-800 shadow-lg my-4 not-prose">
                  <div className="flex items-center justify-between px-4 py-2.5 bg-zinc-900 border-b border-zinc-850">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                      <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
                    </div>
                    <span className="text-zinc-500 text-[10px] font-mono tracking-widest font-bold">OUTPUT</span>
                  </div>
                  <div className="p-4 font-mono text-xs text-zinc-100 leading-relaxed min-h-[60px] whitespace-pre-wrap">
                    {String(children).replace(/\n$/, '')}
                  </div>
                </div>
              );
            }

            return (
              <code className={className} {...rest}>
                {children}
              </code>
            );
          }
        }}
      >
        {content}
      </Markdown>
    </div>
  );
};

