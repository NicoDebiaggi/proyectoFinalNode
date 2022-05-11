import React, { useEffect } from 'react'
import { Box, Typography } from '@mui/material'

export const TransitionScreen = ({ name }) => {
  useEffect(() => {
    setTimeout(() => {
      window.location.href = '/login'
    }
    , 2000)
  }, [])

  return (
    <Box sx={{ width: '100%', backgroundColor: 'yellow' }}>
      <Typography variant='h2'>
        See you Later {name}
      </Typography>
    </Box>
  )
}
