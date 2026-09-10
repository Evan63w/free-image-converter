import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ImageConverter from "../../components/ImageConverter";
import { converterPages, getConverterPage } from "../../converterPages";

type Props = {
    params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
    return converterPages.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const page = getConverterPage(slug);
    if (!page) return {};

    return {
        title: `${page.title} | Free Image Converter`,
        description: page.description,
        alternates: { canonical: `/convert/${page.slug}` },
        openGraph: {
            title: page.title,
            description: page.description,
            url: `https://www.freeimageconverterfree.xyz/convert/${page.slug}`,
            type: "website",
        },
    };
}

export default async function ConverterPage({ params }: Props) {
    const { slug } = await params;
    const page = getConverterPage(slug);
    if (!page) notFound();

    return (
        <main className="min-h-screen bg-gradient-to-br from-purple-900 via-black to-blue-900 p-6 text-white">
            <div className="mx-auto max-w-3xl py-12">
                <Link href="/" className="text-sm text-pink-200 hover:text-white">Free Image Converter</Link>
                <h1 className="mt-8 text-center text-4xl font-extrabold md:text-5xl">{page.title}</h1>
                <p className="mx-auto mt-4 max-w-2xl text-center text-zinc-300">{page.intro}</p>
                <div className="mt-10"><ImageConverter initialTarget={page.target} /></div>
                <section className="mx-auto mt-14 max-w-2xl rounded-3xl border border-white/10 bg-white/5 p-7">
                    <h2 className="text-2xl font-bold">Private {page.source} conversion</h2>
                    <p className="mt-3 leading-7 text-zinc-300">This converter runs locally in your browser using the Canvas API. Images are not uploaded or stored, and you can convert multiple files, resize them, and adjust quality before downloading.</p>
                </section>
            </div>
        </main>
    );
}