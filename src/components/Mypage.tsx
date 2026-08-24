import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useAuth } from '../context/AuthContext'

export default function Mypage() {
    const { user, setUser } = useAuth();
    const navigate = useNavigate();

    const [nickname, setNickname] = useState('')
    const [currentPassword, setCurrentPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [message, setMessage] = useState<string | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [saving, setSaving] = useState(false)

    // AuthProvider가 /auth/status를 비동기로 불러오기 때문에, user가 늦게 채워질 수 있어 useEffect로 동기화
    useEffect(() => {
        if (user) {
            setNickname(user.name);
        }
    }, [user]);

    const handleSave = async () => {
        setMessage(null);
        setError(null);

        if (!user) {
            setError('ログインが必要です。');
            return;
        }

        setSaving(true);

        try {
            // 닉네임(이름) 변경. 이메일은 화면에서 수정 불가라 기존 값 그대로 같이 보냄 (/auth/update가 email+name을 같이 요구함)
            if (nickname !== user.name) {
                const res = await axios.post(
                    'http://localhost:8081/auth/update',
                    { email: user.email, name: nickname },
                    { withCredentials: true }
                );

                if (res.data.success) {
                    setUser({
                        id: user.id,
                        email: res.data.data.email,
                        name: res.data.data.name,
                    });
                }
            }

            // 새 비밀번호를 입력했을 때만 비밀번호 변경 시도
            if (newPassword) {
                if (!currentPassword) {
                    setError('現在のパスワードを入力してください。');
                    setSaving(false);
                    return;
                }

                await axios.post(
                    'http://localhost:8081/auth/resetPassword',
                    { currentPassword, newPassword },
                    { withCredentials: true }
                );

                // 서버가 비밀번호 변경 후 세션을 무효화하므로, 재로그인 페이지로 이동
                setUser(null);
                navigate('/Auth');
                return;
            }

            setMessage('保存しました。');
        } catch (err) {
            if (axios.isAxiosError(err)) {
                setError(err.response?.data?.message ?? '保存に失敗しました。');
            } else {
                setError('保存に失敗しました。');
            }
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="p-8 min-h-screen">
            <div className="max-w-2xl mx-auto">
                <div className="bg-white rounded-2xl p-10 shadow-sm flex flex-col gap-8">

                    {(message || error) && (
                        <div
                            className={`text-sm rounded-lg px-4 py-2 ${error ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'
                                }`}
                        >
                            {error ?? message}
                        </div>
                    )}

                    {/* 닉네임 */}
                    <div className="flex flex-col gap-2">
                        <label className="font-semibold">ニックネーム</label>
                        <input
                            type="text"
                            className="input input-bordered w-full"
                            value={nickname}
                            onChange={(e) => setNickname(e.target.value)}
                        />
                    </div>

                    {/* 이메일 (변경 불가) */}
                    <div className="flex flex-col gap-2">
                        <label className="font-semibold">
                            メールアドレス
                            <span className="text-red-500 text-xs ml-1">- 変更不可</span>
                        </label>
                        <input
                            type="email"
                            className="input input-bordered w-full bg-gray-100 cursor-not-allowed"
                            value={user?.email ?? ''}
                            disabled
                        />
                    </div>

                    {/* 현재 비밀번호 */}
                    <div className="flex flex-col gap-2">
                        <label className="font-semibold">現在のパスワード</label>
                        <input
                            type="password"
                            className="input input-bordered w-full"
                            placeholder="パスワードを変更する場合のみ入力"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                        />
                    </div>

                    {/* 새 비밀번호 */}
                    <div className="flex flex-col gap-2">
                        <label className="font-semibold">新しいパスワード</label>
                        <input
                            type="password"
                            className="input input-bordered w-full"
                            placeholder="変更する場合のみ入力"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                    </div>

                    {/* 버튼 */}
                    <div className="flex gap-4">
                        <button
                            className="btn bg-red-600 text-white flex-1 text-base"
                            onClick={handleSave}
                            disabled={saving}
                        >
                            保存する
                        </button>
                        <button className="btn btn-outline flex-1 text-base" onClick={() => navigate('/')}>
                            キャンセル
                        </button>
                    </div>

                </div>
            </div>
        </div>
    )
}
