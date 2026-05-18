'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

const ALL_FORMATS = ['png', 'jpg', 'webp'];

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [targetType, setTargetType] = useState('png');
  const [isConverting, setIsConverting] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState('');

  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const inputRef = useRef<HTMLInputElement>(null);

  // close dropdown if clicking outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!dropdownRef.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, []);

  const handleFile = (selected: File) => {
    setFile(selected);
    setDownloadUrl('');
    setTargetType('png');
  };

  const convertImage = async () => {
    if (!file || !targetType) return;

    setIsConverting(true);

    const image = new Image();
    image.src = URL.createObjectURL(file);

    image.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      canvas.width = image.width;
      canvas.height = image.height;

      ctx?.drawImage(image, 0, 0);

      setTimeout(() => {
        const mimeType = `image/${targetType}`;

        canvas.toBlob((blob) => {
          if (!blob) return;

          const url = URL.createObjectURL(blob);
          setDownloadUrl(url);
          setIsConverting(false);
        }, mimeType);
      }, 800);
    };
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-purple-900 via-black to-blue-900 text-white">
      <div className="w-full max-w-2xl">

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-extrabold text-center mb-3 bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 text-transparent bg-clip-text"
        >
          Image Converter
        </motion.h1>

        <p className="text-center text-zinc-300 mb-10">
          Fast in-browser conversion ✨ No uploads
        </p>

        {/* Upload */}
        <div
          onClick={() => inputRef.current?.click()}
          className="cursor-pointer border border-white/20 bg-white/10 backdrop-blur-lg rounded-3xl p-12 text-center shadow-2xl hover:scale-[1.02] transition"
        >
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            hidden
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) handleFile(f);
            }}
          />

          {!file ? (
            <>
              <div className="text-6xl mb-4">📁</div>
              <p className="text-lg font-semibold">Click to upload image</p>
              <p className="text-zinc-300 text-sm mt-2">
                PNG, JPG, WEBP supported
              </p>
            </>
          ) : (
            <>
              <div className="text-5xl mb-3">✅</div>
              <p className="font-semibold">{file.name}</p>
              <p className="text-sm text-zinc-300 mt-1">Ready to convert</p>
            </>
          )}
        </div>

        {/* Controls */}
        {file && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-6 flex flex-col md:flex-row items-center justify-between gap-6"
          >

            {/* CUSTOM DROPDOWN */}
            <div ref={dropdownRef} className="relative w-full md:w-48">
              <p className="text-sm text-zinc-300 mb-2">Convert to:</p>

              <button
                onClick={() => setOpen(!open)}
                className="
                  w-full flex justify-between items-center
                  bg-white text-black px-4 py-3 rounded-xl
                  shadow-md hover:shadow-lg transition
                "
              >
                <span>{targetType.toUpperCase()}</span>
                <span className="text-sm">▼</span>
              </button>

              {open && (
                <div className="
                  absolute mt-2 w-full
                  bg-white text-black
                  rounded-xl shadow-xl
                  overflow-hidden z-50
                ">
                  {ALL_FORMATS.map((fmt) => (
                    <div
                      key={fmt}
                      onClick={() => {
                        setTargetType(fmt);
                        setOpen(false);
                      }}
                      className="
                        px-4 py-3 hover:bg-gray-100 cursor-pointer
                      "
                    >
                      {fmt.toUpperCase()}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Convert Button */}
            <button
              onClick={convertImage}
              disabled={isConverting}
              className="
                px-6 py-3 rounded-2xl font-bold
                bg-gradient-to-r from-pink-500 to-purple-500
                hover:opacity-90 transition shadow-lg
                w-full md:w-auto
              "
            >
              Convert 🚀
            </button>

          </motion.div>
        )}

        {/* Loading */}
        {isConverting && (
          <div className="mt-8 text-center">
            <div className="animate-spin text-4xl mb-3">⚙️</div>
            <p className="text-zinc-300">Converting image...</p>
          </div>
        )}

        {/* Download */}
        {downloadUrl && (
          <div className="mt-8 text-center">
            <a
              href={downloadUrl}
              download={`converted.${targetType}`}
              className="inline-block px-6 py-3 rounded-2xl bg-green-400 text-black font-bold shadow-lg hover:scale-105 transition"
            >
              Download File ⬇️
            </a>
          </div>
        )}

      </div>
    </main>
  );
}