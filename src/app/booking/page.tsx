import BookingWizard from "@/components/BookingWizard";

export const metadata = {
  title: "Book Your Stay | TOPHILLVIEW Luxury Apartments",
  description: "Reserve your apartment at TOPHILLVIEW LUXURY APARTMENTS in Kubwa, Abuja.",
};

export default function BookingPage() {
  return (
    <div className="pt-24">
      <BookingWizard />
    </div>
  );
}
