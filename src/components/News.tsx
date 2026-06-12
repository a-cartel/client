import { useState } from "react";
import { newsList } from "./NewsData";

export default function News() {
    const [currentPage, setCurrentPage] = useState(1);
    const [activityTerm, setActivityTerm] = useState("all");

    // 필터 버튼을 위한 밑작업
    const filteredNews = newsList.filter((item) => {
        if (activityTerm === "all") return true;
        return item.term === activityTerm;
    })

    // Paginatoin을 위한 밑작업
    const itemsPerPage = 3;
    const indexOfFirstItem = (currentPage - 1) * itemsPerPage;
    const indexOfLastItem = indexOfFirstItem + itemsPerPage;
    const currentNews = filteredNews.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredNews.length / itemsPerPage);

    // New 태그를 위한 밑작업
    const isNew = (targetDate: string) => {
        const today = new Date();
        const cleanDate = targetDate.replaceAll(".", "-");
        const registeredDate = new Date(cleanDate);
        const diffTime = today.getTime() - registeredDate.getTime();
        const diffDays = diffTime / (1000 * 60 * 60 * 24);
        return diffDays >= 0 && diffDays <= 7;
    }

    const categories = [
        { id: "all", label: "すべて" },
        { id: "game", label: "ゲーム" },
        { id: "app", label: "アプリ" },
        { id: "card", label: "カード" },
        { id: "tv", label: "TV／映画" },
        { id: "shop", label: "ショップ" },
        { id: "event", label: "イベント" },
        { id: "campaign", label: "キャンペーン" },
        { id: "important", label: "重要なお知らせ" },
        { id: "anniversary", label: "30th" }
    ]

    return (
        <div className="flex flex-col items-center">
            <div className="p-8 w-full max-w-7xl mx-atuo">
                <h2 className="mb-8 text-xl font-bold ">ニュース</h2>

                {/* filter */}
                <div className="flex justify-center gap-2 mb-8">
                    {categories.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => setActivityTerm(cat.id)}
                            className={`font-bold btn rounded-3xl ${activityTerm === cat.id ? "bg-slate-400 text-white" : "bg-slate-200 text-slate-700"
                                }`}
                        >
                            {cat.label}
                        </button>
                    ))
                    }
                </div>

                {/* news */}
                <div className="grid grid-cols-3 gap-8">
                    {currentNews.map((item) => (
                        <a key={item.id} href={item.url} target="_blank"
                            className="card bg-base-100 shadow-sm hover:-translate-y-2 hover:shadow-md transition-all duration-300 cursor-pointer">
                            <figure>
                                <img
                                    src={item.img}
                                    alt={item.title} />
                            </figure>
                            <div className="card-body">
                                <h2 className="card-title">{item.title}</h2>
                                <div>
                                    <span>{item.date}</span>
                                    {isNew(item.date) && <span className="text-red-600 font-bold ml-2">NEW</span>}
                                </div>
                            </div>
                        </a>
                    ))}
                </div>
                
                {/* pagination */}
                <div className="flex justify-center mt-8">
                    {Array.from({ length: totalPages }).map((_, index) => {
                        const pageNumber = index + 1;

                        return (
                            <button
                                key={pageNumber}
                                onClick={() => setCurrentPage(pageNumber)}
                                className={`join-item btn ${currentPage === pageNumber ? "bg-red-600 text-white" : ""}`}
                            >
                                {pageNumber}
                            </button>
                        );
                    })}
                </div>

            </div>
        </div>
    )
}