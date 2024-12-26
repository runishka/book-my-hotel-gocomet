import React from "react";
import styled from "styled-components";
import toast from "react-hot-toast";

export const BookingForm = ({ formData, setFormData, onSubmit }) => {
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const validateForm = () => {
        if (!formData.name || !formData.email || !formData.checkIn || !formData.checkOut) {
            toast.error("All required fields must be filled!");
            return false;
        }
        if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
            toast.error("Invalid email address!");
            return false;
        }
        if (formData.age < 18) {
            toast.error("Age must be 18 years or older!");
            return false;
        }
        if (formData.persons < 1) {
            toast.error("At least one guest is required!");
            return false;
        }
        const checkInDate = new Date(formData.checkIn);
        const checkOutDate = new Date(formData.checkOut);
        if (checkOutDate <= checkInDate) {
            toast.error("Check-out date must be after the check-in date!");
            return false;
        }
        return true;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            toast.success("Booking Confirmed!"); // Success toast notification
            onSubmit(e); // Call the parent form submission function
        }
    };

    return (
        <FormContainer onSubmit={handleSubmit}>
            <RoomTitle>Standard Room</RoomTitle>
            <InputLabel htmlFor="name">Full Name</InputLabel>
            <Input
                id="name"
                name="name"
                placeholder="Enter your full name (required)"
                value={formData.name}
                onChange={handleInputChange}
                required
            />
            <InputLabel htmlFor="email">Email Address</InputLabel>
            <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email (required)"
                value={formData.email}
                onChange={handleInputChange}
                required
            />
            <InputLabel htmlFor="age">Age</InputLabel>
            <Input
                id="age"
                name="age"
                type="number"
                placeholder="Enter your age (must be 18+)"
                value={formData.age}
                onChange={handleInputChange}
                min="18"
                required
            />
            <GenderToggle>
                <GenderButton
                    active={formData.gender.includes("male")}
                    onClick={() =>
                        setFormData((prev) => ({
                            ...prev,
                            gender: formData.gender.includes("male")
                                ? formData.gender.filter((g) => g !== "male")
                                : [...formData.gender, "male"],
                        }))
                    }
                >
                    Male
                </GenderButton>
                <GenderButton
                    active={formData.gender.includes("female")}
                    onClick={() =>
                        setFormData((prev) => ({
                            ...prev,
                            gender: formData.gender.includes("female")
                                ? formData.gender.filter((g) => g !== "female")
                                : [...formData.gender, "female"],
                        }))
                    }
                >
                    Female
                </GenderButton>
                <GenderButton
                    active={formData.gender.includes("other")}
                    onClick={() =>
                        setFormData((prev) => ({
                            ...prev,
                            gender: formData.gender.includes("other")
                                ? formData.gender.filter((g) => g !== "other")
                                : [...formData.gender, "other"],
                        }))
                    }
                >
                    Other
                </GenderButton>
            </GenderToggle>
            <InputLabel htmlFor="checkIn">Check-In Date</InputLabel>
            <Input
                id="checkIn"
                name="checkIn"
                type="date"
                placeholder="Select your check-in date (required)"
                value={formData.checkIn}
                onChange={handleInputChange}
                required
            />
            <InputLabel htmlFor="checkOut">Check-Out Date</InputLabel>
            <Input
                id="checkOut"
                name="checkOut"
                type="date"
                placeholder="Select your check-out date (required)"
                value={formData.checkOut}
                onChange={handleInputChange}
                required
            />
            <InputLabel htmlFor="persons">Number of Guests</InputLabel>
            <Input
                id="persons"
                name="persons"
                type="number"
                placeholder="Number of guests (required)"
                value={formData.persons}
                onChange={handleInputChange}
                min="1"
                required
            />
            <BookButton type="submit">Confirm Booking</BookButton>
        </FormContainer>
        
    );
};



const FormContainer = styled.form`
    width: 50%;
    display: flex;
    flex-direction: column;
    padding: 20px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    backdrop-filter: blur(10px);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    background-color: rgba(255, 255, 255, 0.9);

    @media (max-width: 768px) {
        width: 90%;
    }
`;

const RoomTitle = styled.h2`
    margin-bottom: 20px;
    font-size: 26px;
    text-align: center;
    font-weight: bold;
    color: #333;
`;

const InputLabel = styled.label`
    margin-bottom: 5px;
    font-size: 14px;
    color: #555;
`;

const Input = styled.input`
    padding: 10px;
    margin-bottom: 15px;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 14px;
    transition: border-color 0.3s ease;

    &:focus {
        border-color: #007bff;
        outline: none;
    }
`;

const GenderToggle = styled.div`
    display: flex;
    gap: 10px;
    margin-bottom: 15px;
`;

const GenderButton = styled.button`
    flex: 1;
    padding: 10px;
    background-color: ${(props) => (props.active ? "#007BFF" : "#f1f1f1")};
    color: ${(props) => (props.active ? "#fff" : "#333")};
    border: 1px solid ${(props) => (props.active ? "#007BFF" : "#ddd")};
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
        background-color: ${(props) => (props.active ? "#0056b3" : "#e6e6e6")};
    }
`;

const BookButton = styled.button`
    padding: 12px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    margin-top: 20px;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #0056b3;
    }
`;

export default BookingForm;
