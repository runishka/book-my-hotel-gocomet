import React from "react";
import styled from "styled-components";

export function HotelDescription({ description }) {
    return (
        <DescriptionContainer>
            <Title>About this Hotel</Title>
            <Description>{description}</Description>
        </DescriptionContainer>
    );
}

const DescriptionContainer = styled.div`
    margin-top: 40px;
`;

const Title = styled.h2`
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 15px;
`;

const Description = styled.p`
    font-size: 16px;
    line-height: 1.5;
    color: #555;
`;
