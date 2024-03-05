// Home.js

import React, { useState, useEffect } from 'react';
import './Home.css';
import ChampionList from '../repositories/ChampionsList';
import Navbar from "./Navbar";

const Home = () => {
    const [champions, setChampions] = useState([]);
    const [rolledChampions, setRolledChampions] = useState([]);
    const [rollCount, setRollCount] = useState(1);
    const [playerName, setPlayerName] = useState('');
    const [lockedChampions, setLockedChampions] = useState([]);
    const [activeSide, setActiveSide] = useState('blue');
    const [leftLockedChampions, setLeftLockedChampions] = useState([]);
    const [rightLockedChampions, setRightLockedChampions] = useState([]);

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

        do {
            newChampion = champions[Math.floor(Math.random() * champions.length)];
        } while (newRolledChampions.some(champion => champion.key === newChampion.key));

        newRolledChampions[index] = newChampion;
        setRolledChampions(newRolledChampions);
    };

    const handleLockIn = (champion, index) => {
        const newLockedChampion = {
            champion,
            playerName,
        };

        if (activeSide === 'blue') {
            setLeftLockedChampions(prev => [...prev, newLockedChampion]);
        } else {
            setRightLockedChampions(prev => [...prev, newLockedChampion]);
        }

        setRolledChampions([]); // Reset rolled champions when locking in
        setPlayerName(''); // Reset player name when locking in
    };

    const switchActiveSide = side => {
        setActiveSide(side);
    };

    return (
        <div>
            <h1>MAZE leagueRandom</h1>
            <Navbar />
            <div id="gamerName">
                <button
                    className={`lock-in-button blue ${activeSide === 'blue' ? 'active' : ''}`}
                    onClick={() => switchActiveSide('blue')}
                >
                    Blue Side
                </button>

                <input
                    type="text"
                    placeholder="Enter your name"
                    value={playerName}
                    onChange={(e) => setPlayerName(e.target.value)}
                />

                <button
                    className={`lock-in-button red ${activeSide === 'red' ? 'active' : ''}`}
                    onClick={() => switchActiveSide('red')}
                >
                    Red Side
                </button>
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
            {leftLockedChampions.length > 0 && (
                <div className="locked-champions blue-side">
                    <h2>Blue Side</h2>
                    {leftLockedChampions.map((lockedChampion, index) => (
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
            {rightLockedChampions.length > 0 && (
                <div className="locked-champions red-side">
                    <h2>Red Side</h2>
                    {rightLockedChampions.map((lockedChampion, index) => (
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
