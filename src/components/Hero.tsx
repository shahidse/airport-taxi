'use client';

import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { setQuoteField, QuoteFormState } from '@/lib/features/quotes/quotesSlice';
import { useRouter } from 'next/navigation';
import LocationInput from '@/components/common/LocationAutocomplete'; // import the above componentimport { useJsApiLoader } from '@react-google-maps/api';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import LocalTaxiIcon from '@mui/icons-material/LocalTaxi';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useJsApiLoader } from '@react-google-maps/api';

export default function Hero() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { pickupLocation, dropoffLocation, pickupDateTime } = useAppSelector(
    (state) => state.quotes.form
  );

  // Store lat/lng locally (not in Redux, but you can if you want)
  const [pickupCoords, setPickupCoords] = useState<{ lat: number; lng: number } | undefined>(undefined);
  const [dropoffCoords, setDropoffCoords] = useState<{ lat: number; lng: number } | undefined>(undefined);
  const [distanceKm, setDistanceKm] = useState<number | null>(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
    libraries: ['places'],
  });

  // Calculate distance with Haversine formula
  useEffect(() => {
    if (pickupCoords && dropoffCoords) {
      const toRad = (x: number) => (x * Math.PI) / 180;
      const R = 6371; // Earth radius km

      const dLat = toRad(dropoffCoords.lat - pickupCoords.lat);
      const dLon = toRad(dropoffCoords.lng - pickupCoords.lng);

      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(pickupCoords.lat)) *
        Math.cos(toRad(dropoffCoords.lat)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const d = R * c;

      setDistanceKm(parseFloat(d.toFixed(2)));
    } else {
      setDistanceKm(null);
    }
  }, [pickupCoords, dropoffCoords]);

  // Set current location as default pickup (once on mount)
  useEffect(() => {
    if (!isLoaded) return;

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const lat = pos.coords.latitude;
          const lng = pos.coords.longitude;
          setPickupCoords({ lat, lng });
          // Reverse geocode or set string for display - here just setting lat,lng as string
          dispatch(setQuoteField({ field: 'pickupLocation', value: `${lat.toFixed(5)}, ${lng.toFixed(5)}` }));
        },
        () => {
          // If denied or error, no default location
        }
      );
    }
  }, [dispatch, isLoaded]);

  const handlePickupChange = (address: string, coords?: { lat: number; lng: number }) => {
    dispatch(setQuoteField({ field: 'pickupLocation', value: address }));
    if (coords) setPickupCoords(coords);
  };

  const handleDropoffChange = (address: string, coords?: { lat: number; lng: number }) => {
    dispatch(setQuoteField({ field: 'dropoffLocation', value: address }));
    if (coords) setDropoffCoords(coords);
  };


  const handleDateTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setQuoteField({ field: 'pickupDateTime', value: e.target.value }));
  };

  const [loading, setLoading] = useState(false);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const token = localStorage.getItem('accessToken');
    if (!token) {
      alert('Please login to create a quote');
      router.push('/login');
      setLoading(false);
      return;
    }
    setLoading(false);
    router.push('/get-quote');
  };

  if (!isLoaded) return <div>Loading Maps...</div>;

  return (
    <section className="w-full h-screen flex flex-col items-center justify-center text-gray-800 text-center px-6">
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

      {/* Quote Form */}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-6xl bg-white/90 rounded-xl p-4 shadow-lg backdrop-blur-sm grid grid-cols-1 md:grid-cols-4 gap-4 items-end"
      >
        <LocationInput label="Pickup Location" value={pickupLocation} onChange={handlePickupChange} initialCoords={pickupCoords} />
        <LocationInput label="Drop-off Location" value={dropoffLocation} onChange={handleDropoffChange} initialCoords={dropoffCoords} />
        <input
          type="datetime-local"
          name="pickupDateTime"
          value={pickupDateTime}
          onChange={handleDateTimeChange}
          required
          className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary w-full"
        />
        <button
          type="submit"
          className="bg-accent text-black font-semibold px-4 py-2 rounded-lg hover:bg-yellow-400 transition w-full"
          disabled={loading}
        >
          {loading && (
            <div className="animate-spin mr-2 inline-flex items-center justify-center">
              <svg
                className="w-5 h-5 text-white"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                ></circle>
              </svg>
            </div>
          )}
          Get Quote
        </button>
      </form>

      {distanceKm !== null && (
        <div className="mt-4 text-lg font-semibold text-accent">
          Estimated Distance: {distanceKm} km
        </div>
      )}
    </section>
  );
}
