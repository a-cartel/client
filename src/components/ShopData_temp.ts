export interface Shop {
    id: number;
    name: string;
    address: string;
    hours: string;
    holiday: string;
    phone: string;
    access: string;
    image: string;
}

export const shopList: Shop[] = [
    {
        id: 1,
        name: "ポケモンストア 新千歳空港店",
        address: "北海道千歳市美々987 新千歳空港国内線ターミナルビル2階",
        hours: "10:00 - 20:00",
        holiday: "年中無休",
        phone: "011-232-3212",
        access: "JR 新千歳空港駅 徒歩すぐ",
        image: "https://shop.pokemon.co.jp/ja/shop/pokemonstore-new-chitose-airport/images/mv/mv-pokemonstore-new-chitose-airport-001.webp"
    },
    {
        id: 2,
        name: "ポケモンセンタートウキョーベイ",
        address: "千葉県船橋市浜町2-1-1 三井ショッピングパーク ららぽーとTOKYO-BAY 西館2階",
        hours: "10:00 - 20:00",
        holiday: "施設休業日に準ずる",
        phone: "03-6262-3439",
        access: "JR 南船橋駅 徒歩約5分",
        image: "https://shop.pokemon.co.jp/ja/shop/pokemoncenter-tokyobay/images/mv/mv-pokemoncenter-tokyobay-001.webp"
    },
    {
        id: 3,
        name: "ポケモンストア 御殿場店",
        address: "静岡県御殿場市深沢1312 御殿場プレミアム・アウトレット内 2630区画",
        hours: "10:00 - 20:00",
        holiday: "年中無休",
        phone: "03-6456-1221",
        access: "JR「御殿場駅」／東名「御殿場IC」より無料シャトルバス運行",
        image: "https://shop.pokemon.co.jp/ja/shop/pokemonstore-gotemba/images/mv/mv-pokemonstore-gotemba-001.webp"
    },
    {
        id: 4,
        name: "ポケモンストア 御殿場店",
        address: "静岡県御殿場市深沢1312 御殿場プレミアム・アウトレット内 2630区画",
        hours: "10:00 - 20:00",
        holiday: "年中無休",
        phone: "03-6456-1221",
        access: "JR「御殿場駅」／東名「御殿場IC」より無料シャトルバス運行",
        image: "https://shop.pokemon.co.jp/ja/shop/pokemonstore-gotemba/images/mv/mv-pokemonstore-gotemba-001.webp"
    }
]