import { useState } from 'react'

export default function MyPage() {
    const [isEditing, setIsEditing] = useState(false)
    const [nickname, setNickname] = useState('トレーナー')
    const [email, setEmail] = useState('trainer@pokemon.com')
    const [bio, setBio] = useState('ポケモンマスターを目指しています！')

    return (
        <div className="p-8 min-h-screen">
            <div className="max-w-3xl mx-auto">

                {/* 프로필 카드 */}
                <div className="card bg-base-100 shadow-sm mb-6">
                    <div className="card-body">
                        <div className="flex items-center gap-6">

                            {/* 아바타 */}
                            <div className="avatar">
                                <div className="w-24 rounded-full ring ring-red-500 ring-offset-2">
                                    <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" alt="avatar" />
                                </div>
                            </div>

                            {/* 이름 & 이메일 */}
                            <div className="flex flex-col gap-1">
                                <h2 className="text-2xl font-bold">{nickname}</h2>
                                <p className="text-sm text-gray-500">{email}</p>
                                <p className="text-sm text-gray-400">{bio}</p>
                            </div>

                            {/* 편집 버튼 */}
                            <button
                                className="btn btn-sm ml-auto"
                                onClick={() => setIsEditing(!isEditing)}
                            >
                                {isEditing ? '閉じる' : '編集'}
                            </button>
                        </div>

                        {/* 편집 폼 */}
                        {isEditing && (
                            <div className="flex flex-col gap-4 mt-6">
                                <input
                                    type="text"
                                    placeholder="ニックネーム"
                                    className="input input-bordered w-full"
                                    value={nickname}
                                    onChange={(e) => setNickname(e.target.value)}
                                />
                                <input
                                    type="email"
                                    placeholder="メールアドレス"
                                    className="input input-bordered w-full"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <textarea
                                    placeholder="自己紹介"
                                    className="textarea textarea-bordered w-full"
                                    value={bio}
                                    onChange={(e) => setBio(e.target.value)}
                                />
                                <div className="flex justify-end">
                                    <button
                                        className="btn bg-red-600 text-white"
                                        onClick={() => setIsEditing(false)}
                                    >
                                        保存
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* 통계 카드 */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="card bg-base-100 shadow-sm">
                        <div className="card-body items-center text-center">
                            <h3 className="text-3xl font-bold text-red-500">152</h3>
                            <p className="text-sm text-gray-500">捕まえたポケモン</p>
                        </div>
                    </div>
                    <div className="card bg-base-100 shadow-sm">
                        <div className="card-body items-center text-center">
                            <h3 className="text-3xl font-bold text-red-500">48</h3>
                            <p className="text-sm text-gray-500">バトル勝利</p>
                        </div>
                    </div>
                    <div className="card bg-base-100 shadow-sm">
                        <div className="card-body items-center text-center">
                            <h3 className="text-3xl font-bold text-red-500">7</h3>
                            <p className="text-sm text-gray-500">バッジ獲得</p>
                        </div>
                    </div>
                </div>

                {/* 최근 활동 */}
                <div className="card bg-base-100 shadow-sm">
                    <div className="card-body">
                        <h3 className="text-lg font-bold mb-4">最近の活動</h3>
                        <ul className="flex flex-col gap-3">
                            {[
                                { text: 'ピカチュウをゲットした！', time: '2時間前' },
                                { text: 'ジムリーダーに勝利した！', time: '1日前' },
                                { text: 'カビゴンと友達になった！', time: '3日前' },
                            ].map((activity, index) => (
                                <li key={index} className="flex justify-between items-center border-b pb-2 last:border-none">
                                    <span className="text-sm">{activity.text}</span>
                                    <span className="text-xs text-gray-400">{activity.time}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

            </div>
        </div>
    )
}