import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.get('http://localhost:8081/auth/logout', { withCredentials: true });
      setUser(null);
      navigate('/');
    } catch (err) {
      console.error('로그아웃 실패:', err);
    }
  };

  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <Link to="/" className="text-2xl font-bold text-red-500">Pokémon</Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link className="relative hover:bg-transparent hover:text-red-500 group" to="/">
              ホーム
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </li>
          <li>
            <Link className="relative hover:bg-transparent hover:text-red-500 group" to="/News">
              ニュース
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </li>
          <li>
            <Link className="relative hover:bg-transparent hover:text-red-500 group" to="/Shop">
              ショップ
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </li>
          <li>
            <Link className="relative hover:bg-transparent hover:text-red-500 group" to="/Goods">
              グッズ
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </li>
          <li>
            <Link className="relative hover:bg-transparent hover:text-red-500 group" to="/Zukan">
              図鑑
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </li>
          {/* <li>
            <Link className="relative hover:bg-transparent hover:text-red-500 group" to="/MBTI">
              診断
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </li> */}
        </ul>
      </div>
      <div className="navbar-end">
        {user ? (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost text-red-500 font-semibold normal-case"
            >
              ようこそ！　{user.name}
            </div>
            <ul
              tabIndex={0}
              className="menu dropdown-content bg-base-100 rounded-box z-10 mt-3 w-40 p-2 shadow-md"
            >
              <li>
                <Link to="/MyPage">マイページ</Link>
              </li>
              <li>
                <button onClick={handleLogout} className="text-red-500">
                  ログアウト
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <Link className="btn bg-red-600 text-white hover:bg-red-400" to="/Auth">
            ログイン
          </Link>
        )}
      </div>
    </div>
  )
}