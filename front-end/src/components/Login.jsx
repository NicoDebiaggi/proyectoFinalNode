import React, { useState } from 'react'
import { Box, Typography, TextField, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

export const Login = () => {
  const [name, setName] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async () => {
    if (name) {
      const res = await fetch('http://localhost:8080/api/login', {
        withCredntials: true,
        credentials: 'include',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name })
      })
      if (res.status === 200) {
        navigate(`/${name}`)
      }
    } else {
      console.error('No name provided')
    }
  }

  return (
    <Box sx={{ width: '90%', backgroundColor: 'yellow', padding: 5, flexDirection: 'column', display: 'flex' }}>
      <Typography variant='h2' sx={{ marginBottom: 5 }}>
        Log In
      </Typography>

      <TextField
        required
        id='outlined-required'
        label='Name'
        placeholder='Enter your name'
        onChange={(e) => setName(e.target.value)}
      />

      <Button variant='contained' color='primary' sx={{ marginTop: 5 }} onClick={handleSubmit}>
        Log In
      </Button>
    </Box>
  )
}
