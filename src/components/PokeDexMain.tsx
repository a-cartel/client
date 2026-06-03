import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import pickupTitleSvg from '../assets/ttl_pickup.svg'
import megaCharizardImg from '../assets/mega_charizard_x.png' 
import ivysaurImg from '../assets/ivysaur.png' 

export default function PokeDexMain() {
    const navigate = useNavigate()
    
    // 모달창 열림/닫힘 상태
    const [isFilterOpen, setIsFilterOpen] = useState(false)

    // 선택된 필터 상태 관리
    const [selectedTypes, setSelectedTypes] = useState<string[]>([])
    const [selectedGens, setSelectedGens] = useState<string[]>([])

    // 타입 체크박스 핸들러
    const handleTypeChange = (type: string) => {
        setSelectedTypes(prev => 
            prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
        )
    }

    // 세대 체크박스 핸들러
    const handleGenChange = (gen: string) => {
        setSelectedGens(prev => 
            prev.includes(gen) ? prev.filter(g => g !== gen) : [...prev, gen]
        )
    }

    // 필터 초기화
    const handleReset = () => {
        setSelectedTypes([])
        setSelectedGens([])
    }

    // 필터 적용
    const handleApply = () => {
        console.log("적용된 타입:", selectedTypes)
        console.log("적용된 세대:", selectedGens)
        setIsFilterOpen(false)
    }

    return (
        <div className="
                min-h-screen 
                bg-[#f0f0f0] 
                font-sans 
                text-[#333] 
                overflow-x-hidden">
            <main className="
                max-w-[1000px] 
                mx-auto 
                pb-[50px]">
                
                {/* 픽업 스와이퍼 섹션 */}
                <div className="
                    relative 
                    py-[50px] 
                    my-[60px] 
                    z-0">
                    
                    <div className="
                        absolute 
                        top-0 bottom-0 
                        w-[100vw] 
                        left-1/2 -translate-x-1/2 
                        bg-white 
                        skew-y-[-2.5deg] 
                        -z-10 
                        shadow-[0_4px_15px_rgba(0,0,0,0.05)]"></div>
                    
                    {/* 내부 콘텐츠 */}
                    <div className="
                        flexrelative 
                        z-10 
                        max-w-[920px] 
                        mx-auto 
                        px-[40px]">
                        <h2 className="
                            absolute 
                            top-[-45px] 
                            left-[10px] 
                            m-0 
                            z-20">
                            <img src={pickupTitleSvg} 
                                alt="ピックアップ" 
                                className="
                                    block 
                                    h-[56px] 
                                    w-auto"/>
                        </h2>
                        
                        <button className="
                            absolute 
                            top-1/2 
                            left-0 
                            -translate-y-1/2 
                            bg-white 
                            border 
                            border-[#ccc] 
                            w-[30px] 
                            h-[80px] 
                            cursor-pointer 
                            z-10 
                            flex 
                            justify-center 
                            items-center 
                            text-[#e3350d] 
                            font-bold 
                            shadow-sm 
                            hover:bg-[#f9f9f9]">
                            ◀
                        </button>
                        
                        <div className="
                            flex 
                            w-full 
                            overflow-hidden 
                            py-[20px]">
                            <a href="#" 
                                className="
                                    flex-none 
                                    w-full 
                                    flex 
                                    justify-center 
                                    text-inherit 
                                    no-underline"
                                onClick={(e) => { e.preventDefault(); navigate('/PokeDex/Detail'); }}>
                                <div className="
                                    flex 
                                    flex-col 
                                    md:flex-row 
                                    items-center 
                                    justify-center 
                                    gap-[50px] 
                                    w-full 
                                    max-w-[850px]">
                                    <figure className="
                                        m-0 
                                        flex-1 
                                        flex 
                                        justify-end 
                                        items-center">
                                        <img src={megaCharizardImg} 
                                            alt="メガリザードンＸ" 
                                            className="
                                                w-full 
                                                max-w-[450px] 
                                                h-auto 
                                                object-contain 
                                                drop-shadow-[0_10px_10px_rgba(0,0,0,0.15)]"/>
                                    </figure>
                                    <div className="
                                            flex-1 
                                            text-left">
                                        <h3 className="
                                            m-[0_0_20px_0] 
                                            text-[32px] 
                                            font-bold 
                                            text-[#333] 
                                            leading-[1.4]">
                                            <small className="
                                                block 
                                                text-[14px] 
                                                text-[#888] 
                                                mb-[5px] 
                                                font-bold">
                                                No.0006-1
                                            </small>
                                            メガリザードンＸ <br/>
                                            <span className="
                                                text-[18px] 
                                                text-[#777] 
                                                font-normal">
                                                (메가리자몽X)
                                            </span>
                                        </h3>
                                        <p className="
                                                flex 
                                                gap-[8px] 
                                                m-0">
                                            <span className="
                                                px-[12px] 
                                                py-[6px] 
                                                rounded-[4px] 
                                                text-[12px] 
                                                font-bold 
                                                text-white 
                                                bg-[#F08030] 
                                                inline-block">
                                                ほのお
                                            </span>
                                            <span className="
                                                px-[12px] 
                                                py-[6px] 
                                                rounded-[4px] 
                                                text-[12px] 
                                                font-bold 
                                                text-white 
                                                bg-[#7038F8] 
                                                inline-block">
                                                ドラゴン
                                            </span>
                                        </p>
                                    </div>
                                </div>
                            </a>
                        </div>

                        <button className="
                            absolute 
                            top-1/2 
                            right-0 
                            -translate-y-1/2 
                            bg-white 
                            border 
                            border-[#ccc] 
                            w-[30px] 
                            h-[80px] 
                            cursor-pointer 
                            z-10 
                            flex 
                            justify-center 
                            items-center 
                            text-[#e3350d] 
                            font-bold 
                            shadow-sm 
                            hover:bg-[#f9f9f9]">
                            ▶
                        </button>
                        
                        <ul className="
                            absolute 
                            bottom-[-20px] 
                            left-0 
                            right-0 
                            flex 
                            justify-center 
                            gap-[8px] 
                            list-none 
                            p-0 
                            m-0">
                            <li className="
                                w-[10px] 
                                h-[10px] 
                                border 
                                border-[#ccc] 
                                rounded-full 
                                bg-white"></li>
                            <li className="
                                w-[10px] 
                                h-[10px] 
                                border 
                                border-[#000] 
                                rounded-full 
                                bg-[#000]"></li>
                            <li className="
                                    w-[10px] 
                                    h-[10px] 
                                    border 
                                    border-[#ccc] 
                                    rounded-full 
                                    bg-white"
                                ></li>
                        </ul>
                    </div>
                </div>
                
                {/* 도감 리스트 */}
                <div className="
                        px-[20px]"
                    >
                    <div className="
                            flex 
                            justify-end 
                            mb-[20px]"
                        >
                        <button className="
                                    bg-[#e3350d] 
                                    text-white 
                                    border-none 
                                    py-[10px] 
                                    px-[20px] 
                                    rounded-[8px] 
                                    text-[14px] 
                                    font-bold 
                                    cursor-pointer 
                                    flex 
                                    items-center 
                                    gap-[8px] 
                                    transition-colors 
                                    hover:bg-[#c62828]"
                                onClick={() => setIsFilterOpen(true)}>
                            絞り込み 
                            <span className="
                                text-[#fff] 
                                text-[12px] 
                                font-normal">
                                (필터)
                            </span>
                        </button>
                    </div>

                    <ul className="
                            grid 
                            grid-cols-2 
                            md:grid-cols-4 
                            gap-[20px] 
                            list-none 
                            p-0 
                            m-0"
                        >
                        {/* 포켓몬 카드 */}
                        <li className="
                            bg-white 
                            rounded-[8px] 
                            overflow-hidden 
                            shadow-[0_2px_5px_rgba(0,0,0,0.05)] 
                            cursor-pointer 
                            transition-transform 
                            duration-200 
                            flex 
                            flex-col 
                            min-w-0 
                            hover:-translate-y-[5px] 
                            hover:shadow-[0_8px_15px_rgba(0,0,0,0.1)]"
                            onClick={() => navigate('/PokeDex/0002')}>
                            <div className="
                                w-full 
                                aspect-square 
                                bg-[#f8f8f8] 
                                flex 
                                items-center 
                                justify-center 
                                p-[15px] 
                                box-border">
                                <img src={ivysaurImg} 
                                    alt="フシギソウ" 
                                    className="
                                        w-[90%] 
                                        h-[90%] 
                                        object-contain"/>
                            </div>
                            <div className="
                                p-[15px] 
                                text-center 
                                flex 
                                flex-col 
                                flex-1">
                                <p className="
                                    text-[12px] 
                                    text-[#888] 
                                    font-bold 
                                    m-[0_0_5px_0]">
                                    No.0002
                                </p>
                                <p className="
                                    text-[15px] 
                                    font-bold 
                                    m-[0_0_12px_0] 
                                    text-[#333] 
                                    leading-[1.4]">
                                    フシギソウ <br/>
                                    <span className="
                                        text-[13px] 
                                        text-[#777] 
                                        font-normal">
                                        (이상해풀)
                                    </span>
                                </p>
                                <ul className="
                                    list-none 
                                    p-0 
                                    mt-auto 
                                    mb-0 
                                    flex 
                                    justify-center 
                                    gap-[6px]">
                                    <li className="
                                        px-[8px] 
                                        py-[4px] 
                                        rounded-[4px] 
                                        text-[11px] 
                                        text-white 
                                        inline-flex 
                                        items-center 
                                        bg-[#78C850]">
                                        くさ
                                    </li>
                                    <li className="
                                        px-[8px] 
                                        py-[4px] 
                                        rounded-[4px] 
                                        text-[11px] 
                                        text-white 
                                        inline-flex 
                                        items-center 
                                        bg-[#A040A0]">
                                        どく
                                    </li>
                                </ul>
                            </div>
                        </li>

                    </ul>
                </div>

                {/* 페이지네이션 */}
                <div className="
                    flex 
                    justify-center 
                    items-center 
                    gap-[8px] 
                    mt-[50px]">
                    <button className="
                        py-[8px] 
                        px-[14px] 
                        bg-white 
                        border 
                        border-[#ddd] 
                        rounded-[4px] 
                        cursor-pointer 
                        text-[14px] 
                        font-bold 
                        text-[#555] 
                        hover:bg-[#f0f0f0]">
                        ◀ 前へ
                    </button>
                    <button className="
                        py-[8px] 
                        px-[14px] 
                        bg-[#e3350d] 
                        border 
                        border-[#e3350d] 
                        rounded-[4px] 
                        cursor-pointer 
                        text-[14px] 
                        font-bold 
                        text-white">
                        1
                    </button>
                    <button className="
                        py-[8px] 
                        px-[14px] 
                        bg-white 
                        border 
                        border-[#ddd] 
                        rounded-[4px] 
                        cursor-pointer 
                        text-[14px] 
                        font-bold 
                        text-[#555] 
                        hover:bg-[#f0f0f0]">
                        2
                    </button>
                    <button className="
                        py-[8px] 
                        px-[14px] 
                        bg-white 
                        border 
                        border-[#ddd] 
                        rounded-[4px] 
                        cursor-pointer 
                        text-[14px] 
                        font-bold 
                        text-[#555] 
                        hover:bg-[#f0f0f0]">
                        3
                    </button>
                    <button className="
                        py-[8px] 
                        px-[14px] 
                        bg-white 
                        border 
                        border-[#ddd] 
                        rounded-[4px] 
                        cursor-pointer 
                        text-[14px] 
                        font-bold 
                        text-[#555] 
                        hover:bg-[#f0f0f0]">
                        次へ ▶
                    </button>
                </div>

            </main>

            {/* 필터 모달창 (타입 / 세대) */}
            {isFilterOpen && (
                <div className="
                    fixed 
                    inset-0 
                    z-[1000] 
                    bg-black/50 
                    flex 
                    justify-center 
                    items-center">
                    <div className="
                        bg-white 
                        p-[30px] 
                        rounded-[12px] 
                        w-[90%] 
                        max-w-[600px] 
                        relative 
                        max-h-[85vh] 
                        overflow-y-auto 
                        shadow-2xl">
                        
                        <button className="
                            absolute 
                            top-[15px] 
                            right-[20px] 
                            text-[24px] 
                            font-bold 
                            text-[#aaa] 
                            hover:text-[#333] 
                            cursor-pointer 
                            bg-transparent 
                            border-none"
                                onClick={() => setIsFilterOpen(false)}>
                            &times;
                        </button>
                        
                        <h2 className="
                            text-[20px] 
                            font-bold 
                            m-[0_0_20px_0] 
                            border-b-2 
                            border-[#eee] 
                            pb-[10px]">
                            ポケモンを絞り込む
                            <span className="
                                text-[14px] 
                                text-[#777] 
                                font-normal">
                                (포켓몬 필터)
                            </span>
                        </h2>
                        
                        <form>
                            {/* 1. 타입 (18종 전부) */}
                            <div className="mb-[25px]">
                                <div className="
                                    text-[15px] 
                                    font-bold 
                                    text-[#555] 
                                    mb-[15px]">
                                    タイプ
                                    <span className="
                                        text-[13px] 
                                        text-[#888] 
                                        font-normal">
                                        (타입)
                                    </span>
                                </div>
                                <div className="
                                    grid 
                                    grid-cols-2 
                                    sm:grid-cols-3 
                                    gap-[12px]">
                                    {[
                                        { val: 'normal', jp: 'ノーマル', ko: '노말' },
                                        { val: 'fire', jp: 'ほのお', ko: '불꽃' },
                                        { val: 'water', jp: 'みず', ko: '물' },
                                        { val: 'grass', jp: 'くさ', ko: '풀' },
                                        { val: 'electric', jp: 'でんき', ko: '전기' },
                                        { val: 'ice', jp: 'こおり', ko: '얼음' },
                                        { val: 'fighting', jp: 'かくとう', ko: '격투' },
                                        { val: 'poison', jp: 'どく', ko: '독' },
                                        { val: 'ground', jp: 'じめん', ko: '땅' },
                                        { val: 'flying', jp: 'ひこう', ko: '비행' },
                                        { val: 'psychic', jp: 'エスパー', ko: '에스퍼' },
                                        { val: 'bug', jp: 'むし', ko: '벌레' },
                                        { val: 'rock', jp: 'いわ', ko: '바위' },
                                        { val: 'ghost', jp: 'ゴースト', ko: '고스트' },
                                        { val: 'dragon', jp: 'ドラゴン', ko: '드래곤' },
                                        { val: 'dark', jp: 'あく', ko: '악' },
                                        { val: 'steel', jp: 'はがね', ko: '강철' },
                                        { val: 'fairy', jp: 'フェアリー', ko: '페어리' },
                                    ].map(type => (
                                        <label key={type.val} 
                                            className="
                                                    flex 
                                                    items-center 
                                                    gap-[6px] 
                                                    text-[14px] 
                                                    cursor-pointer 
                                                    hover:bg-gray-50 
                                                    p-1 
                                                    rounded"
                                            >
                                            <input 
                                                type="checkbox" 
                                                checked={selectedTypes.includes(type.val)}
                                                onChange={() => handleTypeChange(type.val)}
                                                className="cursor-pointer"/> 
                                            {type.jp} 
                                            <span className="
                                                text-[12px] 
                                                text-[#888]">
                                                ({type.ko})
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* 2. 세대 (1~9세대 전부) */}
                            <div className="mb-[25px]">
                                <div className="
                                    text-[15px] 
                                    font-bold 
                                    text-[#555] 
                                    mb-[15px]">
                                    初登場の地方
                                    <span className="
                                        text-[13px] 
                                        text-[#888] 
                                        font-normal">
                                        (첫 등장 지방/세대)
                                    </span>
                                </div>
                                <div className="
                                    grid 
                                    grid-cols-2 
                                    sm:grid-cols-3 
                                    gap-[12px]">
                                    {[
                                        { val: '1', jp: 'カントー', ko: '관동/1' },
                                        { val: '2', jp: 'ジョウト', ko: '성도/2' },
                                        { val: '3', jp: 'ホウエン', ko: '호연/3' },
                                        { val: '4', jp: 'シンオウ', ko: '신오/4' },
                                        { val: '5', jp: 'イッシュ', ko: '하나/5' },
                                        { val: '6', jp: 'カロス', ko: '칼로스/6' },
                                        { val: '7', jp: 'アローラ', ko: '알로라/7' },
                                        { val: '8', jp: 'ガラル', ko: '가라르/8' },
                                        { val: '9', jp: 'パルデア', ko: '팔데아/9' },
                                    ].map(gen => (
                                        <label key={gen.val} 
                                            className="
                                                flex 
                                                items-center 
                                                gap-[6px] 
                                                text-[14px] 
                                                cursor-pointer 
                                                hover:bg-gray-50 
                                                p-1 
                                                rounded">
                                            <input type="checkbox" 
                                                checked={selectedGens.includes(gen.val)}
                                                onChange={() => handleGenChange(gen.val)}
                                                className="cursor-pointer"/> 
                                            {gen.jp} 
                                            <span className="
                                                text-[12px] 
                                                text-[#888]">
                                                ({gen.ko})
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* 버튼 액션 */}
                            <div className="
                                flex 
                                gap-[10px] 
                                mt-[30px]">
                                <button 
                                    type="button" 
                                    className="
                                        flex-1 
                                        bg-white 
                                        text-[#333] 
                                        border-2 
                                        border-[#ddd] 
                                        py-[12px] 
                                        rounded-[8px] 
                                        font-bold 
                                        text-[16px] 
                                        hover:bg-[#f9f9f9] 
                                        cursor-pointer 
                                        transition-colors"
                                    onClick={handleReset}>
                                        リセット
                                    <span className="
                                        text-[12px] 
                                        text-[#777] 
                                        font-normal">
                                        (초기화)
                                    </span>
                                </button>
                                <button 
                                    type="button" 
                                    className="
                                        flex-1 
                                        bg-[#e3350d] 
                                        text-white 
                                        border-none 
                                        py-[12px] 
                                        rounded-[8px] 
                                        font-bold 
                                        text-[16px] 
                                        hover:bg-[#c92f0c] 
                                        cursor-pointer 
                                        transition-colors 
                                        shadow-md"
                                    onClick={handleApply}>
                                    適用する
                                    <span className="
                                        text-[12px] 
                                        font-normal 
                                        text-white/90">
                                        (적용하기)
                                        </span>
                                </button>
                            </div>
                        </form>

                    </div>
                </div>
            )}

        </div>
    )
}