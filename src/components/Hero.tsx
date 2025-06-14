'use client'

import { useState } from 'react'
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import LocalTaxiIcon from '@mui/icons-material/LocalTaxi';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
export default function Hero() {
  const [form, setForm] = useState({
    pickup: '',
    dropoff: '',
    date: '',
    time: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // You could route to full quote page or trigger quote logic
    console.log('Minimal quote form submitted:', form)
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
      <form onSubmit={handleSubmit} className="w-full max-w-3xl bg-white/90 rounded-xl p-4 shadow-lg backdrop-blur-sm grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
        <input
          type="text"
          name="pickup"
          placeholder="Pickup Location"
          value={form.pickup}
          onChange={handleChange}
          required
          className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary w-full"
        />
        <input
          type="text"
          name="dropoff"
          placeholder="Drop-off Location"
          value={form.dropoff}
          onChange={handleChange}
          required
          className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary w-full"
        />
        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          required
          className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary w-full"
        />
        <input
          type="time"
          name="time"
          value={form.time}
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
