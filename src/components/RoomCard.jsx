import React from "react";
import styled from "styled-components";

export function RoomCard({
    id,
    image,
    title,
    capacity,
    price,
    onBookNow,
    onViewFacilities,
}) {
    return (
        <Card>
            <ImageContainer>
                <RoomImage src={image} alt={title} />
            </ImageContainer>
            <RoomInfo>
                <RoomTitle>{title}</RoomTitle>
                <Capacity>Capacity: {capacity}</Capacity>
                <Price>{price}</Price>
                <ActionButtons>
                    <ViewFacilitiesButton onClick={onViewFacilities}>
                        View Facilities
                    </ViewFacilitiesButton>
                    <BookNowButton onClick={onBookNow}>
                        Book Now
                    </BookNowButton>
                </ActionButtons>
            </RoomInfo>
        </Card>
    );
}

const Card = styled.article`
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    padding: 15px;
    border: 1px solid #ccc;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    transition: box-shadow 0.3s;
    &:hover {
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
    }
`;

const ImageContainer = styled.div`
    width: 100%;
    height: 150px;
    overflow: hidden;
    border-radius: 4px;
`;

const RoomImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

const RoomInfo = styled.div`
    margin-top: 15px;
`;

const RoomTitle = styled.h2`
    font-size: 20px;
    font-weight: 600;
`;

const Capacity = styled.p`
    margin: 5px 0;
`;

const Price = styled.p`
    font-size: 18px;
    font-weight: bold;
    color: #007bff;
`;

const ActionButtons = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
`;

const ViewFacilitiesButton = styled.button`
    border: 1px solid #007bff;
    background: none;
    padding: 10px 15px;
    color: #007bff;
    border-radius: 5px;
    cursor: pointer;
    &:hover {
        background: rgba(0, 123, 255, 0.1);
    }
`;

const BookNowButton = styled.button`
    background: #007bff;
    color: white;
    padding: 10px 15px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    &:hover {
        background: #0056b3;
    }
`;
