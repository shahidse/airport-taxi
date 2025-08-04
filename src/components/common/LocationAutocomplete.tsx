'use client'

import React, { useState, useRef, useEffect } from 'react';
import { Autocomplete, GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';

interface LocationInputProps {
    label: string;
    value: string;
    onChange: (value: string, coords?: { lat: number; lng: number }) => void;
    initialCoords?: { lat: number; lng: number };
}

const containerStyle = { width: '100%', height: '300px' };

export default function LocationInput({ label, value, onChange, initialCoords }: LocationInputProps) {
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
        libraries: ['places'],
    });

    const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

    const [modalOpen, setModalOpen] = useState(false);
    const [selectedCoords, setSelectedCoords] = useState(initialCoords || null);

    // Handle autocomplete load
    const onLoadAutocomplete = (autocomplete: google.maps.places.Autocomplete) => {
        autocompleteRef.current = autocomplete;
    };

    // When place changed in autocomplete input
    const onPlaceChanged = () => {
        if (autocompleteRef.current) {
            const place = autocompleteRef.current.getPlace();
            if (place.geometry) {
                const loc = {
                    lat: place.geometry.location!.lat(),
                    lng: place.geometry.location!.lng(),
                };
                setSelectedCoords(loc);
                onChange(place.formatted_address || value, loc);
            }
        }
    };

    // Map click handler
    const onMapClick = (e: google.maps.MapMouseEvent) => {
        if (e.latLng) {
            const loc = { lat: e.latLng.lat(), lng: e.latLng.lng() };
            setSelectedCoords(loc);
        }
    };

    // Confirm button inside modal to send back address (reverse geocode)
    const confirmLocation = () => {
        if (!selectedCoords) return;

        // Reverse geocode to get address string
        const geocoder = new window.google.maps.Geocoder();
        geocoder.geocode({ location: selectedCoords }, (results, status) => {
            if (status === 'OK' && results && results[0]) {
                onChange(results[0].formatted_address, selectedCoords);
            } else {
                // fallback to lat/lng string if geocode fails
                onChange(`${selectedCoords.lat.toFixed(5)}, ${selectedCoords.lng.toFixed(5)}`, selectedCoords);
            }
        });

        setModalOpen(false);
    };

    if (!isLoaded) return <div>Loading...</div>;

    return (
        <div className="w-full">
            <label className="block mb-1 font-semibold text-left">{label}</label>
            <div className="flex gap-2">
                <Autocomplete onLoad={onLoadAutocomplete} onPlaceChanged={onPlaceChanged}>
                    <input
                        type="text"
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        placeholder={`Enter ${label.toLowerCase()}`}
                        className="flex-grow px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                </Autocomplete>
                <button
                    type="button"
                    onClick={() => setModalOpen(true)}
                    className="bg-accent text-black px-3 rounded-md hover:bg-yellow-400 transition"
                    aria-label={`Open map to select ${label.toLowerCase()}`}
                >
                    📍
                </button>
            </div>

            {/* Modal for Map selection */}
            {modalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white rounded-lg p-4 max-w-lg w-full relative">
                        <button
                            onClick={() => setModalOpen(false)}
                            className="absolute top-2 right-2 text-gray-700 font-bold text-xl"
                            aria-label="Close map modal"
                        >
                            &times;
                        </button>
                        <GoogleMap
                            mapContainerStyle={containerStyle}
                            center={selectedCoords || initialCoords || { lat: 37.7749, lng: -122.4194 }}
                            zoom={12}
                            onClick={onMapClick}
                        >
                            {selectedCoords && <Marker position={selectedCoords} />}
                        </GoogleMap>
                        <button
                            onClick={confirmLocation}
                            className="mt-4 bg-accent text-black font-semibold px-4 py-2 rounded-lg w-full hover:bg-yellow-400 transition"
                        >
                            Confirm Location
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
