import React from 'react'
import {
  Box,
  Typography,
  TextField,
  Button,
  Avatar,
  CssBaseline,
  FormControlLabel,
  Checkbox,
  Link as MuiLink,
  Grid,
  Container
} from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { useNavigate, Link } from 'react-router-dom'

export const SignUp = () => {
  const navigate = useNavigate()

  const sigUpService = async (firstName, lastName, email, password) => {
    const res = await fetch('http://localhost:8080/api/signUp', {
      withCredntials: true,
      credentials: 'include',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ firstName, lastName, email, password })
    })
    return res
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    if (data.get('email') &&
      data.get('password') &&
      data.get('firstName') &&
      data.get('lastName')
    ) {
      const res = await sigUpService(data.get('firstName'), data.get('lastName'), data.get('email'), data.get('password'))
      const parsedData = await res.json()
      if (res.status === 200) {
        navigate(`/${parsedData.user.name}`)
      }
    } else {
      console.error('No email or password provided')
    }
  }

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Sign up
        </Typography>
        <Box component='form' noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete='given-name'
                name='firstName'
                required
                fullWidth
                id='firstName'
                label='First Name'
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id='lastName'
                label='Last Name'
                name='lastName'
                autoComplete='family-name'
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id='email'
                label='Email Address'
                name='email'
                autoComplete='email'
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name='password'
                label='Password'
                type='password'
                id='password'
                autoComplete='new-password'
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value='allowExtraEmails' color='primary' />}
                label='I want to receive inspiration, marketing promotions and updates via email.'
              />
            </Grid>
          </Grid>
          <Button
            type='submit'
            fullWidth
            variant='contained'
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent='flex-end'>
            <Grid item>
              <MuiLink as={Link} to='/SignIn' variant='body2'>
                Already have an account? Sign in
              </MuiLink>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  )
}
