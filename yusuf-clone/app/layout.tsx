import type { Metadata } from "next";
import { Jost, Cinzel } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

const jost = Jost({
  subsets: ["latin"],
  variable: "--font-body",
});

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-display",
});

const jostNav = Jost({
  subsets: ["latin"],
  variable: "--font-nav",
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
    <html lang="en" className={`${jost.variable} ${cinzel.variable} ${jostNav.variable}`}>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
