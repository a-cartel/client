import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

// 🚀 TYPE_MAP 제거, TYPE_COLORS만 사용
import { TYPE_COLORS } from './PokeDexFilter'

export interface PokemonData {
    id: number;
    name: string;
    desc: string;
    type: string;
    imgUrl: string;
    height: number;
    weight: number;
}

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

export default function PokeDexDetail() {
    const navigate = useNavigate()
    const { id } = useParams<{ id: string }>()

    const [pokemon, setPokemon] = useState<PokemonData | null>(null)
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        const fetchPokemonDetail = async () => {
            try {
                if (!id) return;
                const timestamp = new Date().getTime();
                const response = await axios.get<PokemonData>(`http://localhost:8081/codex/${id}?t=${timestamp}`)
                setPokemon(response.data)
            } catch (error) {
                console.warn("⚠️ バックエンドDB接続失敗！フロントエンドのダミーデータをレンダリングします。", error)
                const dummyData = DUMMY_POKEMON_DATA.find(p => p.id === Number(id));
                setPokemon(dummyData || null);
            } finally {
                setLoading(false)
            }
        }

        fetchPokemonDetail()
    }, [id])

    if (loading) {
        return (
            <div className="min-h-[calc(100vh-170px)] bg-[#f0f0f0] flex justify-center items-center">
                <p className="text-xl font-bold text-gray-600">データを読み込んでいます...</p>
            </div>
        )
    }

    if (!pokemon) {
        return (
            <div className="min-h-[calc(100vh-170px)] bg-[#f0f0f0] flex flex-col justify-center items-center gap-4">
                <p className="text-xl font-bold text-red-500">ポケモン情報が見つかりません。</p>
                <button 
                    onClick={() => navigate('/Zukan')}
                    className="bg-gray-800 text-white px-6 py-2 rounded-lg font-bold">
                    一覧に戻る
                </button>
            </div>
        )
    }

    const typesArray = pokemon.type ? pokemon.type.split(/[,\s、・]+/).filter(Boolean) : []

    const formattedHeight = pokemon.height !== undefined && pokemon.height !== null
        ? (pokemon.height * 0.1).toFixed(1) + " m"
        : "- m";

    const formattedWeight = pokemon.weight !== undefined && pokemon.weight !== null
        ? (pokemon.weight * 0.1).toFixed(1) + " kg"
        : "- kg";

    return (
        <div className="min-h-[calc(100vh-170px)] bg-[#f0f0f0] font-sans text-[#333]">
            <main>
                <section className="bg-[#f0f0f0] py-[40px] px-[20px] flex justify-center items-center">
                    <div className="flex flex-col md:flex-row items-center gap-[40px] max-w-[800px] w-full bg-white p-8 rounded-2xl shadow-md border border-gray-100">
                        
                        <figure className="w-[250px] h-[250px] md:w-[300px] md:h-[300px] m-0 flex justify-center items-center bg-[#f8f8f8] rounded-2xl p-4">
                            <img 
                                src={pokemon.imgUrl} 
                                alt={pokemon.name} 
                                className="w-full h-full object-contain drop-shadow-xl hover:scale-105 transition-transform duration-300" 
                            />
                        </figure>

                        <div className="flex-1 w-full">
                            <p className="text-[#999] text-[18px] font-extrabold m-0">
                                No.{pokemon.id.toString().padStart(4, '0')}
                            </p>

                            <h2 className="text-[32px] font-black text-[#333] mt-1 mb-4">
                                {pokemon.name}
                            </h2>

                            <div className="flex flex-wrap gap-2 mb-6">
                                {typesArray.map((t, index) => {
                                    const colorConfig = TYPE_COLORS[t] || { bg: '#E5E7EB', text: '#374151' };
                                    return (
                                        <span 
                                            key={index}
                                            style={{ backgroundColor: colorConfig.bg, color: colorConfig.text }}
                                            className="inline-block px-4 py-1.5 text-[13px] font-bold rounded-full shadow-sm"
                                        >
                                            {t}
                                        </span>
                                    );
                                })}
                            </div>

                            <div className="grid grid-cols-2 gap-4 bg-[#f8f8f8] p-4 rounded-xl mb-6 text-center border border-gray-100">
                                <div>
                                    <p className="text-gray-400 text-xs font-bold mb-1">高さ</p>
                                    <p className="text-lg font-black text-gray-800">{formattedHeight}</p>
                                </div>
                                <div>
                                    <p className="text-gray-400 text-xs font-bold mb-1">重さ</p>
                                    <p className="text-lg font-black text-gray-800">{formattedWeight}</p>
                                </div>
                            </div>

                            <p className="text-[15px] leading-relaxed text-gray-600 font-medium m-0 mb-2">
                                {pokemon.desc}
                            </p>

                        </div>
                    </div>
                </section>

                <div className="flex justify-center pb-[40px]">
                    <button 
                        className="bg-[#e3350d] border-2 border-[#ddd] py-[12px] px-[40px] rounded-[8px] cursor-pointer font-bold text-white hover:bg-[#c92f0c] hover:border-[#aaa] shadow-sm transition-all flex items-center gap-1"
                        onClick={() => navigate('/Zukan')}>
                        ▶ 戻る 
                    </button>
                </div>

            </main>
        </div>
    )
}