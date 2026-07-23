import type { Metadata } from "next";
import { Cinzel, Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://tophillview.com"),
  title: "TOPHILLVIEW Luxury Apartments | Kubwa, Abuja",
  description:
    "Experience the epitome of luxury living at TOPHILLVIEW LUXURY APARTMENTS in Kubwa, Abuja. Standard gym, free WiFi, 24/7 power supply, sophisticated bars and more.",
  openGraph: {
    title: "TOPHILLVIEW Luxury Apartments | Kubwa, Abuja",
    description:
      "Experience the epitome of luxury living at TOPHILLVIEW LUXURY APARTMENTS in Kubwa, Abuja.",
    images: ["/images/hero-bg.jpg"],
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
      className={`${cinzel.variable} ${cormorant.variable} ${inter.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}