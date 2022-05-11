import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Home, SignIn, SignUp, TransitionScreen } from './components'
import { createTheme, ThemeProvider } from '@mui/material/styles'

function App () {
  const theme = createTheme()

  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path='/:name' element={<Home />} />
        <Route path='/SignIn' element={<SignIn />} />
        <Route path='/SignUp' element={<SignUp />} />
        <Route path='/transitionScreen' element={<TransitionScreen />} />
        <Route
          path='*'
          element={<Navigate to='/SignIn' replace />}
        />
      </Routes>
    </ThemeProvider>
  )
}

export default App
