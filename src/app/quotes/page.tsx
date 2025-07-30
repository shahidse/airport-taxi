// app/quotes/page.tsx
import QuoteList from "@/components/booking/QuoteList";


export default function QuotePage() {
    return (
        <section className="pt-6 max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold text-accent mb-6">Your Quotes</h1>
            <QuoteList />
        </section>
    );
}
