'use client';

import { FC } from 'react';
import { useRouter } from 'next/navigation';
import LocalTaxiIcon from '@mui/icons-material/LocalTaxi';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DriveEtaIcon from '@mui/icons-material/DriveEta';

type BookingDetails = {
    pickup: string;
    dropoff: string;
    date: string;
    time: string;
    vehicleType: string;
    estimatedFare: string;
};

type Props = {
    booking: BookingDetails;
};

const BookingConfirmation: FC<Props> = ({ booking }) => {
    const router = useRouter();

    const handleProceed = () => {
        router.push('/payment');
    };

    return (
        <div className="max-w-3xl mx-auto px-4 py-12">
            <div className="text-center mb-10">
                <h2 className="text-4xl font-bold text-accent mb-3">Booking Summary</h2>
                <p className="text-muted-foreground text-lg">
                    Please review your ride details before proceeding to payment.
                </p>
            </div>

            <div className="space-y-6 border rounded-2xl p-6 bg-white shadow-lg">
                <div className="flex items-center gap-4">
                    <LocationOnIcon className="text-blue-500 text-3xl" />
                    <p>
                        <span className="font-semibold">Pickup:</span> {booking.pickup}
                    </p>
                </div>
                <div className="flex items-center gap-4">
                    <LocationOnIcon className="text-red-500 text-3xl" />
                    <p>
                        <span className="font-semibold">Drop-off:</span> {booking.dropoff}
                    </p>
                </div>
                <div className="flex items-center gap-4">
                    <AccessTimeIcon className="text-yellow-500 text-3xl" />
                    <p>
                        <span className="font-semibold">Date & Time:</span> {booking.date} at {booking.time}
                    </p>
                </div>
                <div className="flex items-center gap-4">
                    <DriveEtaIcon className="text-purple-500 text-3xl" />
                    <p>
                        <span className="font-semibold">Vehicle:</span> {booking.vehicleType}
                    </p>
                </div>
                <div className="flex items-center gap-4">
                    <LocalTaxiIcon className="text-green-600 text-3xl" />
                    <p>
                        <span className="font-semibold">Estimated Fare:</span> {booking.estimatedFare}
                    </p>
                </div>
            </div>

            <div className="text-center mt-10">
                <button
                    onClick={handleProceed}
                    className="bg-accent hover:bg-accent/90 text-white font-medium px-6 py-3 rounded-xl transition"
                >
                    Confirm and Pay
                </button>
            </div>
        </div>
    );
};

export default BookingConfirmation;
