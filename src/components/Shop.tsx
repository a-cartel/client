export default function Shop() {
    const storeList = [
        {
            id: 1,
            name: "ポケモンストア 新千歳空港店",
            address: "北海道千歳市美々987 新千歳空港国内線ターミナルビル2階",
            hours: "10:00 〜 20:00",
            holiday: "年中無休",
            access: "JR 新千歳空港駅 徒歩すぐ",
            image: "https://shop.pokemon.co.jp/ja/shop/pokemonstore-new-chitose-airport/images/mv/mv-pokemonstore-new-chitose-airport-001.webp"
        },
        {
            id: 2,
            name: "ポケモンセンタートウキョーベイ",
            address: "千葉県船橋市浜町2-1-1 三井ショッピングパーク ららぽーとTOKYO-BAY 西館2階",
            hours: "10:00 〜 20:00",
            holiday: "施設休業日に準ずる",
            access: "JR 南船橋駅 徒歩約5分",
            image: "https://shop.pokemon.co.jp/ja/shop/pokemoncenter-tokyobay/images/mv/mv-pokemoncenter-tokyobay-001.webp"
        }
    ];

    return (
        <div className="p-8 bg-base-200 min-h-screen">
            <h2 className="mb-8 text-xl font-bold ">ショップ</h2>

            <div className="flex flex-wrap gap-8">

                {storeList.map((store) => (
                    <div key={store.id} className="card bg-base-100 w-96 shadow-sm">
                        <figure>
                            <img
                                src={store.image}
                                alt={store.name} />
                        </figure>

                        <div className="card-body p-6">
                            <h2 className="card-title text-xl font-bold text-slate-800 mb-1">{store.name}</h2>
                            <p className="text-sm text-slate-400 mb-4">{store.address}</p>

                            <div className="bg-slate-50 rounded-xl p-4 text-xs text-slate-600 flex flex-col gap-2">
                                <div className=" flex">
                                    <span className="w-16 font-bold text-slate-500">営業時間</span>
                                    <span>{store.hours}</span>
                                </div>
                                <div className="flex">
                                    <span className="w-16 font-bold text-slate-500">定休日</span>
                                    <span>{store.holiday}</span>
                                </div>
                                <div className="flex">
                                    <span className="w-16 font-bold text-slate-500">アクセス</span>
                                    <span className="flex-1">{store.access}</span>
                                </div>
                            </div>

                            <div className="mt-4 text-sm font-bold text-red-600 flex item-center gap-1 hover:underline cursor-pointer">
                                <span>詳しく見る ➜</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    )
}