import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Places.css";

const PLACES = [
    "Mumbai",
    "Jaipur",
    "Delhi",
    "Bengaluru",
    "Chennai",
    "Goa",
    "Hyderabad",
    "Agra",
    "Ahmedabad",
];

const Places = () => {
    const navigate = useNavigate();

    const handlePlaceClick = (place) => {
        navigate(`/explore?city=${place}`); // Redirect to Explore page with city filter
    };

    return (
        <div className="places">
            <h1>Explore Popular Places</h1>
            <div className="places-grid">
                {PLACES.map((place, index) => (
                    <div key={index} className="place-card">
                        <h3>{place}</h3>
                        <button onClick={() => handlePlaceClick(place)}>
                            Explore Hotels
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Places;
