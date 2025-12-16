'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { ArrowUp, Send } from "lucide-react";

interface UserInfo {
    _id: string;
    name: string;
    avatar?: string;
}

interface CommentData {
    _id: string;
    id_user: UserInfo;
    comment: string;
    createdAt: string;
}

const CommentsSection = ({ idGame }: { idGame: string }) => {
    const [comments, setComments] = useState<CommentData[]>([]);
    const [pagination, setPagination] = useState({ currentPage: 1, totalPages: 1, totalComments: 0 });
    const [newComment, setNewComment] = useState("");
    const [loading, setLoading] = useState(false);

    // 1. Hàm lấy danh sách bình luận
    const fetchComments = useCallback(async (page: number = 1) => {
        try {
            const res = await fetch(`http://localhost:5000/api/comments/${idGame}?page=${page}`);
            const json = await res.json();
            if (res.ok) {
                setComments(json.data);
                setPagination(json.pagination);
            }
        } catch (error) {
            console.error("Lỗi lấy bình luận:", error);
        }
    }, [idGame]);

    useEffect(() => {
        fetchComments();
    }, [fetchComments]);

    // 2. Hàm đăng bình luận mới
    const handlePostComment = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            alert("Vui lòng đăng nhập để bình luận!");
            return;
        }

        if (!newComment.trim()) return;

        setLoading(true);
        try {
            // Lấy thông tin user hiện tại từ token (qua API /me)
            const userRes = await fetch('http://localhost:5000/api/users/me', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const userData = await userRes.json();

            const res = await fetch('http://localhost:5000/api/comments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    id_user: userData._id,
                    id_game: idGame,
                    comment: newComment
                })
            });

            if (res.ok) {
                setNewComment("");
                fetchComments(1); // Load lại trang 1 để thấy cmt mới nhất
            } else {
                const error = await res.json();
                alert(error.message);
            }
        } catch (error) {
            alert("Lỗi kết nối server!");
        } finally {
            setLoading(false);
        }
    };

    // Hàm format thời gian đơn giản
    const formatTime = (dateStr: string) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString('vi-VN') + " " + date.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
    };

    return (
        <div className="card left-column">
            <div className="section-title" style={{ marginTop: 0 }}>Bình luận</div>

            <div className="comment-header">
                <span style={{ fontSize: '14px', fontWeight: 'normal' }}>
                    {pagination.totalComments.toLocaleString()} bình luận
                </span>
                <div className="sort-btn">
                    Sắp xếp theo thời gian <ArrowUp size={14} />
                </div>
            </div>

            {/* Ô nhập bình luận có nút đăng */}
            <div className="input-comment" style={{ position: 'relative' }}>
                <div className="avatar-circle">
                    <img src="https://placehold.co/30/0095BE/fff?text=U" alt="me" />
                </div>
                <input
                    type="text"
                    className="input-field"
                    placeholder="Viết bình luận..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handlePostComment()}
                />
                <button 
                    onClick={handlePostComment}
                    disabled={loading}
                    style={{
                        position: 'absolute',
                        right: '5px',
                        bottom: '5px',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        color: loading ? '#ccc' : '#0095BE'
                    }}
                >
                    <Send size={20} />
                </button>
            </div>

            {/* Danh sách bình luận thật từ API */}
            {comments.map((item) => (
                <div key={item._id} className="comment-item">
                    <div className="avatar-circle">
                        <img
                            src={`https://placehold.co/30/333/fff?text=${item.id_user?.name?.charAt(0) || '?'}`}
                            alt="user"
                        />
                    </div>

                    <div className="comment-content">
                        <div className="user-name">
                            {item.id_user?.name || "Người dùng ẩn danh"}
                            <span className="comment-time">{formatTime(item.createdAt)}</span>
                        </div>

                        <div className="comment-text">
                            {item.comment}
                        </div>
                    </div>
                </div>
            ))}

            {/* Phân trang */}
            {pagination.totalPages > 1 && (
                <div className="pagination">
                    <span>Trang {pagination.currentPage}/{pagination.totalPages}</span>
                    <span 
                        style={{ cursor: pagination.currentPage > 1 ? 'pointer' : 'not-allowed', opacity: pagination.currentPage > 1 ? 1 : 0.5 }}
                        onClick={() => pagination.currentPage > 1 && fetchComments(pagination.currentPage - 1)}
                    >
                        &lt;
                    </span>
                    <span 
                        style={{ cursor: pagination.currentPage < pagination.totalPages ? 'pointer' : 'not-allowed', opacity: pagination.currentPage < pagination.totalPages ? 1 : 0.5 }}
                        onClick={() => pagination.currentPage < pagination.totalPages && fetchComments(pagination.currentPage + 1)}
                    >
                        &gt;
                    </span>
                </div>
            )}
        </div>
    );
};

export default CommentsSection;