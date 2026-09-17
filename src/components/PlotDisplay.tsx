import React from 'react';
import { Download, Image as ImageIcon, ExternalLink } from 'lucide-react';

interface PlotDisplayProps {
  images: string[];
  className?: string;
}

export const PlotDisplay: React.FC<PlotDisplayProps> = ({ images, className = '' }) => {
  if (!images || images.length === 0) return null;

  const handleDownload = (imgUrl: string, index: number) => {
    const link = document.createElement('a');
    link.href = imgUrl;
    link.download = `matplotlib_plot_${index + 1}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleOpenNewTab = (imgUrl: string) => {
    const win = window.open();
    if (win) {
      win.document.write(`<img src="${imgUrl}" style="max-width:100%; height:auto;" />`);
    }
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {images.map((imgUrl, idx) => (
        <div 
          key={idx} 
          className="bg-white border-2 border-zinc-200 rounded-2xl p-4 shadow-sm overflow-hidden transition-all hover:shadow-md"
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between border-b border-zinc-100 pb-3 mb-3">
            <div className="flex items-center gap-2 text-zinc-700 font-bold text-xs">
              <ImageIcon className="w-4 h-4 text-rose-700" />
              <span>Hasil Grafik Matplotlib {images.length > 1 ? `#${idx + 1}` : ''}</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleOpenNewTab(imgUrl)}
                className="flex items-center gap-1 text-[11px] font-bold text-zinc-500 hover:text-zinc-800 bg-zinc-100 hover:bg-zinc-200 px-2.5 py-1 rounded-lg transition-colors"
                title="Buka Gambar di Tab Baru"
              >
                <ExternalLink className="w-3 h-3" />
                <span>Buka</span>
              </button>
              <button
                onClick={() => handleDownload(imgUrl, idx)}
                className="flex items-center gap-1 text-[11px] font-bold text-white bg-rose-700 hover:bg-rose-800 px-2.5 py-1 rounded-lg transition-colors shadow-sm"
                title="Unduh PNG"
              >
                <Download className="w-3 h-3" />
                <span>Unduh PNG</span>
              </button>
            </div>
          </div>

          {/* Plot Image */}
          <div className="flex justify-center bg-zinc-50 rounded-xl p-2 border border-zinc-100 overflow-x-auto">
            <img 
              src={imgUrl} 
              alt={`Hasil Grafik Matplotlib ${idx + 1}`}
              className="max-w-full h-auto rounded-lg object-contain max-h-[450px]"
            />
          </div>
        </div>
      ))}
    </div>
  );
};
