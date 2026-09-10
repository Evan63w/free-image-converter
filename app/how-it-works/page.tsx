import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "How Image Conversion Works",
    description: "Learn how Free Image Converter converts images privately in your browser.",
};

export default function HowItWorksPage() {
    return (
        <main className="min-h-screen bg-gradient-to-br from-purple-900 via-black to-blue-900 p-6 text-white">
            <article className="mx-auto max-w-2xl py-16">
                <Link href="/" className="text-sm text-pink-200 hover:text-white">Free Image Converter</Link>
                <h1 className="mt-8 text-4xl font-extrabold">How image conversion works</h1>
                <ol className="mt-8 space-y-6 text-zinc-300">
                    <li><strong className="text-white">1. Choose your images.</strong> Drop one or more PNG, JPG, or WEBP files into the converter.</li>
                    <li><strong className="text-white">2. Select output settings.</strong> Choose a format, optional dimensions, and quality level.</li>
                    <li><strong className="text-white">3. Convert and download.</strong> Your browser processes each image locally, then provides a download link.</li>
                </ol>
            </article>
        </main>
    );
}