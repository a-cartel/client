import { useState } from 'react'

// アセット、データ
import battleFrontierImg from '../assets/BattleFrontier.png'
import questionsData from './questions.json'

// 分離されたコンポーネント
import MbtiTest from './MbtiTest.tsx'
import MbtiResult from './MbtiResult.tsx'

export default function MbtiStart() {
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

    return (
        <div className="
            min-h-screen 
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
                <MbtiTest 
                    currentIdx={currentIdx}
                    questionsData={questionsData}
                    progressPercent={progressPercent}
                    currentQ={currentQ}
                    handleAnswer={handleAnswer}
                />
            )}

            {/* 3. Result */}
            {step === 'result' && (
                <MbtiResult 
                    finalMbti={finalMbti}
                    handleRestart={handleRestart}
                />
            )}
        </div>
    )
}