'use client';

import CreditCardIcon from '@mui/icons-material/CreditCard';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import PaymentIcon from '@mui/icons-material/Payment';

export default function PaymentMethods() {
  const methods = [
    {
      icon: <CreditCardIcon className="text-3xl text-blue-600" />,
      title: 'Credit / Debit Card',
      description: 'Secure card payments powered by Stripe.',
    },
    {
      icon: <PaymentIcon className="text-3xl text-purple-500" />,
      title: 'PayPal',
      description: 'Use your PayPal balance or linked cards.',
    },
    {
      icon: <AccountBalanceWalletIcon className="text-3xl text-green-500" />,
      title: 'Digital Wallets',
      description: 'Google Pay, Apple Pay and other wallets.',
    },
  ];

  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-accent mb-3">Payment Options</h2>
        <p className="text-muted-foreground text-md md:text-lg">
          Fast, secure and flexible ways to pay for your ride.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {methods.map((method, index) => (
          <div
            key={index}
            className="p-6 border rounded-2xl shadow-sm hover:shadow-lg transition-all bg-white dark:bg-gray-900"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-full">
                {method.icon}
              </div>
              <h3 className="text-xl font-semibold">{method.title}</h3>
            </div>
            <p className="text-muted-foreground">{method.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
