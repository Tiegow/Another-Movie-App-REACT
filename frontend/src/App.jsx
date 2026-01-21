import { useState } from 'react'
import { Routes, Route } from "react-router-dom"
import './App.css'

import Home from './pages/Home'
import Favorites from './pages/Favorites'
import NavBar from './components/NavBar'

import { MovieProvider } from './contexts/MovieContext'
import MoviePage from './pages/MoviePage'
import Footer from './components/Footer'

function App() {

  return (
    <MovieProvider>
      <NavBar />

      <main className="main">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/favoritos' element={<Favorites />} />
          <Route path='/movie/:id' element={<MoviePage />} />
        </Routes>
      </main> 

      <Footer />
    </MovieProvider>
  )
}

export default App
