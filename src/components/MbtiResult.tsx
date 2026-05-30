// １６人のトレーナーの画像をインポート
import lanceImg from '../assets/Lance.png'
import loreleiImg from '../assets/Lorelei.png'
import aaronImg from '../assets/Aaron.png'
import brockImg from '../assets/Brock.png'
import cherenImg from '../assets/Cheren.png'
import colressImg from '../assets/Colress.png'
import cynthiaImg from '../assets/Cynthia.png'
import dawnImg from '../assets/Dawn.png'
import giovanniImg from '../assets/Giovanni.png'
import greenImg from '../assets/Green.png'
import leonImg from '../assets/Leon.png'
import nemonaImg from '../assets/Nemona.png'
import raihanImg from '../assets/Raihan.png'
import redImg from '../assets/Red.png'
import serenaImg from '../assets/Serena.png'
import wallyImg from '../assets/Wally.png'

import resultsData from './results.json'

// イメージ参照文字列を実際のインポートされたモジュールにマッピング
const imageMap: Record<string, string> = {
    'lance': lanceImg,
    'lorelei': loreleiImg,
    'aaron': aaronImg,
    'brock': brockImg,
    'cheren': cherenImg,
    'colress': colressImg,
    'cynthia': cynthiaImg,
    'dawn': dawnImg,
    'giovanni': giovanniImg,
    'green': greenImg,
    'leon': leonImg,
    'nemona': nemonaImg,
    'raihan': raihanImg,
    'red': redImg,
    'serena': serenaImg,
    'wally': wallyImg,
    'placeholder': '' 
}

interface MbtiResultProps {
    finalMbti: string;
    handleRestart: () => void;
}

export default function MbtiResult({ finalMbti, handleRestart }: MbtiResultProps) {
    // JSON内にデータがない場合のデフォルト値
    const currentResult = (resultsData as any)[finalMbti] || (resultsData as any)["INTJ"]

    return (
        <div className="
            bg-white 
            shadow-2xl 
            max-w-[1100px] 
            w-full 
            rounded-[16px] 
            flex 
            flex-col 
            md:flex-row 
            p-[40px] 
            md:p-[60px] 
            gap-[40px] 
            md:gap-[60px] 
            box-border 
            text-left
        ">
            {/* 左側：メイン結果 */}
            <div className="
                flex-1 
                flex 
                flex-col 
                items-center 
                md:border-r 
                border-[#eee] 
                md:pr-[60px]
            ">
                <div className="
                    text-[20px] 
                    md:text-[24px] 
                    text-[#666] 
                    font-bold 
                    mb-[10px]
                ">
                    <span className="text-[#333] mr-2">
                        {finalMbti}
                    </span>
                    <span>
                        ({currentResult.typeNameJp} 
                        <span className="text-[16px] md:text-[20px] font-normal mx-1">/</span> 
                        {currentResult.typeNameKo})
                    </span>
                    {/* 
                    currentResult.typeNameJp: 日本語のMBTIタイプ名
                    currentResult.typeNameKo: 韓国語のMBTIタイプ名
                    */}
                </div>
                <div className="
                    text-[32px] 
                    md:text-[42px] 
                    font-[900] 
                    mb-[30px] 
                    text-[#333]
                ">
                    {currentResult.nameJp} 
                    <span className="
                        text-[30px] 
                        md:text-[40px] 
                        text-[#777] 
                        font-normal
                    ">
                        ({currentResult.nameKo})
                    </span>
                    {/* currentResult.nameJp: 日本語の結果名
                    currentResult.nameKo: 韓国語の結果名
                    */}
                </div>
                
                <div className="
                    w-[250px] 
                    md:w-[350px] 
                    h-[250px] 
                    md:h-[350px] 
                    mb-[40px] 
                    flex 
                    justify-center 
                    items-center
                ">
                    <div className="
                        w-full 
                        h-full 
                        rounded-md 
                        flex 
                        items-center 
                        justify-center 
                        drop-shadow-[0_15px_15px_rgba(0,0,0,0.15)] 
                        overflow-hidden
                    ">
                        {currentResult.imgRef && imageMap[currentResult.imgRef] ? (
                            <img src={imageMap[currentResult.imgRef]} 
                                alt={currentResult.nameJp} 
                                className="
                                    w-full 
                                    h-full 
                                    object-contain
                            " />
                        ) : (
                            <span className="
                                text-slate-400 
                                font-bold
                            ">
                                Image
                            </span>
                        )}
                    </div>
                </div>
                
                <div className="
                    bg-[#f9f9f9] 
                    p-[25px] 
                    rounded-[16px] 
                    text-[16px] 
                    md:text-[18px] 
                    leading-[1.8] 
                    border 
                    border-[#eee] 
                    text-justify 
                    w-full
                ">
                    {currentResult.descJp}
                    <span className="
                        block 
                        text-[14px] 
                        md:text-[16px] 
                        text-[#777] 
                        mt-3
                    ">
                        {currentResult.descKo}
                    </span>
                </div>
            </div>

            {/* 右側：相性及びアクション */}
            <div className="
                flex-1 
                flex 
                flex-col 
                justify-center
            ">
                <div className="
                    text-[20px] 
                    md:text-[22px] 
                    font-bold 
                    mb-[25px] 
                    text-[#333] 
                    border-b-2 
                    border-[#333] 
                    pb-[10px] 
                    self-start
                ">
                    トレーナー相性 
                    <span className="
                        text-[18px] 
                        text-[#666] 
                        font-normal 
                        ml-2
                    ">
                        (트레이너 궁합)
                    </span>
                </div>

                <div className="
                    flex 
                    flex-col 
                    gap-[20px] 
                    mb-[50px]
                ">
                    {/* 相性バツグン */}
                    <div className="
                        bg-[#e8f5e9] 
                        border 
                        border-[#c8e6c9] 
                        p-[20px] 
                        rounded-[16px] 
                        flex 
                        items-center 
                        gap-[20px] 
                        transition-transform 
                        duration-200 
                        hover:translate-x-[10px]
                    ">
                        <div className="
                            w-[80px] 
                            h-[80px] 
                            md:w-[110px] 
                            md:h-[110px] 
                            rounded-md 
                            flex 
                            justify-center 
                            items-center 
                            drop-shadow-[0_8px_8px_rgba(0,0,0,0.1)] 
                            overflow-hidden
                        ">
                            {currentResult.matchGood.imgRef && imageMap[currentResult.matchGood.imgRef] ? (
                                <img src={imageMap[currentResult.matchGood.imgRef]} 
                                    alt={currentResult.matchGood.nameJp} 
                                    className="
                                        w-full 
                                        h-full 
                                        object-contain
                                " />
                            ) : "❓"}
                        </div>

                        <div className="
                            flex 
                            flex-col
                        ">
                            <span className="
                                text-[14px] 
                                md:text-[16px] 
                                font-bold 
                                text-[#2e7d32] 
                                mb-[5px]
                            ">
                                相性バツグン (찰떡궁합)
                            </span>
                            
                            <span className="
                                text-[20px] 
                                md:text-[24px] 
                                font-bold 
                                text-[#333]
                            ">
                                {currentResult.matchGood.nameJp} 
                                <span className="
                                    text-[18px] 
                                    md:text-[20px] 
                                    font-normal 
                                    text-[#666]
                                ">
                                    ({currentResult.matchGood.nameKo})
                                </span>
                            </span>
                            {/* currentResult.matchGood.nameJp: 日本語の相性の良いトレーナーの名前
                            currentResult.matchGood.nameKo: 韓国語の相性の良いトレーナーの名前
                            */}

                            <span className="
                                text-[18px] 
                                md:text-[20px] 
                                text-[#666] 
                                font-bold 
                                mt-[5px]
                                ">
                                    {currentResult.matchGood.mbti}
                            </span>
                                {/* currentResult.matchGood.mbti: 相性の良いトレーナーのMBTIタイプ
                                */}
                        </div>
                    </div>

                    {/* 相性イマイチ */}
                    <div className="
                        bg-[#ffebee] 
                        border 
                        border-[#ffcdd2] 
                        p-[20px] 
                        rounded-[16px] 
                        flex 
                        items-center 
                        gap-[20px] 
                        transition-transform 
                        duration-200 
                        hover:translate-x-[10px]
                    ">
                        <div className="
                            w-[80px] 
                            h-[80px] 
                            md:w-[110px] 
                            md:h-[110px] 
                            rounded-md 
                            flex 
                            justify-center 
                            items-center 
                            drop-shadow-[0_8px_8px_rgba(0,0,0,0.1)] 
                            overflow-hidden
                        ">
                            {currentResult.matchBad.imgRef && imageMap[currentResult.matchBad.imgRef] ? (
                                <img src={imageMap[currentResult.matchBad.imgRef]} 
                                    alt={currentResult.matchBad.nameJp} 
                                    className="
                                        w-full 
                                        h-full 
                                        object-contain
                                " />
                            ) : "❓"}
                        </div>
                        <div className="
                            flex 
                            flex-col
                        ">
                            <span className="
                                text-[14px] 
                                md:text-[16px] 
                                font-bold 
                                text-[#c62828] 
                                mb-[5px]
                            ">
                                相性イマイチ (상극)
                            </span>
                            <span className="
                                text-[20px] 
                                md:text-[24px] 
                                font-bold 
                                text-[#333]
                            ">
                                {currentResult.matchBad.nameJp} 
                                <span className="
                                    text-[18px] 
                                    md:text-[20px] 
                                    font-normal 
                                    text-[#666]
                                ">
                                    ({currentResult.matchBad.nameKo})
                                </span>
                            </span>
                            {/* currentResult.matchBad.nameJp: 日本語の相性の悪いトレーナーの名前
                            currentResult.matchBad.nameKo: 韓国語の相性の悪いトレーナーの名前
                            */}
                            <span className="
                                text-[18px] 
                                md:text-[20px] 
                                text-[#666] 
                                font-bold 
                                mt-[5px]
                            ">
                                {currentResult.matchBad.mbti}
                            </span>
                            {/* currentResult.matchBad.mbti: 相性の悪いトレーナーのMBTI
                            */}
                        </div>
                    </div>
                </div>

                {/* アクションボタン */}
                <div className="
                    flex 
                    gap-[20px]
                ">
                    <button className="
                        flex-1 
                        bg-[#e3350d] 
                        text-white 
                        p-[18px] 
                        rounded-[12px] 
                        font-bold text-[16px] 
                        md:text-[18px] 
                        text-center 

                        transition-all 
                        hover:bg-[#c92f0c] 
                        hover:-translate-y-[2px]
                    ">
                        結果を保存する 
                        <span className="
                            block 
                            text-[18px] 
                            md:text-[20px] 
                            font-normal 
                            mt-1
                        ">
                            (결과 저장하기)
                        </span>
                    </button>
                    <button 
                        className="
                            flex-1 
                            bg-white 
                            text-[#333] 
                            border-2 
                            border-[#ddd] 
                            p-[18px] 
                            rounded-[12px] 
                            font-bold 
                            text-[16px] 
                            md:text-[18px] 
                            text-center 
                            
                            transition-all 
                            hover:border-[#333] 
                            hover:bg-[#f9f9f9]
                        " onClick={handleRestart}>
                            もう一度診断する 
                            <span className="
                                block 
                                text-[18px] 
                                md:text-[20px] 
                                font-normal 
                                mt-1
                            ">
                                (다시 하기)
                            </span>
                    </button>
                </div>
            </div>
        </div>
    )
}