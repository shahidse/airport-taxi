'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Pagination, Divider, Chip } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { fetchQuotes } from '@/lib/features/quotes/quotesThunk';

type Quote = {
    id: number;
    createdAt: string;
    updatedAt: string;
    pickupLocation: string;
    dropoffLocation: string;
    pickupDateTime: string;
    passengers: number;
    luggage: number;
    vehicleType: string;
    estimatedFare: number;
    isRoundTrip: boolean;
    returnDateTime: string | null;
    flightNumber: string | null;
    specialInstructions: string | null;
    user: {
        id: number;
        fullName: string;
        email: string;
        phone: string | null;
        address: string;
        city: string;
        country: string;
    };
};

export default function QuoteList() {
    const dispatch = useAppDispatch();
    const { data } = useAppSelector((state) => state.quotes);
    const [page, setPage] = useState(1);
    const itemsPerPage = 8;

    useEffect(() => {
        dispatch(fetchQuotes({ page, limit: itemsPerPage }));
    }, [dispatch, page]);

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleString();
    };

    return (
        <div className="space-y-6">
            <div className="grid gap-4">
                {data?.data?.map((quote) => (
                    <Card key={quote.id} className="bg-white shadow-md border border-gray-200">
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Quote Information */}
                                <div>
                                    <Typography variant="h6" className="text-primary mb-2">
                                        Quote #{quote.id}
                                    </Typography>
                                    <Divider className="my-2" />

                                    <Typography className="text-sm">
                                        <strong>Created:</strong> {formatDate(quote.createdAt)}
                                    </Typography>
                                    <Typography className="text-sm">
                                        <strong>Last Updated:</strong> {formatDate(quote.updatedAt)}
                                    </Typography>

                                    <div className="mt-3 space-y-1">
                                        <Typography variant="subtitle2">Trip Details</Typography>
                                        <Typography className="text-sm">
                                            <strong>From:</strong> {quote.pickupLocation}
                                        </Typography>
                                        <Typography className="text-sm">
                                            <strong>To:</strong> {quote.dropoffLocation}
                                        </Typography>
                                        <Typography className="text-sm">
                                            <strong>Pickup Time:</strong> {formatDate(quote.pickupDateTime)}
                                        </Typography>
                                        {quote.returnDateTime && (
                                            <Typography className="text-sm">
                                                <strong>Return Time:</strong> {formatDate(quote.returnDateTime)}
                                            </Typography>
                                        )}
                                    </div>

                                    <div className="mt-3 flex gap-2">
                                        <Chip label={`Passengers: ${quote.passengers}`} size="small" />
                                        <Chip label={`Luggage: ${quote.luggage}`} size="small" />
                                        <Chip label={quote.vehicleType} size="small" color="primary" />
                                        {quote.isRoundTrip && (
                                            <Chip label="Round Trip" size="small" color="secondary" />
                                        )}
                                    </div>
                                </div>

                                {/* User Information */}
                                <div>
                                    <Typography variant="h6" className="text-primary mb-2">
                                        User Details
                                    </Typography>
                                    <Divider className="my-2" />

                                    <Typography className="text-sm">
                                        <strong>Name:</strong> {quote.user.fullName}
                                    </Typography>
                                    <Typography className="text-sm">
                                        <strong>Email:</strong> {quote.user.email}
                                    </Typography>
                                    <Typography className="text-sm">
                                        <strong>Phone:</strong> {quote.user.phone || 'Not provided'}
                                    </Typography>

                                    <div className="mt-3 space-y-1">
                                        <Typography variant="subtitle2">Address</Typography>
                                        <Typography className="text-sm">{quote.user.address}</Typography>
                                        <Typography className="text-sm">
                                            {quote.user.city}, {quote.user.country}
                                        </Typography>
                                    </div>
                                </div>
                            </div>

                            {/* Additional Quote Information */}
                            <div className="mt-4">
                                <Divider className="my-2" />
                                <Typography variant="subtitle2">Additional Information</Typography>
                                <Typography className="text-sm">
                                    <strong>Estimated Fare:</strong> ${quote.estimatedFare.toFixed(2)}
                                </Typography>
                                {quote.flightNumber && (
                                    <Typography className="text-sm">
                                        <strong>Flight Number:</strong> {quote.flightNumber}
                                    </Typography>
                                )}
                                {quote.specialInstructions && (
                                    <Typography className="text-sm">
                                        <strong>Special Instructions:</strong> {quote.specialInstructions}
                                    </Typography>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center pt-4">
                <Pagination
                    count={data?.data?.pageCount}
                    page={page}
                    onChange={(_, val) => setPage(val)}
                    color="primary"
                />
            </div>
        </div>
    );
}