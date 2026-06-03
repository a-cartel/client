export default function ShopDetail() {

    return (

        // max-w-4xl 최대 너비 제한, mx-auto 좌우 가운데 정렬, px-4 좌우 안쪽 여백, flex flex-col 세로 정렬 상자, gap-6 요소 사이의 간격
        <div className="container mx-auto max-w-4xl px-4 flex flex-col gap-6">

            {/* 뒤로가기 버튼 */}
            <div className="flex flex-col gap-1">
                <a href="/shop" className="link link-hover text-sm text-red-600">
                    ← 店舗一覧へ戻る
                </a>
                <h1 className="text-2xl font-bold mt-2">ポケモンセンターサッポロ</h1>
            </div>

            {/* 상점 이미지 */}
            <div className="card bg-base-100 shadow-md rounded-2xl overflow-hidden p-0">
                <div className="aspect-[2/1] relative">
                    <img
                        src="https://shop.pokemon.co.jp/ja/shop/pokemonstore-new-chitose-airport/images/mv/mv-pokemonstore-new-chitose-airport-001.webp"
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                </div>
            </div>

            {/* 상점 상세 정보: bg-base-100 하얀 배경, shadow-md 부드러운 그림자, p-6 안쪽 여백 */}
            <div className="card bg-base-100 shadow-md rounded-2xl p-6">

                <h2 className="text-xl font-bold mb-4">店舗情報</h2>
                <hr className="border-base-200 mb-6" />

                {/* 화면이 넓을 때는 2열(grid-cols-2), 좁을 때는 1열 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 text-sm">

                    {/* 왼쪽 라인 */}
                    <div className="flex flex-col gap-4">
                        <div className="flex">
                            <span className="font-bold w-24 shrink-0">営業時間</span>
                            <span className="text-base-content/80">10:00 – 20:00</span>
                        </div>
                        <div className="flex">
                            <span className="font-bold w-24 shrink-0">定休日</span>
                            <span className="text-base-content/80">施設休館日に準ずる</span>
                        </div>
                        <div className="flex">
                            <span className="font-bold w-24 shrink-0">住所</span>
                            <span className="text-base-content/80">
                                北海道札幌市中央区北5条西2丁目 札幌ステラプレイス 8階
                            </span>
                        </div>
                    </div>

                    {/* 오른쪽 라인 */}
                    <div className="flex flex-col gap-4">
                        <div className="flex">
                            {/* w-24 너비 고정, shrink-0 화면이 좁아져도 글자가 찌그러지지 않음 */}
                            <span className="font-bold w-24 shrink-0">電話番号</span>
                            <span className="text-slate-500">011-213-1771</span>
                        </div>
                        <div className="flex">
                            <span className="font-bold w-24 shrink-0">アクセス</span>
                            <span className="text-slate-500">JR札幌駅直結、徒歩1分</span>
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

                    {/* AI가 추천해줘서 그냥 나둬본 포케몬 시그니처 색상 (나중에 바꾸든지 가능) */}
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

                {/* md:grid-cold-3 리뷰 가로 배치 */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                    {/* 나중에 반복문 써서 바꾸기 */}
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

    )

}