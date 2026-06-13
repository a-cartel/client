import { Link } from "react-router-dom";
import { useState } from "react";
import { shopList } from "./ShopData";

export default function Shop() {

    // pagination 밑작업
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;
    const indexOfFirstItem = (currentPage - 1) * itemsPerPage;
    const indexOfLastItem = indexOfFirstItem + itemsPerPage;
    const currentShops = shopList.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(shopList.length / itemsPerPage);

    return (
        <div className="flex flex-col items-center">
            <div className="p-8 w-full max-w-7xl mx-atuo">

                <h2 className="mb-8 text-xl font-bold ">ショップ</h2>

                {/* shops */}
                <div className="grid grid-cols-3 gap-8">
                    {currentShops.map((shop) => (
                        <div key={shop.id} className="card bg-base-100 shadow-sm hover:shadow-md duration-300">
                            <figure>
                                <img src={shop.image} alt={shop.name} />
                            </figure>

                            <div className="card-body p-6">
                                <h2 className="card-title text-xl font-bold text-slate-800 mb-1">{shop.name}</h2>
                                <p className="text-sm text-slate-400 mb-4">{shop.address}</p>

                                <div className="bg-slate-50 rounded-xl p-4 text-xs text-slate-600 flex flex-col gap-2">
                                    <div className="flex">
                                        <span className="w-16 font-bold text-slate-500">営業時間</span>
                                        <span>{shop.hours}</span>
                                    </div>
                                    <div className="flex">
                                        <span className="w-16 font-bold text-slate-500">定休日</span>
                                        <span>{shop.holiday}</span>
                                    </div>
                                    <div className="flex">
                                        <span className="w-16 font-bold text-slate-500">アクセス</span>
                                        <span className="flex-1">{shop.access}</span>
                                    </div>
                                </div>

                                <div className="mt-4 text-sm font-bold text-red-600 flex items-center gap-1 hover:underline cursor-pointer">
                                    <Link to={`/Shop/${shop.id}`} className="text-red-500 font-bold">
                                        詳しく見る →
                                    </Link>
                                </div>
                            </div>
                        </div>
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
                                className={`join-item btn no-animation ${currentPage === pageNumber ? "bg-red-600 text-white" : ""}`}
                            >
                                {pageNumber}
                            </button>
                        );
                    })}
                </div>

            </div>
        </div>
    );
}