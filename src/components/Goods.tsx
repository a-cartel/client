import { useState } from "react";
import { goodsList } from "./GoodsData.ts";

export default function Goods() {

    // pagination 밑작업
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4;
    const indexOfFirstItem = (currentPage - 1) * itemsPerPage;
    const indexOfLastItem = indexOfFirstItem + itemsPerPage;
    const currentGoods = goodsList.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(goodsList.length / itemsPerPage);

    // New 태그 밑작업
    const isNew = (targetDate: string) => {
        const today = new Date();
        const cleanDate = targetDate.split('.').join('-');
        const registeredDate = new Date(cleanDate);
        const diffTime = today.getTime() - registeredDate.getTime();
        const diffDays = diffTime / (1000 * 60 * 60 * 24);
        return diffDays >= 0 && diffDays <= 7;
    }

    return (
        <div className="flex flex-col items-center w-full">
            <div className="p-8 w-full max-w-7xl mx-atuo">
                <h2 className="mb-8 text-xl font-bold ">グッズ</h2>

                {/* news */}
                <div className="grid grid-cols-4 gap-8">
                    {currentGoods.map((item) => (
                        <a key={item.id}
                            className="card bg-base-100 shadow-sm hover:shadow-md hover:-translate-y-2 transition-all duration-300 block overflow-hidden rounded-2xl"
                            href={item.url} target="_blank">
                            <img src={item.img} alt={item.title} className="w-full h-48 object-cover" />
                            <div className="card-body p-4">
                                <h2 className="card-title text-base font-bold">{item.title}</h2>
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
                    {[...Array(totalPages).keys()].map((index) => {
                        const pageNumber = index + 1;
                        return (
                            <button
                                key={pageNumber}
                                onClick={() => setCurrentPage(pageNumber)}
                                className={`join-item btn no-animation ${currentPage === pageNumber 
                                    ? "bg-red-600 text-white" 
                                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
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