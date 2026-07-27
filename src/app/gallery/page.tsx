import GalleryPage from "@/components/GalleryPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gallery | TOPHILLVIEW Luxury Apartments",
  description:
    "Browse our gallery of luxury apartments in Kubwa, Abuja. View photos and videos of our premium residences, amenities, and spaces.",
  openGraph: {
    title: "Gallery | TOPHILLVIEW Luxury Apartments",
    description:
      "Browse our gallery of luxury apartments in Kubwa, Abuja.",
    images: ["/images/gallery-1.webp"],
  },
};

export default function Page() {
  return <GalleryPage />;
}
