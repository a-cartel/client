import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import LoginImg from '../assets/Login.jpg'
import RegisterImg from '../assets/Register.jpg'
import { useAuth } from '../context/AuthContext';

export default function Auth() {
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(true)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [activeTab, setActiveTab] = useState("id")
    const { setUser } = useAuth();

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleRegisterSubmit = async () => {
        console.log(name, email, password)
        try {
            const response = await axios.post("http://localhost:8081/auth/register", {
                name,
                email,
                password,
            }, { withCredentials: true });
            if (response.data.success) {
                setUser({
                    id: response.data.data.id,
                    email: response.data.data.email,
                    name: response.data.data.name,
                });
                navigate('/');
            }
        } catch (err) {
            if (axios.isAxiosError(err)) {
                console.log(err.response)
                console.error("회원가입 실패:", err.response?.data ?? err.message);

                const status = err.response?.status;
                const serverMessage = err.response?.data?.message;

                if (serverMessage) {
                    alert(serverMessage);
                } else if (!err.response) {
                    alert("サーバーに接続できませんでした。");
                } else if (status === 409) {
                    alert("すでに使用されているメールアドレスです。");
                } else {
                    alert("会員登録に失敗しました。");
                }
            } else {
                console.error("알 수 없는 에러:", err);
                alert("会員登録に失敗しました。");
            }
        }
    };

    const handleLoginSubmit = async () => {
        console.log(name, email, password);
        try {
            const response = await axios.post(
                "http://localhost:8081/auth/login",
                {
                    email,
                    password,
                },
                { withCredentials: true }
            );

            console.log("로그인 성공:", response.data);

            if (response.data.success) {
                setUser({
                    id: response.data.data.id,
                    email: response.data.data.email,
                    name: response.data.data.name,
                });
                navigate('/');
            }
        } catch (err) {
            if (axios.isAxiosError(err)) {
                console.log(err.response);
                console.error("로그인 실패:", err);

                const status = err.response?.status;
                const serverMessage = err.response?.data?.message;

                if (serverMessage) {
                    alert(serverMessage);
                } else if (!err.response) {
                    alert("サーバーに接続できませんでした。");
                } else if (status === 400 || status === 401) {
                    alert("メールアドレスまたはパスワードが正しくありません。");
                } else {
                    alert("ログインに失敗しました。");
                }
            } else {
                console.error("알 수 없는 에러:", err);
                alert("ログインに失敗しました。");
            }
        }
    };



    return (
        <div className="p-8">
            <div className="card lg:card-side bg-base-100 shadow-sm max-w-4xl mx-auto">
                <figure className="lg:w-1/2 overflow-hidden">
                    {isLogin && (
                        <img
                            src={LoginImg}
                            className="w-full h-full object-cover"
                            alt="Album" />
                    )}
                    {!isLogin && (
                        <img
                            src={RegisterImg}
                            className="w-full h-full object-cover"
                            alt="Album" />
                    )}
                </figure>
                <div className="card-body flex flex-col items-center justify-center">

                    <div className="tab tab-active text-3xl font-bold mb-4">
                        {isLogin ? "ログイン" : "レジスタ"}
                    </div>

                    {isLogin ? (
                        <div className="flex flex-col gap-4 w-full">
                            <input
                                type="text"
                                placeholder="ID"
                                className="input input-bordered w-full"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                className="input input-bordered w-full"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />

                            {/* <div className="text-right">
                                <span
                                    className="text-sm text-blue-500 cursor-pointer hover:underline"
                                    onClick={() => setIsModalOpen(true)}
                                >
                                    パスワードをお忘れですか？
                                </span>
                            </div> */}

                            {/* 이메일, 비밀번호 찾기 모달 */}
                            {isModalOpen && (
                                <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
                                    <div className="relative bg-white rounded-2xl p-6 w-full max-w-md">
                                        <button
                                            onClick={() => setIsModalOpen(false)}
                                            className="absolute right-4 top-4"
                                        >
                                            ✕
                                        </button>
                                        <h3 className="text-xl font-bold text-center mb-6">アカウント検索</h3>
                                        <div className="flex justify-center">
                                            <button
                                                onClick={() => setActiveTab("id")}
                                                className={`pb-2 px-4 font-bold ${activeTab === "id" ? "text-red-600 border-b-2 border-red-600" : "text-slate-600"}`}
                                            >
                                                IDを探す
                                            </button>
                                            <button
                                                onClick={() => setActiveTab("password")}
                                                className={`pb-2 px-4 font-bold ${activeTab === "password" ? "text-red-600 border-b-2 border-red-600" : "text-slate-600"}`}
                                            >
                                                パスワードを探す
                                            </button>
                                        </div>
                                        {activeTab === "id" ? (
                                            <div className="flex flex-col gap-4 mt-4">
                                                <div>登録したメールアドレス</div>
                                                <input type="email" placeholder="example@pokemon.com" className="input input-bordered w-full" />
                                                <button className="btn bg-red-600 text-white w-full no-animation">IDを検索</button>
                                            </div>
                                        ) : (
                                            <div className="flex flex-col gap-4 mt-4">
                                                <div>ログインID</div>
                                                <input type="id" placeholder="pikachu01" className="input input-bordered w-full" />
                                                <div>登録したメールアドレス</div>
                                                <input type="email" placeholder="example@pokemon.com" className="input input-bordered w-full" />
                                                <button className="btn bg-red-600 text-white w-full no-animation">臨時パスワードを送信</button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                            {/* 모달 끝*/}

                            <div className="card-actions justify-end">
                                <button
                                    className="input input-bordered text-white w-full bg-red-600"
                                    onClick={handleLoginSubmit}
                                >ログイン
                                </button>
                            </div>
                        </div>
                    ) : (
                        /* 회원가입 폼 */
                        <div className="flex flex-col gap-4 w-full">
                            <input
                                type="name"
                                placeholder="name"
                                className="input input-bordered w-full"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <input
                                type="email"
                                placeholder="ID"
                                className="input input-bordered w-full"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <input
                                type="password"
                                placeholder="PASSWORD"
                                className="input input-bordered w-full"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            {/* <input
                                type="password"
                                placeholder="PASSWORD"
                                className="input input-bordered w-full"
                            /> */}
                            <div className="card-actions justify-end">
                                <button
                                    className="input input-bordered text-white w-full bg-red-600"
                                    onClick={handleRegisterSubmit}
                                >登録する</button>
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