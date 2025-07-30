'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CheckoutForm() {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Simulate payment API call
        setTimeout(() => {
            router.push('/payment/success');
        }, 2000);
    };

    return (
        <div className="max-w-xl mx-auto px-4 py-12">
            <h2 className="text-3xl font-bold text-accent text-center mb-6">Checkout</h2>
            <p className="text-muted-foreground text-center mb-8">
                Enter your payment details to complete your booking.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6 bg-white  shadow-md p-6 rounded-2xl">
                <div>
                    <label className="block mb-1 font-medium">Cardholder Name</label>
                    <input
                        type="text"
                        className="w-full border rounded-lg p-3 outline-none bg-gray-50 "
                        required
                    />
                </div>
                <div>
                    <label className="block mb-1 font-medium">Card Number</label>
                    <input
                        type="text"
                        className="w-full border rounded-lg p-3 outline-none bg-gray-50 "
                        required
                        placeholder="1234 5678 9012 3456"
                    />
                </div>
                <div className="flex gap-4">
                    <div className="flex-1">
                        <label className="block mb-1 font-medium">Expiry</label>
                        <input
                            type="text"
                            className="w-full border rounded-lg p-3 outline-none bg-gray-50 "
                            required
                            placeholder="MM/YY"
                        />
                    </div>
                    <div className="flex-1">
                        <label className="block mb-1 font-medium">CVC</label>
                        <input
                            type="text"
                            className="w-full border rounded-lg p-3 outline-none bg-gray-50 "
                            required
                            placeholder="123"
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-accent hover:bg-accent/90 text-white font-semibold py-3 rounded-xl transition"
                >
                    {loading ? 'Processing...' : 'Pay £55.00'}
                </button>
            </form>
        </div>
    );
}
