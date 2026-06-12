import { useState } from "react";
import { newsList } from "./NewsData";

export default function News() {
    const [currentPage, setCurrentPage] = useState(1);
    const [activityTerm, setActivityTerm] = useState("all");
    const filteredNews = newsList.filter((item) => {
        if (activityTerm === "all") return true;
        return item.term === activityTerm;
    })
    const itemsPerPage = 3;
    const indexOfFirstItem = (currentPage - 1) * itemsPerPage;
    const indexOfLastItem = indexOfFirstItem + itemsPerPage;
    const currentNews = filteredNews.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredNews.length / itemsPerPage);
    const isNew = (targetDate: string) => {
        const today = new Date();
        const cleanDate = targetDate.replaceAll(".", "-");
        const registeredDate = new Date(cleanDate);
        const diffTime = today.getTime() - registeredDate.getTime();
        const diffDays = diffTime / (1000 * 60 * 60 * 24);
        return diffDays >= 0 && diffDays <= 7;
    }
    
    return (
        <div className="flex flex-col items-center">
            <div className="p-8 w-full max-w-7xl mx-atuo">
                <h2 className="mb-8 text-xl font-bold ">ニュース</h2>

                <div className="flex justify-center gap-2 mb-8">
                    <button
                        onClick={() => setActivityTerm("all")}
                        className={`font-bold btn rounded-3xl ${activityTerm === "all" ? "bg-slate-400 text-white" : "bg-slate-200 text-slate-700"}`}
                    >
                        すべて
                    </button>
                    <button
                        onClick={() => setActivityTerm("game")}
                        className={`font-bold btn rounded-3xl ${activityTerm === "game" ? "bg-slate-400 text-white" : "bg-slate-200 text-slate-700"}`}
                    >
                        ゲーム
                    </button>
                    <button
                        onClick={() => setActivityTerm("app")}
                        className={`font-bold btn rounded-3xl ${activityTerm === "app" ? "bg-slate-400 text-white" : "bg-slate-200 text-slate-700"}`}
                    >
                        アプリ
                    </button>
                    <button
                        onClick={() => setActivityTerm("card")}
                        className={`font-bold btn rounded-3xl ${activityTerm === "card" ? "bg-slate-400 text-white" : "bg-slate-200 text-slate-700"}`}
                    >
                        カード
                    </button>
                    <button
                        onClick={() => setActivityTerm("tv")}
                        className={`font-bold btn rounded-3xl ${activityTerm === "tv" ? "bg-slate-400 text-white" : "bg-slate-200 text-slate-700"}`}
                    >
                        TV／映画
                    </button>
                    <button
                        onClick={() => setActivityTerm("shop")}
                        className={`font-bold btn rounded-3xl ${activityTerm === "shop" ? "bg-slate-400 text-white" : "bg-slate-200 text-slate-700"}`}
                    >
                        ショップ
                    </button>
                    <button
                        onClick={() => setActivityTerm("event")}
                        className={`font-bold btn rounded-3xl ${activityTerm === "event" ? "bg-slate-400 text-white" : "bg-slate-200 text-slate-700"}`}
                    >
                        イベント
                    </button>
                    <button
                        onClick={() => setActivityTerm("campaign")}
                        className={`font-bold btn rounded-3xl ${activityTerm === "campaign" ? "bg-slate-400 text-white" : "bg-slate-200 text-slate-700"}`}
                    >
                        キャンペーン
                    </button>
                    <button
                        onClick={() => setActivityTerm("important")}
                        className={`font-bold btn rounded-3xl ${activityTerm === "important" ? "bg-slate-400 text-white" : "bg-slate-200 text-slate-700"}`}
                    >
                        重要なお知らせ
                    </button>
                    <button
                        onClick={() => setActivityTerm("anniversary")}
                        className={`font-bold btn rounded-3xl ${activityTerm === "anniversary" ? "bg-slate-400 text-white" : "bg-slate-200 text-slate-700"}`}
                    >
                        30th
                    </button>
                </div>

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