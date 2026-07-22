import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
  const { user, loading } = useAuth();

  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <p className="text-2xl font-bold text-red-500">Pokémon</p>
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
          <li>
            <Link className="relative hover:bg-transparent hover:text-red-500 group" to="/MBTI">
              診断
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        {loading ? null : user ? (
          <span className="text-red-500 font-semibold">{user.email}</span>
        ) : (
          <Link className="btn bg-red-600 text-white hover:bg-red-400" to="/Auth">
            ログイン
          </Link>
        )}
      </div>
    </div>

  )
}