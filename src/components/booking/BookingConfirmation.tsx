'use client';

import { useRouter } from 'next/navigation';
import LocalTaxiIcon from '@mui/icons-material/LocalTaxi';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { Backpack, Money, Numbers, People, TextFields, UTurnLeft } from '@mui/icons-material';
import { useEffect } from 'react';
import { getQuoteDetails } from '@/lib/features/quotes/quotesThunk';

const BookingConfirmation = ({ id }: { id: string }) => {
    const dispatch = useAppDispatch()
    const { pickupLocation,
        dropoffLocation,
        pickupDateTime,
        passengers,
        vehicleType,
        estimatedFare,
        isRoundTrip,
        returnDateTime,
        flightNumber,
        specialInstructions, luggage } = useAppSelector((state) => state.quotes.form)

    const { loading, error, data } = useAppSelector((state) => state.quotes)
    const router = useRouter();
    useEffect(() => {
        if (!id) {
            router.push('/get-quote');
        }
        if (!pickupLocation || !dropoffLocation || !pickupDateTime || !vehicleType || !passengers || !estimatedFare) {
            dispatch(getQuoteDetails(id))
            router.push('/get-quote');
        }

    }, [id, pickupLocation, dropoffLocation, pickupDateTime, vehicleType, passengers, estimatedFare, dispatch, router]);
    if (loading) return <div className="text-center text-gray-500">Loading...</div>;
    if (error) return <div className="text-center text-red-500">Error: {error}</div>;
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
                        <span className="font-semibold">Pickup:</span> {pickupLocation}
                    </p>
                </div>
                <div className="flex items-center gap-4">
                    <LocationOnIcon className="text-red-500 text-3xl" />
                    <p>
                        <span className="font-semibold">Drop-off:</span> {dropoffLocation}
                    </p>
                </div>
                <div className="flex items-center gap-4">
                    <AccessTimeIcon className="text-yellow-500 text-3xl" />
                    <p>
                        <span className="font-semibold">Date & Time:</span> {pickupDateTime && pickupDateTime.split('T')[0]} at {pickupDateTime && pickupDateTime.split('T')[1].slice(0, 5)}
                    </p>
                </div>
                <div className="flex items-center gap-4">
                    <LocalTaxiIcon className="text-purple-500 text-3xl" />
                    <p>
                        <span className="font-semibold">Vehicle:</span> {vehicleType}
                    </p>
                </div>
                <div className="flex items-center gap-4">
                    <People className="text-purple-500 text-3xl" />
                    <p>
                        <span className="font-semibold">Passenger:</span> {passengers}
                    </p>
                </div>
                <div className="flex items-center gap-4">
                    <Numbers className="text-purple-500 text-3xl" />
                    <p>
                        <span className="font-semibold">Flight Number:</span> {flightNumber || 'N/A'}
                    </p>
                </div>
                <div className="flex items-center gap-4">
                    <Backpack className="text-purple-500 text-3xl" />
                    <p>
                        <span className="font-semibold">Luggage:</span> {luggage || 'N/A'}
                    </p>
                </div>
                <div className="flex items-center gap-4">
                    <Money className="text-green-600 text-3xl" />
                    <p>
                        <span className="font-semibold">Estimated Fare:</span> {estimatedFare}
                    </p>
                </div>
                <div className="flex items-center gap-4">
                    <UTurnLeft className="text-green-600 text-3xl" />
                    <p>
                        <span className="font-semibold">Round Trip:</span> {isRoundTrip ? 'Yes' : 'No'}
                    </p>
                </div>
                <div className="flex items-center gap-4">
                    <AccessTimeIcon className="text-green-600 text-3xl" />
                    <p>
                        <span className="font-semibold">Return Date & Time:</span> {returnDateTime ? returnDateTime.split('T')[0] + ' at ' + returnDateTime.split('T')[1].slice(0, 5) : 'N/A'}
                    </p>
                </div>
                <div className="flex items-center gap-4">
                    <TextFields className="text-green-600 text-3xl" />
                    <p>
                        <span className="font-semibold">Special Instructions:</span> {specialInstructions || 'N/A'}
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
