import React from 'react'
import { Box, Button, Typography } from '@mui/material'
import { Link, useParams, useNavigate } from 'react-router-dom'

export const Home = () => {
  const navigate = useNavigate()
  const params = useParams()
  const name = params.name

  const handleClick = async () => {
    const res = await fetch('http://localhost:8080/api/admin', {
      withCredntials: true,
      credentials: 'include',
      method: 'POST'
    })
    if (res.status === 200) {
      console.log('Session is valid')
    } else {
      navigate('/login')
    }
  }

  return (
    <Box sx={{ width: '90%', backgroundColor: 'yellow', padding: 5, flexDirection: 'column', display: 'flex' }}>
      <Box
        sx={{
          width: '100%',
          backgroundColor: 'gray',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <Typography variant='h2'>
          Welcome {name}
        </Typography>
        <Button component={Link} to='/TransitionScreen' variant='contained'>
          Log Out
        </Button>
      </Box>
      <Button variant='contained' onClick={handleClick}>
        Test session
      </Button>
    </Box>
  )
}
