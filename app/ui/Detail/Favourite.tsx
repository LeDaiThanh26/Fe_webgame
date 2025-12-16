'use client';

import React, { useState, useEffect } from 'react';

interface FavoriteButtonProps {
  id_game: string;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ id_game }) => {
  const [isActive, setIsActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        const res = await fetch('http://localhost:5000/api/users/me', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) {
          const user = await res.json();
          setUserId(user._id);
          
          // Lấy danh sách fav của user này để check active
          const favRes = await fetch(`http://localhost:5000/api/favourites/user/${user._id}`);
          const favData = await favRes.json();
          const isFav = favData.data.some((f: any) => f.id_game._id === id_game || f.id_game === id_game);
          setIsActive(isFav);
        }
      } catch (err) {
        console.error("Lỗi xác thực favorite:", err);
      }
    };
    initAuth();
  }, [id_game]);

  const handleToggle = async () => {
    const token = localStorage.getItem('token');
    if (!token || !userId) {
      alert("Bạn chưa đăng nhập!");
      return;
    }

    setLoading(true);
    try {
      if (!isActive) {
        // GỌI POST / (Thêm)
        const res = await fetch('http://localhost:5000/api/favourites', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ id_user: userId, id_game })
        });
        if (res.ok) setIsActive(true);
      } else {
        // GỌI DELETE /user/:userId/game/:gameId (Xóa)
        const res = await fetch(`http://localhost:5000/api/favourites/user/${userId}/game/${id_game}`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) setIsActive(false);
      }
    } catch (err) {
      alert("Lỗi hệ thống!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button 
      className={`btn-love ${isActive ? 'active' : ''}`} 
      onClick={handleToggle}
      disabled={loading}
    >
      {isActive ? 'Đã yêu thích' : 'Yêu thích'} {isActive ? '❤️' : '♡'}
    </button>
  );
};

export default FavoriteButton;