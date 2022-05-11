import React, { useEffect } from 'react'
import { Box, Typography } from '@mui/material'

export const TransitionScreen = () => {
  useEffect(() => {
    setTimeout(() => {
      window.location.href = '/SignIn'
    }
    , 2000)
  }, [])

  return (
    <Box sx={{ width: '100%', backgroundColor: 'yellow' }}>
      <Typography variant='h2'>
        See you Later
      </Typography>
    </Box>
  )
}
