import React from 'react';

function ChampionList({ champions, onReroll }) {
    return (
        <div className="Champion-list">
            {champions.map((champion, index) => (
                <div key={champion.key} className="Champion-item">
                    <h3>{champion.name}</h3>
                    <img
                        src={`https://ddragon.leagueoflegends.com/cdn/14.1.1/img/champion/${champion.image.full}`}
                        alt={`${champion.name} Champion`}
                    />
                    <button onClick={() => onReroll(champion, index)}>REROLL</button>
                </div>
            ))}
        </div>
    );
}

export default ChampionList;