import React, { useEffect, useState } from "react";
import axios from "axios"; // 소문자 axios가 표준적인 import 방식

// 백엔드 데이터 구조에 맞춘 타입 정의
export interface NewsList {
  newsDate: string; // Java의 LocalDateTime은 보통 Typescript의 string으로 받음
  newsId: number;
  newsImg: string;
  newsTitle: string;
  newsType: string;
  newsUrl: string;
}

// 백엔드의 Page<NewsEntity> 응답 구조 타입 정의 (백엔드에서 PageModel 형태로 JSON을 받을 경우 page.totalPages로 접근)
export interface PageResponse<T> {
  content: T[];
  page: {
    totalPages: number;
    totalElements: number;
    number: number; // 현재 페이지 번호
    size: number; // 페이지당 데이터 수
  };
}




export default function News() {
  const [dbNewsList, setDbNewsList] = useState<NewsList[]>([]); // 백엔드에서 받아온 뉴스 데이터
  const [currentPage, setCurrentPage] = useState(0); // Spring은 0페이지부터 시작
  const [totalPages, setTotalPages] = useState(0); // 전체 페이지 수 관리

  const [activityTerm, setActivityTerm] = useState("all"); // 현재 활성화된 카테고리 관리

  // 백엔드에서 뉴스 데이터를 가져오는 useEffect
  useEffect(() => {
    // page 파라미터를 넘겨서 백엔드 Pageable과 연동
    axios
      .get<PageResponse<NewsList>>(
        `http://localhost:8081/news?page=${currentPage}&size=9&category=${activityTerm}`,
      ) // 백엔드에서 뉴스 데이터를 가져오는 API 호출 (임시로 로컬 DB에서 불러오게끔 처리)
      .then((response) => {
        setDbNewsList(response.data.content); // content 안의 데이터 추출
        setTotalPages(response.data.page.totalPages); // 전체 페이지 수 저장
      })
      .catch((error) => {
        console.error("데이터 로드 실패💥", error);
      });
  }, [currentPage, activityTerm]); // currentPage 또는 activityTerm 값이 바뀌는 순간 useEffect 내부 코드가 다시 실행

  // 기존 필터 로직에서 newsList 대신 dbNewsList를 사용하고, 백엔드 필드명(newsType, newsTitle 등)으로 매핑
  const filteredNews = dbNewsList.filter((item) => {
    if (activityTerm === "all") return true;
    return item.newsType === activityTerm;
  });

  // Pagination을 위한 밑작업 (구)
  const PAGE_GROUP_SIZE = 10;
  // 현재 페이지가 속한 그룹의 시작 번호와 끝 번호 계산 (1부터 시작하는 페이지 번호 기준)
  const currentGroup = Math.floor(currentPage / PAGE_GROUP_SIZE);
  const startPage = currentGroup * PAGE_GROUP_SIZE + 1; // 예: 1, 11, 21 ...
  const endPage = Math.min(startPage + PAGE_GROUP_SIZE - 1, totalPages); // 예: 10, 20, 30 ... (전체 페이지 수를 넘지 않음)
  // [startPage ... endPage] 범위의 숫자 배열 생성
  const pageNumbers = [];
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }
  // 페이지 변경 함수 (state 변경 및 데이터 재요청)
  const handlePageChange = (newPage: number) => {
    if (newPage < 0 || newPage >= totalPages) return;
    setCurrentPage(newPage);
    // 💡 백엔드에 해당 페이지 데이터를 다시 요청하는 함수가 있다면 여기서 호출해 주세요!
    // 예: fetchNews(newPage);
  };

  // New 태그를 위한 밑작업
  const isNew = (targetDate: string) => {
    if (!targetDate) return false;
    const today = new Date();
    // Java의 LocalDateTime은 보통 2026-07-20T12:00:00 형태로 와서 'T' 기준으로 날짜만 자름.
    const cleanDate = targetDate.split("T")[0];
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
    //{ id: "tv", label: "TV／映画" },
    //{ id: "shop", label: "ショップ" },
    { id: "event", label: "イベント" },
    { id: "campaign", label: "キャンペーン" },
    { id: "important", label: "重要なお知らせ" },
    //{ id: "anniversary", label: "30th" },
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
              onClick={() => {
                setActivityTerm(cat.id);
                setCurrentPage(0); // 카테고리 변경 시 페이지를 0으로 초기화
              }}
              className={`font-bold btn rounded-3xl ${
                activityTerm === cat.id
                  ? "bg-slate-400 text-white"
                  : "bg-slate-200 text-slate-700"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* news */}
        <div className="grid grid-cols-3 gap-8">
          {filteredNews.map((item, index) => (
            <a
              key={index} // 백엔드에서 newsId를 보내주지 않기 때문에 index를 key로 사용
              href={item.newsUrl}
              target="_blank"
              className="card bg-base-100 shadow-sm hover:-translate-y-2 hover:shadow-md transition-all duration-300 cursor-pointer"
            >
              <figure>
                <img src={item.newsImg} alt={item.newsTitle} />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{item.newsTitle}</h2>
                <div>
                  <span>{item.newsDate}</span>
                  {isNew(item.newsDate) && (
                    <span className="text-red-600 font-bold ml-2">NEW</span>
                  )}
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center my-8">
          <div className="join">
            <button
              className="join-item btn btn-outline btn-sm"
              disabled={startPage === 1}
              onClick={() => handlePageChange(startPage - 2)}
            >
              前へ
            </button>

            {pageNumbers.map((page) => (
              <button
                key={page}
                className={`join-item btn btn-sm ${
                  currentPage === page - 1
                    ? "btn-active btn-primary"
                    : "btn-outline"
                }`}
                onClick={() => handlePageChange(page - 1)}
              >
                {page}
              </button>
            ))}

            <button
              className="join-item btn btn-outline btn-sm"
              disabled={endPage >= totalPages}
              onClick={() => handlePageChange(endPage)}
            >
              次へ
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
