// import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'

import Navbar from './components/Navbar.tsx'
import Footer from './components/Footer.tsx'
import Auth from './components/Auth.tsx'
import Mypage from './components/Mypage.tsx'
import News from './components/News.tsx'
import Shop from './components/Shop.tsx'
import Mbti from './components/MbtiStart.tsx'


export default function App() {
  return (
    <>
      <Navbar />
      <div className="bg-gray-100">
      <Routes>
        <Route path="/Auth" element={<Auth />} />
        <Route path="/Mypage" element={<Mypage />}></Route>
        {/*
        <Route path="/Home" element={<Home />} />
        */}
        <Route path="/News" element={<News />} />
        <Route path="/Shop" element={<Shop />} />
        
        {/* <Route path="/Goods" element={<Goods />} /> */}
        {/* <Route path="/Zukan" element={<Zukan />} /> */}
    
        <Route path="/Mbti" element={<Mbti />} />
       
      </Routes>
      </div>
      <Footer />
    </>
  )
}