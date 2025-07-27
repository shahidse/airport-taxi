'use client'

import { TextField, Button, Typography, Box } from '@mui/material'
import { InitialState, setSignUpFormState } from '@/lib/features/users/usersSlice'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { signup } from '@/lib/features/users/usersThunk'
import { useSnackbar } from '../common/SnakeBarProvider'
import { useRouter } from 'next/navigation'

export default function SignupForm() {

    const dispatch = useAppDispatch()
    const { showSnackbar } = useSnackbar()
    const router = useRouter()
    const { signUpForm, loading, error } = useAppSelector(state => state.users)
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log('signUpForm', signUpForm)
        const { name, value } = e.target
        dispatch(setSignUpFormState({
            key: name as keyof InitialState["signUpForm"], value
        }))
    }
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        dispatch(signup(signUpForm)).then((res) => {
            if (res.type == 'user/signup/fulfilled') {
                showSnackbar(`${signUpForm.fullName} Registered Successfully `, 'success')
                router.push('/login')
            }
            if (res.type == 'user/signup/rejected') {
                showSnackbar(error, 'error')
            }
        }).catch((err) => {
            showSnackbar(err.message, 'error')
        })

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
                value={signUpForm.fullName}
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
                value={signUpForm.email}
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
                value={signUpForm.phone}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
                className='bg-gray-200'

            />

            <TextField
                label="Street Address"
                name="address"
                value={signUpForm.address}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
                className='bg-gray-200'

            />

            <TextField
                label="Post Code"
                name="postalCode"
                value={signUpForm.postalCode}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
                className='bg-gray-200'

            />
            <TextField
                label="Country"
                name="country"
                value={signUpForm.country}
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
                value={signUpForm.password}
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
                value={signUpForm.confirmPassword}
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
