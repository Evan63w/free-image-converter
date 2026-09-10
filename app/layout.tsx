import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.freeimageconverterfree.xyz"),
  title: "Free Online Image Converter | PNG, JPG & WEBP",
  description:
    "Convert images between PNG, JPG, and WEBP formats instantly in your browser. Free, private, and no uploads required.",
  keywords: [
    "free image converter",
    "online image converter",
    "PNG converter",
    "JPG converter",
    "WEBP converter",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Free Online Image Converter",
    description:
      "Convert PNG, JPG, and WEBP images instantly. Free, private, and no uploads.",
    url: "https://www.freeimageconverterfree.xyz",
    siteName: "Free Image Converter",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Free Online Image Converter",
    description:
      "Convert PNG, JPG, and WEBP images instantly in your browser.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {GA_MEASUREMENT_ID && (
          <>
            <Script
              strategy="afterInteractive"
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_MEASUREMENT_ID}', {
                  page_path: window.location.pathname,
                });
              `}
            </Script>
          </>
        )}
        {children}
      </body>
    </html>
  );
}
