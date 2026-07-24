import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

export const metadata: Metadata = {
  metadataBase: new URL("https://tophillview.com"),
  title: "TOPHILLVIEW Luxury Apartments | Kubwa, Abuja",
  description:
    "Experience the epitome of luxury living at TOPHILLVIEW LUXURY APARTMENTS in Kubwa, Abuja. Standard gym, free WiFi, 24/7 power supply, sophisticated bars and more.",
  openGraph: {
    title: "TOPHILLVIEW Luxury Apartments | Kubwa, Abuja",
    description:
      "Experience the epitome of luxury living at TOPHILLVIEW LUXURY APARTMENTS in Kubwa, Abuja.",
    images: ["/images/hero-fallback.webp"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <FloatingWhatsApp />
      </body>
    </html>
  );
}