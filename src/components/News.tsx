
export default function News() {
    // 📦 1. 알맹이(데이터)들을 배열 안에 예쁘게 모아둡니다.
    const newsList = [
        {
            id: 1,
            title: "ピカチュウのふかふかぬいぐるみ",
            desc: "抱きしめ心地抜群のピカチュウぬいぐるみです。",
            img: "https://www.pokemon.co.jp/PostImages/5a6d21a42481b1942d8583f8198d9b01d7343845.png"
        },
        {
            id: 2,
            title: "モンスターボール型ワイヤレス充電器",
            desc: "デスク周りを楽しく彩るワイヤレス充電器です。",
            img: "https://www.pokemon.co.jp/PostImages/5a6d21a42481b1942d8583f8198d9b01d7343845.png"
        },
        {
            id: 3,
            title: "カビゴンの特大クッション",
            desc: "一日中ゴロゴロしたくなる特大クッションです。",
            img: "https://www.pokemon.co.jp/PostImages/5a6d21a42481b1942d8583f8198d9b01d7343845.png"
        }
    ];

    // pagination 미적용 상태
    return (
        <div className="p-8 bg-base-200 min-h-screen">
            <h2 className="mb-8 text-xl font-bold ">ニュース</h2>

            <div className="flex flex-wrap gap-8">

                {/* 🔄 2. map 함수 등판! 배열을 돌면서 카드를 자동 완성합니다. */}
                {newsList.map((item) => (
                    <div key={item.id} className="card bg-base-100 w-96 shadow-sm hover:-translate-y-2 hover:shadow-md transition-all duration-300 cursor-pointer">
                        <figure>
                            <img
                                src={item.img}
                                alt={item.title} />
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title">{item.title}</h2>
                            <p>{item.desc}</p>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    )
}