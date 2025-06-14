import BookingConfirmation from '@/components/booking/BookingConfirmation';

export default function QuoteConfirmationPage() {
    const booking = {
        pickup: 'Heathrow Airport',
        dropoff: 'London City Center',
        date: '2025-06-15',
        time: '10:30 AM',
        vehicleType: 'Executive',
        estimatedFare: '£55.00',
    };

    return <BookingConfirmation booking={booking} />;
}