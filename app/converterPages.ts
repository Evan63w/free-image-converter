import type { Format } from "./components/ImageConverter";

export type ConverterPage = {
    slug: string;
    source: string;
    target: Format;
    title: string;
    description: string;
    intro: string;
};

export const converterPages: ConverterPage[] = [
    {
        slug: "png-to-jpg",
        source: "PNG",
        target: "jpg",
        title: "PNG to JPG Converter",
        description: "Convert PNG images to JPG format online for free. Your files stay in your browser and are never uploaded.",
        intro: "Turn PNG screenshots, graphics, and photos into smaller JPG files without sending them to a server.",
    },
    {
        slug: "jpg-to-png",
        source: "JPG",
        target: "png",
        title: "JPG to PNG Converter",
        description: "Convert JPG images to PNG format online for free. Fast, private, and entirely in your browser.",
        intro: "Convert JPG photos to PNG files locally, with optional resizing and no account required.",
    },
    {
        slug: "webp-to-png",
        source: "WEBP",
        target: "png",
        title: "WEBP to PNG Converter",
        description: "Convert WEBP images to PNG format online for free. No uploads, no signup, and no software installation.",
        intro: "Make WEBP images easier to edit and share by converting them to widely supported PNG files.",
    },
    {
        slug: "webp-to-jpg",
        source: "WEBP",
        target: "jpg",
        title: "WEBP to JPG Converter",
        description: "Convert WEBP images to JPG format online for free. Private browser-based conversion with adjustable quality.",
        intro: "Convert WEBP images into compact JPG files for websites, documents, and photo sharing.",
    },
];

export function getConverterPage(slug: string) {
    return converterPages.find((page) => page.slug === slug);
}