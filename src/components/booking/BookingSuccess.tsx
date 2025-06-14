'use client';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useRouter } from 'next/navigation';

export default function BookingSuccess() {
    const router = useRouter();

    return (
        <div className="max-w-xl mx-auto px-4 py-20 text-center bg-white shadow-md rounded-2xl">
            <CheckCircleIcon className="text-green-500 text-6xl mb-4" />
            <h2 className="text-4xl font-bold text-accent mb-3">Booking Confirmed!</h2>
            <p className="text-muted-foreground text-lg mb-6">
                Thank you for booking your ride. A confirmation email has been sent to your inbox.
            </p>
            <button
                onClick={() => router.push('/')}
                className="bg-primary hover:bg-accent/90 text-white px-6 py-3 rounded-xl transition"
            >
                Back to Homepage
            </button>
        </div>
    );
}
