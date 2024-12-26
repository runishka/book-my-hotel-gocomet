import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { fetchHotelDetails } from "../services/api";
import BookingModal from "../components/BookingModal";
import { HotelHero } from "../components/HotelHero";
import { HotelDescription } from "../components/HotelDescription";
import { RoomCard } from "../components/RoomCard";
import { FaArrowLeft } from "react-icons/fa";

const HotelDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [hotel, setHotel] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [bookingRoom, setBookingRoom] = useState(null);

    useEffect(() => {
        const loadHotelDetails = async () => {
            try {
                setLoading(true);
                const data = await fetchHotelDetails(id);
                setHotel(data);
            } catch (error) {
                setError("Failed to load hotel details.");
            } finally {
                setLoading(false);
            }
        };

        loadHotelDetails();
    }, [id]);

    if (loading) return <LoadingWrapper>Loading hotel details...</LoadingWrapper>;
    if (error) return <ErrorWrapper>{error}</ErrorWrapper>;

    return (
        <PageWrapper>
            <BackButtonWrapper>
                <CircularBackButton onClick={() => navigate(-1)}>
                    <FaArrowLeft className="icon" />
                </CircularBackButton>
            </BackButtonWrapper>

            {/* Hero Section */}
            <HotelHero
                name={hotel.name}
                location={hotel.city}
                rating={hotel.rating || "N/A"}
                images={{
                    main: hotel.image_url || "/default-hotel.jpg",
                    logo: "/default-logo.jpg",
                }}
            />

            {/* Hotel Details */}
            <ContentSection>
                <RoomGrid>
                    {hotel.rooms.map((room) => (
                        <RoomCard
                            key={room.id}
                            id={room.id}
                            image={room.image_urls[0]}
                            title={room.name}
                            capacity={room.capacity || "N/A"}
                            price={`₹${room.price}`}
                            onBookNow={() => setBookingRoom(room)}
                            onViewFacilities={() =>
                                alert(`Viewing facilities for ${room.name}`)
                            }
                        />
                    ))}
                </RoomGrid>
                <HotelDescription description={hotel.description} />
            </ContentSection>

            {/* Booking Modal */}
            {bookingRoom && (
                <BookingModal
                    room={bookingRoom}
                    onClose={() => setBookingRoom(null)}
                />
            )}
        </PageWrapper>
    );
};

const PageWrapper = styled.div`
    background-color: #fff;
    display: flex;
    flex-direction: column;
    padding: 20px;
    min-height: 100vh;
`;

const BackButtonWrapper = styled.div`
    position: absolute;
    top: 80px; /* Slightly below the navbar */
    left: 20px; /* Align with page content */
    z-index: 10;

    @media (max-width: 768px) {
        top: 70px; /* Adjust for smaller screens */
        left: 15px;
    }
`;

const CircularBackButton = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50px;
    height: 50px;
    background-color: rgba(255, 255, 255, 0.8); /* Slightly opaque background */
    color: #007bff; /* Arrow always visible in blue */
    border: none;
    border-radius: 50%;
    cursor: pointer;
    backdrop-filter: blur(5px); /* Subtle blur effect */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15); /* Softer shadow */
    transition: transform 0.2s ease, background-color 0.3s ease;

    &:hover {
        background-color: rgba(255, 255, 255, 1); /* Fully opaque on hover */
        transform: scale(1.05); /* Slight zoom effect */
    }

    &:focus {
        outline: 2px solid #007bff; /* Blue outline on focus */
        outline-offset: 2px;
    }

    &:active {
        transform: scale(0.95); /* Shrink effect on click */
        background-color: rgba(240, 240, 240, 1); /* Slightly dim background */
    }

    .icon {
        font-size: 20px; /* Adjust arrow size */
    }
`;


const ContentSection = styled.div`
    display: flex;
    margin-top: 20px;
    width: 100%;
    flex-direction: column;
    align-items: start;
    padding: 0 20px;
`;

const RoomGrid = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    width: 100%;
`;

const LoadingWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    font-size: 1.5rem;
`;

const ErrorWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    color: red;
    font-size: 1.5rem;
`;

export default HotelDetails;
