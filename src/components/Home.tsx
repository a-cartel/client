import { useEffect, useRef, useState } from "react";
import axios from "axios";

interface NewsList {
    newsDate: string;
    newsId: number;
    newsImg: string;
    newsTitle: string;
    newsType: string;
    newsUrl: string;
}

interface PageResponse<T> {
    content: T[];
    page: {
        totalPages: number;
        totalElements: number;
        number: number;
        size: number;
    };
}

// https://www.pokemon.co.jp/api/info/index/?emergency=1 응답 구조
interface NoticeItem {
    id: number;
    uniq: string;
    title: string;
    term: string;
    start_date: string;
    full_uniq: string;
}

// https://www.pokemon.co.jp/api/movie/?limit=5 응답 구조
interface MovieItem {
    id: number;
    title: string;
    body_link: string; // https://www.youtube.com/embed/{videoId}
    start_date: string;
}

const SLIDE_INTERVAL_MS = 4000;

// body_link(embed URL)에서 유튜브 영상 id만 뽑아내는 헬퍼
function getYoutubeId(embedUrl: string): string {
    return embedUrl.split("/embed/")[1] ?? "";
}

export default function Home() {
    const [newsList, setNewsList] = useState<NewsList[]>([]);
    const [activeIndex, setActiveIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    const [noticeList, setNoticeList] = useState<NoticeItem[]>([]);
    const [movieList, setMovieList] = useState<MovieItem[]>([]);

    const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
    const carouselRef = useRef<HTMLDivElement | null>(null);

    // 최신 뉴스 5개만 가져옴 (자체 백엔드)
    useEffect(() => {
        axios
            .get<PageResponse<NewsList>>("http://localhost:8081/news?page=0&size=5&category=all")
            .then((res) => {
                setNewsList(res.data.content);
            })
            .catch((error) => {
                console.error("ホームのニュース取得に失敗💥", error);
            });
    }, []);

    // 포켓몬 공식 사이트 - 긴급/중요 공지사항 (우리 서버 프록시를 통해서 가져옴, CORS 회피)
    useEffect(() => {
        axios
            .get<{ results: NoticeItem[] }>("http://localhost:8081/home/notices")
            .then((res) => {
                setNoticeList(res.data.results);
            })
            .catch((error) => {
                console.error("お知らせ取得に失敗💥", error);
            });
    }, []);

    // 포켓몬 공식 사이트 - 최신 동영상 5개 (우리 서버 프록시를 통해서 가져옴, CORS 회피)
    useEffect(() => {
        axios
            .get<{ results: MovieItem[] }>("http://localhost:8081/home/movies")
            .then((res) => {
                setMovieList(res.data.results);
            })
            .catch((error) => {
                console.error("動画取得に失敗💥", error);
            });
    }, []);

    // 자동 슬라이드 (마우스 올리면 잠깐 멈춤)
    useEffect(() => {
        if (newsList.length === 0 || isPaused) return;

        const timer = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % newsList.length);
        }, SLIDE_INTERVAL_MS);

        return () => clearInterval(timer);
    }, [newsList.length, isPaused]);

    // activeIndex가 바뀔 때마다 daisyUI carousel-item으로 스크롤 이동
    useEffect(() => {
        const target = itemRefs.current[activeIndex];
        if (!target || !carouselRef.current) return;

        carouselRef.current.scrollTo({
            left: target.offsetLeft,
            behavior: "smooth",
        });
    }, [activeIndex]);

    const goTo = (index: number) => {
        setActiveIndex(((index % newsList.length) + newsList.length) % newsList.length);
    };

    return (
        <div className="flex flex-col items-center">
            {/* 뉴스 캐러셀 */}
            {newsList.length > 0 && (
                <div
                    className="relative w-full max-w-7xl mt-6 px-4"
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                >
                    <div ref={carouselRef} className="carousel w-full rounded-2xl overflow-hidden shadow-md">
                        {newsList.map((item, index) => (
                            <div
                                key={index} // 백엔드에서 newsId를 안 보내줘서 index를 키로 사용 (News.tsx와 동일한 이유)
                                ref={(el) => {
                                    itemRefs.current[index] = el;
                                }}
                                className="carousel-item relative w-full"
                            >
                                <a href={item.newsUrl} target="_blank" rel="noreferrer" className="w-full">
                                    <img
                                        src={item.newsImg}
                                        alt={item.newsTitle}
                                        className="w-full h-[280px] md:h-[420px] object-cover"
                                    />
                                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                                        <p className="text-white font-bold text-lg md:text-2xl">{item.newsTitle}</p>
                                        <p className="text-white/80 text-sm mt-1">{item.newsDate}</p>
                                    </div>
                                </a>
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-center gap-2 mt-4">
                        {newsList.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => goTo(index)}
                                className={`h-2.5 rounded-full transition-all ${index === activeIndex ? "bg-red-500 w-6" : "bg-gray-300 w-2.5"
                                    }`}
                                aria-label={`スライド${index + 1}へ`}
                            />
                        ))}
                    </div>
                </div>
            )}

            {/* 중요 공지사항 (pokemon.co.jp) */}
            {noticeList.length > 0 && (
                <div className="w-full max-w-7xl mt-12 px-4">
                    <h2 className="mb-4 text-xl font-bold">重要なお知らせ</h2>
                    <div className="card bg-base-100 shadow-sm rounded-2xl divide-y divide-base-200 overflow-hidden">
                        {noticeList.map((notice) => (
                            <a
                                key={notice.id}
                                href={notice.full_uniq}
                                target="_blank"
                                rel="noreferrer"
                                className="flex items-center gap-4 px-6 py-4 hover:bg-base-200/50 transition-colors"
                            >
                                <span className="badge badge-error text-white shrink-0 font-bold">
                                    {notice.term}
                                </span>
                                <span className="flex-1 text-sm font-medium truncate">{notice.title}</span>
                                <span className="text-xs text-base-content/50 shrink-0">{notice.start_date}</span>
                            </a>
                        ))}
                    </div>
                </div>
            )}

            {/* 최신동영상 (pokemon.co.jp) */}
            {movieList.length > 0 && (
                <div className="w-full max-w-7xl mt-12 mb-6 px-4">
                    <h2 className="mb-4 text-xl font-bold">最新動画</h2>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                        {movieList.map((movie) => {
                            const videoId = getYoutubeId(movie.body_link);
                            return (
                                <a
                                    key={movie.id}
                                    href={`https://www.youtube.com/watch?v=${videoId}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="card bg-base-100 shadow-sm rounded-2xl overflow-hidden hover:-translate-y-1 hover:shadow-md transition-all duration-300"
                                >
                                    <figure className="relative">
                                        <img
                                            src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
                                            alt={movie.title}
                                            className="w-full aspect-video object-cover"
                                        />
                                        <span className="absolute inset-0 flex items-center justify-center">
                                            <span className="w-10 h-10 rounded-full bg-black/60 flex items-center justify-center text-white text-lg">
                                                ▶
                                            </span>
                                        </span>
                                    </figure>
                                    <div className="card-body p-3">
                                        <p className="text-xs font-medium line-clamp-2">{movie.title}</p>
                                    </div>
                                </a>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}
