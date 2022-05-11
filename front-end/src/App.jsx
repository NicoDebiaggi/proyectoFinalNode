import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Home, Login, TransitionScreen } from './components'

function App () {
  return (
    <Routes>
      <Route path='/:name' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/transitionScreen' element={<TransitionScreen />} />
    </Routes>
  )
}

export default App
