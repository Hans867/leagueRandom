import React, { useState, useEffect } from 'react';
import RandomRoll from '../components/RandomRoll';
import ChampionList from '../repositories/ChampionsList';
import Navbar from './Navbar';
import './Home.css';

function Home() {
    const [champions, setChampions] = useState([]);
    const [rolledChampions, setRolledChampions] = useState([]);
    const [rollCount, setRollCount] = useState(1);

    useEffect(() => {
        fetchChampions();
    }, []);

    const fetchChampions = () => {
        fetch('https://ddragon.leagueoflegends.com/cdn/14.1.1/data/en_US/champion.json')
            .then(response => response.json())
            .then(data => {
                const championsData = data.data;
                const championsArray = Object.values(championsData);
                setChampions(championsArray);
            })
            .catch(error => console.error('Error fetching champions:', error));
    };

    const handleRoll = () => {
        const shuffledChampions = [...champions].sort(() => Math.random() - 0.5);
        const newRolledChampions = shuffledChampions.slice(0, rollCount);
        setRolledChampions(newRolledChampions);
    };

    const handleFilterChange = event => {
        setRollCount(parseInt(event.target.value, 10));
    };

    const handleReroll = (champion, index) => {
        const newRolledChampions = [...rolledChampions];
        newRolledChampions[index] = champions[Math.floor(Math.random() * champions.length)];
        setRolledChampions(newRolledChampions);
    };

    return (
        <div>
            <h1>MAZE leagueRandom</h1>
            <Navbar />
            <div className="label-and-filter">
                <label>Number of Champions to Roll: </label>
                <select className="filter-select" onChange={handleFilterChange} value={rollCount}>
                    {[1, 2, 3, 4, 5].map(count => (
                        <option key={count} value={count}>
                            {count}
                        </option>
                    ))}
                </select>
            </div>
            <RandomRoll onRoll={handleRoll} />
            <ChampionList champions={rolledChampions} onReroll={handleReroll} />
        </div>
    );
}

export default Home;
