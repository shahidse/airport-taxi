'use client'

import { useState } from 'react'
import { TextField, Button, Typography, Box } from '@mui/material'

export default function LoginForm() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        try {
            // Example auth logic (replace with your API or Firebase)
            if (!email || !password) {
                throw new Error('Both fields are required.')
            }

            // await loginUser({ email, password })
            console.log('Logging in with', { email, password })

            // Redirect or set auth state here

        } catch (err: any) {
            setError(err.message || 'Login failed.')
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
                Login
            </Typography>

            <TextField
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
                margin="normal"
                required
                placeholder='john.doe@example.com'
                className='bg-gray-200'
            />

            <TextField
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
                margin="normal"
                required
                placeholder='********'
                className='bg-gray-200'

            />

            {error && <Typography className="text-red-600 mt-2">{error}</Typography>}

            <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={loading}
                sx={{
                    marginTop: 2,
                }}
            >
                {loading ? 'Logging in...' : 'Login'}
            </Button>

            <Typography className="mt-4 text-center text-sm text-gray-600" sx={{
                marginTop: 2
            }}>
                Don't have an account? <a href="/signup" className="text-blue-600 underline">Sign up</a>
            </Typography>
        </Box>
    )
}
