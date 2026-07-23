import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

// 백엔드 데이터 구조에 맞춘 타입 정의
export interface ShopList {
    shopId: number;
    shopName: string;
    shopAddress: string;
    shopAccess: string;
    shopHoliday: string;
    shopHours: string;
    shopPhone: string;
    shopImg: string;
}

export default function Shop() {

    const [ShopList, setShopList] = useState<ShopList[]>([]);

    useEffect(() => {
        axios.get<ShopList[]>("http://localhost:8081/shop")
            .then((response) => {
                setShopList(response.data);
            })
            .catch((error) => {
                console.error("Error fetching shop data:", error);
            });
    }, []);

    // pagination 밑작업
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;
    const indexOfFirstItem = (currentPage - 1) * itemsPerPage;
    const indexOfLastItem = indexOfFirstItem + itemsPerPage;
    const currentShops = ShopList.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(ShopList.length / itemsPerPage);

    return (
        <div className="flex flex-col items-center">
            <div className="p-8 w-full max-w-7xl mx-atuo">

                <h2 className="mb-8 text-xl font-bold ">ショップ</h2>

                {/* shops */}
                <div className="grid grid-cols-3 gap-8">
                    {currentShops.map((shop) => (
                        <div key={shop.shopId} className="card bg-base-100 shadow-sm hover:shadow-md duration-300">
                            <figure>
                                <img src={shop.shopImg} alt={shop.shopName} />
                            </figure>

                            <div className="card-body p-6">
                                <h2 className="card-title text-xl font-bold text-slate-800 mb-1">{shop.shopName}</h2>
                                <p className="text-sm text-slate-400 mb-4">{shop.shopAddress}</p>

                                <div className="bg-slate-50 rounded-xl p-4 text-xs text-slate-600 flex flex-col gap-2">
                                    <div className="flex">
                                        <span className="w-48 font-bold text-slate-500">営業時間</span>
                                        <span>{shop.shopHours}</span>
                                    </div>
                                                    
                                </div>

                                <div className="mt-4 text-sm font-bold text-red-600 flex items-center gap-1 hover:underline cursor-pointer">
                                    <Link to={`/shop/${shop.shopId}`} className="text-red-500 font-bold">
                                        詳しく見る →
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* pagination */}
                <div className="flex justify-center mt-8">
                    <div className="flex gap-2">
                    {[...Array(totalPages).keys()].map((index) => {
                        const pageNumber = index + 1;
                        return (
                            <button
                                key={pageNumber}
                                onClick={() => setCurrentPage(pageNumber)}
                                className={`rounded-xl btn no-animation ${currentPage === pageNumber ? "bg-red-600 text-white" : ""}`}
                            >
                                {pageNumber}
                            </button>
                        );
                    })}
                    </div>
                </div>

            </div>
        </div>
    );
}