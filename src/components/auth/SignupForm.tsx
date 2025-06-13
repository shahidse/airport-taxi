'use client'

import { useState } from 'react'
import { TextField, Button, Typography, Box } from '@mui/material'

export default function SignupForm() {
    const [form, setForm] = useState({
        fullName: '',
        email: '',
        phone: '',
        address: '',
        postCode: '',
        password: '',
        confirmPassword: '',
    })

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setForm((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        const {
            fullName, email, phone, address, postCode,
            password, confirmPassword,
        } = form

        try {
            if (
                !fullName || !email || !phone || !address || !postCode ||
                !password || !confirmPassword
            ) {
                throw new Error('All fields are required.')
            }

            if (password !== confirmPassword) {
                throw new Error('Passwords do not match.')
            }

            // Replace with real signup logic (e.g. API call)
            console.log('Signing up user:', form)

            // Redirect or success message

        } catch (err: any) {
            setError(err.message || 'Signup failed.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            className="w-full max-w-md p-6 bg-white opacity-80 shadow-md rounded-xl mx-auto"
        >
            <Typography variant="h5" className="mb-4 text-center text-primary">
                Sign Up
            </Typography>

            <TextField
                label="Full Name"
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
                className='bg-gray-200'

            />

            <TextField
                label="Email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
                className='bg-gray-200'

            />

            <TextField
                label="Phone Number"
                name="phone"
                type="tel"
                value={form.phone}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
                className='bg-gray-200'

            />

            <TextField
                label="Street Address"
                name="address"
                value={form.address}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
                className='bg-gray-200'

            />

            <TextField
                label="Post Code"
                name="postCode"
                value={form.postCode}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
                className='bg-gray-200'

            />
            <TextField
                label="Country"
                name="address"
                value={form.address}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
                className='bg-gray-200'

            />
            <TextField
                label="Password"
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
                className='bg-gray-200'

            />

            <TextField
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                value={form.confirmPassword}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
                className='bg-gray-200'

            />

            {error && <Typography className="text-red-600 mt-2">{error}</Typography>}

            <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={loading}
                className="mt-4"
                sx={{
                    marginTop: 2
                }}
            >
                {loading ? 'Signing up...' : 'Sign Up'}
            </Button>

            <Typography className="mt-4 text-center text-sm text-gray-600" sx={{
                    marginTop: 2
                }}>
                Already have an account? <a href="/login" className="text-blue-600 underline">Login</a>
            </Typography>
        </Box>
    )
}
