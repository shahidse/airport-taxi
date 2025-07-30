'use client'

import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import LocalTaxiIcon from '@mui/icons-material/LocalTaxi';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { QuoteFormState, setQuoteField } from '@/lib/features/quotes/quotesSlice';
import { useRouter } from 'next/navigation';
export default function Hero() {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const { pickupLocation,
    dropoffLocation,
    pickupDateTime,
  } = useAppSelector((state) => state.quotes.form)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    dispatch(setQuoteField({ field: name as keyof QuoteFormState, value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const token = localStorage.getItem("accessToken");
    if (!token) {
      alert("Please login to create a quote")
      router.push('/login')
      return
    }
    router.push('/get-quote')
  }

  return (
    <section className="w-full h-screen flex flex-col items-center justify-center  text-gray-800 text-center px-6">
      <div className="text-center px-4">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 text-accent flex justify-center items-center gap-3">
          <FlightTakeoffIcon className="text-accent w-10 h-10" />
          Your Airport Ride, Reimagined
        </h1>

        <p className="text-lg md:text-xl mb-8 max-w-xl mx-auto text-accent flex flex-col gap-2">
          <span className="flex items-center gap-2">
            <LocalTaxiIcon className="text-accent" />
            Book comfortable, reliable airport taxis in seconds.
          </span>
          <span className="flex items-center gap-2">
            <CheckCircleIcon className="text-accent" />
            No hidden fees. Instant confirmations.
          </span>
        </p>
      </div>

      {/* Minimal Inline Quote Form */}
      <form onSubmit={handleSubmit} className="w-full max-w-3xl bg-white/90 rounded-xl p-4 shadow-lg backdrop-blur-sm grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
        <input
          type="text"
          name="pickupLocation"
          placeholder="Pickup Location"
          value={pickupLocation}
          onChange={handleChange}
          required
          className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary w-full"
        />
        <input
          type="text"
          name="dropoffLocation"
          placeholder="Drop-off Location"
          value={dropoffLocation}
          onChange={handleChange}
          required
          className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary w-full"
        />
        <input
          type="datetime-local"
          name="pickupDateTime"
          value={pickupDateTime}
          onChange={handleChange}
          required
          className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary w-full"
        />
        <button
          type="submit"
          className="bg-accent text-black font-semibold px-4 py-2 rounded-lg hover:bg-yellow-400 transition w-full"
        >
          Get Quote
        </button>
      </form>
    </section>
  )
}
