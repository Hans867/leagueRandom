import React, { useState, useEffect } from 'react';
import RandomRoll from "../components/RandomRoll";
import ChampionList from "../repositories/ChampionsList";
import './Home.css';

function Home() {
    const [champions, setChampions] = useState([]);
    const [rolledChampions, setRolledChampions] = useState([]);
    const [rollCount, setRollCount] = useState(1);

    useEffect(() => {
        // Fetch champions when the component mounts
        fetchChampions();
    }, []);

    const fetchChampions = () => {
        // Fetch champions and set them in the state
        fetch('https://ddragon.leagueoflegends.com/cdn/14.1.1/data/en_US/champion.json')
            .then(response => response.json())
            .then(data => {
                console.log('Champion data fetched successfully:', data);
                const championsData = data.data;
                const championsArray = Object.values(championsData);
                setChampions(championsArray);
            })
            .catch(error => console.error('Error fetching champions:', error));
    };

    const handleRoll = () => {
        // Shuffle the champions array
        const shuffledChampions = [...champions].sort(() => Math.random() - 0.5);

        // Get the first 'rollCount' champions from the shuffled array
        const newRolledChampions = shuffledChampions.slice(0, rollCount);

        // Update the rolled champions state
        setRolledChampions(newRolledChampions);

        console.log('Rolled Champions:', newRolledChampions);
    };

    const handleFilterChange = (event) => {
        setRollCount(parseInt(event.target.value, 10));
    };

    return (
        <div>
            <h1>MAZE leagueRandom</h1>
            <RandomRoll onRoll={handleRoll} />
            <div>
                <label>Number of Champions to Roll: </label>
                <select onChange={handleFilterChange} value={rollCount}>
                    {[1, 2, 3, 4, 5].map((count) => (
                        <option key={count} value={count}>
                            {count}
                        </option>
                    ))}
                </select>
            </div>
            <ChampionList champions={rolledChampions} />
            {/* Display additional components or content as needed */}
        </div>
    );
}

export default Home;
