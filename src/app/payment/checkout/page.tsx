import StripeWrapper from '@/components/stripe/StripeWrapper';
import PaymentForm from '@/components/stripe/PaymentForm';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
export default async function PaymentPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get('accessToken')?.value;

  if (!token) {
    redirect('/login');
  }
  
  return (
    <main className="min-h-screen text-gray-900 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 space-y-6">
        <h1 className="text-2xl font-semibold text-center text-accent">Checkout</h1>
        <StripeWrapper>
          <PaymentForm />
        </StripeWrapper>
      </div>
    </main>
  );
}

