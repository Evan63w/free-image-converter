import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "About Free Image Converter",
    description: "Learn why Free Image Converter converts images privately in your browser.",
};

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-gradient-to-br from-purple-900 via-black to-blue-900 p-6 text-white">
            <article className="mx-auto max-w-2xl py-16">
                <Link href="/" className="text-sm text-pink-200 hover:text-white">Free Image Converter</Link>
                <h1 className="mt-8 text-4xl font-extrabold">About Free Image Converter</h1>
                <p className="mt-6 text-lg leading-8 text-zinc-300">Free Image Converter is a simple browser-based tool for converting PNG, JPG, and WEBP images without uploading personal files to a server.</p>
                <h2 className="mt-10 text-2xl font-bold">Built for privacy</h2>
                <p className="mt-3 leading-7 text-zinc-300">Your image is processed on your device. The tool needs no account, installation, or file transfer, making it useful for quick conversions on desktop and mobile.</p>
            </article>
        </main>
    );
}