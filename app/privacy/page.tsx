import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Privacy Policy | Free Image Converter",
    description: "Read the privacy information for Free Image Converter.",
};

export default function PrivacyPage() {
    return (
        <main className="min-h-screen bg-gradient-to-br from-purple-900 via-black to-blue-900 p-6 text-white">
            <article className="mx-auto max-w-2xl py-16">
                <Link href="/" className="text-sm text-pink-200 hover:text-white">Free Image Converter</Link>
                <h1 className="mt-8 text-4xl font-extrabold">Privacy Policy</h1>
                <h2 className="mt-10 text-2xl font-bold">Your images</h2>
                <p className="mt-3 leading-7 text-zinc-300">Images selected for conversion stay in your browser. They are processed locally and are not uploaded to or stored by this website.</p>
                <h2 className="mt-10 text-2xl font-bold">Analytics</h2>
                <p className="mt-3 leading-7 text-zinc-300">If enabled, Google Analytics may collect standard usage information such as page views and interaction events. This helps improve the tool. No image contents are sent to analytics.</p>
                <h2 className="mt-10 text-2xl font-bold">Contact</h2>
                <p className="mt-3 leading-7 text-zinc-300">For questions about this policy, contact the site owner through the project repository.</p>
            </article>
        </main>
    );
}