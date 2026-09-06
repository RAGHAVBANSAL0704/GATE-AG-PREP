import React, { useState, useRef } from 'react';
import { UploadCloud, Image as ImageIcon, X, ZoomIn, Link as LinkIcon, AlertCircle, CheckCircle2, RefreshCw } from 'lucide-react';
import { processAndOptimizeImageFile } from '../services/questionSyncService';

/**
 * QuestionImageUploader
 * Allows administrators to upload question diagrams directly from local device storage,
 * with automatic image downscaling and optimization, live thumbnail preview, and lightbox view.
 */
export default function QuestionImageUploader({
  imageUrl = '',
  onChange,
  onClear,
  label = 'Question Diagram / Figure'
}) {
  const [activeMode, setActiveMode] = useState('upload'); // 'upload' | 'url'
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [uploadMetadata, setUploadMetadata] = useState(null);
  const [showLightbox, setShowLightbox] = useState(false);
  const fileInputRef = useRef(null);

  const handleFile = async (file) => {
    if (!file) return;
    setErrorMsg('');
    setIsProcessing(true);

    try {
      const result = await processAndOptimizeImageFile(file);
      setUploadMetadata({
        name: result.name,
        originalSizeKb: Math.round(result.originalSize / 1024),
        optimizedSizeKb: Math.round(result.optimizedSize / 1024),
        dimensions: result.width ? `${result.width} × ${result.height}px` : 'Vector SVG'
      });
      if (typeof onChange === 'function') {
        onChange(result.dataUrl);
      }
    } catch (err) {
      console.error('Image processing failed:', err);
      setErrorMsg(err.message || 'Failed to process selected image');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer?.files?.[0];
    if (file) handleFile(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleClear = () => {
    setUploadMetadata(null);
    setErrorMsg('');
    if (fileInputRef.current) fileInputRef.current.value = '';
    if (typeof onClear === 'function') {
      onClear();
    } else if (typeof onChange === 'function') {
      onChange('');
    }
  };

  return (
    <div className="space-y-3 p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800">
      
      {/* Header Bar & Mode Selector */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <label className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
          <ImageIcon className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          <span>{label}</span>
        </label>

        <div className="flex items-center gap-1 bg-white dark:bg-slate-900 p-0.5 rounded-xl border border-slate-200 dark:border-slate-800 text-[11px] font-bold">
          <button
            type="button"
            onClick={() => setActiveMode('upload')}
            className={`px-2.5 py-1 rounded-lg transition cursor-pointer flex items-center gap-1 ${
              activeMode === 'upload'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <UploadCloud className="w-3.5 h-3.5" />
            <span>Upload from Storage</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveMode('url')}
            className={`px-2.5 py-1 rounded-lg transition cursor-pointer flex items-center gap-1 ${
              activeMode === 'url'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <LinkIcon className="w-3.5 h-3.5" />
            <span>Image URL / Path</span>
          </button>
        </div>
      </div>

      {/* Mode 1: Direct File Upload from Device Storage */}
      {activeMode === 'upload' ? (
        <div className="space-y-2">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/png, image/jpeg, image/webp, image/svg+xml, image/gif"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFile(file);
            }}
            className="hidden"
          />

          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-2xl p-4 text-center cursor-pointer transition flex flex-col items-center justify-center gap-2 ${
              isDragging
                ? 'border-blue-500 bg-blue-50/70 dark:bg-blue-950/40 text-blue-600'
                : 'border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 hover:border-blue-400 hover:bg-slate-50 dark:hover:bg-slate-850'
            }`}
          >
            {isProcessing ? (
              <div className="py-2 flex items-center gap-2 text-xs font-bold text-blue-600 dark:text-blue-400">
                <RefreshCw className="w-5 h-5 animate-spin" />
                <span>Optimizing & preparing diagram...</span>
              </div>
            ) : (
              <>
                <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center border border-blue-200 dark:border-blue-900">
                  <UploadCloud className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-800 dark:text-slate-200">
                    <span className="text-blue-600 dark:text-blue-400 underline">Click to choose image</span> or drag & drop here
                  </p>
                  <p className="text-[10px] text-slate-400 mt-0.5">
                    Supports PNG, JPG, WebP, SVG diagrams (automatically optimized for fast load)
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      ) : (
        /* Mode 2: Direct URL / Local Path Input */
        <div className="space-y-1.5">
          <input
            type="text"
            value={imageUrl || ''}
            onChange={(e) => onChange && onChange(e.target.value)}
            placeholder="e.g. /docx_images/gate_2021_q07.png or https://..."
            className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-3.5 py-2 text-xs font-mono text-slate-900 dark:text-slate-100 outline-none focus:ring-2 focus:ring-blue-500/40"
          />
          <p className="text-[10px] text-slate-400">
            Enter direct image path or web URL for external hosted diagrams.
          </p>
        </div>
      )}

      {/* Error Message */}
      {errorMsg && (
        <div className="p-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Uploaded Image Card & Details */}
      {imageUrl && (
        <div className="p-3 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4 shadow-xs">
          <div className="flex items-center gap-3">
            <div
              onClick={() => setShowLightbox(true)}
              className="relative w-20 h-16 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 overflow-hidden cursor-pointer group flex items-center justify-center p-1"
              title="Click to zoom / view full diagram"
            >
              <img
                src={imageUrl}
                alt="Uploaded Diagram"
                className="max-h-full max-w-full object-contain rounded transition group-hover:scale-105"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-white">
                <ZoomIn className="w-4 h-4" />
              </div>
            </div>

            <div className="text-xs space-y-0.5">
              <div className="flex items-center gap-1.5 font-bold text-slate-900 dark:text-white">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                <span>Diagram Active</span>
              </div>
              {uploadMetadata ? (
                <div className="text-[11px] text-slate-500 font-mono space-y-0.2">
                  <p className="truncate max-w-[200px] sm:max-w-xs">{uploadMetadata.name}</p>
                  <p className="text-[10px] text-slate-400">
                    {uploadMetadata.dimensions} • {uploadMetadata.optimizedSizeKb} KB
                  </p>
                </div>
              ) : (
                <p className="text-[10px] text-slate-400 font-mono truncate max-w-[200px] sm:max-w-xs">
                  {imageUrl.startsWith('data:') ? 'Base64 Local Image' : imageUrl}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setShowLightbox(true)}
              className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 text-xs font-bold transition flex items-center gap-1 cursor-pointer"
            >
              <ZoomIn className="w-3.5 h-3.5" />
              <span>Zoom</span>
            </button>

            <button
              type="button"
              onClick={handleClear}
              className="px-3 py-1.5 rounded-xl bg-rose-50 dark:bg-rose-950/60 hover:bg-rose-100 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-900 text-xs font-bold transition flex items-center gap-1 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
              <span>Remove</span>
            </button>
          </div>
        </div>
      )}

      {/* Lightbox Modal */}
      {showLightbox && imageUrl && (
        <div
          onClick={() => setShowLightbox(false)}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-150"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-4 max-w-4xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl"
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-900 dark:text-white">
              <span className="flex items-center gap-1.5">
                <ImageIcon className="w-4 h-4 text-blue-500" />
                <span>Full Diagram Inspection</span>
              </span>
              <button
                type="button"
                onClick={() => setShowLightbox(false)}
                className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-auto p-4 flex items-center justify-center bg-slate-50 dark:bg-slate-950/70 rounded-2xl mt-3">
              <img
                src={imageUrl}
                alt="Full Diagram Preview"
                className="max-h-[70vh] max-w-full object-contain rounded-lg"
              />
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
