import React, { useCallback } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import { BubbleMenu } from '@tiptap/react/menus';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import { TextStyle } from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';
import { Table } from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import { 
  Bold, Italic, Underline as UnderlineIcon, Strikethrough, 
  List, ListOrdered, Heading1, Heading2, AlignLeft, 
  AlignCenter, AlignRight, Table as TableIcon, Link as LinkIcon, 
  Image as ImageIcon, Undo, Redo, Code, Plus, Trash2, 
  Columns, Rows, Merge, Split
} from 'lucide-react';

interface RichTextEditorProps {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
}

export const RichTextEditor: React.FC<RichTextEditorProps> = ({ value, onChange, placeholder = 'Tulis materi atau pertanyaan di sini...' }) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        codeBlock: false, // Kita bisa custom code block nanti atau biarkan bawaan starter kit
      }),
      Underline,
      TextStyle,
      Color,
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-rose-700 underline cursor-pointer',
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: 'max-w-full h-auto rounded-xl shadow-md my-4 mx-auto block',
        },
      }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose prose-zinc max-w-none focus:outline-none min-h-[200px] px-6 py-4 custom-editor-content',
      },
    },
  });

  const addLink = useCallback(() => {
    if (!editor) return;
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('Masukkan URL Link:', previousUrl);
    
    if (url === null) return;
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  }, [editor]);

  const addImage = useCallback(() => {
    if (!editor) return;
    const url = window.prompt('Masukkan URL Gambar:');
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  }, [editor]);

  if (!editor) {
    return (
      <div className="animate-pulse flex space-y-4 p-4 border border-zinc-200 rounded-2xl">
        <div className="h-6 bg-zinc-200 rounded w-1/4"></div>
        <div className="h-20 bg-zinc-200 rounded"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col border border-zinc-200 rounded-2xl bg-white shadow-sm overflow-hidden focus-within:border-rose-700/50 transition-all duration-200">
      {/* TOOLBAR */}
      <div className="flex flex-wrap items-center gap-1 p-2 bg-zinc-50 border-b border-zinc-200">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-2 rounded-lg hover:bg-zinc-200 transition-colors ${editor.isActive('bold') ? 'bg-zinc-200 text-rose-700 font-bold' : 'text-zinc-600'}`}
          title="Bold"
        >
          <Bold size={16} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-2 rounded-lg hover:bg-zinc-200 transition-colors ${editor.isActive('italic') ? 'bg-zinc-200 text-rose-700 font-bold' : 'text-zinc-600'}`}
          title="Italic"
        >
          <Italic size={16} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={`p-2 rounded-lg hover:bg-zinc-200 transition-colors ${editor.isActive('underline') ? 'bg-zinc-200 text-rose-700 font-bold' : 'text-zinc-600'}`}
          title="Underline"
        >
          <UnderlineIcon size={16} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={`p-2 rounded-lg hover:bg-zinc-200 transition-colors ${editor.isActive('strike') ? 'bg-zinc-200 text-rose-700 font-bold' : 'text-zinc-600'}`}
          title="Strikethrough"
        >
          <Strikethrough size={16} />
        </button>

        <div className="w-px h-6 bg-zinc-200 mx-1" />

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={`p-2 rounded-lg hover:bg-zinc-200 transition-colors ${editor.isActive('heading', { level: 1 }) ? 'bg-zinc-200 text-rose-700 font-bold' : 'text-zinc-600'}`}
          title="Heading 1"
        >
          <Heading1 size={16} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`p-2 rounded-lg hover:bg-zinc-200 transition-colors ${editor.isActive('heading', { level: 2 }) ? 'bg-zinc-200 text-rose-700 font-bold' : 'text-zinc-600'}`}
          title="Heading 2"
        >
          <Heading2 size={16} />
        </button>

        <div className="w-px h-6 bg-zinc-200 mx-1" />

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-2 rounded-lg hover:bg-zinc-200 transition-colors ${editor.isActive('bulletList') ? 'bg-zinc-200 text-rose-700 font-bold' : 'text-zinc-600'}`}
          title="Bullet List"
        >
          <List size={16} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`p-2 rounded-lg hover:bg-zinc-200 transition-colors ${editor.isActive('orderedList') ? 'bg-zinc-200 text-rose-700 font-bold' : 'text-zinc-600'}`}
          title="Ordered List"
        >
          <ListOrdered size={16} />
        </button>

        <div className="w-px h-6 bg-zinc-200 mx-1" />

        <button
          type="button"
          onClick={addLink}
          className={`p-2 rounded-lg hover:bg-zinc-200 transition-colors ${editor.isActive('link') ? 'bg-zinc-200 text-rose-700 font-bold' : 'text-zinc-600'}`}
          title="Insert Link"
        >
          <LinkIcon size={16} />
        </button>
        <button
          type="button"
          onClick={addImage}
          className="p-2 rounded-lg hover:bg-zinc-200 text-zinc-600 transition-colors"
          title="Insert Image"
        >
          <ImageIcon size={16} />
        </button>

        <div className="w-px h-6 bg-zinc-200 mx-1" />

        {/* TABLE CONTROLS */}
        <button
          type="button"
          onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}
          className={`p-2 rounded-lg hover:bg-zinc-200 transition-colors ${editor.isActive('table') ? 'bg-zinc-200 text-rose-700 font-bold' : 'text-zinc-600'}`}
          title="Insert Table"
        >
          <TableIcon size={16} />
        </button>

        {editor.isActive('table') && (
          <div className="flex items-center gap-1 bg-zinc-100 p-0.5 rounded-lg border border-zinc-200">
            <button
              type="button"
              onClick={() => editor.chain().focus().addColumnAfter().run()}
              className="p-1.5 rounded hover:bg-zinc-200 text-zinc-600"
              title="Add Column"
            >
              <Columns size={14} />
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().addRowAfter().run()}
              className="p-1.5 rounded hover:bg-zinc-200 text-zinc-600"
              title="Add Row"
            >
              <Rows size={14} />
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().deleteTable().run()}
              className="p-1.5 rounded hover:bg-zinc-200 text-red-500"
              title="Delete Table"
            >
              <Trash2 size={14} />
            </button>
          </div>
        )}

        <div className="flex-1" />

        <button
          type="button"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
          className="p-2 rounded-lg hover:bg-zinc-200 text-zinc-600 disabled:opacity-30 transition-colors"
          title="Undo"
        >
          <Undo size={16} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
          className="p-2 rounded-lg hover:bg-zinc-200 text-zinc-600 disabled:opacity-30 transition-colors"
          title="Redo"
        >
          <Redo size={16} />
        </button>
      </div>

      {/* BUBBLE MENU */}
      {editor && (
        <BubbleMenu editor={editor} className="flex items-center gap-0.5 bg-zinc-900 border border-zinc-800 rounded-lg shadow-xl p-1 overflow-hidden">
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`px-2 py-1 text-xs rounded hover:bg-zinc-800 transition-colors ${editor.isActive('bold') ? 'text-rose-400 font-bold' : 'text-white'}`}
          >
            Bold
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`px-2 py-1 text-xs rounded hover:bg-zinc-800 transition-colors ${editor.isActive('italic') ? 'text-rose-400 font-bold' : 'text-white'}`}
          >
            Italic
          </button>
          <button
            type="button"
            onClick={addLink}
            className={`px-2 py-1 text-xs rounded hover:bg-zinc-800 transition-colors ${editor.isActive('link') ? 'text-rose-400 font-bold' : 'text-white'}`}
          >
            Link
          </button>
        </BubbleMenu>
      )}

      {/* EDITOR WORKSPACE */}
      <div className="flex-1 bg-white overflow-y-auto">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};
