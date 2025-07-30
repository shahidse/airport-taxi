'use client'

import { TextField, Button, Typography, Box, MenuItem, Checkbox, FormControlLabel } from '@mui/material'
import { useRouter } from 'next/navigation'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { QuoteFormState, setQuoteField } from '@/lib/features/quotes/quotesSlice'
import { createQuote } from '@/lib/features/quotes/quotesThunk'
import { useSnackbar } from '../common/SnakeBarProvider'

const vehicleOptions = [
    { value: 'saloon', label: 'Saloon' },
    { value: 'estate', label: 'Estate' },
    { value: 'mpv', label: 'MPV' },
    { value: 'executive', label: 'Executive' },
]

export default function QuoteForm() {
    const dispatch = useAppDispatch()
    const { pickupLocation,
        dropoffLocation,
        pickupDateTime,
        passengers,
        vehicleType,
        estimatedFare,
        isRoundTrip,
        returnDateTime,
        flightNumber,
        specialInstructions, luggage } = useAppSelector((state) => state.quotes.form)
    const { loading, error }: { loading: boolean, error: any } = useAppSelector((state) => state.quotes)
    const router = useRouter();
    const { showSnackbar } = useSnackbar()
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        checked?: boolean
    ) => {
        const { name, type, value } = e.target
        const newValue = type === 'checkbox' ? checked : value
        dispatch(setQuoteField({ field: name as keyof QuoteFormState, value: newValue }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const token = localStorage.getItem("accessToken");
        if (!token) {
            showSnackbar("Please login to create a quote", 'error')
            router.push('/login')
            return
        }
        dispatch(createQuote({
            pickupLocation,
            dropoffLocation,
            pickupDateTime,
            passengers,
            vehicleType,
            estimatedFare,
            isRoundTrip,
            returnDateTime,
            flightNumber,
            specialInstructions,
            luggage
        })).then((res) => {
            if (res.type == 'quotes/createQuote/fulfilled') {
                showSnackbar(` Create Quote Successfully `, 'success')
                router.push('/quotes')
            }
            if (res.type == 'quotes/createQuote/rejected') {
                showSnackbar(res.payload, 'error')
            }
        }).catch((err) => {
            showSnackbar(err.message, 'error')
        })
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
                value={pickupLocation}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
                className='bg-gray-200'
            />

            <TextField
                label="Drop-off Location"
                name="dropoffLocation"
                value={dropoffLocation}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
                className='bg-gray-200'
            />

            <TextField
                label="Pickup Date and Time"
                name="pickupDateTime"
                type="datetime-local"
                value={pickupDateTime}
                onChange={handleChange}
                fullWidth
                margin="normal"
                InputLabelProps={{ shrink: true }}
                required
                className='bg-gray-200'

            />
            <TextField
                label="Vehicle Type"
                name="vehicleType"
                value={vehicleType}
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
                value={passengers}
                onChange={handleChange}
                fullWidth
                margin="normal"
                className='bg-gray-200'
            />
            <TextField
                label="Number of Luggage"
                name="luggage"
                type="number"
                value={luggage}
                onChange={handleChange}
                fullWidth
                margin="normal"
                className='bg-gray-200'

            />
            <FormControlLabel
                control={
                    <Checkbox
                        checked={isRoundTrip}
                        onChange={handleChange}
                        name="isRoundTrip"
                    />
                }
                label="Return Journey"
                className="mt-2"
            />

            {isRoundTrip && (
                <>
                    <TextField
                        label="Return Date and Time"
                        name="returnDateTime"
                        type="datetime-local"
                        value={returnDateTime}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        InputLabelProps={{ shrink: true }}
                        required
                        className='bg-gray-200'
                    />
                </>
            )}

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
