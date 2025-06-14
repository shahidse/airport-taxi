'use client'

import { useState } from 'react'
import { TextField, Button, Typography, Box, MenuItem, Checkbox, FormControlLabel } from '@mui/material'
import { useRouter } from 'next/navigation'

const vehicleOptions = [
    { value: 'saloon', label: 'Saloon' },
    { value: 'estate', label: 'Estate' },
    { value: 'mpv', label: 'MPV' },
    { value: 'executive', label: 'Executive' },
]

export default function QuoteForm() {
    const router = useRouter();
    const [form, setForm] = useState({
        pickupLocation: '',
        dropoffLocation: '',
        pickupDate: '',
        pickupTime: '',
        returnJourney: false,
        returnDate: '',
        returnTime: '',
        vehicleType: 'saloon',
        passengers: '',
        luggage: '',
    })

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setForm((prev) => ({ ...prev, [name]: value }))
    }

    const handleToggleReturn = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm((prev) => ({ ...prev, returnJourney: e.target.checked }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        try {
            // Basic validation
            if (!form.pickupLocation || !form.dropoffLocation || !form.pickupDate || !form.pickupTime) {
                throw new Error('Pickup, drop-off, and pickup date/time are required.')
            }

            if (form.returnJourney && (!form.returnDate || !form.returnTime)) {
                throw new Error('Return journey details are incomplete.')
            }

            console.log('Quote form submitted:', form)

            // API request to get quote here (or redirect to next step)
            router.push('/get-qoute/confirmaion')
        } catch (err: any) {
            setError(err.message || 'Failed to submit quote.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            className="w-full max-w-2xl p-6 bg-white opacity-80 shadow-md rounded-xl mx-auto"
        >
            <Typography variant="h4" className="mb-4 text-accent text-center">
                Get a Quote
            </Typography>

            <TextField
                label="Pickup Location"
                name="pickupLocation"
                value={form.pickupLocation}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
                className='bg-gray-200'

            />

            <TextField
                label="Drop-off Location"
                name="dropoffLocation"
                value={form.dropoffLocation}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
                className='bg-gray-200'

            />

            <TextField
                label="Pickup Date"
                name="pickupDate"
                type="date"
                value={form.pickupDate}
                onChange={handleChange}
                fullWidth
                margin="normal"
                InputLabelProps={{ shrink: true }}
                required
                className='bg-gray-200'

            />

            <TextField
                label="Pickup Time"
                name="pickupTime"
                type="time"
                value={form.pickupTime}
                onChange={handleChange}
                fullWidth
                margin="normal"
                InputLabelProps={{ shrink: true }}
                required
                className='bg-gray-200'

            />

            <FormControlLabel
                control={
                    <Checkbox
                        checked={form.returnJourney}
                        onChange={handleToggleReturn}
                        name="returnJourney"
                    />
                }
                label="Return Journey"
                className="mt-2"
            />

            {form.returnJourney && (
                <>
                    <TextField
                        label="Return Date"
                        name="returnDate"
                        type="date"
                        value={form.returnDate}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        InputLabelProps={{ shrink: true }}
                        required
                        className='bg-gray-200'

                    />

                    <TextField
                        label="Return Time"
                        name="returnTime"
                        type="time"
                        value={form.returnTime}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        InputLabelProps={{ shrink: true }}
                        required
                        className='bg-gray-200'

                    />
                </>
            )}

            <TextField
                label="Vehicle Type"
                name="vehicleType"
                value={form.vehicleType}
                onChange={handleChange}
                select
                fullWidth
                margin="normal"
                className='bg-gray-200'

            >
                {vehicleOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </TextField>

            <TextField
                label="Number of Passengers"
                name="passengers"
                type="number"
                value={form.passengers}
                onChange={handleChange}
                fullWidth
                margin="normal"
                className='bg-gray-200'

            />

            <TextField
                label="Number of Luggage"
                name="luggage"
                type="number"
                value={form.luggage}
                onChange={handleChange}
                fullWidth
                margin="normal"
                className='bg-gray-200'

            />

            {error && <Typography className="text-red-600 mt-2">{error}</Typography>}

            <Button
                type="submit"
                variant="contained"
                // color="primary"
                fullWidth
                className="mt-4 bg-accent text-accent"
                disabled={loading}
                sx={{
                    marginTop: 2,
                    backgroundColor: "var(--color-accent)"
                }}
            >
                {loading ? 'Processing...' : 'Get Quote'}
            </Button>
        </Box>
    )
}
