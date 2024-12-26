import React from "react";
import styled from "styled-components";

export const RoomDetails = ({ room }) => {
    return (
        <Container>
            <Header>
                <Title>
                    <span>{room.hotelName} &gt; </span>
                    <span>{room.name}</span>
                </Title>
            </Header>
            <ImageContainer>
                <RoomImage src={room.image_urls[0]} alt={room.name} />
            </ImageContainer>
            <Amenities>
                {room.amenities.map((amenity, index) => (
                    <AmenityTag key={index}>{amenity}</AmenityTag>
                ))}
            </Amenities>
        </Container>
    );
};

const Container = styled.div`
    width: 50%;
    display: flex;
    flex-direction: column;
`;

const Header = styled.div`
    margin-bottom: 20px;
`;

const Title = styled.div`
    font-family: "Inter", sans-serif;
    span:first-child {
        font-size: 16px;
    }
    span:last-child {
        font-size: 22px;
    }
`;

const ImageContainer = styled.div`
    width: 100%;
    aspect-ratio: 1.7;
`;

const RoomImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

const Amenities = styled.div`
    display: flex;
    gap: 10px;
    margin-top: 20px;
`;

const AmenityTag = styled.div`
    border: 1px solid #0a66bb;
    padding: 5px 10px;
    border-radius: 12px;
    font-size: 12px;
`;
