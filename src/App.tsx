// import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'

import Navbar from './components/Navbar.tsx'
import Footer from './components/Footer.tsx'
import Auth from './components/Auth.tsx'
import News from './components/News.tsx'



export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/Auth" element={<Auth />} />
        <Route path="/News" element={<News />} />
      </Routes>
      <Footer />
    </>
  )
}