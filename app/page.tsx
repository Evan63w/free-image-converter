import ImageConverter from './components/ImageConverter';
import Link from 'next/link';

export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Free Online Image Converter",
    url: "https://www.freeimageconverterfree.xyz/",
    applicationCategory: "MultimediaApplication",
    operatingSystem: "Any",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    featureList: "PNG, JPG, and WEBP conversion; batch conversion; resizing; quality control",
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-purple-900 via-black to-blue-900 text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <div className="w-full max-w-2xl">

        <h1 className="text-5xl font-extrabold text-center mb-3 bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 text-transparent bg-clip-text">
          Free Online Image Converter
        </h1>

        <p className="text-center text-zinc-300 mb-10">
          Convert PNG, JPG, and WEBP images instantly. Free, private, and no uploads.
        </p>

        <ImageConverter />

        <nav aria-label="Helpful pages" className="mt-12 flex flex-wrap justify-center gap-x-5 gap-y-3 text-sm text-pink-200">
          <Link href="/convert/png-to-jpg" className="hover:text-white">PNG to JPG</Link>
          <Link href="/convert/jpg-to-png" className="hover:text-white">JPG to PNG</Link>
          <Link href="/convert/webp-to-png" className="hover:text-white">WEBP to PNG</Link>
          <Link href="/convert/webp-to-jpg" className="hover:text-white">WEBP to JPG</Link>
          <Link href="/faq" className="hover:text-white">FAQ</Link>
          <Link href="/how-it-works" className="hover:text-white">How it works</Link>
          <Link href="/privacy" className="hover:text-white">Privacy</Link>
        </nav>
      </div>
    </main>
  );
}