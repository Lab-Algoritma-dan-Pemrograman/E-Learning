import React, { useCallback } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import { BubbleMenu } from '@tiptap/react/menus';
import { cn } from '../lib/utils';
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
import TextAlign from '@tiptap/extension-text-align';
import { 
  Bold, Italic, Underline as UnderlineIcon, Strikethrough, 
  List, ListOrdered, Heading1, Heading2, AlignLeft, 
  AlignCenter, AlignRight, AlignJustify, Table as TableIcon, Link as LinkIcon, 
  Image as ImageIcon, Undo, Redo, Code, Plus, Trash2, 
  Columns, Rows, Merge, Split, Palette, Indent, Outdent, X
} from 'lucide-react';

const TEXT_COLORS = [
  { label: 'Hitam', value: '#000000' },
  { label: 'Abu', value: '#6b7280' },
  { label: 'Merah', value: '#dc2626' },
  { label: 'Rose', value: '#be123c' },
  { label: 'Oranye', value: '#ea580c' },
  { label: 'Kuning', value: '#ca8a04' },
  { label: 'Hijau', value: '#16a34a' },
  { label: 'Biru', value: '#2563eb' },
  { label: 'Ungu', value: '#7c3aed' },
  { label: 'Putih', value: '#ffffff' },
];

interface RichTextEditorProps {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
}

export const RichTextEditor: React.FC<RichTextEditorProps> = ({ value, onChange, placeholder = 'Tulis materi atau pertanyaan di sini...' }) => {
  const [showColorPicker, setShowColorPicker] = React.useState(false);
  const [showImageModal, setShowImageModal] = React.useState(false);
  const [imageUrl, setImageUrl] = React.useState('');
  const [imageFile, setImageFile] = React.useState<File | null>(null);
  const [imageFileName, setImageFileName] = React.useState('');
  const fileInputRef = React.useRef<HTMLInputElement>(null);

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
      TextAlign.configure({
        types: ['heading', 'paragraph'],
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) { // Limit to 2MB to keep database payload reasonable
        alert('Ukuran file terlalu besar! Batas maksimal adalah 2MB.');
        return;
      }
      setImageFile(file);
      setImageFileName(file.name);
    }
  };

  const handleInsertImage = () => {
    if (!editor) return;

    if (imageFile) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64 = event.target?.result as string;
        if (base64) {
          editor.chain().focus().setImage({ src: base64 }).run();
          closeImageModal();
        }
      };
      reader.readAsDataURL(imageFile);
    } else if (imageUrl.trim()) {
      editor.chain().focus().setImage({ src: imageUrl.trim() }).run();
      closeImageModal();
    }
  };

  const closeImageModal = () => {
    setShowImageModal(false);
    setImageUrl('');
    setImageFile(null);
    setImageFileName('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

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
        <button
          type="button"
          onClick={() => editor.chain().focus().sinkListItem('listItem').run()}
          disabled={!editor.can().sinkListItem('listItem')}
          className="p-2 rounded-lg hover:bg-zinc-200 text-zinc-600 disabled:opacity-30 transition-colors"
          title="Menjorok Masuk (Indent List)"
        >
          <Indent size={16} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().liftListItem('listItem').run()}
          disabled={!editor.can().liftListItem('listItem')}
          className="p-2 rounded-lg hover:bg-zinc-200 text-zinc-600 disabled:opacity-30 transition-colors"
          title="Menjorok Keluar (Outdent List)"
        >
          <Outdent size={16} />
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
          onClick={() => setShowImageModal(true)}
          className="p-2 rounded-lg hover:bg-zinc-200 text-zinc-600 transition-colors"
          title="Insert Image"
        >
          <ImageIcon size={16} />
        </button>

        <div className="w-px h-6 bg-zinc-200 mx-1" />

        {/* TEXT ALIGNMENT */}
        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
          className={`p-2 rounded-lg hover:bg-zinc-200 transition-colors ${editor.isActive({ textAlign: 'left' }) ? 'bg-zinc-200 text-rose-700 font-bold' : 'text-zinc-600'}`}
          title="Rata Kiri"
        >
          <AlignLeft size={16} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
          className={`p-2 rounded-lg hover:bg-zinc-200 transition-colors ${editor.isActive({ textAlign: 'center' }) ? 'bg-zinc-200 text-rose-700 font-bold' : 'text-zinc-600'}`}
          title="Rata Tengah"
        >
          <AlignCenter size={16} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
          className={`p-2 rounded-lg hover:bg-zinc-200 transition-colors ${editor.isActive({ textAlign: 'right' }) ? 'bg-zinc-200 text-rose-700 font-bold' : 'text-zinc-600'}`}
          title="Rata Kanan"
        >
          <AlignRight size={16} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign('justify').run()}
          className={`p-2 rounded-lg hover:bg-zinc-200 transition-colors ${editor.isActive({ textAlign: 'justify' }) ? 'bg-zinc-200 text-rose-700 font-bold' : 'text-zinc-600'}`}
          title="Rata Kiri-Kanan"
        >
          <AlignJustify size={16} />
        </button>

        <div className="w-px h-6 bg-zinc-200 mx-1" />

        {/* TEXT COLOR */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowColorPicker(!showColorPicker)}
            className={`p-2 rounded-lg hover:bg-zinc-200 transition-colors ${showColorPicker ? 'bg-zinc-200 text-rose-700 font-bold' : 'text-zinc-600'}`}
            title="Warna Teks"
          >
            <Palette size={16} />
          </button>
          {showColorPicker && (
            <div className="absolute top-full left-0 mt-1 bg-white border border-zinc-200 rounded-xl shadow-xl p-2 z-50 grid grid-cols-5 gap-1 min-w-[140px]">
              {TEXT_COLORS.map(c => (
                <button
                  key={c.value}
                  type="button"
                  onClick={() => {
                    editor.chain().focus().setColor(c.value).run();
                    setShowColorPicker(false);
                  }}
                  className="w-6 h-6 rounded-lg border border-zinc-200 hover:scale-125 transition-transform"
                  style={{ backgroundColor: c.value }}
                  title={c.label}
                />
              ))}
              <button
                type="button"
                onClick={() => {
                  editor.chain().focus().unsetColor().run();
                  setShowColorPicker(false);
                }}
                className="col-span-5 text-[10px] font-bold text-zinc-500 hover:text-zinc-800 py-1 mt-1 border-t border-zinc-100"
              >
                Reset Warna
              </button>
            </div>
          )}
        </div>

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
          <div className="flex flex-wrap items-center gap-1 bg-zinc-100 p-1 rounded-lg border border-zinc-200">
            {/* Column Operations */}
            <div className="flex items-center gap-0.5 border-r border-zinc-200 pr-1 mr-1">
              <button
                type="button"
                onClick={() => editor.chain().focus().addColumnBefore().run()}
                className="p-1.5 rounded hover:bg-zinc-200 text-zinc-600 flex items-center"
                title="Tambah Kolom Sebelum"
              >
                <Plus size={10} className="mr-0.5" /><Columns size={12} />
              </button>
              <button
                type="button"
                onClick={() => editor.chain().focus().addColumnAfter().run()}
                className="p-1.5 rounded hover:bg-zinc-200 text-zinc-600 flex items-center"
                title="Tambah Kolom Sesudah"
              >
                <Columns size={12} /><Plus size={10} className="ml-0.5" />
              </button>
              <button
                type="button"
                onClick={() => editor.chain().focus().deleteColumn().run()}
                className="p-1.5 rounded hover:bg-red-50 text-red-500 hover:text-red-700 flex items-center"
                title="Hapus Kolom"
              >
                <Trash2 size={12} className="mr-0.5" /><Columns size={12} />
              </button>
            </div>

            {/* Row Operations */}
            <div className="flex items-center gap-0.5 border-r border-zinc-200 pr-1 mr-1">
              <button
                type="button"
                onClick={() => editor.chain().focus().addRowBefore().run()}
                className="p-1.5 rounded hover:bg-zinc-200 text-zinc-600 flex items-center"
                title="Tambah Baris Sebelum"
              >
                <Plus size={10} className="mr-0.5" /><Rows size={12} />
              </button>
              <button
                type="button"
                onClick={() => editor.chain().focus().addRowAfter().run()}
                className="p-1.5 rounded hover:bg-zinc-200 text-zinc-600 flex items-center"
                title="Tambah Baris Sesudah"
              >
                <Rows size={12} /><Plus size={10} className="ml-0.5" />
              </button>
              <button
                type="button"
                onClick={() => editor.chain().focus().deleteRow().run()}
                className="p-1.5 rounded hover:bg-red-50 text-red-500 hover:text-red-700 flex items-center"
                title="Hapus Baris"
              >
                <Trash2 size={12} className="mr-0.5" /><Rows size={12} />
              </button>
            </div>

            {/* Cell Operations */}
            <div className="flex items-center gap-0.5 border-r border-zinc-200 pr-1 mr-1">
              <button
                type="button"
                onClick={() => editor.chain().focus().mergeCells().run()}
                className="p-1.5 rounded hover:bg-zinc-200 text-zinc-600"
                title="Gabungkan Sel (Merge)"
              >
                <Merge size={12} />
              </button>
              <button
                type="button"
                onClick={() => editor.chain().focus().splitCell().run()}
                className="p-1.5 rounded hover:bg-zinc-200 text-zinc-600"
                title="Pisahkan Sel (Split)"
              >
                <Split size={12} />
              </button>
            </div>

            {/* Table Delete */}
            <button
              type="button"
              onClick={() => editor.chain().focus().deleteTable().run()}
              className="p-1.5 rounded hover:bg-red-100 text-red-600 hover:text-red-800"
              title="Hapus Seluruh Tabel"
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

      {/* IMAGE UPLOAD MODAL */}
      {showImageModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-5 border border-zinc-100">
            <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
              <h3 className="font-black text-zinc-900 text-lg flex items-center gap-2">
                <ImageIcon className="text-rose-700" size={20} />
                Masukkan Gambar
              </h3>
              <button 
                onClick={closeImageModal} 
                className="p-1.5 hover:bg-zinc-100 text-zinc-400 hover:text-zinc-700 rounded-xl transition-all"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-4">
              {/* Option A: Local File Upload */}
              <div className="space-y-2">
                <label className="text-xs font-black text-zinc-400 uppercase tracking-widest block">Upload File Gambar</label>
                <div 
                  onClick={() => fileInputRef.current?.click()} 
                  className={cn(
                    "border-2 border-dashed border-zinc-200 rounded-2xl p-6 text-center cursor-pointer hover:border-rose-300 hover:bg-rose-50/10 transition-all space-y-2",
                    imageFile && "border-emerald-300 bg-emerald-50/10"
                  )}
                >
                  <Plus className={cn("mx-auto text-zinc-400/80", imageFile && "text-emerald-500")} size={24} />
                  {imageFile ? (
                    <div className="text-sm font-semibold text-emerald-800 truncate">{imageFileName}</div>
                  ) : (
                    <div>
                      <div className="text-sm font-bold text-zinc-700">Pilih file gambar lokal</div>
                      <div className="text-[10px] text-zinc-400 mt-1">Format: PNG, JPG, GIF, WebP (Maks. 2MB)</div>
                    </div>
                  )}
                </div>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  accept="image/*" 
                  onChange={handleFileChange} 
                  className="hidden" 
                />
              </div>

              <div className="relative flex py-2 items-center">
                <div className="flex-grow border-t border-zinc-200"></div>
                <span className="flex-shrink mx-4 text-zinc-400 text-xs font-bold uppercase tracking-wider">atau</span>
                <div className="flex-grow border-t border-zinc-200"></div>
              </div>

              {/* Option B: Image URL */}
              <div className="space-y-2">
                <label className="text-xs font-black text-zinc-400 uppercase tracking-widest block">Masukkan Link URL Gambar</label>
                <input 
                  type="url" 
                  value={imageUrl} 
                  onChange={e => {
                    setImageUrl(e.target.value);
                    if (imageFile) {
                      setImageFile(null);
                      setImageFileName('');
                    }
                  }} 
                  placeholder="https://example.com/gambar.jpg" 
                  className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-rose-700/20 focus:bg-white transition-all font-medium" 
                />
              </div>
            </div>

            <div className="flex gap-2.5 pt-2">
              <button 
                onClick={closeImageModal} 
                className="flex-grow py-3 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 font-black rounded-2xl text-sm transition-colors"
              >
                Batal
              </button>
              <button 
                onClick={handleInsertImage} 
                disabled={!imageFile && !imageUrl.trim()}
                className="flex-grow py-3 bg-rose-700 hover:bg-rose-800 text-white font-black rounded-2xl text-sm transition-all shadow-lg shadow-rose-700/10 active:scale-95 disabled:opacity-50"
              >
                Masukkan Gambar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
