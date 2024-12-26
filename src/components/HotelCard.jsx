import React from "react";
import { Link } from "react-router-dom";
import "../styles/HotelCard.css";

const HotelCard = ({ hotel }) => (
    <div className="hotel-card">
        <img
            src={hotel.image_url || "/images/placeholder.jpg"} // Use dynamic image from API
            alt={hotel.name}
            className="hotel-image"
        />
        <div className="hotel-details">
            <h3>{hotel.name}</h3>
            <p>City: {hotel.city}</p>
            <p>Rating: {hotel.rating || "N/A"}</p>
            <p>
                Price Range: ₹
                {hotel.minPrice !== "N/A" ? hotel.minPrice : "N/A"} - ₹
                {hotel.maxPrice !== "N/A" ? hotel.maxPrice : "N/A"}
            </p>
            <Link to={`/hotel/${hotel.id}`}>
                <button>View Details</button>
            </Link>
        </div>
    </div>
);

export default HotelCard;
