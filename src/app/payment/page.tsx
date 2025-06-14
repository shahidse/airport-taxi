'use client';

import CreditCardIcon from '@mui/icons-material/CreditCard';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import PaymentIcon from '@mui/icons-material/Payment';
import { useRouter } from 'next/navigation';

export default function PaymentPage() {
    const router = useRouter();
    const methods = [
        {
            icon: <CreditCardIcon className="text-4xl text-blue-600" />,
            title: 'Credit / Debit Card',
            description: 'Pay securely using your Visa, MasterCard or American Express via Stripe.',
        },
        {
            icon: <PaymentIcon className="text-4xl text-yellow-600" />,
            title: 'PayPal',
            description: 'Use your PayPal account or linked cards for instant payment.',
        },
        {
            icon: <AccountBalanceWalletIcon className="text-4xl text-green-500" />,
            title: 'Digital Wallets',
            description: 'Supports Apple Pay, Google Pay, and other major wallets.',
        },
    ];
    const handleClick = () => {
        // Navigate to the checkout page or handle payment logic
        router.push('/payment/checkout');
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
                        className="border rounded-2xl p-6 bg-white  shadow-md hover:shadow-lg transition-all"
                    >
                        <div className="flex items-center gap-4 mb-4">
                            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-full">
                                {method.icon}
                            </div>
                            <h3 className="text-xl font-semibold">{method.title}</h3>
                        </div>
                        <p className="text-muted-foreground text-sm">{method.description}</p>
                    </div>
                ))}
            </div>

            {/* Optional CTA */}
            <div className="mt-16 text-center">
                <button onClick={handleClick} className="bg-accent hover:bg-accent/90 text-white font-medium px-6 py-3 rounded-xl transition">
                    Proceed to Checkout
                </button>
            </div>
        </div>
    );
}
