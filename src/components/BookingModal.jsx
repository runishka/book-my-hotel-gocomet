import React, { useState } from "react";
import styled from "styled-components";
import { RoomDetails } from "../components/RoomDetails";
import { BookingForm } from "../components/BookingForm";
import toast, { Toaster } from "react-hot-toast";

const BookingModal = ({ room, onClose }) => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        age: "",
        gender: [],
        checkIn: "",
        checkOut: "",
        persons: 1,
    });

    const validateForm = () => {
        if (!formData.name || !formData.email || !formData.checkIn || !formData.checkOut) {
            toast.error("All required fields must be filled!");
            return false;
        }
        if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
            toast.error("Invalid email address!");
            return false;
        }
        if (formData.persons < 1) {
            toast.error("At least one person is required for booking!");
            return false;
        }
        return true;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        // Simulate booking success
        toast.success("Booking Confirmed!");
        console.log("Booking Details:", {
            ...formData,
            room: room.name,
        });

        // Delay closing the modal to allow the toast to be visible
        setTimeout(() => {
            onClose();
        }, 1500); // 1.5 seconds
    };

    return (
        <ModalWrapper>
            <Toaster position="top-center" reverseOrder={false} />
            <ModalOverlay onClick={onClose} />
            <ModalContent>
                <RoomDetails room={room} />
                <BookingForm
                    formData={formData}
                    setFormData={setFormData}
                    onSubmit={handleSubmit}
                />
                <CloseButton onClick={onClose}>&times;</CloseButton>
            </ModalContent>
        </ModalWrapper>
    );
};

const ModalWrapper = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;

const ModalOverlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
`;

const ModalContent = styled.div`
    position: relative;
    background-color: white;
    display: flex;
    flex-direction: row;
    gap: 20px;
    padding: 20px;
    border-radius: 10px;
    width: 80%;
    max-width: 1000px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
`;

const CloseButton = styled.button`
    position: absolute;
    top: 10px;
    right: 10px;
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    color: #888;
    transition: color 0.3s ease;
    &:hover {
        color: #333;
    }
`;

export default BookingModal;
