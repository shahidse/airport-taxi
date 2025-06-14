// app/payment/page.tsx

import CheckoutForm from '@/components/booking/CheckoutForm';

export default function PaymentPage() {
  return (
    <main className="min-h-screen  text-foreground py-12">
      <CheckoutForm />
    </main>
  );
}
