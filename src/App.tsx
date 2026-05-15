import { useState } from 'react'

function App() {
  return (
    <main className="flex-1 w-full max-w-[1000px] mx-auto my-[60px] px-5 box-border flex flex-col">
      
      {/* 페이지 헤더 */}
      <div className="flex justify-between items-end w-full max-w-[700px] mx-auto mb-[15px]">
        <h1 className="text-[28px] font-[900] text-[#333] border-l-[5px] border-l-[#e3350d] pl-[15px] m-0 leading-tight">
          トレーナーカード <span className="text-[#777] font-normal italic">（마이페이지）</span>
        </h1>
        <a href="#" className="text-[14px] text-[#007bff] no-underline font-bold hover:underline">
          プロフィール編集
        </a>
      </div>

      {/* 트레이너 카드 (mypage.css 스타일 재현) */}
      <div className="relative w-full max-w-[700px] aspect-[1.586/1] mx-auto bg-[linear-gradient(135deg,#1e3c72_0%,#2a5298_100%)] rounded-[12px] border-[4px] border-[#b0bec5] p-[15px_20px] text-white shadow-[0_20px_40px_rgba(30,60,114,0.2)] overflow-hidden flex flex-col box-border">
        {/* 카드 배경 장식 (원형) */}
        <div className="absolute -right-[50px] -top-[50px] w-[350px] h-[350px] border-[30px] border-white/5 rounded-full pointer-events-none z-0"></div>

        {/* TC 헤더 */}
        <div className="relative z-10 flex justify-between items-center text-[20px] font-bold tracking-[1px] text-white/90 mb-[5px]">
          <span className="font-sans uppercase">Team Rocket</span>
          <span className="font-[Arial_Black] uppercase">TRAINER'S CARD</span>
        </div>

        {/* 인포 바 (Clip-path 적용) */}
        <div 
          className="relative z-10 bg-black/40 flex justify-between items-center py-[8px] px-[40px] my-[5px] mx-0"
          style={{ clipPath: 'polygon(15px 0, 100% 0, calc(100% - 15px) 100%, 0 100%)' }}
        >
          <div className="text-[26px] font-[900] flex items-baseline">サトシ</div>
          <div className="text-[20px] font-mono tracking-[2px]">0000-0000-0000</div>
        </div>

        {/* 카드 본문 (아바타 + 파티 슬롯) */}
        <div className="relative z-10 flex gap-[20px] flex-1 mb-[15px]">
          {/* 아바타 영역 */}
          <div className="flex-1 max-w-[35%] bg-white/10 border-2 border-white/30 rounded-[4px] flex justify-center items-center overflow-hidden">
            <div className="text-white/50 font-bold text-[16px] text-center">
              Trainer<br />Image
            </div>
          </div>
          
          {/* 포켓몬 파티 (6슬롯) */}
          <div className="flex-[2] grid grid-cols-3 grid-rows-2 gap-[8px]">
            {/* 슬롯 1 & 2 (이미지 포함 예시) */}
            <div className="bg-white/95 border-2 border-[#555] rounded-[4px] flex justify-center items-center shadow-[inset_0_2px_5px_rgba(0,0,0,0.1)]">
               <div className="w-[80%] h-[80%] bg-slate-200 rounded-full animate-pulse"></div> {/* 포켓몬 이미지 대체 */}
            </div>
            <div className="bg-white/95 border-2 border-[#555] rounded-[4px] flex justify-center items-center shadow-[inset_0_2px_5px_rgba(0,0,0,0.1)]">
              <div className="w-[80%] h-[80%] bg-slate-200 rounded-full animate-pulse"></div>
            </div>
            {/* 나머지 빈 슬롯 */}
            {[3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white/95 border-2 border-[#555] rounded-[4px] flex justify-center items-center shadow-[inset_0_2px_5px_rgba(0,0,0,0.1)]"></div>
            ))}
          </div>
        </div>

        {/* 하단 바 */}
        <div className="relative z-10 bg-black/50 p-[12px_20px] rounded-[4px] text-[15px] font-bold text-white flex items-center h-[45px] box-border">
          INTJ 建築家タイプのトレーナー（相性最高：ENTP 討論者タイプのトレーナー）
        </div>
      </div>

      {/* 리뷰 섹션 */}
      <div className="w-full max-w-[700px] mx-auto mt-[40px] bg-white rounded-[16px] p-[30px] shadow-[0_10px_30px_rgba(0,0,0,0.05)] border border-[#eaeaea] box-border text-left">
        <div className="text-[20px] font-bold border-b-2 border-b-[#f0f0f0] pb-[15px] mb-[20px] text-[#333] flex justify-between items-baseline">
          <span>投稿したレビュー</span>
          <a href="#" className="text-[14px] text-[#007bff] no-underline font-bold hover:underline">もっと見る &gt;</a>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[15px]">
          {/* 리뷰 카드 예시 (반복) */}
          {[
            { shop: 'ポケモンセンターメガトウキョー', star: '★★★★★', text: '店内がとても広くて、グッズの品揃えも...' },
            { shop: 'ポケモンセンターメガトウキョー', star: '★★★★☆', text: '休日はかなり混雑します。平日の午前중...' },
            { shop: 'ポケモンセンターメガトウキョー', star: '★★★★★', text: 'スタッフさんの対応が丁寧で気持ちよく...' },
            { shop: 'ポケモンセンターシブヤ', star: '★★★★★', text: 'ミュウツーの等身大オブジェが圧巻です...' },
          ].map((review, idx) => (
            <div key={idx} className="border border-[#eaeaea] rounded-[8px] p-[15px] bg-[#fafafa] flex flex-col gap-[8px] transition-all hover:-translate-y-[2px] hover:shadow-[0_4px_12px_rgba(0,0,0,0.05)] hover:bg-white hover:border-[#ddd] cursor-pointer">
              <div className="text-[13px] font-bold text-[#007bff] truncate">{review.shop}</div>
              <div className="text-[#ffc107] text-[14px] tracking-[1px]">{review.star}</div>
              <div className="text-[14px] text-[#444] leading-[1.5] font-[500] truncate">{review.text}</div>
              <div className="text-[11px] text-[#aaa] text-right mt-auto">2026.04.15</div>
            </div>
          ))}
        </div>
      </div>
      
    </main>
  )
}

export default App