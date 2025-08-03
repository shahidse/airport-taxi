'use client';

import CreditCardIcon from '@mui/icons-material/CreditCard';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import PaymentIcon from '@mui/icons-material/Payment';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function PaymentPage() {
    const router = useRouter();
    const [selected, setselected] = useState<string>()
    const methods = [
        {
            id: 'credit-card',
            icon: <CreditCardIcon className="text-4xl text-blue-600" />,
            title: 'Credit / Debit Card',
            description: 'Pay securely using your Visa, MasterCard or American Express via Stripe.',
            status: 'Available',
        },
        {
            id: 'paypal',
            icon: <PaymentIcon className="text-4xl text-yellow-600" />,
            title: 'PayPal',
            description: 'Use your PayPal account or linked cards for instant payment.',
            status: 'Coming Soon',
        },
        {
            id: 'digital-wallets',
            icon: <AccountBalanceWalletIcon className="text-4xl text-green-500" />,
            title: 'Digital Wallets',
            description: 'Supports Apple Pay, Google Pay, and other major wallets.',
            status: 'Coming Soon',
        },
    ];
    const handleClick = () => {
        // Navigate to the checkout page or handle payment logic
        if (selected) {
            router.push('/payment/checkout');
        }
        else {
            alert("Please select a payment method");
        }
    }
    const handleSelect = (id: string) => {
        setselected((prev) => prev === id ? '' : id);
    }
    return (
        <div className="max-w-6xl mx-auto px-4 py-16">
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold text-accent mb-4">Payment Options</h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Choose a secure and convenient method to pay for your airport ride. We support multiple payment gateways to make your experience seamless.
                </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {methods.map((method, index) => (
                    <div
                        key={index}
                        className={`border rounded-2xl p-6  shadow-md hover:shadow-lg transition-all ${method.status === 'Coming Soon' ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'} ${selected == method.id ? 'bg-accent-light' : 'bg-white'}`}
                        onClick={() => method.status == 'Available' ? handleSelect(method.id) : undefined}
                    >
                        <div className="flex items-center gap-4 mb-4">
                            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-full">
                                {method.icon}
                            </div>
                            <h3 className="text-xl font-semibold">{method.title}</h3>
                        </div>
                        <p className="text-muted-foreground text-sm">{method.description}</p>
                        <p className={`${method.status == 'Available' ? 'text-green-500' : 'text-gray-500'} text-xs mt-2 `}>{method.status}</p>
                    </div>
                ))}
            </div>

            {/* Optional CTA */}
            <div className="mt-16 text-center">
                <button onClick={handleClick} className="bg-accent hover:bg-accent/90 text-white font-medium px-6 py-3 rounded-xl transition">
                    Proceed to Checkout
                </button>
            </div>
        </div >
    );
}
