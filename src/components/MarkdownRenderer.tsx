import React from 'react';
import Markdown from 'react-markdown';

interface MarkdownRendererProps {
  content: string;
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  return (
    <div className="prose prose-zinc max-w-none prose-headings:font-bold prose-h1:text-3xl prose-h2:text-2xl prose-p:text-zinc-600 prose-code:bg-zinc-100 prose-code:px-1 prose-code:rounded prose-pre:bg-zinc-900 prose-pre:text-zinc-100">
      <Markdown>{content}</Markdown>
    </div>
  );
};
