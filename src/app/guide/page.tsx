import BookingGuide from '@/components/BookingGuide';

export const metadata = {
    title: 'How to Quote & Book - AirportTaxi',
    description: 'Step-by-step guide to getting quotes and booking rides with AirportTaxi. Understand the full process in a few easy steps.',
};

export default function GuidePage() {
    return (
        <main className="pt-16">
            <BookingGuide />
        </main>
    );
}
