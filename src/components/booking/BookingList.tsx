// components/BookingList.tsx
'use client';

import { useState } from 'react';
import { Card, CardContent, Typography, Pagination } from '@mui/material';

type Booking = {
    id: string;
    passengerName: string;
    vehicleType: string;
    pickupTime: string;
    returnJourney?: boolean;
    address: string;
    status: 'confirmed' | 'cancelled' | 'pending';
};

export default function BookingList({ bookings }: { bookings: Booking[] }) {
    const itemsPerPage = 8;
    const [page, setPage] = useState(1);

    const paginatedBookings = bookings.slice((page - 1) * itemsPerPage, page * itemsPerPage);

    return (
        <div className="flex flex-col h-full">
            {/* Scrollable list */}
            <div className="flex-1 overflow-y-auto pr-2">
                <div className="grid gap-4 md:grid-cols-2">
                    {paginatedBookings.map((booking) => (
                        <Card key={booking.id} className="bg-white shadow-md border border-gray-200 opacity-80">
                            <CardContent>
                                <Typography variant="h6" className="text-primary">
                                    {booking.passengerName}
                                </Typography>
                                <Typography className="text-sm">
                                    <strong>Vehicle:</strong> {booking.vehicleType}
                                </Typography>
                                <Typography className="text-sm">
                                    <strong>Pickup Time:</strong> {booking.pickupTime}
                                </Typography>
                                <Typography className="text-sm">
                                    <strong>Address:</strong> {booking.address}
                                </Typography>
                                {booking.returnJourney && (
                                    <Typography className="text-sm text-blue-600">
                                        Includes return journey
                                    </Typography>
                                )}
                                <Typography className={`text-sm mt-2 font-semibold ${getStatusColor(booking.status)}`}>
                                    Status: {booking.status.toUpperCase()}
                                </Typography>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>

            {/* Pagination fixed at bottom of component */}
            <div className="flex justify-center pt-4">
                <Pagination
                    count={Math.ceil(bookings.length / itemsPerPage)}
                    page={page}
                    onChange={(_, val) => setPage(val)}
                    color="primary"
                />
            </div>
        </div>
    );
}

function getStatusColor(status: string) {
    switch (status) {
        case 'confirmed':
            return 'text-green-600';
        case 'cancelled':
            return 'text-red-600';
        default:
            return 'text-yellow-600';
    }
}
