import React from 'react';

// 🎨 18가지 포켓몬 공식 타입 일본어 목록 (순수 배열로 경량화)
export const POKEMON_TYPES = [
    'ノーマル', 'ほのお', 'みず', 'くさ', 'でんき', 'こおり', 
    'かくとう', 'どく', 'じめん', 'ひこう', 'エスパー', 'むし', 
    'いわ', 'ゴースト', 'ドラゴン', 'あく', 'はがね', 'フェアリー'
];

// 🎨 18가지 포켓몬 공식 타입별 색상 표
export const TYPE_COLORS: Record<string, { bg: string; text: string }> = {
    'ノーマル': { bg: '#A8A878', text: '#FFFFFF' },
    'ほのお': { bg: '#EE8130', text: '#FFFFFF' },
    'みず': { bg: '#6390F0', text: '#FFFFFF' },
    'くさ': { bg: '#7AC74C', text: '#FFFFFF' },
    'でんき': { bg: '#F7D02C', text: '#FFFFFF' },
    'こおり': { bg: '#96D9D6', text: '#FFFFFF' },
    'かくとう': { bg: '#C22E28', text: '#FFFFFF' },
    'どく': { bg: '#A33EA2', text: '#FFFFFF' },
    'じめん': { bg: '#E2BF65', text: '#FFFFFF' },
    'ひこう': { bg: '#A98FF3', text: '#FFFFFF' },
    'エスパー': { bg: '#F95587', text: '#FFFFFF' },
    'むし': { bg: '#A6B91A', text: '#FFFFFF' },
    'いわ': { bg: '#B6A136', text: '#FFFFFF' },
    'ゴースト': { bg: '#735797', text: '#FFFFFF' },
    'ドラゴン': { bg: '#6F35FC', text: '#FFFFFF' },
    'あく': { bg: '#705746', text: '#FFFFFF' },
    'はがね': { bg: '#B7B7CE', text: '#FFFFFF' },
    'フェアリー': { bg: '#D685AD', text: '#FFFFFF' },
};

interface FilterProps {
    isOpen: boolean;
    onClose: () => void;
    selectedTypes: string[];
    onTypeToggle: (type: string) => void;
    onReset: () => void;
    onApply: () => void;
}

export default function PokeDexFilter({ isOpen, onClose, selectedTypes, onTypeToggle, onReset, onApply }: FilterProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-[9999] p-4">
            <div className="bg-white rounded-2xl p-6 max-w-lg w-full shadow-2xl animate-fade-in">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-gray-800">
                        タイプ検索
                    </h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 font-bold text-xl">✕</button>
                </div>
                
                {/* 타입 선택 버튼 영역 (POKEMON_TYPES 배열 기반 매핑) */}
                <div className="flex flex-wrap gap-2 mb-8">
                    {POKEMON_TYPES.map((type) => {
                        const isSelected = selectedTypes.includes(type);
                        const colorConfig = TYPE_COLORS[type] || { bg: '#E5E7EB', text: '#374151' };

                        return (
                            <button
                                key={type}
                                onClick={() => onTypeToggle(type)}
                                style={
                                    isSelected 
                                        ? { 
                                            backgroundColor: colorConfig.bg, 
                                            color: colorConfig.text,
                                            borderColor: colorConfig.bg
                                          } 
                                        : {}
                                }
                                className={`px-4 py-2 rounded-full font-bold border transition-all text-[13px] ${
                                    isSelected
                                        ? 'shadow-md scale-105 ring-2 ring-offset-1 ring-gray-300'
                                        : 'bg-gray-100 text-gray-500 border-gray-200 hover:bg-gray-200 opacity-70'
                                }`}
                            >
                                {type}
                            </button>
                        );
                    })}
                </div>

                {/* 하단 버튼 영역 */}
                <div className="flex gap-3">
                    <button onClick={onReset} className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl font-bold text-[15px] hover:bg-gray-200 border border-gray-200">
                        リセット
                    </button>
                    <button onClick={onApply} className="flex-1 bg-[#e3350d] text-white py-3 rounded-xl font-bold text-[15px] hover:bg-[#c92f0c] shadow-md">
                        適用する {selectedTypes.length > 0 && `(${selectedTypes.length}/2)`}
                    </button>
                </div>
            </div>
        </div>
    );
}