// import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'

import Navbar from './components/Navbar.tsx'
import Footer from './components/Footer.tsx'
import Auth from './components/Auth.tsx'
import News from './components/News.tsx'
import Shop from './components/Shop.tsx'


export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/Auth" element={<Auth />} />
        {/*
        <Route path="/Home" element={<Home />} />
        */}
        <Route path="/News" element={<News />} />
        <Route path="/Shop" element={<Shop />} />
        {/* 
        <Route path="/Goods" element={<Goods />} />
        <Route path="/Zukan" element={<Zukan />} />
        <Route path="/MBTI" element={<MBTI />} />
        */}
      </Routes>
      <Footer />
    </>
  )
}