import { Routes, Route, Navigate } from 'react-router-dom'

import { AuthProvider, useAuth } from './context/AuthContext.tsx';

import Navbar from './components/NavBar.tsx'
import Footer from './components/footer.tsx'
import Auth from './components/Auth.tsx'
import Mypage from './components/Mypage.tsx'
import News from './components/News.tsx'
import Shop from './components/Shop.tsx'
import Mbti from './components/MbtiStart.tsx'
import Goods from './components/Goods.tsx'
import Zukan from './components/PokeDexMain.tsx'

// ShopDetail은 개발 진행에 따라 제거 될 수 있습니다.
import ShopDetail from './components/ShopDetail.tsx'

function AppRoutes() {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/Auth" element={user ? <Navigate to="/" replace /> : <Auth />} />
      <Route path="/Mypage" element={user ? <Mypage /> : <Navigate to="/Auth" replace />} />
      <Route path="/News" element={<News />} />
      <Route path="/Shop" element={<Shop />} />
      <Route path="/Shop/:area/:name" element={<ShopDetail />} />
      <Route path="/Goods" element={<Goods />} />
      <Route path="/Zukan" element={<Zukan />} />
      <Route path="/Mbti" element={<Mbti />} />
    </Routes>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Navbar />
      <div className="bg-gray-100">
        <AppRoutes />
      </div>
      <Footer />
    </AuthProvider>
  )
}