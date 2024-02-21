import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Champs.css';

function ListChamps() {
    const [champions, setChampions] = useState([]);

    useEffect(() => {
        axios.get('https://ddragon.leagueoflegends.com/cdn/14.1.1/data/en_US/champion.json')
            .then(response => {
                console.log('Champion data fetched successfully:', response.data);
                // Extracting champions object from the response
                const championsData = response.data.data;
                // Converting object into an array
                const championsArray = Object.values(championsData);
                setChampions(championsArray);
            })
            .catch(error => console.error('Error fetching champions:', error));
    }, []);

    return (
        <div className="Champion-container">
            <div className="Champion-list">
                {champions.map(champion => (
                    <div key={champion.key} className="Champion-item">
                        <h3>{champion.name}</h3>
                        <img
                            src={`https://ddragon.leagueoflegends.com/cdn/14.1.1/img/champion/${champion.image.full}`}
                            alt={`${champion.name} Champion`}
                        />
                        <div className="Champion-links">
                            {/* You can add additional details here if needed */}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ListChamps;
