import React from "react";
import styled from "styled-components";

export function HotelHero({ name, location, rating, images }) {
    return (
        <HeroSection>
            <BackgroundImage
                src={images.main || "/default-background.jpg"} // Default background fallback
                alt={`${name} exterior view`}
            />
            <Overlay />
            <Content>
                <LogoWrapper>
                    <LogoImage
                        src={images.logo = "/hotellogogen.jpeg"} // Relative path to public folder
                        
                
                    />
                </LogoWrapper>
                <TextWrapper>
                    <HotelTitle>{name}</HotelTitle>
                    <InfoContainer>
                        <Location>
                            <span>{location}</span>
                        </Location>
                        <Rating>
                            <span>Rating: {rating}</span>
                        </Rating>
                    </InfoContainer>
                </TextWrapper>
            </Content>
        </HeroSection>
    );
}

const HeroSection = styled.section`
    position: relative;
    width: 100%;
    height: 400px; /* Increased height for the hero section */
    display: flex;
    align-items: flex-end;
    justify-content: center;
    overflow: hidden;
`;

const BackgroundImage = styled.img`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

const Overlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.8));
    z-index: 1; /* Above the image */
`;

const Content = styled.div`
    position: relative;
    z-index: 2; /* Above the overlay */
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    padding: 20px;
`;

const LogoWrapper = styled.div`
    position: relative;
    margin-top: -40px; /* Bring the logo slightly overlapping the image */
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
`;

const LogoImage = styled.img`
    width: 80px;
    height: 80px;
    border-radius: 50%;
    border: 2px solid white;
    object-fit: cover;
    object-position: center;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const TextWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    margin-top: 10px;
    color: white;
`;

const HotelTitle = styled.h1`
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 10px;
`;

const InfoContainer = styled.div`
    display: flex;
    justify-content: center;
    gap: 20px;
    font-size: 14px;
`;

const Location = styled.div`
    font-weight: 500;
`;

const Rating = styled.div`
    font-weight: 500;
`;
