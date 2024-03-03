import React, { useState, useEffect } from 'react';
import './Home.css';
import ChampionList from '../repositories/ChampionsList';
import Navbar from "./Navbar";

function Home() {
    const [champions, setChampions] = useState([]);
    const [rolledChampions, setRolledChampions] = useState([]);
    const [rollCount, setRollCount] = useState(1);
    const [playerName, setPlayerName] = useState('');
    const [lockedChampions, setLockedChampions] = useState([]);

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

    const handleReroll = index => {
        const newRolledChampions = [...rolledChampions];
        let newChampion;

        const isDuplicate = champion => champion.key === newChampion.key;

        do {
            newChampion = champions[Math.floor(Math.random() * champions.length)];
        } while (newRolledChampions.some(isDuplicate));

        newRolledChampions[index] = newChampion;
        setRolledChampions(newRolledChampions);
    };


    const handleLockIn = (champion, index) => {
        const newLockedChampion = {
            champion,
            playerName,
        };
        setLockedChampions(prevLockedChampions => [...prevLockedChampions, newLockedChampion]);
        setRolledChampions([]); // Reset rolled champions when locking in
        setPlayerName(''); // Reset player name when locking in
    };

    return (
        <div>
            <h1>MAZE leagueRandom</h1>
            <Navbar></Navbar>
            <div id="gamerName">
                <label ></label>
                <input
                    type="text"
                    placeholder="Enter your name"
                    value={playerName}
                    onChange={(e) => setPlayerName(e.target.value)}
                />
            </div>
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
            <button className="roll-button" onClick={handleRoll}>
                ROLL
            </button>
            <ChampionList champions={rolledChampions} onReroll={handleReroll} onLockIn={handleLockIn} />
            {lockedChampions.length > 0 && (
                <div className="locked-champions">
                    <h2>Locked In</h2>
                    {lockedChampions.map((lockedChampion, index) => (
                        <div key={index} className="locked-champion">
                            <p>{` ${lockedChampion.playerName}`}</p>
                            <img
                                src={`https://ddragon.leagueoflegends.com/cdn/14.1.1/img/champion/${lockedChampion.champion.image.full}`}
                                alt={`${lockedChampion.champion.name} Champion`}
                            />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Home;
