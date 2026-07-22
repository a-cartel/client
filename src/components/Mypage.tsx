import { useState } from 'react'
import { useAuth } from '../context/AuthContext'

export default function Mypage() {
    const [nickname, setNickname] = useState('サトシ')
    const [password, setPassword] = useState('')
    // const [previewImg, setPreviewImg] = useState<string | null>(null)

    const { setUser } = useAuth();

    return (
        <div className="p-8 min-h-screen">
            <div className="max-w-2xl mx-auto">

                {/* 제목 */}
                {/* <div className="flex items-center gap-3 mb-8">
                    <div className="w-1 h-8 bg-red-600 rounded"></div>
                    <h2 className="text-3xl font-bold">プロフィール編集</h2>
                    <span className="text-gray-400 text-sm">（프로필 정보 수정）</span>
                </div> */}

                {/* 카드 */}
                <div className="bg-white rounded-2xl p-10 shadow-sm flex flex-col gap-8">

                    {/* 프로필 이미지 */}
                    {/* <div className="flex flex-col gap-2">
                        <label className="font-semibold">
                            プロフィール画像
                            {/* <span className="text-gray-400 text-xs ml-2">（프로필 이미지）</span> */}
                        {/* </label>
                        <div className="flex items-center gap-4">
                            <div className="w-20 h-20 rounded-lg bg-gray-200 flex items-center justify-center overflow-hidden">
                                {previewImg ? ( */}
                                    {/* <img src={previewImg} alt="preview" className="w-full h-full object-cover" />
                                ) : (
                                    <span className="text-gray-400 text-sm">Image</span>
                                )}
                            </div>
                            <label className="btn btn-outline cursor-pointer">
                                画像を選択
                                {/* （이미지 선택） */}
                                {/* <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleImageChange}
                                />
                            </label>
                        </div>
                    </div> */}

                    {/* 닉네임 */}
                    <div className="flex flex-col gap-2">
                        <label className="font-semibold">
                            ニックネーム
                            {/* <span className="text-gray-400 text-xs ml-2">（닉네임）</span> */}
                        </label>
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
                            {/* <span className="text-gray-400 text-xs ml-2">（이메일）</span> */}
                            <span className="text-red-500 text-xs ml-1">- 変更不可</span>
                        </label>
                        <input
                            type="email"
                            className="input input-bordered w-full bg-gray-100 cursor-not-allowed"
                            placeholder="example@pokemon.com"
                            disabled
                        />
                    </div>

                    {/* 새 비밀번호 */}
                    <div className="flex flex-col gap-2">
                        <label className="font-semibold">
                            新しいパスワード
                            {/* <span className="text-gray-400 text-xs ml-2">（새 비밀번호）</span> */}
                        </label>
                        <input
                            type="password"
                            className="input input-bordered w-full"
                            // placeholder="変更する場合のみ入力（변경할 경우에만 입력）"
                            placeholder="変更する場合のみ入力"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    {/* 버튼 */}
                    <div className="flex gap-4">
                        <button className="btn bg-red-600 text-white flex-1 text-base">
                            保存する
                            {/* （저장하기） */}
                        </button>
                        <button className="btn btn-outline flex-1 text-base">
                            キャンセル
                            {/* （취소） */}
                        </button>
                    </div>

                </div>
            </div>
        </div>
    )
}
