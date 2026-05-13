import type { Metadata } from "next";
import { Inter, Cinzel } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-display",
});

export const metadata: Metadata = {
  title: "NURA India | Official Online Store",
  description: "NURA is a luxury perfume brand offering custom perfumes, personalized fragrances & niche scents.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${cinzel.variable}`}>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
