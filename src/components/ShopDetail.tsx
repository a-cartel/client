import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

// 백엔드 데이터 구조에 맞춘 타입 정의
export interface ShopList {
    shopName: string;
    shopAddress: string;
    shopAccess: string;
    shopHoliday: string;
    shopHours: string;
    shopPhone: string;
    shopImg: string;
}

// 서버 ReviewDTO에 맞춘 타입
interface Review {
    id: number;
    shopId: number;
    userId: string;
    writerName: string;
    rating: number;
    content: string;
    createdAt: string | number[];
}

// createdAt이 ISO 문자열로 오든, [year, month, day, ...] 배열로 오든 둘 다 대응
function formatDate(value: string | number[]): string {
    if (Array.isArray(value)) {
        const [year, month, day] = value;
        return `${year}.${String(month).padStart(2, "0")}.${String(day).padStart(2, "0")}`;
    }
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "";
    return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, "0")}.${String(date.getDate()).padStart(2, "0")}`;
}

export default function ShopDetail() {
    const { id } = useParams();
    const { user } = useAuth();

    const [currentShop, setCurrentShop] = useState<ShopList | null>(null); //DB 데이터를 담을 state 선언 (기본값 null)

    const [reviews, setReviews] = useState<Review[]>([]);
    const [reviewRating, setReviewRating] = useState(5);
    const [reviewContent, setReviewContent] = useState("");
    const [reviewError, setReviewError] = useState<string | null>(null);
    const [submitting, setSubmitting] = useState(false);

    // 본인 리뷰 수정용 state (수정 중인 리뷰 id, 없으면 null)
    const [editingReviewId, setEditingReviewId] = useState<number | null>(null);
    const [editRating, setEditRating] = useState(5);
    const [editContent, setEditContent] = useState("");
    const [editSubmitting, setEditSubmitting] = useState(false);

    //axios 요청
    useEffect(() => {
        if (!id) return;

        axios
            .get<ShopList>(`http://localhost:8081/shop/${id}`)
            .then((res) => {
                setCurrentShop(res.data);
            })
            .catch((error) => {
                console.error("상점 상세정보 로드 실패💥", error);
            });
    }, [id]); // id가 변경될 때마다 호출

    const fetchReviews = () => {
        if (!id) return;

        axios
            .get<Review[]>(`http://localhost:8081/shop/${id}/reviews`)
            .then((res) => {
                setReviews(res.data);
            })
            .catch((error) => {
                console.error("리뷰 목록 로드 실패💥", error);
            });
    };

    useEffect(() => {
        fetchReviews();
    }, [id]);

    const handleSubmitReview = async () => {
        if (!id) return;

        if (!reviewContent.trim()) {
            setReviewError("レビュー内容を入力してください。");
            return;
        }

        setSubmitting(true);
        setReviewError(null);

        try {
            await axios.post(
                `http://localhost:8081/shop/${id}/reviews`,
                { rating: reviewRating, content: reviewContent },
                { withCredentials: true }
            );

            setReviewContent("");
            setReviewRating(5);
            fetchReviews(); // 방금 쓴 리뷰가 바로 보이도록 목록 다시 조회
        } catch (err) {
            if (axios.isAxiosError(err)) {
                setReviewError(err.response?.data?.message ?? "レビューの投稿に失敗しました。");
            } else {
                setReviewError("レビューの投稿に失敗しました。");
            }
        } finally {
            setSubmitting(false);
        }
    };

    // 수정 버튼 클릭 -> 그 리뷰의 기존 값으로 수정 폼을 채우고 편집 모드로 전환
    const handleStartEdit = (review: Review) => {
        setEditingReviewId(review.id);
        setEditRating(review.rating);
        setEditContent(review.content);
    };

    const handleCancelEdit = () => {
        setEditingReviewId(null);
    };

    const handleUpdateReview = async (reviewId: number) => {
        if (!id) return;

        if (!editContent.trim()) {
            alert("レビュー内容を入力してください。");
            return;
        }

        setEditSubmitting(true);

        try {
            await axios.put(
                `http://localhost:8081/shop/${id}/reviews/${reviewId}`,
                { rating: editRating, content: editContent },
                { withCredentials: true }
            );

            setEditingReviewId(null);
            fetchReviews();
        } catch (err) {
            if (axios.isAxiosError(err)) {
                alert(err.response?.data?.message ?? "レビューの修正に失敗しました。");
            } else {
                alert("レビューの修正に失敗しました。");
            }
        } finally {
            setEditSubmitting(false);
        }
    };

    const handleDeleteReview = async (reviewId: number) => {
        if (!id) return;

        if (!window.confirm("このレビューを削除しますか？")) return;

        try {
            await axios.delete(`http://localhost:8081/shop/${id}/reviews/${reviewId}`, {
                withCredentials: true,
            });

            fetchReviews();
        } catch (err) {
            if (axios.isAxiosError(err)) {
                alert(err.response?.data?.message ?? "レビューの削除に失敗しました。");
            } else {
                alert("レビューの削除に失敗しました。");
            }
        }
    };

    const averageRating =
        reviews.length > 0
            ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
            : "0.0";

    //useEffect로 데이터를 가져오고, currentShop이 null이면 안내 내용 표시
    if (!currentShop) {
        return <div className="p-10 text-center">商店が見つかりませんでした。</div>;
    }

    return (
        <div className="container mx-auto max-w-4xl px-4 flex flex-col gap-6 py-10">
            {/* 뒤로가기 & 상점 이름 */}
            <div className="flex flex-col gap-1">
                <Link to="/Shop" className="text-red-500 font-bold hover:underline">
                    ← 店舗一覧へ戻る
                </Link>
                <h1 className="text-2xl font-bold mt-2">{currentShop.shopName}</h1>
            </div>

            {/* 상점 이미지 */}
            <div className="card bg-base-100 shadow-md rounded-2xl overflow-hidden p-0">
                <div className="aspect-[2/1] relative">
                    <img
                        src={currentShop.shopImg}
                        className="absolute inset-0 w-full h-full object-cover"
                        alt={currentShop.shopName}
                    />
                </div>
            </div>

            {/* 상점 상세 정보 */}
            <div className="card bg-base-100 shadow-md rounded-2xl p-6">
                <h2 className="text-xl font-bold mb-4">店舗情報</h2>
                <hr className="border-base-200 mb-6" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 text-sm">
                    <div className="flex flex-col gap-4">
                        <div className="flex">
                            <span className="font-bold w-24 shrink-0">住所</span>
                            <span className="text-base-content/80">{currentShop.shopAddress}</span>
                        </div>
                        <div className="flex">
                            <span className="font-bold w-24 shrink-0">電話番号</span>
                            <span className="text-slate-500">{currentShop.shopPhone}</span>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4">
                        <div className="flex">
                            <span className="font-bold w-24 shrink-0">営業時間</span>
                            <span className="text-base-content/80">{currentShop.shopHours}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* 리뷰 작성 */}
            <div className="card bg-base-100 shadow-md rounded-2xl p-6">
                <h2 className="text-xl font-bold mb-6">レビューを書く</h2>

                {user ? (
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                            <span className="text-sm font-semibold text-base-content/70">評価 (星の数)</span>
                            <div className="rating rating-md">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <input
                                        key={star}
                                        type="radio"
                                        name="rating-2"
                                        className="mask mask-star-2 bg-orange-400"
                                        checked={reviewRating === star}
                                        onChange={() => setReviewRating(star)}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* 리뷰 내용 입력 */}
                        <div className="flex flex-col gap-2">
                            <span className="text-sm font-semibold text-base-content/70">レビュー内容</span>
                            <textarea
                                className="textarea textarea-bordered h-32 w-full resize-none focus:outline-none focus:border-primary text-base"
                                placeholder="訪問の感想を自由に書いてください。"
                                value={reviewContent}
                                onChange={(e) => setReviewContent(e.target.value)}
                            ></textarea>
                        </div>

                        {reviewError && <p className="text-red-500 text-sm">{reviewError}</p>}

                        <button
                            className="btn bg-[#E60012] hover:bg-[#B8000E] text-white border-none w-full md:w-32 self-end mt-2"
                            onClick={handleSubmitReview}
                            disabled={submitting}
                        >
                            レビューを投稿
                        </button>
                    </div>
                ) : (
                    <p className="text-sm text-base-content/60">
                        レビューを書くには{" "}
                        <Link to="/Auth" className="text-red-500 font-bold hover:underline">
                            ログイン
                        </Link>
                        が必要です。
                    </p>
                )}
            </div>

            {/* 리뷰 모음 */}
            <div className="card bg-base-100 shadow-md rounded-2xl p-6 mb-10">
                {/* 총 평점 */}
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-xl font-bold">会員レビュー</h2>
                    <div className="flex items-center gap-2">
                        <span className="text-orange-400 text-lg">★</span>
                        <span className="font-bold text-lg">{averageRating} / 5.0</span>
                        <span className="text-sm text-base-content/50">({reviews.length})</span>
                    </div>
                </div>

                {reviews.length === 0 ? (
                    <p className="text-sm text-base-content/50 text-center py-6">
                        まだレビューがありません。最初のレビューを書いてみてください！
                    </p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {reviews.map((review) => {
                            const isOwner = user?.id === review.userId;
                            const isEditing = editingReviewId === review.id;

                            return (
                                <div key={review.id} className="bg-base-200/50 rounded-xl p-5 flex flex-col gap-3">
                                    <div className="flex justify-between items-start">
                                        <div className="flex flex-col">
                                            <span className="font-bold text-sm">{review.writerName}</span>
                                            <span className="text-xs text-base-content/50">
                                                {formatDate(review.createdAt)}
                                            </span>
                                        </div>
                                        {!isEditing && (
                                            <div className="flex text-orange-400 text-xs">
                                                {"★".repeat(review.rating)}
                                            </div>
                                        )}
                                    </div>

                                    {isEditing ? (
                                        <div className="flex flex-col gap-2">
                                            <div className="rating rating-sm">
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                    <input
                                                        key={star}
                                                        type="radio"
                                                        name={`edit-rating-${review.id}`}
                                                        className="mask mask-star-2 bg-orange-400"
                                                        checked={editRating === star}
                                                        onChange={() => setEditRating(star)}
                                                    />
                                                ))}
                                            </div>
                                            <textarea
                                                className="textarea textarea-bordered h-24 w-full resize-none text-sm"
                                                value={editContent}
                                                onChange={(e) => setEditContent(e.target.value)}
                                            ></textarea>
                                            <div className="flex gap-2">
                                                <button
                                                    className="btn btn-xs bg-[#E60012] text-white border-none flex-1"
                                                    onClick={() => handleUpdateReview(review.id)}
                                                    disabled={editSubmitting}
                                                >
                                                    保存
                                                </button>
                                                <button
                                                    className="btn btn-xs btn-outline flex-1"
                                                    onClick={handleCancelEdit}
                                                    disabled={editSubmitting}
                                                >
                                                    キャンセル
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <>
                                            <p className="text-sm leading-relaxed text-base-content/80">
                                                {review.content}
                                            </p>

                                            {isOwner && (
                                                <div className="flex gap-3 mt-1">
                                                    <button
                                                        className="text-xs text-blue-500 hover:underline"
                                                        onClick={() => handleStartEdit(review)}
                                                    >
                                                        編集
                                                    </button>
                                                    <button
                                                        className="text-xs text-red-500 hover:underline"
                                                        onClick={() => handleDeleteReview(review.id)}
                                                    >
                                                        削除
                                                    </button>
                                                </div>
                                            )}
                                        </>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

        </div>
    );
}
