import { useState } from 'react'

// アセット、データ
import battleFrontierImg from '../assets/BattleFrontier.png'
import lanceImg from '../assets/Lance.png'
import loreleiImg from '../assets/Lorelei.png'
import aaronImg from '../assets/Aaron.png'
import questionsData from './questions.json'
import resultsData from './results.json'

// イメージ参照文字列を実際のインポートされたモジュールにマッピングするオブジェクト
// 例: 'lance'という文字列が入るとlanceImgモジュールを返す
const imageMap: Record<string, string> = {
    'lance': lanceImg,
    'lorelei': loreleiImg,
    'aaron': aaronImg,
    'placeholder': '' 
}

export default function Mbti() {
    const [step, setStep] = useState('start')
    
    // テストの進行状態
    const [currentIdx, setCurrentIdx] = useState(0)

    // MBTIタイプごとのスコア
    const [scores, setScores] = useState({ EI: 0, SN: 0, TF: 0, JP: 0 })

    // テスト開始ハンドラー
    const [finalMbti, setFinalMbti] = useState('INTJ')

    // 質問回答クリックハンドラー
    const handleAnswer = (type: string, score: number) => {

        // スコアの加算
        const newScores = { ...scores, [type]: scores[type as keyof typeof scores] + score }
        setScores(newScores)

        // 最終問題か確認
        if (currentIdx + 1 < questionsData.length) {
            setCurrentIdx(currentIdx + 1)
        } else {
            // MBTI点数の計算
            let resultString = ''
            resultString += newScores.EI >= 0 ? 'E' : 'I'
            resultString += newScores.SN >= 0 ? 'S' : 'N'
            resultString += newScores.TF >= 0 ? 'T' : 'F'
            resultString += newScores.JP >= 0 ? 'J' : 'P'
            
            setFinalMbti(resultString)
            setStep('result')
        }
    }

    // テストのリトライハンドラー
    const handleRestart = () => {
        setScores({ EI: 0, SN: 0, TF: 0, JP: 0 })
        setCurrentIdx(0)
        setStep('start')
    }

    // レンダリングに必要なデータ変数
    const currentQ = questionsData[currentIdx]
    const progressPercent = Math.round(((currentIdx + 1) / questionsData.length) * 100)
    
    // JSON内にデータがない場合のデフォルト値
    const currentResult = (resultsData as any)[finalMbti] || (resultsData as any)["INTJ"]

    return (
        <div className="
            min-h-screen 
            bg-[#f8f8ba] 
            flex 
            flex-col 
            items-center 
            justify-center 
            p-4 
            md:p-8
        ">

        {/* 1. Start */}
        {step === 'start' && (
                <div className="
                    card 
                    lg:card-side 
                    bg-[#f3f7ff] 
                    shadow-2xl 
                    max-w-[850px] 
                    w-full 
                    overflow-hidden
                ">
                    <figure className="
                        lg:w-1/2 
                        w-full 
                        aspect-[16/10] 
                        lg:aspect-auto
                    ">
                        <img src={battleFrontierImg} 
                            alt="Battle Frontier" 
                            className="
                                w-full 
                                h-full 
                                object-cover
                        " />
                    </figure>

                    <div className="
                        card-body 
                        lg:w-1/2 
                        p-8 
                        justify-center 
                        text-left 
                        items-start
                        ">
                        <h1 className="
                            block 
                            text-[24px] 
                            font-[900] 
                            text-[#1a1a1a] 
                            leading-[1.3] 
                            tracking-tight
                        ">
                            あなたに似ているポケモントレーナーは？ 
                            <span className="
                                block 
                                text-[18px] 
                                font-medium 
                                text-[#3f3f3f] 
                                mt-2
                            ">
                                (당신과 닮은 포켓몬 트레이너는?)
                            </span>
                        </h1>

                        <div className="
                            text-left 
                            my-[25px] 
                            max-w-[400px]
                        ">
                            <p className="
                                text-[16px] 
                                font-medium 
                                text-[#888888] 
                                leading-[1.6]
                            ">
                                12個の質問に答えて、あなたの性格(MBTI)に一番近いポケモントレーナーを見つけよう！
                            </p>
                            <p className="
                                text-[14px] 
                                font-normal 
                                text-[#888888] 
                                leading-[1.6] 
                                mt-[6px]
                            ">
                                (12개의 질문에 답하고 당신의 성격과 가장 가까운 트레이너를 찾아보세요!)
                            </p>
                        </div>
                        <div className="
                            w-full 
                            mt-[30px]
                        "> 
                            <button className="
                                w-full h-[55px] 
                                bg-[#e3350d] 
                                text-white 
                                text-[17px] 
                                font-bold 
                                rounded-md 
                                
                                flex 
                                items-center 
                                justify-center 
                                gap-2 
                                shadow-[0_8px_20px_rgba(227,53,13,0.3)] 
                                
                                cursor-pointer 
                                hover:bg-[#c92f0c] 
                                hover:-translate-y-[2px] 
                                transition-all 
                                duration-300
                            " onClick={() => setStep('quiz')}>
                                <span>テスト開始 (테스트 시작하기)→</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* 2. Quiz */}
            {step === 'quiz' && (
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
                            {/* 
                            currentIdx: 現在の質問のインデックス
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
                        {/* 
                        currentQ.qJp: 日本語の質問文
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
                        {/* 
                        currentQ.aJp: 日本語の選択肢文
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
                        {/* 
                        currentQ.bJp: 日本語の選択肢文
                        currentQ.bKo: 韓国語の選択肢文
                        */}
                    </button>
                </div>
            )}

            {/* 3. Result */}
            {step === 'result' && (
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
                            text-[#888] 
                            font-bold 
                            mb-[10px]
                        ">
                            {currentResult.typeNameJp}
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
                                text-[20px] 
                                md:text-[24px] 
                                text-[#777] 
                                font-normal
                            ">
                                ({currentResult.nameKo})
                            </span>
                            {/* 
                            currentResult.nameJp: 日本語の結果名
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
                                bg-slate-100 
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
                                text-[16px] 
                                text-[#888] 
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
                                    bg-white 
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
                                            text-[14px] 
                                            md:text-[16px] 
                                            font-normal 
                                            text-[#666]
                                        ">
                                            ({currentResult.matchGood.nameKo})
                                        </span>
                                    </span>
                                    {/* 
                                    currentResult.matchGood.nameJp: 日本語の相性の良いトレーナーの名前
                                    currentResult.matchGood.nameKo: 韓国語の相性の良いトレーナーの名前
                                    */}

                                    <span className="
                                        text-[14px] 
                                        md:text-[16px] 
                                        text-[#666] 
                                        font-bold 
                                        mt-[5px]
                                        ">
                                            {currentResult.matchGood.mbti}
                                    </span>
                                        {/* 
                                        currentResult.matchGood.mbti: 相性の良いトレーナーのMBTIタイプ
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
                                    bg-white 
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
                                            text-[14px] 
                                            md:text-[16px] 
                                            font-normal 
                                            text-[#666]
                                        ">
                                            ({currentResult.matchBad.nameKo})
                                        </span>
                                    </span>
                                    {/* 
                                    currentResult.matchBad.nameJp: 日本語の相性の悪いトレーナーの名前
                                    currentResult.matchBad.nameKo: 韓国語の相性の悪いトレーナーの名前
                                    */}
                                    <span className="
                                        text-[14px] 
                                        md:text-[16px] 
                                        text-[#666] 
                                        font-bold 
                                        mt-[5px]
                                    ">
                                        {currentResult.matchBad.mbti}
                                    </span>
                                    {/* 
                                    currentResult.matchBad.mbti: 相性の悪いトレーナーのMBTI
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
                                    text-[12px] 
                                    md:text-[14px] 
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
                                        text-[12px] 
                                        md:text-[14px] 
                                        font-normal 
                                        mt-1
                                    ">
                                        (다시 하기)
                                    </span>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}