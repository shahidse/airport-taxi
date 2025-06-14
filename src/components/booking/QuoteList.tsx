// components/QuoteList.tsx
'use client';

import { useState } from 'react';
import { Card, CardContent, Typography, Pagination } from '@mui/material';
export enum QouteStatus {
    PENDING = 'pending',
    APPROVED = 'approved',
    REJECTED = 'rejected',
}
type Quote = {
    id: string;
    name: string;
    phone: string;
    pickupLocation: string;
    dropoffLocation: string;
    date: string;
    status: QouteStatus;
};

export default function QuoteList({ quotes }: { quotes: Quote[] }) {
    const itemsPerPage = 8;
    const [page, setPage] = useState(1);

    const paginatedQuotes = quotes.slice((page - 1) * itemsPerPage, page * itemsPerPage);

    return (
        <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
                {paginatedQuotes.map((quote) => (
                    <Card key={quote.id} className="bg-white shadow-md border border-gray-200 opacity-80">
                        <CardContent>
                            <Typography variant="h6" className="text-primary">
                                {quote.name} — {quote.phone}
                            </Typography>
                            <Typography className="text-sm mt-1">
                                <strong>From:</strong> {quote.pickupLocation}
                            </Typography>
                            <Typography className="text-sm">
                                <strong>To:</strong> {quote.dropoffLocation}
                            </Typography>
                            <Typography className="text-sm">
                                <strong>Date:</strong> {quote.date}
                            </Typography>
                            <Typography className={`text-sm mt-2 font-semibold ${getStatusColor(quote.status)}`}>
                                Status: {quote.status}
                            </Typography>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="flex justify-center pt-4">
                <Pagination
                    count={Math.ceil(quotes.length / itemsPerPage)}
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
        case 'approved':
            return 'text-green-600';
        case 'rejected':
            return 'text-red-600';
        default:
            return 'text-yellow-600';
    }
}
