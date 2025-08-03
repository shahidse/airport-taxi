import BookingConfirmation from '@/components/booking/BookingConfirmation';

export default function QuoteConfirmationPage({ params }: { params: { id: string } }) {
    return <BookingConfirmation id={params.id} />;
}