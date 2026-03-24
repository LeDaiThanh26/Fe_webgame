import CommentsSection from "@/components/features/game/comments-section";
import SimilarGames from "@/components/features/game/similar-games";
import FavoriteButton from "@/components/features/game/favorite-button";
import GamePlayTracker from "@/components/common/game-play-tracker";
import { fetchGameBySlug } from "@/services/game.service";

const GameDetails = async ({ params }: { params: { slug: string } }) => {
  const { slug } = await params;
  const data = await fetchGameBySlug(slug);

  if (!data) {
    return <div className="details-body">Không tìm thấy game: {slug}</div>;
  }

  const cssStyles = `
    :root { --primary-bg: #f0f2f5; --white: #ffffff; --text-color: #333; --border-color: #e5e5e5; }
    .details-body { background-color: var(--primary-bg); color: var(--text-color); padding: 20px; display: flex; justify-content: center; min-height: 100vh; }
    .container { width: 1200px; max-width: 1000px; display: flex; flex-direction: column; gap: 20px; }
    .card { background-color: var(--white); border-radius: 8px; padding: 20px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
    .header-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px; }
    .header-row h1 { font-size: 24px; font-weight: bold; }
    .btn-love { border: 1px solid #ddd; background: white; padding: 8px 20px; border-radius: 20px; cursor: pointer; font-size: 14px; display: flex; align-items: center; gap: 8px; font-weight: 600; transition: all 0.3s; color: #333; }
    .btn-love:hover { background: #fff1f1; border-color: #ff4d4d; color: #ff4d4d; }
    .btn-love.active { background: #ff4d4d; color: white; border-color: #ff4d4d; }
    .game-iframe-container { width: 100%; height: 600px; border: none; border-radius: 4px; overflow: hidden; background: #000; }
    .game-iframe { width: 100%; height: 100%; border: none; }
    .breadcrumb { font-size: 12px; color: #888; margin: 15px 0 10px; }
    .info-table { width: 100%; border-collapse: collapse; font-size: 13px; margin-bottom: 30px; }
    .info-table tr:nth-child(odd) { background: #f9f9f9; }
    .info-table td { padding: 10px; }
    .info-table td:first-child { font-weight: bold; width: 150px; }
    .info-table td:last-child { color: #666; }
    .section-title { font-size: 18px; font-weight: bold; margin-bottom: 10px; margin-top: 20px; }
    .description-text { font-size: 14px; color: #555; line-height: 1.6; margin-bottom: 20px; }
    .game-image-container { width: 100%; margin-bottom: 20px; display: flex; flex-direction: column; gap: 10px; }
    .game-image-container img { width: 100%; height: auto; max-height: 420px; object-fit: contain; }
    .bottom-layout { display: flex; gap: 20px; width: 100%; }
    .left-column { flex: 2; }
    .right-column { flex: 1; }
    .comment-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px; font-size: 16px; font-weight: bold; }
    .input-comment { display: flex; gap: 10px; margin-bottom: 20px; position: relative; }
    .avatar-circle { width: 30px; height: 30px; border-radius: 50%; background: #ddd; overflow: hidden; flex-shrink: 0; }
    .avatar-circle img { width: 100%; height: 100%; object-fit: cover; }
    .input-field { flex: 1; border: none; border-bottom: 1px solid #ddd; padding: 5px; outline: none; font-size: 14px; }
    .comment-item { display: flex; gap: 10px; margin-bottom: 20px; }
    .comment-content { flex: 1; }
    .user-name { font-weight: bold; font-size: 13px; margin-bottom: 2px; }
    .comment-time { font-size: 11px; color: #999; margin-left: 5px; font-weight: normal; }
    .comment-text { font-size: 13px; margin-bottom: 5px; line-height: 1.4; }
    .similar-game-list { display: flex; flex-direction: column; gap: 10px; }
    .game-thumb { width: 100%; height: 80px; border-radius: 8px; overflow: hidden; position: relative; }
    .pagination { display: flex; justify-content: flex-end; gap: 10px; margin-top: 10px; font-size: 12px; }
    @media (max-width: 768px) { .bottom-layout { flex-direction: column; } }
  `;

  return (
    <div className="details-body">
      <style dangerouslySetInnerHTML={{ __html: cssStyles }} />
      <GamePlayTracker />
      <div className="container">
        <div className="card">
          <div className="header-row">
            <h1>{data.name}</h1>
            <FavoriteButton id_game={data._id} />
          </div>
          <div className="game-iframe-container">
            <iframe src={data.link_game} className="game-iframe" title={data.name} allowFullScreen scrolling="no" allow="autoplay; fullscreen; keyboard-vt" />
          </div>
          <div className="breadcrumb">Game &gt; {data.category} &gt; {data.name}</div>
          <table className="info-table">
            <tbody>
              <tr><td>ID Game</td><td>#{data._id.slice(-7).toUpperCase()}</td></tr>
              <tr><td>Tên game</td><td>{data.name}</td></tr>
              <tr><td>Dev</td><td>{data.dev}</td></tr>
              <tr><td>Ra mắt</td><td>{data.release_date ? new Date(data.release_date).toLocaleDateString("vi-VN") : "N/A"}</td></tr>
              <tr><td>Công nghệ</td><td>{data.technology}</td></tr>
              <tr><td>Nền tảng</td><td>{data.platforms?.join(", ")}</td></tr>
            </tbody>
          </table>
          <div className="section-title">Mô tả</div>
          <p className="description-text">{data.description}</p>
          <div className="section-title">Cách chơi</div>
          <p className="description-text">{data.how_to_play || "Lưu ý: Chuyển sang gõ tiếng Anh khi chơi!"}</p>
          <div className="section-title">Hình ảnh trong game</div>
          <div className="game-image-container">
            {data.image?.map((imgUrl, i) => <img key={i} src={imgUrl} alt={`${data.name} screenshot ${i}`} />)}
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