'use client';

import {
  Description,
  EventAvailable,
  Payment,
  CheckCircleOutline,
} from '@mui/icons-material';
import { motion } from 'framer-motion';

const steps = [
  {
    icon: <Description fontSize="large" className="text-accent" />,
    title: '1. Get an Instant Quote',
    description:
      'Start by entering your pickup and drop-off locations, travel date, and passenger count. Our system instantly calculates the best fare based on distance, time, and selected vehicle.',
  },
  {
    icon: <EventAvailable fontSize="large" className="text-accent" />,
    title: '2. Choose Time & Vehicle',
    description:
      'Pick your preferred vehicle type (e.g., Standard, Executive, MPV). Select your pickup time that suits your schedule. All vehicles are licensed, comfortable, and insured.',
  },
  {
    icon: <Payment fontSize="large" className="text-accent" />,
    title: '3. Confirm & Pay Securely',
    description:
      'Once you review your quote, proceed to checkout. Make secure online payments via Stripe using any credit/debit card. You’ll receive a digital receipt instantly.',
  },
  {
    icon: <CheckCircleOutline fontSize="large" className="text-accent" />,
    title: '4. Booking Confirmed Instantly',
    description:
      'Your booking is confirmed in real-time. We’ll email you the trip details, driver info, and live tracking links (if available). Sit back and relax!',
  },
];

export default function BookingGuide() {
  return (
    <section className="py-12 px-4 md:px-8 max-w-6xl mx-auto">
      <motion.h2
        className="text-3xl md:text-4xl font-bold text-center text-accent mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        How to Quote & Book a Ride
      </motion.h2>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {steps.map((step, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.2, duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white/90 shadow-lg rounded-xl p-6 text-center border border-gray-200 hover:shadow-xl hover:scale-105 transition-transform duration-300"
          >
            <div className="flex justify-center mb-4">{step.icon}</div>
            <h3 className="text-lg font-semibold text-primary mb-2">{step.title}</h3>
            <p className="text-sm text-gray-700 leading-relaxed">{step.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
