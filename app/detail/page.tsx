import React from 'react';
import { ArrowUp } from "lucide-react";

// Dữ liệu giả định cho component
interface SlitherioDetailsProps {
    gameTitle?: string;
    gameId?: string;
    developer?: string;
    releaseDate?: string;
    lastUpdate?: string;
    technology?: string;
    platform?: string;
    description?: string;
    commentsCount?: number;
}

const SlitherioDetails: React.FC<SlitherioDetailsProps> = ({
    gameTitle = "Slither.io",
    gameId = "#1080486",
    developer = "Lỗ Cái Phong",
    releaseDate = "31/10/2025",
    lastUpdate = "31/10/2025",
    technology = "Vui",
    platform = "Trình duyệt máy tính",
    description = "Game rắn săn mồi huyền thoại phiên bản io. Tụi nó tự nhận tính \"chính danh\" bằng cách thiết lập cơ quan hành chính... (Nội dung đã được rút gọn để hiển thị cấu trúc)... Mục tiêu là làm tuyên truyền hiệu quả chứ không phải \"nghệ thuật\" đơn thuần.",
    commentsCount = 2022
}) => {

    // Dữ liệu giả cho Comment và Game Tương Tự
    const comments = [
        { id: 1, user: "manh.nguyenan0308", time: "1 năm trước", text: "13/3/24 Có ai còn nghe k!!!", likes: 165, avatarText: "A", avatarBg: "#333" },
        { id: 2, user: "thanh.tranminh47262", time: "3 năm trước", text: "Ở kia, đang nghe thì mẹ kêu rửa bát :((<br>Sợ vãi=", likes: 1, avatarText: "B", avatarBg: "#900" },
        { id: 3, user: "ngoc.huynhthi052", time: "1 năm trước", text: "Tôi nhớ lúc trước chú Ngạn sáng tác nhiều truyện ma lắm mà sao giờ tôi search chỉ có tầm chục đến 10 truyện", likes: 5, avatarText: "C", avatarBg: "#4CAF50" },
    ];

    const similarGames = [
        { name: "Minecraft 1", color: "#81C784" },
        { name: "Minecraft 2", color: "#64B5F6" },
        { name: "Minecraft 3", color: "#FFB74D" },
        { name: "Minecraft 4", color: "#BA68C8" },
    ];

    // CSS tích hợp trực tiếp
    const cssStyles = `
        /* Thiết lập chung */
        :root {
            --primary-bg: #f0f2f5;
            --white: #ffffff;
            --text-color: #333;
            --text-light: #666;
            --border-color: #e5e5e5;
            --green-btn: #4CAF50;
        }

        .details-body {
            background-color: var(--primary-bg);
            color: var(--text-color);
            padding: 20px;
            display: flex;
            justify-content: center;
        }

        .container {
            width: 100%;
            max-width: 1000px;
            display: flex;
            flex-direction: column;
            gap: 20px;
        }

        /* Card chung (Khung trắng) */
        .card {
            background-color: var(--white);
            border-radius: 8px;
            padding: 20px;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }

        /* --- Header Game & Player --- */
        .header-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 15px;
        }

        .header-row h1 {
            font-size: 24px;
            font-weight: bold;
        }

        .btn-love {
            border: 1px solid #ddd;
            background: white;
            padding: 5px 15px;
            border-radius: 20px;
            cursor: pointer;
            font-size: 14px;
            display: flex;
            align-items: center;
            gap: 5px;
        }

        .game-player {
            background-color: #1a1a1a;
            width: 100%;
            height: 400px;
            border-radius: 4px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            position: relative;
            color: white;
        }

        .game-player .logo {
            font-size: 40px;
            font-weight: bold;
            margin-bottom: 20px;
            color: #bfa;
            text-shadow: 0 0 10px #fff;
        }

        .game-player .logo span { color: #a4508b; }

        .play-btn {
            background-color: var(--green-btn);
            color: white;
            border: none;
            padding: 10px 40px;
            border-radius: 20px;
            font-size: 16px;
            cursor: pointer;
            margin-top: 10px;
        }

        .input-name {
            background: #444;
            border: none;
            padding: 8px 20px;
            border-radius: 20px;
            color: white;
            width: 200px;
            text-align: center;
        }

        /* --- Breadcrumb & Info --- */
        .breadcrumb {
            font-size: 12px;
            color: #888;
            margin: 15px 0 10px 0;
        }

        .game-title-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
        }

        .game-title-row h2 { font-size: 20px; }

        .share-btn {
            border: 1px solid #ddd;
            background: white;
            padding: 5px 15px;
            border-radius: 15px;
            font-size: 12px;
            cursor: pointer;
        }

        /* Bảng thông tin */
        .info-table {
            width: 100%;
            border-collapse: collapse;
            font-size: 13px;
            margin-bottom: 30px;
        }

        .info-table tr:nth-child(odd) {
            background-color: #f9f9f9;
        }

        .info-table td {
            padding: 10px;
            border: none;
        }

        .info-table td:first-child {
            font-weight: bold;
            width: 150px;
            color: #333;
        }

        .info-table td:last-child {
            color: #666;
        }

        /* --- Mô tả & Hình ảnh --- */
        .section-title {
            font-size: 18px;
            font-weight: bold;
            margin-bottom: 10px;
            margin-top: 20px;
        }

        .description-text {
            font-size: 14px;
            color: #555;
            line-height: 1.6;
            margin-bottom: 20px;
            text-align: justify;
        }

        .note-text {
            font-size: 14px;
            color: #555;
            margin-bottom: 20px;
        }

        .game-image-container {
            width: 100%;
            height: auto;
            border-radius: 8px;
            overflow: hidden;
            margin-bottom: 20px;
        }

        .game-image-container img {
            width: 100%;
            height: auto;
            display: block;
            object-fit: cover;
        }

        /* --- Footer Layout (Bình luận & Sidebar) --- */
        .bottom-layout {
            display: flex;
            gap: 20px;
            width: 100%;
        }

        .left-column {
            flex: 2;
        }

        .right-column {
            flex: 1;
        }

        /* Bình luận */
        .comment-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 15px;
            font-size: 16px;
            font-weight: bold;
        }

        .sort-btn {
            font-size: 12px;
            color: #666;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 5px;
        }

        .input-comment {
            display: flex;
            gap: 10px;
            margin-bottom: 20px;
        }

        .avatar-circle {
            width: 30px;
            height: 30px;
            border-radius: 50%;
            background-color: #ddd;
            overflow: hidden;
            flex-shrink: 0; /* Quan trọng để avatar không bị co lại */
        }
            
        .avatar-circle img { width: 100%; height: 100%; object-fit: cover; }

        .input-field {
            flex: 1;
            border: none;
            border-bottom: 1px solid #ddd;
            padding: 5px;
            outline: none;
            font-size: 14px;
        }

        .comment-item {
            display: flex;
            gap: 10px;
            margin-bottom: 20px;
        }

        .comment-content {
            flex: 1;
        }

        .user-name {
            font-weight: bold;
            font-size: 13px;
            margin-bottom: 2px;
        }

        .comment-time {
            font-size: 11px;
            color: #999;
            margin-left: 5px;
            font-weight: normal;
        }

        .comment-text {
            font-size: 13px;
            margin-bottom: 5px;
            line-height: 1.4;
        }

        .comment-actions {
            font-size: 12px;
            color: #666;
            display: flex;
            gap: 15px;
        }

        .comment-actions span { cursor: pointer; }

        /* Sidebar Game tương tự */
        .similar-game-list {
            display: flex;
            flex-direction: column;
            gap: 10px;
        }

        .game-thumb {
            width: 100%;
            height: 80px;
            border-radius: 8px;
            overflow: hidden;
            position: relative;
        }

        .game-thumb img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

        /* Pagination giả */
        .pagination {
            display: flex;
            justify-content: flex-end;
            gap: 10px;
            margin-top: 10px;
            font-size: 12px;
        }

        /* Responsive cho mobile */
        @media (max-width: 768px) {
            .bottom-layout {
                flex-direction: column;
            }
        }
    `;

    return (
        // Next.js sẽ tự động xử lý thẻ <style> này, nhưng cần đặt trong 
        // một wrapper để component có thể return một phần tử duy nhất.
        <div className="details-body">
            {/* Inject CSS Styles (Next.js/React standard way to inline styles or use a Head component) */}
            {/* Lưu ý: Trong Next.js, bạn nên đặt style này vào <Head> hoặc sử dụng styled-components/CSS Modules. 
                Tôi dùng cách này để mô phỏng HTML gốc nhất. */}
            <style dangerouslySetInnerHTML={{ __html: cssStyles }} /> 

            <div className="container">
                <div className="card">
                    <div className="header-row">
                        <h1>Tiêu đề game</h1>
                        <button className="btn-love">Yêu thích &hearts;</button>
                    </div>

                    <div className="game-player">
                        <div className="logo">slither<span>.io</span></div>
                        <input type="text" className="input-name" placeholder="Nickname" />
                        <button className="play-btn">Play</button>
                        
                    </div>
                    
                    <div className="breadcrumb">Game &gt; Chiến thuật &gt; {gameTitle}</div>
                    
                    <div className="game-title-row">
                        <h2>{gameTitle}</h2>
                        <button className="share-btn">Share <span style={{ fontSize: '10px' }}>&#10150;</span></button>
                    </div>

                    <table className="info-table">
                        <tbody>
                            <tr><td>ID Game</td><td>{gameId}</td></tr>
                            <tr><td>Tên game</td><td>{gameTitle}</td></tr>
                            <tr><td>Dev</td><td>{developer}</td></tr>
                            <tr><td>Ra mắt</td><td>{releaseDate}</td></tr>
                            <tr><td>Lần update cuối</td><td>{lastUpdate}</td></tr>
                            <tr><td>Công nghệ</td><td>{technology}</td></tr>
                            <tr><td>Nền tảng</td><td>{platform}</td></tr>
                        </tbody>
                    </table>

                    <div className="section-title">Mô tả</div>
                    <p className="description-text">
                        {description}
                    </p>

                    <div className="section-title">Cách chơi</div>
                    <p className="note-text">
                        Lưu ý: Khi chơi trên máy tính, bạn hãy chuyển chế độ gõ từ tiếng Việt sang tiếng Anh để tránh các lỗi khi di chuyển trong game nhé!
                    </p>

                    <div className="section-title">Hình ảnh trong game</div>
                    <div className="game-image-container">
                        <img src="https://placehold.co/800x350/555/FFF?text=Hinh+anh+trong+game" alt="Hình ảnh trong game" />
                    </div>
                </div>

                <div className="bottom-layout">
                    <div className="card left-column">
                        <div className="section-title" style={{ marginTop: 0 }}>Bình luận</div>
                        
                        <div className="comment-header">
                            <span style={{ fontSize: '14px', fontWeight: 'normal' }}>{commentsCount.toLocaleString()} bình luận</span>
                            <div className="sort-btn">
                                Sắp xếp theo thời gian 
                                <ArrowUp size={14} />
                            </div>
                        </div>

                        <div className="input-comment">
                            <div className="avatar-circle"><img src="https://placehold.co/30" alt="me" /></div>
                            <input type="text" className="input-field" placeholder="Viết bình luận..." />
                        </div>

                        {comments.map(comment => (
                            <div key={comment.id} className="comment-item">
                                <div className="avatar-circle">
                                    <img src={`https://placehold.co/30/${comment.avatarBg.replace('#', '')}/fff?text=${comment.avatarText}`} alt="user" />
                                </div>
                                <div className="comment-content">
                                    <div className="user-name">
                                        {comment.user} <span className="comment-time">{comment.time}</span>
                                    </div>
                                    <div className="comment-text" dangerouslySetInnerHTML={{ __html: comment.text }}></div>
                                    <div className="comment-actions">

                                    </div>
                                </div>
                            </div>
                        ))}

                        <div className="pagination">
                            <span>Trang 1/2</span>
                            <span>&lt;</span>
                            <span>&gt;</span>
                        </div>
                    </div>

                    <div className="card right-column">
                        <div className="section-title" style={{ marginTop: 0 }}>Game tương tự</div>
                        <div className="similar-game-list">
                            {similarGames.map((game, index) => (
                                <div key={index} className="game-thumb">
                                    <img src={`https://placehold.co/200x80/${game.color.replace('#', '')}/FFF?text=${game.name}`} alt={`Game ${game.name}`} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SlitherioDetails;