
export default function Navbar() {

  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        {/* 아래 코드는 Navbar의 모바일 버전에서 햄버거 메뉴로 사용될 부분이고 기획상에는 존재하지 않는 부분입니다. 현재는 주석 처리되어 있습니다.
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content text-red-500 rounded-box z-1 mt-3 w-52 p-2 shadow">
            <li><a>ホーム</a></li>
            <li><a>ニュース</a></li>
            <li><a>ショップ</a></li>
            <li><a>グッズ</a></li>
            <li><a>図鑑</a></li>
            <li><a>診断</a></li>
          </ul>
        </div> */}
        <p className="text-2xl font-bold text-red-500">Pokémon</p>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li><a className="hover:text-red-500">ホーム</a></li>
          <li><a className="hover:text-red-500">ニュース</a></li>
          <li><a className="hover:text-red-500">ショップ</a></li>
          <li><a className="hover:text-red-500">グッズ</a></li>
          <li><a className="hover:text-red-500">図鑑</a></li>
          <li><a className="hover:text-red-500">診断</a></li>
        </ul>
      </div>
      <div className="navbar-end">
        <a className="btn bg-red-600 text-white hover:bg-red-400">ログイン</a>
      </div>
    </div>

  )
}