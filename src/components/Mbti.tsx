import { useState } from 'react'
import battleFrontierImg from '../assets/BattleFrontier.png'

export default function MBTI() {
    const [count, setCount] = useState(0)

    return (
        <div className="
            min-h-screen
            bg-[#f8f8ba] 
            flex flex-col items-center justify-center 
            p-4
            ">
            {/* 
            min-h-screen: 화면 전체 높이 확보
            bg-[#f8f8ba]: 사용자 정의 배경색(밝은 노란색, 적용 확인용 추후 변경필수.)
            flex flex-col items-center justify-center: 중앙 정렬
            p-4: 패딩 추가
            */}
            
            {/* 메인 컨텐츠 박스: DaisyUI Card 컴포넌트 활용 */}
            <div className="
            card lg:card-side 
            bg-[#f3f7ff] 
            shadow-2xl 
            max-w-[850px] 
            w-full 
            overflow-hidden 
            ">
            {/* 
            card: DaisyUI 카드 스타일
            lg:card-side: 큰 화면에서 가로 레이아웃, 작은 화면에서는 세로 레이아웃
            bg-[#f3f7ff]: 카드 배경색
            shadow-2xl: 그림자 효과
            max-w-[850px]: 최대 너비 제한
            w-full: 가로 전체 사용
            overflow-hidden: 내용이 넘칠 때 숨김
            */}
                
                {/* 1. 왼쪽 이미지 영역 */}
                <figure className="
                lg:w-1/2 w-full
                aspect-[16/10] 
                lg:aspect-auto
                ">
                    <img 
                        src={battleFrontierImg} 
                        alt="Battle Frontier" 
                        className="w-full h-full object-cover"
                    />
                </figure>
                {/* 
                lg:w-1/2 w-full: 큰 화면에서 너비 50%, 작은 화면에서는 전체 너비
                aspect-[16/10]: 작은 화면에서 16:10 비율 유지
                lg:aspect-auto: 큰 화면에서는 원본 비율 유지
                w-full: 가로 전체 사용
                h-full: 세로 전체 사용
                object-cover: 이미지가 영역을 완전히 덮도록 조절
                */}
                
                {/* 2. 오른쪽 텍스트 및 버튼 영역 */}
                <div className="
                card-body 
                lg:w-1/2 
                p-8 
                justify-center 
                text-left 
                items-start
                ">
                {/* 
                card-body: DaisyUI 카드 본문 스타일
                lg:w-1/2: 큰 화면에서 너비 50%
                p-8: 패딩 추가
                justify-center: 수직 중앙 정렬
                text-left: 텍스트 왼쪽 정렬
                items-start: 수평 시작점 정렬
                */}
                    

                    
                    {/* 타이틀 및 텍스트 */}
                    <h1 className="
                        block 
                        text-[24px] 
                        font-[900] 
                        text-[#1a1a1a] 
                        leading-[1.3]
                        tracking-tight
                    ">
                        あなたに似ているポケモントレーナーは？ 
                    {/* 
                    block: 요소를 블록으로 설정하여 줄 바꿈
                    text-[24px]: 폰트 사이즈 24px
                    font-[900]: 폰트 두께 900 (최강)
                    text-[#1a1a1a]: 글자 색상
                    leading-[1.3]: 줄 간격 1.3
                    tracking-tight: 글자 간격을 조금 좁게 설정
                    */}
                        {/* 서브 타이틀 */}
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
                    
                    {/* 설명 문구 영역 */}
                    <div className="
                        text-left 
                        my-[25px]
                        max-w-[400px]
                    ">
                    {/* 
                    text-left: 텍스트 왼쪽 정렬
                    my-[25px]: 상하 마진 25px
                    max-w-[400px]: 최대 너비 400px
                    */}
                        {/* 메인 일문 설명 */}
                        <p className="
                            text-[16px] 
                            font-medium 
                            text-[#888888] 
                            leading-[1.6]
                        ">
                            12個の質問に答えて、あなたの性格(MBTI)に一番近いポケモントレーナーを見つけよう！
                        </p>
                        {/* 국문 번역 설명 */}
                        <p className="
                            text-[14px]
                            font-normal 
                            text-[#888888]
                            leading-[1.6] 
                            mt-[6px]
                        ">
                            (12개의 질문에 답하고 당신의 성격과 가장 가까운 트레이너를 찾아보세요!)
                        </p>
                        {/* 
                        text-[15px]: 폰트 사이즈 15px
                        font-medium: 폰트 두께 중
                        text-[#888888]: 글자 색상
                        leading-[1.6]: 줄 간격 1.6
                        */}
                    </div>
                    
                    <div className="w-full mt-[30px]"> 
                        <button className="
                            w-full 
                            h-[55px]
                            bg-[#e3350d] 
                            text-white 
                            text-[17px]
                            font-bold 
                            rounded-md 
                            cursor-pointer 
                            flex 
                            items-center 
                            justify-center 
                            gap-2 
                            shadow-[0_8px_20px_rgba(0,123,255,0.3)] 
                            
                            hover:bg-[#c92f0c] 
                            hover:-translate-y-[2px]                             
                            transition-all 
                            duration-300
                            "
                            onClick={() => console.log("테스트 시작!")}>
                            <span>テスト開始 (테스트 시작하기)→</span>
                        </button>
                    </div>
                </div>
            </div>

        </div>
    )
}