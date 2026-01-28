import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Nanobanana - AI Creative Platform",
  description:
    "Transform your ideas into stunning visual artworks with AI-powered Nanobanana.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} bg-white text-nano-text font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
