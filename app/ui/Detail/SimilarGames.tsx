import React from 'react';

interface SimilarGame {
  name: string;
  color: string;
}

const SimilarGames = ({ games }: { games: SimilarGame[] }) => {
  return (
    <div className="card right-column">
      <div className="section-title" style={{ marginTop: 0 }}>
        Game tương tự
      </div>

      <div className="similar-game-list">
        {games.map((game, index) => (
          <div key={index} className="game-thumb">
            <img
              src={`https://placehold.co/200x80/${game.color.replace('#', '')}/FFF?text=${game.name}`}
              alt={`Game ${game.name}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SimilarGames;
