// app/quotes/page.tsx
import QuoteList from "@/components/booking/QuoteList";

const mockQuotes = [
    {
        id: "1",
        name: "Alice",
        phone: "123-456-7890",
        pickupLocation: "Heathrow Airport",
        dropoffLocation: "Oxford Street",
        date: "2025-06-13",
        status: "pending",
    },
    {
        id: "2",
        name: "Bob",
        phone: "555-111-2222",
        pickupLocation: "Gatwick",
        dropoffLocation: "London Bridge",
        date: "2025-06-14",
        status: "approved",
    },
    {
        id: "1",
        name: "Alice",
        phone: "123-456-7890",
        pickupLocation: "Heathrow Airport",
        dropoffLocation: "Oxford Street",
        date: "2025-06-13",
        status: "pending",
    },
    {
        id: "2",
        name: "Bob",
        phone: "555-111-2222",
        pickupLocation: "Gatwick",
        dropoffLocation: "London Bridge",
        date: "2025-06-14",
        status: "approved",
    },
    {
        id: "1",
        name: "Alice",
        phone: "123-456-7890",
        pickupLocation: "Heathrow Airport",
        dropoffLocation: "Oxford Street",
        date: "2025-06-13",
        status: "pending",
    },
    {
        id: "2",
        name: "Bob",
        phone: "555-111-2222",
        pickupLocation: "Gatwick",
        dropoffLocation: "London Bridge",
        date: "2025-06-14",
        status: "approved",
    },
    {
        id: "1",
        name: "Alice",
        phone: "123-456-7890",
        pickupLocation: "Heathrow Airport",
        dropoffLocation: "Oxford Street",
        date: "2025-06-13",
        status: "pending",
    },
    {
        id: "2",
        name: "Bob",
        phone: "555-111-2222",
        pickupLocation: "Gatwick",
        dropoffLocation: "London Bridge",
        date: "2025-06-14",
        status: "approved",
    },
    // Add more mock quotes as needed
];

export default function QuotePage() {
    return (
        <section className="pt-6 max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold text-accent mb-6">Your Quotes</h1>
            <QuoteList quotes={mockQuotes} />
        </section>
    );
}
