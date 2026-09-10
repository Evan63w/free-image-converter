'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { event as analyticsEvent, pageview } from '../gtag';

export type Format = 'png' | 'jpg' | 'webp';

type ImageConverterProps = {
    initialTarget?: Format;
};

type ConvertedFile = {
    name: string;
    url: string;
    size: number;
};

const formats: Format[] = ['png', 'jpg', 'webp'];

const mimeTypes: Record<Format, string> = {
    png: 'image/png',
    jpg: 'image/jpeg',
    webp: 'image/webp',
};

function fileFormat(file: File): string {
    if (file.type === 'image/jpeg') return 'jpg';
    if (file.type === 'image/png') return 'png';
    if (file.type === 'image/webp') return 'webp';
    return 'other';
}

function outputName(name: string, format: Format) {
    return `${name.replace(/\.[^/.]+$/, '')}.${format}`;
}

export default function ImageConverter({ initialTarget = 'png' }: ImageConverterProps) {
    const [files, setFiles] = useState<File[]>([]);
    const [targetType, setTargetType] = useState<Format>(initialTarget);
    const [isConverting, setIsConverting] = useState(false);
    const [convertedFiles, setConvertedFiles] = useState<ConvertedFile[]>([]);
    const [quality, setQuality] = useState(90);
    const [width, setWidth] = useState('');
    const [height, setHeight] = useState('');
    const [isDragging, setIsDragging] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        pageview(window.location.pathname);
    }, []);

    useEffect(() => {
        return () => convertedFiles.forEach(({ url }) => URL.revokeObjectURL(url));
    }, [convertedFiles]);

    const addFiles = (selectedFiles: FileList | File[]) => {
        const imageFiles = Array.from(selectedFiles).filter((file) => file.type.startsWith('image/'));
        if (!imageFiles.length) return;

        analyticsEvent({
            action: 'image_uploaded',
            category: 'engagement',
            value: Math.round(imageFiles.reduce((total, file) => total + file.size, 0) / 1024),
            parameters: {
                file_count: imageFiles.length,
                source_format: imageFiles.length === 1 ? fileFormat(imageFiles[0]) : 'mixed',
            },
        });
        setFiles(imageFiles);
        setConvertedFiles([]);
    };

    const convertFile = (file: File) => new Promise<ConvertedFile>((resolve, reject) => {
        const image = new Image();
        const sourceUrl = URL.createObjectURL(file);

        image.onload = () => {
            const sourceWidth = image.width;
            const sourceHeight = image.height;
            const requestedWidth = Number(width) || sourceWidth;
            const requestedHeight = Number(height) || sourceHeight;
            const canvas = document.createElement('canvas');
            canvas.width = requestedWidth;
            canvas.height = requestedHeight;
            canvas.getContext('2d')?.drawImage(image, 0, 0, requestedWidth, requestedHeight);
            URL.revokeObjectURL(sourceUrl);

            canvas.toBlob((blob) => {
                if (!blob) {
                    reject(new Error('Conversion failed'));
                    return;
                }
                resolve({
                    name: outputName(file.name, targetType),
                    url: URL.createObjectURL(blob),
                    size: blob.size,
                });
            }, mimeTypes[targetType], targetType === 'png' ? undefined : quality / 100);
        };

        image.onerror = () => {
            URL.revokeObjectURL(sourceUrl);
            reject(new Error('Image could not be read'));
        };
        image.src = sourceUrl;
    });

    const convertImages = async () => {
        if (!files.length) return;
        setIsConverting(true);
        setConvertedFiles([]);
        analyticsEvent({
            action: 'image_conversion_started',
            category: 'conversion',
            label: targetType,
            value: files.length,
            parameters: {
                file_count: files.length,
                source_format: files.length === 1 ? fileFormat(files[0]) : 'mixed',
                target_format: targetType,
                resize_enabled: Boolean(width || height),
                quality: targetType === 'png' ? 100 : quality,
            },
        });

        if (files.length > 1) {
            analyticsEvent({
                action: 'batch_conversion_used',
                category: 'conversion',
                parameters: { file_count: files.length, target_format: targetType },
            });
        }

        if (width || height) {
            analyticsEvent({
                action: 'resize_used',
                category: 'conversion',
                parameters: {
                    width: Number(width) || 0,
                    height: Number(height) || 0,
                },
            });
        }

        if (targetType !== 'png' && quality !== 90) {
            analyticsEvent({
                action: 'quality_adjusted',
                category: 'conversion',
                parameters: { quality, target_format: targetType },
            });
        }

        try {
            const results = await Promise.all(files.map(convertFile));
            setConvertedFiles(results);
            analyticsEvent({
                action: 'image_conversion_completed',
                category: 'conversion',
                label: targetType,
                value: results.reduce((total, result) => total + result.size, 0),
                parameters: {
                    file_count: results.length,
                    target_format: targetType,
                },
            });
        } catch {
            analyticsEvent({
                action: 'image_conversion_failed',
                category: 'conversion',
                label: targetType,
                parameters: { file_count: files.length, target_format: targetType },
            });
        } finally {
            setIsConverting(false);
        }
    };

    return (
        <div className="w-full">
            <div
                onClick={() => inputRef.current?.click()}
                onDragOver={(event) => {
                    event.preventDefault();
                    setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={(event) => {
                    event.preventDefault();
                    setIsDragging(false);
                    addFiles(event.dataTransfer.files);
                }}
                className={`cursor-pointer border border-white/20 bg-white/10 backdrop-blur-lg rounded-3xl p-10 text-center shadow-2xl transition ${isDragging ? 'border-pink-300 bg-white/20' : 'hover:scale-[1.01]'}`}
            >
                <input
                    ref={inputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    hidden
                    onChange={(event) => {
                        if (event.target.files) addFiles(event.target.files);
                        event.target.value = '';
                    }}
                />
                <div className="text-5xl mb-4">{files.length ? '✅' : '📁'}</div>
                <p className="text-lg font-semibold">
                    {files.length ? `${files.length} image${files.length === 1 ? '' : 's'} ready` : 'Drop images here or click to browse'}
                </p>
                <p className="text-zinc-300 text-sm mt-2">PNG, JPG, and WEBP supported. Files stay in your browser.</p>
            </div>

            {files.length > 0 && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-8 bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-6">
                    <div className="grid gap-5 md:grid-cols-2">
                        <label className="text-sm text-zinc-300">
                            Convert to
                            <select value={targetType} onChange={(event) => {
                                const nextTarget = event.target.value as Format;
                                setTargetType(nextTarget);
                                analyticsEvent({
                                    action: 'format_selected',
                                    category: 'conversion',
                                    label: nextTarget,
                                    parameters: { target_format: nextTarget },
                                });
                            }} className="mt-2 w-full rounded-xl bg-white px-4 py-3 text-black">
                                {formats.map((format) => <option key={format} value={format}>{format.toUpperCase()}</option>)}
                            </select>
                        </label>
                        <label className="text-sm text-zinc-300">
                            Quality: {quality}%
                            <input type="range" min="10" max="100" value={quality} onChange={(event) => setQuality(Number(event.target.value))} disabled={targetType === 'png'} className="mt-4 w-full" />
                        </label>
                        <label className="text-sm text-zinc-300">
                            Width (optional)
                            <input type="number" min="1" value={width} onChange={(event) => setWidth(event.target.value)} placeholder="Original width" className="mt-2 w-full rounded-xl bg-white px-4 py-3 text-black" />
                        </label>
                        <label className="text-sm text-zinc-300">
                            Height (optional)
                            <input type="number" min="1" value={height} onChange={(event) => setHeight(event.target.value)} placeholder="Original height" className="mt-2 w-full rounded-xl bg-white px-4 py-3 text-black" />
                        </label>
                    </div>
                    <button onClick={convertImages} disabled={isConverting} className="mt-6 w-full rounded-2xl bg-gradient-to-r from-pink-500 to-purple-500 px-6 py-3 font-bold shadow-lg transition hover:opacity-90 disabled:opacity-50">
                        {isConverting ? 'Converting...' : `Convert ${files.length} image${files.length === 1 ? '' : 's'}`}
                    </button>
                </motion.div>
            )}

            {convertedFiles.length > 0 && (
                <div className="mt-8 space-y-3">
                    {convertedFiles.map((file) => (
                        <a key={file.url} href={file.url} download={file.name} onClick={() => analyticsEvent({ action: 'image_downloaded', category: 'conversion', label: targetType, parameters: { target_format: targetType, file_count: convertedFiles.length } })} className="flex items-center justify-between rounded-2xl bg-green-400 px-5 py-4 font-bold text-black shadow-lg transition hover:scale-[1.01]">
                            <span className="truncate pr-4">{file.name}</span>
                            <span>Download</span>
                        </a>
                    ))}
                </div>
            )}
        </div>
    );
}