import React from 'react';

function RandomRoll({ champions, onRoll }) {
    return (
        <div>
            <button onClick={onRoll}>Roll</button>
        </div>
    );
}

export default RandomRoll;

