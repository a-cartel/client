import { useState } from "react";
import { newsList } from "./NewsData";

export default function News() {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;
    const indexOfFirstItem = (currentPage - 1) * itemsPerPage;
    const indexOfLastItem = indexOfFirstItem + itemsPerPage;
    const currentNews = newsList.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(newsList.length / itemsPerPage);

    return (
        // <div className="flex flex-col items-center">
        <div className="flex flex-col items-center">
            <div className="p-8">
                <h2 className="mb-8 text-xl font-bold ">ニュース</h2>

                <div className="grid grid-cols-3 gap-8">

                    {currentNews.map((item) => (
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
                <div className="flex justify-center mt-8">
                    {Array.from({ length: Math.ceil(newsList.length / itemsPerPage) }).map((_, index) => {
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