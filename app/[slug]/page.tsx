import React from 'react';
import CommentsSection from '../ui/Detail/CommentsSection';
import SimilarGames from '../ui/Detail/SimilarGames';
import Favourites from '../ui/Detail/Favourite';
async function getGameData(slug: string) {
    const res = await fetch(`http://localhost:5000/api/games/${slug}`, {
        cache: 'no-store'
    });
    if (!res.ok) return null;
    const json = await res.json();
    return json.data;
}

const GameDetails = async ({ params }: { params: { slug: string } }) => {
    const { slug } = await params;
    console.log("Slug nhận được từ URL:", slug);
    
    const data = await getGameData(slug);
    if (!data) {
        return <div className="details-body">Không tìm thấy game: {slug}</div>;
    }

    const cssStyles = `
        :root {
            --primary-bg: #f0f2f5;
            --white: #ffffff;
            --text-color: #333;
            --text-light: #666;
            --border-color: #e5e5e5;
            --green-btn: #4CAF50;
        }
        .details-body { background-color: var(--primary-bg); color: var(--text-color); padding: 20px; display: flex; justify-content: center; min-height: 100vh; }
        .container { width: 100%; max-width: 1000px; display: flex; flex-direction: column; gap: 20px; }
        .card { background-color: var(--white); border-radius: 8px; padding: 20px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
        .header-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px; }
        .header-row h1 { font-size: 24px; font-weight: bold; }
        .btn-love { border: 1px solid #ddd; background: white; padding: 5px 15px; border-radius: 20px; cursor: pointer; font-size: 14px; display: flex; align-items: center; gap: 5px; }
        .game-iframe-container { width: 100%; height: 600px; border: none; border-radius: 4px; overflow: hidden; background: #000; }
        .game-iframe { width: 100%; height: 100%; border: none; }
        .breadcrumb { font-size: 12px; color: #888; margin: 15px 0 10px 0; }
        .game-title-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
        .game-title-row h2 { font-size: 20px; }
        .share-btn { border: 1px solid #ddd; background: white; padding: 5px 15px; border-radius: 15px; font-size: 12px; cursor: pointer; }
        .info-table { width: 100%; border-collapse: collapse; font-size: 13px; margin-bottom: 30px; }
        .info-table tr:nth-child(odd) { background-color: #f9f9f9; }
        .info-table td { padding: 10px; border: none; }
        .info-table td:first-child { font-weight: bold; width: 150px; color: #333; }
        .info-table td:last-child { color: #666; }
        .section-title { font-size: 18px; font-weight: bold; margin-bottom: 10px; margin-top: 20px; }
        .description-text { font-size: 14px; color: #555; line-height: 1.6; margin-bottom: 20px; text-align: justify; }
        .note-text { font-size: 14px; color: #555; margin-bottom: 20px; }
        .game-image-container { 
            width: 100%; 
            border-radius: 8px; 
            margin-bottom: 20px; 
            display: flex; 
            flex-direction: column; 
            gap: 10px; 
        }
        .game-image-container img { 
            width: 100%; 
            height: auto; 
            max-height: 420px;
            object-fit: contain; 
            display: block; 
        }
        .bottom-layout { display: flex; gap: 20px; width: 100%; }
        .left-column { flex: 2; }
        .right-column { flex: 1; }
        .comment-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px; font-size: 16px; font-weight: bold; }
        .sort-btn { font-size: 12px; color: #666; cursor: pointer; display: flex; align-items: center; gap: 5px; }
        .input-comment { display: flex; gap: 10px; margin-bottom: 20px; }
        .avatar-circle { width: 30px; height: 30px; border-radius: 50%; background-color: #ddd; overflow: hidden; flex-shrink: 0; }
        .avatar-circle img { width: 100%; height: 100%; object-fit: cover; }
        .input-field { flex: 1; border: none; border-bottom: 1px solid #ddd; padding: 5px; outline: none; font-size: 14px; }
        .comment-item { display: flex; gap: 10px; margin-bottom: 20px; }
        .comment-content { flex: 1; }
        .user-name { font-weight: bold; font-size: 13px; margin-bottom: 2px; }
        .comment-time { font-size: 11px; color: #999; margin-left: 5px; font-weight: normal; }
        .comment-text { font-size: 13px; margin-bottom: 5px; line-height: 1.4; }
        .similar-game-list { display: flex; flex-direction: column; gap: 10px; }
        .game-thumb { width: 100%; height: 80px; border-radius: 8px; overflow: hidden; position: relative; }
        .game-thumb img { width: 100%; height: 100%; object-fit: cover; }
        .pagination { display: flex; justify-content: flex-end; gap: 10px; margin-top: 10px; font-size: 12px; }
        @media (max-width: 768px) { .bottom-layout { flex-direction: column; } }
        .btn-love {
            border: 1px solid #ddd;
            background: white;
            padding: 8px 20px;
            border-radius: 20px;
            cursor: pointer;
            font-size: 14px;
            display: flex;
            align-items: center;
            gap: 8px;
            font-weight: 600;
            transition: all 0.3s ease;
            color: #333;
        }

        .btn-love:hover {
            background-color: #fff1f1;
            border-color: #ff4d4d;
            color: #ff4d4d;
        }

        /* Trạng thái khi đã thêm vào yêu thích */
        .btn-love.active {
            background-color: #ff4d4d;
            color: white;
            border-color: #ff4d4d;
            box-shadow: 0 2px 8px rgba(255, 77, 77, 0.4);
        }

        .btn-love.active:hover {
            background-color: #e60000;
        }
    `;

    return (
        <div className="details-body">
            <style dangerouslySetInnerHTML={{ __html: cssStyles }} />

            <div className="container">
                <div className="card">
                    <div className="header-row">
                        <h1>{data.name}</h1>
                        <Favourites id_game={data._id} />
                    </div>

                    <div className="game-iframe-container">
                        <iframe
                            src={data.link_game}
                            className="game-iframe"
                            title={data.name}
                            allowFullScreen
                            scrolling="no"
                            allow="autoplay; fullscreen; keyboard-vt"
                        ></iframe>
                    </div>

                    <div className="breadcrumb">Game &gt; {data.category} &gt; {data.name}</div>

                    <div className="game-title-row">
                        <h2>{data.name}</h2>
                        <button className="share-btn">Share <span style={{ fontSize: '10px' }}>&#10150;</span></button>
                    </div>

                    <table className="info-table">
                        <tbody>
                            <tr><td>ID Game</td><td>#{data._id.slice(-7).toUpperCase()}</td></tr>
                            <tr><td>Tên game</td><td>{data.name}</td></tr>
                            <tr><td>Dev</td><td>{data.dev}</td></tr>
                            <tr><td>Ra mắt</td><td>{new Date(data.release_date).toLocaleDateString('vi-VN')}</td></tr>
                            <tr><td>Lần update cuối</td><td>{new Date(data.last_update).toLocaleDateString('vi-VN')}</td></tr>
                            <tr><td>Công nghệ</td><td>{data.technology}</td></tr>
                            <tr><td>Nền tảng</td><td>{data.platforms.join(", ")}</td></tr>
                        </tbody>
                    </table>

                    <div className="section-title">Mô tả</div>
                    <p className="description-text">{data.description}</p>

                    <div className="section-title">Cách chơi</div>
                    <p className="note-text">
                        {data.how_to_play || "Lưu ý: Khi chơi trên máy tính, bạn hãy chuyển chế độ gõ từ tiếng Việt sang tiếng Anh để tránh các lỗi khi di chuyển trong game nhé!"}
                    </p>

                    <div className="section-title">Hình ảnh trong game</div>
                    <div className="game-image-container">
                        {data.image?.map((imgUrl: string, index: number) => (
                            <img key={index} src={imgUrl} alt={`${data.name} screenshot ${index}`} />
                        ))}
                    </div>
                </div>

                <div className="bottom-layout">
                    <CommentsSection idGame={data._id} />
                    <SimilarGames />
                </div>
            </div>
        </div>
    );
};

export default GameDetails;