import { useEffect, useState } from "react";
import axios from "axios";

export interface GoodsList {
  goodsId: number;
  goodsUrl: string;
  goodsTitle: string;
  goodsDate: string;
  goodsImg: string;
}

export default function Goods() {
  const [goodsList, setGoodsList] = useState<GoodsList[]>([]);

  useEffect(() => {
    axios
      .get<GoodsList[]>("http://localhost:8081/goods")
      .then((response) => {
        setGoodsList(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("データロードに失敗💥:　", error);
      });
  }, []);

  // pagination 밑작업
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 16;
  const indexOfFirstItem = (currentPage - 1) * itemsPerPage;
  const indexOfLastItem = indexOfFirstItem + itemsPerPage;
  const currentGoods = goodsList.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(goodsList.length / itemsPerPage);

  const pageBlockSize = 10; // 한 번에 표시할 페이지 버튼 개수 (예: 5개씩 -> 1~5, 6~10)
  const currentBlock = Math.ceil(currentPage / pageBlockSize); // 현재 몇 번째 블록인지 계산

  const startPage = (currentBlock - 1) * pageBlockSize + 1; // 시작 페이지 번호 (예: 1, 6, 11)
  const endPage = Math.min(startPage + pageBlockSize - 1, totalPages); // 끝 페이지 번호

  // 현재 화면에 표시할 페이지 번호 배열 생성 (예: [1, 2, 3, 4, 5])
  const visiblePages = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i,
  );

  // New 태그 밑작업
  const isNew = (targetDate: string) => {
    const today = new Date();
    const cleanDate = targetDate.split(".").join("-");
    const registeredDate = new Date(cleanDate);
    const diffTime = today.getTime() - registeredDate.getTime();
    const diffDays = diffTime / (1000 * 60 * 60 * 24);
    return diffDays >= 0 && diffDays <= 7;
  };

  return (
    <div className="flex flex-col items-center w-full">
      <div className="p-8 w-full max-w-7xl mx-atuo">
        <h2 className="mb-8 text-xl font-bold ">グッズ</h2>

        {/* news */}
        {/* 목록을 한 줄에 4개씩 */}
        <div className="grid grid-cols-4 gap-8">
          {currentGoods.map((item) => (
            <a
              key={item.goodsId}
              className="card bg-base-100 shadow-sm hover:shadow-md hover:-translate-y-2 transition-all duration-300 block overflow-hidden rounded-2xl"
              href={item.goodsUrl}
              target="_blank"
            >
              <img
                src={item.goodsImg}
                alt={item.goodsTitle}
                className="w-full h-48 object-cover"
              />
              <div className="card-body p-4">
                <h2 className="card-title text-base font-bold">
                  {item.goodsTitle}
                </h2>
                <div>
                  <span>{item.goodsDate}</span>
                  {isNew(item.goodsDate) && (
                    <span className="text-red-600 font-bold ml-2">NEW</span>
                  )}
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* pagination */}
        <div className="flex justify-center items-center mt-8 gap-2">
          {/* 이전 버튼 - 1번째 블록일 땐 비활성화 */}
          <button
            onClick={() => setCurrentPage(startPage - 1)}
            disabled={startPage === 1}
            className="btn btn-sm bg-gray-200 text-gray-700 disabled:bg-gray-100 disabled:text-gray-400"
          >
            前へ
          </button>

          {/* 페이지 번호 버튼들 (최대 pageBlockSize 개만 표시) */}
          <div className="flex gap-1">
            {visiblePages.map((pageNumber) => (
              <button
                key={pageNumber}
                onClick={() => setCurrentPage(pageNumber)}
                className={`join-item btn btn-sm no-animation ${
                  currentPage === pageNumber
                    ? "bg-red-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {pageNumber}
              </button>
            ))}
          </div>

          {/* 다음 버튼 - 마지막 블록일 땐 비활성화 */}
          <button
            onClick={() => setCurrentPage(endPage + 1)}
            disabled={endPage === totalPages}
            className="btn btn-sm bg-gray-200 text-gray-700 disabled:bg-gray-100 disabled:text-gray-400"
          >
            次へ
          </button>
        </div>
      </div>
    </div>
  );
}
