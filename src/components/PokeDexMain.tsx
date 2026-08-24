import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'

import pickupTitleSvg from '../assets/ttl_pickup.svg'
// 🚀 TYPE_MAP 참조 삭제, TYPE_COLORS 및 POKEMON_TYPES 임포트
import PokeDexFilter, { TYPE_COLORS } from './PokeDexFilter'

export interface PokemonData {
    id: number;
    name: string;
    desc: string;
    type: string;
    imgUrl: string;
    height: number;
    weight: number;
}

const PICKUP_IDS = [6, 25, 133, 143, 150]; 

const DUMMY_POKEMON_DATA: PokemonData[] = [
    {
        id: 6,
        name: "リザードン",
        desc: "火を 吹いて 激しく 相手を 攻撃する。 苦しい 戦いになるほど 炎は 激しく 燃え上がる。",
        type: "ほのお、 ひこう",
        imgUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/6.png",
        height: 17,
        weight: 905
    },
    {
        id: 25,
        name: "ピカチュウ",
        desc: "つくる 電気が 強力な ピカチュウほど ほっぺの 袋は 軟らかく よく 伸びるぞ。",
        type: "でんき",
        imgUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png",
        height: 4,
        weight: 60
    },
    {
        id: 133,
        name: "イーブイ",
        desc: "アンバランスで 不安定な 遺伝子を 持っており さまざまな 進化の 可能性を 秘めている。",
        type: "ノーマル",
        imgUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/133.png",
        height: 3,
        weight: 65
    },
    {
        id: 143,
        name: "カビゴン",
        desc: "1日に 食べ物を 400キロ 食べないと 気が すまない。 食べ終わると 眠ってしまう。",
        type: "ノーマル",
        imgUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/143.png",
        height: 21,
        weight: 4600
    },
    {
        id: 150,
        name: "ミュウツー",
        desc: "一人の 科学者が 何年も 恐ろしい 遺伝子 研究を 続けた 結果 誕生した。",
        type: "エスパー",
        imgUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/150.png",
        height: 20,
        weight: 1220
    }
]; 

export default function PokeDexMain() {
    const navigate = useNavigate()
    
    const [pokeList, setPokeList] = useState<PokemonData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const [currentPage, setCurrentPage] = useState<number>(1);
    const itemsPerPage = 20;

    const [isFilterOpen, setIsFilterOpen] = useState(false)
    const [selectedTypes, setSelectedTypes] = useState<string[]>([])

    useEffect(() => {
        const fetchPokedex = async () => {
            try {
                const timestamp = new Date().getTime();
                const response = await axios.get<PokemonData[]>(`http://localhost:8081/codex?t=${timestamp}`);
                
                const sortedData = response.data.sort((a, b) => a.id - b.id);
                setPokeList(sortedData);
            } catch (error) {
                console.warn("⚠️ バックエンドDB接続失敗！フロントエンドのダミーデータをレンダリングします。", error);
                setPokeList(DUMMY_POKEMON_DATA); 
            } finally {
                setLoading(false);
            }
        };

        fetchPokedex();
    }, []);

    const pickupList = pokeList.filter(poke => PICKUP_IDS.includes(poke.id));

    const filteredList = pokeList.filter((poke) => {
        if (selectedTypes.length === 0) return true;
        const typesArray = poke.type ? poke.type.split(/[,\s、・]+/).filter(Boolean) : [];
        return selectedTypes.every(selectedType => typesArray.includes(selectedType));
    });

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredList.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredList.length / itemsPerPage);

    const maxPageButtons = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxPageButtons / 2));
    let endPage = startPage + maxPageButtons - 1;

    if (endPage > totalPages) {
        endPage = totalPages;
        startPage = Math.max(1, endPage - maxPageButtons + 1);
    }

    const pageNumbers = [];
    for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
    }

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
        window.scrollTo({ top: 300, behavior: 'smooth' }); 
    }

    const handleTypeToggle = (type: string) => {
        if (selectedTypes.includes(type)) {
            setSelectedTypes(prev => prev.filter(t => t !== type));
        } else {
            if (selectedTypes.length >= 2) {
                alert("タイプは最大2つまで選択できます。");
                return;
            }
            setSelectedTypes(prev => [...prev, type]);
        }
    }

    const handleReset = () => setSelectedTypes([])
    const handleApply = () => {
        setIsFilterOpen(false)
        setCurrentPage(1)
    }

    return (
        <div className="bg-[#f0f0f0] min-h-screen font-sans text-[#333] pb-10">
            
            {/* DB 동적 Swiper */}
            <section id="pickup" className="w-full h-[400px] mt-[50px] relative overflow-hidden flex justify-center items-center z-[100]">
                <div className="zukan_pickup_bg w-full h-[600px] bg-white absolute z-0 -top-[100px] rotate-[-10deg]"></div>
                
                <div className="pickup_main container mx-auto max-w-[1200px] h-full relative z-[1] flex items-center justify-between">
                    
                    <img 
                        src={pickupTitleSvg} 
                        alt="PICK UP TOPIC" 
                        className="pickup_ttl absolute top-4 left-6 z-10 h-[25px] block drop-shadow-sm" 
                    />

                    {pickupList.length > 0 && (
                        <Swiper
                            modules={[Autoplay, Pagination]}
                            spaceBetween={30}
                            slidesPerView={1}
                            loop={true}
                            autoplay={{ delay: 4000, disableOnInteraction: false }}
                            pagination={{ clickable: true }}
                            className="w-full h-full rounded-2xl overflow-hidden pt-12"
                        >
                            {pickupList.map((poke) => (
                                <SwiperSlide key={`pickup-${poke.id}`}>
                                    <Link to={`/Zukan/${poke.id}`} className="block w-full h-full">
                                        <div className="flex items-center justify-between h-full p-10 cursor-pointer hover:bg-gray-50/20 transition-colors">
                                            
                                            {/* [왼쪽] DB 이미지 영역 */}
                                            <figure className="pickup_char_img w-[200px] h-[200px] flex-shrink-0 flex justify-center items-center relative m-0">
                                                <img 
                                                    src={poke.imgUrl} 
                                                    alt={poke.name} 
                                                    className="max-h-none w-full h-full object-contain scale-[1.5] hover:scale-[1.6] transition-transform duration-500 drop-shadow-2xl" 
                                                />
                                            </figure>

                                            {/* [오른쪽] 텍스트 정보 영역 (순서: 번호 -> 이름 -> 타입 -> 설명) */}
                                            <article className="pickup_charinfo flex-1 pl-12 flex flex-col justify-center">
                                                <p className="pickup_no text-[20px] font-bold text-[#999] mb-1">
                                                    No.{poke.id.toString().padStart(4, '0')}
                                                </p>

                                                <h3 className="pickup_name text-[40px] font-black text-[#333] mb-4 truncate">
                                                    {poke.name}
                                                </h3>

                                                <div className="flex flex-wrap gap-2 mb-5">
                                                    {(poke.type ? poke.type.split(/[,\s、・]+/).filter(Boolean) : []).map((t, index) => {
                                                        const colorConfig = TYPE_COLORS[t] || { bg: '#E5E7EB', text: '#374151' };
                                                        return (
                                                            <span 
                                                                key={index} 
                                                                style={{ backgroundColor: colorConfig.bg, color: colorConfig.text }}
                                                                className="inline-block px-3 py-1 text-[13px] font-bold rounded-full shadow-sm"
                                                            >
                                                                {t}
                                                            </span>
                                                        );
                                                    })}
                                                </div>

                                                <p className="pickup_memo text-[15px] text-[#666] leading-[1.8] line-clamp-3 font-medium">
                                                    {poke.desc}
                                                </p>
                                            </article>

                                        </div>
                                    </Link>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    )}
                </div>
            </section>

            {/* 메인 도감 목록 영역 */}
            <main className="container mx-auto px-4 max-w-[1000px] mt-6">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-gray-800">
                        ポケモン図鑑 <span className="text-sm font-normal text-gray-500 ml-1">({filteredList.length}匹)</span>
                    </h3>
                    <button 
                        onClick={() => setIsFilterOpen(true)}
                        className="bg-gray-800 text-white px-5 py-2 rounded-lg text-sm font-bold hover:bg-gray-700 transition-colors shadow-sm flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" /></svg>
                        フィルター
                    </button>
                </div>

                {loading ? (
                    <div className="text-center py-20 text-gray-500 font-bold text-lg">データを読み込んでいます...</div>
                ) : filteredList.length === 0 ? (
                    <div className="text-center py-20 text-gray-500 font-bold text-lg">
                        条件に合うポケモンがいません。
                    </div>
                ) : (
                    <>
                        {/* 포켓몬 카드 그리드 */}
                        <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-0 m-0">
                            {currentItems.map((poke) => {
                                const typesArray = poke.type ? poke.type.split(/[,\s、・]+/).filter(Boolean) : [];

                                return (
                                    <li key={poke.id} className="list-none">
                                        <Link 
                                            to={`/Zukan/${poke.id}`} 
                                            className="block bg-white rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all p-3 border border-gray-100 h-full cursor-pointer relative overflow-hidden"
                                        >
                                            <figure className="bg-[#f2f2f2] rounded-xl flex justify-center items-center h-40 p-4 m-0">
                                                <img src={poke.imgUrl} alt={poke.name} className="max-h-full object-contain drop-shadow-md" />
                                            </figure>
                                            <div className="pt-4 pb-2 px-1">
                                                <p className="text-[#999] text-[13px] font-extrabold m-0">
                                                    No.{poke.id.toString().padStart(4, '0')}
                                                </p>
                                                <h3 className="text-[18px] font-black text-[#333] mt-1 mb-3 truncate">
                                                    {poke.name}
                                                </h3>
                                                
                                                <div className="flex flex-wrap gap-1.5">
                                                    {typesArray.map((t, index) => {
                                                        const colorConfig = TYPE_COLORS[t] || { bg: '#E5E7EB', text: '#374151' };
                                                        return (
                                                            <span 
                                                                key={index} 
                                                                style={{ backgroundColor: colorConfig.bg, color: colorConfig.text }}
                                                                className="inline-block px-2.5 py-0.5 text-[11px] font-bold rounded-full shadow-sm"
                                                            >
                                                                {t}
                                                            </span>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>

                        {/* 페이지네이션 */}
                        {totalPages > 1 && (
                            <div className="flex justify-center items-center mt-12 mb-8 gap-1.5">
                                <button onClick={() => handlePageChange(1)} disabled={currentPage === 1} className="px-3 py-2 rounded-lg font-extrabold text-gray-600 bg-white border border-gray-200 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed shadow-sm">≪</button>
                                <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className="px-3 py-2 rounded-lg font-bold text-gray-600 bg-white border border-gray-200 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed shadow-sm">◀</button>
                                {pageNumbers.map((pageNum) => (
                                    <button key={pageNum} onClick={() => handlePageChange(pageNum)} className={`w-10 h-10 rounded-lg font-bold transition-all shadow-sm ${currentPage === pageNum ? 'bg-[#e3350d] text-white scale-105' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-100'}`}>
                                        {pageNum}
                                    </button>
                                ))}
                                <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} className="px-3 py-2 rounded-lg font-bold text-gray-600 bg-white border border-gray-200 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed shadow-sm">▶</button>
                                <button onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages} className="px-3 py-2 rounded-lg font-extrabold text-gray-600 bg-white border border-gray-200 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed shadow-sm">≫</button>
                            </div>
                        )}
                    </>
                )}
            </main>

            <PokeDexFilter 
                isOpen={isFilterOpen}
                onClose={() => setIsFilterOpen(false)}
                selectedTypes={selectedTypes}
                onTypeToggle={handleTypeToggle}
                onReset={handleReset}
                onApply={handleApply}
            />
        </div>
    )
}