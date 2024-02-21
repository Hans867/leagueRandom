import React from 'react';

function ChampionList({ champions }) {
    return (
        <div className="Champion-list">
            {champions.map(champion => (
                <div key={champion.key} className="Champion-item">
                    <h3>{champion.name}</h3>
                    <img
                        src={`https://ddragon.leagueoflegends.com/cdn/14.1.1/img/champion/${champion.image.full}`}
                        alt={`${champion.name} Champion`}
                    />
                    {/* Additional details if needed */}
                </div>
            ))}
        </div>
    );
}

export default ChampionList;

