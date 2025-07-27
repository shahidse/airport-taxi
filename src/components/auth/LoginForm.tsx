'use client'

import { InitialState, setSignInFormState } from '@/lib/features/users/usersSlice'
import { signin } from '@/lib/features/users/usersThunk'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { TextField, Button, Typography, Box } from '@mui/material'
import { useRouter } from 'next/navigation'
import { useSnackbar } from '../common/SnakeBarProvider'

export default function LoginForm() {
    const dispatch = useAppDispatch()
    const { showSnackbar } = useSnackbar()
    const router = useRouter()
    const { signInForm, loading, error } = useAppSelector(state => state.users)
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        dispatch(signin(signInForm)).then((res) => {
            if (res.type == 'user/signin/fulfilled') {
                showSnackbar(`Welcome back, ${signInForm.email}`, 'success')
                router.push('/')
            }
            if (res.type == 'user/signin/rejected') {
                showSnackbar(error, 'error')
            }
        }).catch((err) => {
            showSnackbar(err.message, 'error')
        })

    }
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        dispatch(setSignInFormState({
            key: name as keyof InitialState['signInForm'], value
        }))
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
                name="email"
                value={signInForm.email}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
                placeholder='john.doe@example.com'
                className='bg-gray-200'
            />

            <TextField
                label="Password"
                type="password"
                name='password'
                value={signInForm.password}
                onChange={handleChange}
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
