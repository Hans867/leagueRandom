import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const filters = [
    "https://cdn.mobalytics.gg/assets/common/icons/all-option.svg",
    "https://cdn.mobalytics.gg/assets/common/icons/lol-roles/16-top-faded.svg",
    "https://cdn.mobalytics.gg/assets/common/icons/lol-roles/16-jg-faded.svg",
    "https://cdn.mobalytics.gg/assets/common/icons/lol-roles/16-mid-faded.svg",
    "https://cdn.mobalytics.gg/assets/common/icons/lol-roles/16-bot-faded.svg",
    "https://cdn.mobalytics.gg/assets/common/icons/lol-roles/16-sup-faded.svg"
];

function Navbar() {
    return (
        <div className="Navbar">
            {filters.map((filter, index) => (
                <Link to={`/${index}`} key={index}>
                    <button
                        className="filter-button"
                        style={{ backgroundImage: `url(${filter})` }}
                    />
                </Link>
            ))}
        </div>
    );
}

export default Navbar;
