import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

// 백엔드 데이터 구조에 맞춘 타입 정의
export interface ShopList {
    shopName: string;
    shopAddress: string;
    shopAccess: string;
    shopHoliday: string;
    shopHours: string;
    shopPhone: string;
    shopImg: string;
}

export default function ShopDetail() {
    const { id } = useParams();
    const [currentShop, setCurrentShop] = useState<ShopList | null>(null); //DB 데이터를 담을 state 선언 (기본값 null)

    //axios 요청
    useEffect(() => {
        if (!id) return;
        
            axios
                .get<ShopList>(`http://localhost:8081/shop/${id}`)
                .then((res) => {
                    setCurrentShop(res.data);
                })
                .catch((error) => {
                    console.error("상점 상세정보 로드 실패💥", error);
                });
    }, [id]); // id가 변경될 때마다 호출

    //useEffect로 데이터를 가져오고, currentShop이 null이면 안내 내용 표시
    if (!currentShop) {
        return <div className="p-10 text-center">商店が見つかりませんでした。</div>;
    }

    return (
        <div className="container mx-auto max-w-4xl px-4 flex flex-col gap-6 py-10">
            {/* 뒤로가기 & 상점 이름 */}
            <div className="flex flex-col gap-1">
                <Link to="/Shop" className="text-red-500 font-bold hover:underline">
                    ← 店舗一覧へ戻る
                </Link>
                <h1 className="text-2xl font-bold mt-2">{currentShop.shopName}</h1>
            </div>

            {/* 상점 이미지 */}
            <div className="card bg-base-100 shadow-md rounded-2xl overflow-hidden p-0">
                <div className="aspect-[2/1] relative">
                    <img
                        src={currentShop.shopImg} 
                        className="absolute inset-0 w-full h-full object-cover"
                        alt={currentShop.shopName}
                    />
                </div>
            </div>

            {/* 상점 상세 정보 */}
            <div className="card bg-base-100 shadow-md rounded-2xl p-6">
                <h2 className="text-xl font-bold mb-4">店舗情報</h2>
                <hr className="border-base-200 mb-6" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 text-sm">
                    <div className="flex flex-col gap-4">
                        <div className="flex">
                            <span className="font-bold w-24 shrink-0">営業時間</span>
                            <span className="text-base-content/80">{currentShop.shopHours}</span> 
                        </div>
                        <div className="flex">
                            <span className="font-bold w-24 shrink-0">定休日</span>
                            <span className="text-base-content/80">{currentShop.shopHoliday}</span>
                        </div>
                        <div className="flex">
                            <span className="font-bold w-24 shrink-0">住所</span>
                            <span className="text-base-content/80">{currentShop.shopAddress}</span>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4">
                        <div className="flex">
                            <span className="font-bold w-24 shrink-0">電話番号</span>
                            <span className="text-slate-500">{currentShop.shopPhone}</span>
                        </div>
                        <div className="flex">
                            <span className="font-bold w-24 shrink-0">アクセス</span>
                            <span className="text-slate-500">{currentShop.shopAccess}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* 리뷰 작성 */}
            <div className="card bg-base-100 shadow-md rounded-2xl p-6">
                <h2 className="text-xl font-bold mb-6">レビューを書く</h2>

                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <span className="text-sm font-semibold text-base-content/70">評価 (星の数)</span>
                        {/* daisyUI 별점 컴포넌트 */}
                        <div className="rating rating-md">
                            <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                            <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                            <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                            <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                            <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" defaultChecked />
                        </div>
                    </div>

                    {/* 리뷰 내용 입력 */}
                    <div className="flex flex-col gap-2">
                        <span className="text-sm font-semibold text-base-content/70">レビュー内容</span>
                        <textarea
                            className="textarea textarea-bordered h-32 w-full resize-none focus:outline-none focus:border-primary text-base"
                            placeholder="訪問の感想を自由に書いてください。"
                        ></textarea>
                    </div>

                    {/* 포켓몬 시그니처 레드 버튼 */}
                    <button className="btn bg-[#E60012] hover:bg-[#B8000E] text-white border-none w-full md:w-32 self-end mt-2">
                        レビューを投稿
                    </button>
                </div>
            </div>

            {/* 리뷰 모음 */}
            <div className="card bg-base-100 shadow-md rounded-2xl p-6 mb-10">
                {/* 총 평점 */}
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-xl font-bold">会員レビュー</h2>
                    <div className="flex items-center gap-2">
                        <span className="text-orange-400 text-lg">★</span>
                        <span className="font-bold text-lg">4.7 / 5.0</span>
                    </div>
                </div>

                {/* md:grid-cols-3 리뷰 가로 배치 */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                        { name: '会員', date: '2026.05.05', rating: 5, content: '札幌駅と直結していて迷わずに行けました！' },
                        { name: '会員', date: '2026.05.04', rating: 5, content: '広々としていて快適な店舗です。' },
                        { name: '会員', date: '2026.05.03', rating: 4, content: '週末は少し人が多いです。' }
                    ].map((review, idx) => (
                        <div key={idx} className="bg-base-200/50 rounded-xl p-5 flex flex-col gap-3">
                            <div className="flex justify-between items-start">
                                <div className="flex flex-col">
                                    <span className="font-bold text-sm">{review.name}</span>
                                    <span className="text-xs text-base-content/50">{review.date}</span>
                                </div>
                                <div className="flex text-orange-400 text-xs">
                                    {"★".repeat(review.rating)}
                                </div>
                            </div>
                            <p className="text-sm leading-relaxed text-base-content/80">
                                {review.content}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
            
        </div>
    );
}