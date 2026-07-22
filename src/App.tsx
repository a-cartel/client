import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'

import { AuthProvider } from './context/AuthContext.tsx';

import Navbar from './components/Navbar.tsx'
import Footer from './components/Footer.tsx'
import Auth from './components/Auth.tsx'
import Mypage from './components/Mypage.tsx'
import News from './components/News.tsx'
import Shop from './components/Shop.tsx'
import Mbti from './components/MbtiStart.tsx'
import Goods from './components/Goods.tsx'

// ShopDetail은 개발 진행에 따라 제거 될 수 있습니다.
import ShopDetail from './components/ShopDetail.tsx'


export default function App() {

  return (
    <>
    <AuthProvider>
      <Navbar />
      <div className="bg-gray-100">
      <Routes>
        <Route path="/Auth" element={<Auth />} />
        <Route path="/Mypage" element={<Mypage />}></Route>
        {/* <Route path="/Home" element={<Home />} /> */}
        <Route path="/News" element={<News />} />
        <Route path="/Shop" element={<Shop />} />
        <Route path="/Shop/:area/:name" element={<ShopDetail />} />
        <Route path="/Goods" element={<Goods />} />
        {/* <Route path="/Zukan" element={<Zukan />} /> */}
        <Route path="/Mbti" element={<Mbti />} />
       
      </Routes>
      </div>
      <Footer />
      </AuthProvider>
    </>
  )
}