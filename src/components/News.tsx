import React, { useEffect, useState } from "react";
import axios from "axios"; // 소문자 axios가 표준적인 import 방식

    // 백엔드에서 날라오는 JSON 데이터 타입 정의
    export interface NewsList { 
        newsDate: string; // Java의 LocalDateTime은 보통 Typescript의 string으로 받음
        newsId: number;
        newsImg: string; 
        newsTitle: string;
        newsType: string;
        newsUrl: string;
    }   

export default function News() {

    const [dbNewsList, setDbNewsList] = useState<NewsList[]>([]); // 백엔드에서 받아온 뉴스 데이터

    // const [currentPage, setCurrentPage] = useState(1);
    const [activityTerm, setActivityTerm] = useState("all");

    // 백엔드에서 뉴스 데이터를 가져오는 useEffect
    useEffect(() => {
        axios.get<NewsList[]>("http://192.168.0.42:8080/news") // 백엔드에서 뉴스 데이터를 가져오는 API 호출 (임시로 로컬 DB에서 불러오게끔 처리)
            .then((response) => {
                setDbNewsList(response.data); // 받아온 데이터를 상태에 저장
            })
            .catch((error) => { 
                console.error("데이터 로드 실패💥", error);
            });
    }, []); // 끝에 빈 배열 [] 을 넣어두면 화면이 켜질 때 '딱 한 번'만 실행 (useState가 아무리 값을 다시 읽어들이더라도)

    // 기존 필터 로직에서 newsList 대신 dbNewsList를 사용하고, 백엔드 필드명(newsType, newsTitle 등)으로 매핑
    const filteredNews = dbNewsList.filter((item) => {
        if (activityTerm === "all") return true;
        return item.newsType === activityTerm;
    });

    // Pagination을 위한 밑작업
    // const itemsPerPage = 3;
    // const indexOfFirstItem = (currentPage - 1) * itemsPerPage;
    // const indexOfLastItem = indexOfFirstItem + itemsPerPage;
    // const currentNews = filteredNews.slice(indexOfFirstItem, indexOfLastItem);
    // const totalPages = Math.ceil(filteredNews.length / itemsPerPage);

    // New 태그를 위한 밑작업
    const isNew = (targetDate: string) => {
        if (!targetDate) return false;
        const today = new Date();
        // Java의 LocalDateTime은 보통 2026-07-20T12:00:00 형태로 와서 'T' 기준으로 날짜만 자름.
        const cleanDate = targetDate.split('T')[0]; 
        const registeredDate = new Date(cleanDate);
        const diffTime = today.getTime() - registeredDate.getTime();
        const diffDays = diffTime / (1000 * 60 * 60 * 24);
        return diffDays >= 0 && diffDays <= 7;
    };

    // 카테고리별 버튼 (기존 유지)
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
    ];

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
                    {filteredNews.map((item) => (
                        <a key={item.newsId} href={item.newsUrl} target="_blank"
                            className="card bg-base-100 shadow-sm hover:-translate-y-2 hover:shadow-md transition-all duration-300 cursor-pointer">
                            <figure>
                                <img
                                    src={item.newsImg}
                                    alt={item.newsTitle} />
                            </figure>
                            <div className="card-body">
                                <h2 className="card-title">{item.newsTitle}</h2>
                                <div>
                                    <span>{item.newsDate}</span>
                                    {isNew(item.newsDate) && <span className="text-red-600 font-bold ml-2">NEW</span>}
                                </div>
                            </div>
                        </a>
                    ))}
                </div>
                
                {/* pagination은 백엔드에서 구현하기로 방향 수정 */}
                {/* <div className="flex justify-center items-center gap-1 mt-8">
                    {[...Array(totalPages).keys()].map((index) => {
                        const pageNumber = index + 1;
                        return (
                            <button
                                key={pageNumber}
                                onClick={() => setCurrentPage(pageNumber)}
                                className={`join-item btn no-animation ${currentPage === pageNumber ? "bg-red-600 text-white" : ""}`}
                            >
                                {pageNumber}    
                            </button>
                        );
                    })}
                </div> */}

            </div>
        </div>
    )
}