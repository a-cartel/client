interface MbtiTestProps {
    currentIdx: number;
    questionsData: any[];
    progressPercent: number;
    currentQ: any;
    handleAnswer: (type: string, score: number) => void;
}

export default function MbtiTest({ currentIdx, questionsData, progressPercent, currentQ, handleAnswer }: MbtiTestProps) {
    return (
        <div className="
            bg-white 
            shadow-2xl 
            max-w-[850px] 
            w-full 
            rounded-[16px] 
            flex 
            flex-col 
            items-center 
            p-[60px_20px] 
            md:p-[80px_40px] 
            box-border
        ">
            <div className="
                w-full 
                max-w-[600px] 
                mb-[50px]
            ">
                <div className="
                    text-right 
                    font-bold 
                    text-[#e3350d] 
                    text-[20px] 
                    mb-[10px]
                ">
                    {currentIdx + 1} / {questionsData.length}
                    {/* currentIdx: 現在の質問のインデックス
                    questionsData.length: 質問の総数
                    */}
                </div>
                <div className="w-full h-[12px] bg-[#eee] rounded-full overflow-hidden">
                    <div className="h-full bg-[#e3350d] rounded-full transition-all duration-300" style={{ width: `${progressPercent}%` }}></div>
                </div>
            </div>
            
            <h2 className="text-[24px] md:text-[28px] font-bold text-center text-[#333] mb-[60px] leading-[1.5]">
                {currentQ.qJp}<br/>
                <span className="block text-[16px] md:text-[18px] text-[#888] font-normal mt-[15px]">
                    {currentQ.qKo}
                </span>
                {/* currentQ.qJp: 日本語の質問文
                currentQ.qKo: 韓国語の質問文
                */}
            </h2>

            <button 
                className="
                    w-full 
                    max-w-[600px] 
                    bg-[#faf7dc] 
                    border-2 
                    border-[#eee] 
                    p-[20px] 
                    md:p-[25px] 
                    rounded-[12px] 
                    mb-[20px] 
                    text-center 

                    cursor-pointer
                    transition-all 
                    duration-200 
                    hover:border-[#e3350d] 
                    hover:bg-[#eee] 
                    hover:scale-[1.02]
                "onClick={() => handleAnswer(currentQ.type, currentQ.scoreA)}>

                <span className="
                    block 
                    text-[18px] 
                    md:text-[20px] 
                    font-bold 
                    text-[#333]
                ">{currentQ.aJp}</span>
                <span className="
                    block 
                    text-[14px] 
                    md:text-[16px] 
                    text-[#888] 
                    font-normal 
                    mt-[5px]
                ">{currentQ.aKo}</span>
                {/* currentQ.aJp: 日本語の選択肢文
                currentQ.aKo: 韓国語の選択肢文
                */}
            </button>

            <button 
                className="
                    w-full 
                    max-w-[600px] 
                    bg-[#faf7dc] 
                    border-2 
                    border-[#eee] 
                    p-[20px] 
                    md:p-[25px] 
                    rounded-[12px] 
                    mb-[20px] 
                    cursor-pointer
                    text-center 
                    transition-all 
                    duration-200 
                    hover:border-[#e3350d] 
                    hover:bg-[#eee] 
                    hover:scale-[1.02]
                "onClick={() => handleAnswer(currentQ.type, currentQ.scoreB)}>
                
                <span className="
                    block 
                    text-[18px] 
                    md:text-[20px] 
                    font-bold 
                    text-[#333]
                ">{currentQ.bJp}</span>
                <span className="
                    block 
                    text-[14px] 
                    md:text-[16px] 
                    text-[#888] 
                    font-normal 
                    mt-[5px]
                ">{currentQ.bKo}</span>
                {/* currentQ.bJp: 日本語の選択肢文
                currentQ.bKo: 韓国語の選択肢文
                */}
            </button>
        </div>
    )
}