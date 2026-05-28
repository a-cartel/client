import { useState } from 'react'
import LoginImg from '../assets/Login.jpg'
import RegisterImg from '../assets/Register.jpg'

// 861 927
export default function Auth() {
    const [isLogin, setIsLogin] = useState(true)
    const [isModalOpen, setIsModalOpen] = useState(false)

    return (
        <div className="p-8">
            <div className="card lg:card-side bg-base-100 shadow-sm max-w-4xl mx-auto">
                <figure className="lg:w-1/2 overflow-hidden">
                    {isLogin && (
                        <img
                            // src="https://img.daisyui.com/images/stock/photo-1494232410401-ad00d5433cfa.webp"
                            src={LoginImg}
                            className="w-full h-full object-cover"
                            alt="Album" />
                    )}
                    {!isLogin && (
                        <img
                            // src="https://img.daisyui.com/images/stock/photo-1494232410401-ad00d5433cfa.webp"
                            src={RegisterImg}
                            className="w-full h-full object-cover"
                            alt="Album" />
                    )}
                    {/* <img
                    // src="https://img.daisyui.com/images/stock/photo-1494232410401-ad00d5433cfa.webp"
                    src={LoginImg}
                    className="w-full h-full object-cover"
                    alt="Album" /> */}
                </figure>
                <div className="card-body flex flex-col items-center justify-center">

                    {isLogin && (
                        <div className="tab tab-active text-3xl font-bold mb-4">
                            ログイン
                        </div>
                    )}
                    {!isLogin && (
                        <div className="tab tab-active text-3xl font-bold mb-4">
                            レジスタ
                        </div>
                    )}

                    {isLogin ? (
                        <div className="flex flex-col gap-4 w-full">
                            <input
                                type="text"
                                placeholder="ID"
                                className="input input-bordered w-full"
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                className="input input-bordered w-full"
                            />

                            <div className="text-right">
                                <span
                                    className="text-sm text-blue-500 cursor-pointer hover:underline"
                                    onClick={() => setIsModalOpen(true)}
                                >
                                    パスワードをお忘れですか？
                                </span>
                            </div>

                            {/* 청하님 파트 이메일&비밀번호 찾기 파트(모달) ---------------------------------------------- */}

                            {/* 모달 예시 */}
                            {isModalOpen && (
                                <div className="modal modal-open">
                                    <div className="modal-box">
                                        <h3 className="font-bold text-lg">パスワードをお忘れですか？</h3>
                                        <p className="py-4">登録したメールアドレスを入力してください。</p>
                                        <input
                                            type="email"
                                            placeholder="メールアドレス"
                                            className="input input-bordered w-full"
                                        />
                                        <div className="modal-action">
                                            <button className="btn btn-primary">送信</button>
                                            <button className="btn" onClick={() => setIsModalOpen(false)}>閉じる</button>
                                        </div>
                                    </div>
                                    <div className="modal-backdrop" onClick={() => setIsModalOpen(false)} />
                                </div>
                            )}

                            {/* 청하님 파트 이메일&비밀번호 찾기 파트(모달) ---------------------------------------------- */}

                            <div className="card-actions justify-end">
                                <button className="input input-bordered text-white w-full bg-red-600">登録する</button>
                            </div>
                        </div>
                    ) : (
                        /* 회원가입 폼 */
                        <div className="flex flex-col gap-4 w-full">
                            <input
                                type="email"
                                placeholder="ID"
                                className="input input-bordered w-full"
                            />
                            <input
                                type="password"
                                placeholder="PASSWORD"
                                className="input input-bordered w-full"
                            />
                            <input
                                type="password"
                                placeholder="PASSWORD"
                                className="input input-bordered w-full"
                            />
                            <div className="card-actions justify-end">
                                <button className="input input-bordered text-white w-full bg-red-600">ログイン</button>
                            </div>
                        </div>
                    )}

                    <button
                        className="text-center mt-2 text-sm hover:underline"
                        onClick={() => setIsLogin(!isLogin)}
                    >
                        {isLogin ? (
                            <><span className="text-red-500">アカウント</span>をお持ちでないですか？</>
                        ) : (
                            <><span className="text-red-500">アカウント</span>をお持ちですか？</>
                        )}
                    </button>
                </div>
            </div>
        </div>
    )
}
