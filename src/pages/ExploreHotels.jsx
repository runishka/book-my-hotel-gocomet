import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchHotelsList, fetchGlobalSearchResults } from "../services/api";
import HotelCard from "../components/HotelCard";
import "../styles/ExploreHotels.css";

const ExploreHotels = () => {
    const [hotels, setHotels] = useState([]);
    const [searchParams] = useSearchParams();
    const [sortBy, setSortBy] = useState("name");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const city = searchParams.get("city");
        const loadHotels = async () => {
            setLoading(true);
            if (city) {
                const results = await fetchGlobalSearchResults(city);
                setHotels(results);
            } else {
                const data = await fetchHotelsList(1, 10);
                setHotels(data);
            }
            setLoading(false);
        };

        loadHotels();
    }, [searchParams]);

    return (
        <div className="explore-hotels">
            <h1>Explore Hotels</h1>
            <div className="sort-options">
                <label>Sort by:</label>
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                    <option value="name">Name</option>
                    <option value="price">Price</option>
                </select>
            </div>
            <div className="hotel-grid">
                {loading ? (
                    <p>Loading hotels...</p>
                ) : hotels.length > 0 ? (
                    hotels.map((hotel) => <HotelCard key={hotel.id} hotel={hotel} />)
                ) : (
                    <p>No hotels found.</p>
                )}
            </div>
        </div>
    );
};

export default ExploreHotels;
