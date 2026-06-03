import { useNavigate } from 'react-router-dom'
import ivysaurImg from '../assets/ivysaur.png' 

export default function PokeDexDetail() {
    const navigate = useNavigate()

    return (
        <div className="
            min-h-[calc(100vh-170px)] 
            bg-[#f0f0f0] 
            font-sans 
            text-[#333]">
            <main>
                
                <section className="
                    bg-[#f0f0f0] 
                    py-[40px] 
                    px-[20px] 
                    flex 
                    justify-center 
                    items-center">
                    <div className="
                        flex 
                        flex-col 
                        md:flex-row 
                        items-center 
                        gap-[40px] 
                        max-w-[800px] 
                        w-full">
                        <figure className="
                            w-[250px] 
                            h-[250px] 
                            md:w-[300px] 
                            md:h-[300px] 
                            m-0 
                            flex 
                            justify-center 
                            items-center">
                            <img src={ivysaurImg} 
                                alt="フシギソウ" 
                                className="
                                    w-full 
                                    h-full 
                                    object-contain 
                                    drop-shadow-[0_15px_15px_rgba(0,0,0,0.2)]" />
                        </figure>
                        
                        <div className="
                            bg-white 
                            p-[40px_30px] 
                            md:p-[50px_30px] 
                            rounded-[8px] 
                            shadow-[5px_5px_10px_rgba(0,0,0,0.3)] 
                            flex-1 
                            w-full 
                            text-center 
                            md:text-left">
                            <div className="
                                text-[16px] 
                                text-[#666] 
                                font-bold 
                                mb-[5px]">
                                    No.0002
                                </div>
                            <div className="
                                text-[28px] 
                                md:text-[32px] 
                                font-bold 
                                mb-[15px]">
                                フシギソウ 
                                <span className="
                                    text-[20px] 
                                    text-[#777] 
                                    font-normal 
                                    ml-2">
                                    (이상해풀)
                                </span>
                            </div>
                            <div className="
                                flex 
                                justify-center 
                                md:justify-start 
                                gap-4">
                                <span className="
                                    text-[20px] 
                                    text-[#007bff] 
                                    font-black" 
                                    style={{ WebkitTextStroke: '1px #007bff'}}>
                                    ♂
                                </span>
                                <span className="
                                    text-[20px] 
                                    text-[#e83e8c] 
                                    font-black" 
                                    style={{ WebkitTextStroke: '1px #e83e8c'}}>
                                    ♀
                                </span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 정보 섹션 (기본 정보 + 설명) */}
                <section className="
                    max-w-[800px] 
                    mx-auto 
                    my-[30px] 
                    flex 
                    flex-col 
                    md:flex-row 
                    gap-[20px] 
                    px-[20px] 
                    py-[10px]">
                    
                    {/* 좌측: 기본 정보 (도감 데이터) */}
                    <div className="
                        bg-white 
                        border 
                        border-[#ddd] 
                        rounded-[8px] 
                        p-[25px] 
                        flex-1
                        hover:bg-[#f9f9f9] 
                        hover:border-[#AAA]">
                        <dl className="
                            flex 
                            items-center 
                            m-0 
                            mb-[15px] 
                            pb-[15px] 
                            border-b 
                            border-dashed 
                            border-[#eee]">
                            <dt className="
                                w-[80px] 
                                text-[14px] 
                                font-bold 
                                text-[#333]">
                                分類
                            </dt>
                            <dd className="
                                flex-1 
                                m-0 
                                text-[15px] 
                                font-bold 
                                flex 
                                items-center">
                                たねポケモン
                            </dd>
                        </dl>
                        <dl className="
                            flex 
                            items-center 
                            m-0 
                            mb-[15px] 
                            pb-[15px] 
                            border-b 
                            border-dashed 
                            border-[#eee]">
                            <dt className="
                                w-[80px] 
                                text-[14px] 
                                font-bold 
                                text-[#333]">
                                タイプ
                            </dt>
                            <dd className="
                                flex-1 
                                m-0 
                                text-[15px] 
                                font-bold 
                                flex 
                                items-center 
                                gap-[5px]">
                                <span className="
                                    px-[10px] 
                                    py-[4px] 
                                    rounded-[4px] 
                                    text-[13px] 
                                    text-white 
                                    bg-[#78C850]">
                                    くさ
                                </span>
                                <span className="
                                    px-[10px] 
                                    py-[4px] 
                                    rounded-[4px] 
                                    text-[13px] 
                                    text-white 
                                    bg-[#A040A0]">
                                    どく
                                </span>
                            </dd>
                        </dl>
                        <div className="
                            flex 
                            gap-[20px] 
                            m-0 
                            mb-[15px] 
                            pb-[15px] 
                            border-b 
                            border-dashed 
                            border-[#eee]">
                            <dl className="
                                flex 
                                items-center 
                                m-0 
                                flex-1">
                                <dt className="
                                    w-[80px] 
                                    text-[14px] 
                                    font-bold 
                                    text-[#333]">
                                    高さ
                                </dt>
                                <dd className="
                                    flex-1 
                                    m-0 
                                    text-[15px] 
                                    font-bold 
                                    flex 
                                    items-center">
                                    1.0m
                                </dd>
                            </dl>
                            <dl className="
                                flex 
                                items-center 
                                m-0 
                                flex-1">
                                <dt className="
                                    w-[80px] 
                                    text-[14px] 
                                    font-bold 
                                    text-[#333]">
                                    重さ
                                </dt>
                                <dd className="
                                    flex-1 
                                    m-0 
                                    text-[15px] 
                                    font-bold 
                                    flex 
                                    items-center">
                                    13.0kg
                                </dd>
                            </dl>
                        </div>
                        <dl className="
                            flex 
                            items-center 
                            m-0">
                            <dt className="
                                w-[80px] 
                                text-[14px] 
                                font-bold 
                                text-[#333]">
                                特性
                            </dt>
                            <dd className="
                                flex-1 
                                m-0 
                                text-[15px] 
                                font-bold 
                                flex 
                                items-center">
                                しんりょく
                            </dd>
                        </dl>
                    </div>

                    {/* 우측: 도감 설명(스토리) */}
                    <div className="
                        bg-white 
                        border 
                        border-[#ddd] 
                        rounded-[8px] 
                        p-[25px] 
                        flex-1 
                        flex 
                        flex-col 
                        justify-center
                        hover:bg-[#f9f9f9] 
                        hover:border-[#aaa]">
                        <h3 className="
                            text-[16px] 
                            font-bold 
                            text-[#e3350d] 
                            mb-[15px] 
                            border-b-2 
                            border-[#f0f0f0] 
                            pb-[10px]">
                            図鑑説明 
                            <span className="
                                text-[13px] 
                                text-[#888] 
                                font-normal 
                                ml-1">
                                (도감 설명)
                            </span>
                        </h3>
                        <p className="
                            text-[16px] 
                            leading-[1.8] 
                            m-[0_0_15px_0] 
                            font-[500] 
                            text-[#333] 
                            text-justify">
                            つぼみが　背中に　ついていて　養分を　吸収していくと　大きな　花が　咲くという。
                            <span className="
                                block 
                                mt-[8px] 
                                text-[14px] 
                                text-[#666] 
                                font-normal">
                                (등에 꽃봉오리가 달려 있어 양분을 흡수해가면 커다란 꽃이 핀다고 한다.)
                            </span>
                        </p>
                        <p className="
                            text-[14px] 
                            text-[#aaa] 
                            m-0 
                            text-right 
                            font-medium">
                            （『Pokémon LEGENDS Z-A』より）
                        </p>
                    </div>

                </section>

                {/* 하단: 목록으로 돌아가기 버튼 */}
                <div className="
                    flex 
                    justify-center 
                    pb-[20px]">
                    <button 
                        className="
                            bg-[#e3350d] 
                            border-2 
                            border-[#ddd] 
                            py-[12px] 
                            px-[40px] 
                            rounded-[8px] 
                            cursor-pointer 
                            font-bold 
                            text-white 
                            hover:bg-[#c92f0c] 
                            hover:border-[#aaa] 
                            shadow-sm 
                            transition-all"onClick={() => navigate('/PokeDex')}>
                        ▶ 戻る 
                        <span className="
                            text-[14px] 
                            text-white/90
                            font-normal 
                            ml-1">
                            (목록으로)
                        </span>
                    </button>
                </div>

            </main>
        </div>
    )
}