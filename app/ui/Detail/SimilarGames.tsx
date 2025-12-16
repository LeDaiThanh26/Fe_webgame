'use client'; // Bắt buộc vì dùng useEffect và useState

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

// Định nghĩa Interface khớp với dữ liệu API
interface Game {
    _id: string;
    name: string;
    thumbnail: string;
    slug: string; // dùng để điều hướng giống ngoài trang chủ
}

const SimilarGames = () => {
    const [games, setGames] = useState<Game[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRandomGames = async () => {
            try {
                const res = await fetch('http://localhost:5000/api/games/random', {
                    cache: 'no-store'
                });
                const json = await res.json();
                if (json.data) {
                    setGames(json.data);
                }
            } catch (error) {
                console.error("Lỗi fetch game random:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchRandomGames();
    }, []);

    if (loading) {
        return (
            <div className="card right-column">
                <div className="section-title" style={{ marginTop: 0 }}>Đề xuất cho bạn</div>
                <div className="similar-game-list">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="game-thumb" style={{ background: '#eee' }} />
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="card right-column">
            <div className="section-title" style={{ marginTop: 0 }}>
                Đề xuất cho bạn
            </div>

            <div className="similar-game-list">
                {games.map((game) => (
                    <Link 
                        href={game.slug} 
                        key={game._id} 
                        className="game-thumb"
                        style={{ display: 'block', position: 'relative' }}
                    >
                        <img
                            src={game.thumbnail}
                            alt={game.name}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                        {/* Overlay tên game để giao diện trông đầy đủ hơn */}
                        <div style={{
                            position: 'absolute',
                            bottom: 0,
                            width: '100%',
                            background: 'rgba(0,0,0,0.6)',
                            color: '#fff',
                            fontSize: '11px',
                            padding: '4px',
                            textAlign: 'center',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis'
                        }}>
                            {game.name}
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default SimilarGames;