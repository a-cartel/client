import { Link } from 'react-router-dom';
import { PokemonData } from './PokeDexMain'; // 메인에서 타입 임포트 (PokeDexMain_backup은 존재하지 않는 파일이라 교체)

interface Props {
    poke: PokemonData;
}

export default function PokeDexCard({ poke }: Props) {
    return (
        <Link to={`/Zukan/${poke.id}`} className="block">
            <div className="bg-white rounded-md shadow-md p-4 text-center cursor-pointer hover:shadow-lg hover:-translate-y-1 transition-all h-full">
                <div className="bg-gray-100 rounded-md p-4 mb-4">
                    <img
                        src={poke.imgUrl}
                        alt={poke.name}
                        className="w-full h-32 object-contain"
                    />
                </div>
                <p className="text-gray-500 text-sm font-bold text-left">
                    No.{poke.id.toString().padStart(4, '0')}
                </p>
                <h3 className="text-lg font-extrabold text-left">{poke.name}</h3>
                <div className="mt-2 text-left">
                    <span className="px-3 py-1 bg-gray-200 text-sm rounded-full">
                        {poke.type}
                    </span>
                </div>
            </div>
        </Link>
    );
}
