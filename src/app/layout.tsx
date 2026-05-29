import type { Metadata } from "next";
import { Cormorant_Garamond, Great_Vibes, Allura } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
});

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-great-vibes",
});

const allura = Allura({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-allura",
});

export const metadata: Metadata = {
  title: "The Royal Union | An Immersive Cinematic Invitation",
  description: "An interactive royal romantic wedding invitation experience, detailing the union of two hearts.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${greatVibes.variable} ${allura.variable} h-full antialiased`}
    >
      <body className="bg-royal-dark text-stone-100 min-h-full flex flex-col font-serif overflow-x-hidden selection:bg-royal-gold selection:text-royal-dark">
        {children}
      </body>
    </html>
  );
}
