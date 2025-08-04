'use client';

import { useState } from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { StripeApiService } from '@/services/StripeApiService';
import { useAppSelector } from '@/lib/hooks';
const CARD_ELEMENT_OPTIONS = {
    style: {
        base: {
            fontSize: '16px',
            color: '#374151', // Tailwind's gray-700
            fontFamily: 'system-ui, sans-serif',
            '::placeholder': {
                color: '#9CA3AF', // Tailwind's gray-400
            },
        },
        invalid: {
            color: '#EF4444', // Tailwind's red-500
        },
    },
};
export default function PaymentForm() {
    const stripe = useStripe();
    const elements = useElements();
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('');
    const { estimatedFare } = useAppSelector((state) => state.quotes.form);
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('Processing...');
        const res = await StripeApiService.getInstance().createPayment(JSON.stringify({ email }), {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            },
        });

        const { clientSecret } = await res.json();

        const result = await stripe?.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements!.getElement(CardElement)!,
                billing_details: { email },
            },
        });

        if (result?.error) {
            setStatus(`❌ ${result.error.message}`);
        } else if (result?.paymentIntent?.status === 'succeeded') {
            setStatus('✅ Payment successful!');
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="w-full max-w-sm space-y-5" // replaces inline maxWidth
        >
            {/* Email Input */}
            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                </label>
                <input
                    type="email"
                    id="email"
                    placeholder="you@example.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
            </div>

            {/* Card Element */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Card Details
                </label>
                <div className="border border-gray-300 rounded-md p-3 shadow-sm focus-within:ring-2 focus-within:ring-blue-500">
                    <CardElement options={CARD_ELEMENT_OPTIONS} />
                </div>
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                disabled={!stripe}
                className="w-full bg-accent hover:bg-accent-dark text-white font-semibold py-2 px-4 rounded-md transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
                Pay ${estimatedFare}
            </button>

            {/* Status Message */}
            {status && (
                <p className="text-sm text-center text-gray-600">{status}</p>
            )}
        </form>

    );
}
