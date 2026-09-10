import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Image Converter FAQ",
    description: "Answers about formats, privacy, quality, and browser-based image conversion.",
};

const questions = [
    ["Are my images uploaded?", "No. Conversion happens locally in your browser, so your image files are not sent to a server."],
    ["Which formats are supported?", "You can convert PNG, JPG, and WEBP images between the supported formats."],
    ["Can I convert multiple images?", "Yes. Select or drop multiple images, then download each converted file separately."],
    ["Can I resize an image?", "Yes. Enter an optional width and height before converting. Leave either field empty to use the original dimension."],
];

export default function FAQPage() {
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: questions.map(([question, answer]) => ({
            "@type": "Question",
            name: question,
            acceptedAnswer: { "@type": "Answer", text: answer },
        })),
    };

    return (
        <main className="min-h-screen bg-gradient-to-br from-purple-900 via-black to-blue-900 p-6 text-white">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
            <article className="mx-auto max-w-2xl py-16">
                <Link href="/" className="text-sm text-pink-200 hover:text-white">Free Image Converter</Link>
                <h1 className="mt-8 text-4xl font-extrabold">Image Converter FAQ</h1>
                <div className="mt-8 space-y-8">
                    {questions.map(([question, answer]) => (
                        <section key={question}>
                            <h2 className="text-xl font-bold">{question}</h2>
                            <p className="mt-2 leading-7 text-zinc-300">{answer}</p>
                        </section>
                    ))}
                </div>
            </article>
        </main>
    );
}