import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FaSearch, FaMapMarkerAlt, FaCalendarAlt, FaUsers } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { fetchHotelsList, fetchGlobalSearchResults } from "../services/api";
import HotelCard from "../components/HotelCard";
import toast, { Toaster } from "react-hot-toast";
import HotelBackground from "./HotelBackground.png"

const Home = () => {
    const [hotels, setHotels] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [checkInDate, setCheckInDate] = useState(null);
    const [checkOutDate, setCheckOutDate] = useState(null);
    const [guestCount, setGuestCount] = useState(1);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({ price: "", rating: "", city: "" });
    const [activeFilters, setActiveFilters] = useState([]);

    const loadHotels = async () => {
        setLoading(true);
        if (searchQuery.trim()) {
            const results = await fetchGlobalSearchResults(searchQuery);
            setHotels(results);
        } else {
            const data = await fetchHotelsList(page, 6);
            setHotels(data);
        }
        setLoading(false);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (!searchQuery.trim()) {
            toast.error("Please enter a search query.");
            return;
        }
        if (!checkInDate || !checkOutDate) {
            toast.error("Please select check-in and check-out dates.");
            return;
        }
        if (checkOutDate <= checkInDate) {
            toast.error("Check-out date must be after check-in date.");
            return;
        }
        if (guestCount < 1) {
            toast.error("At least one guest is required.");
            return;
        }

        toast.success("Searching hotels...");
        loadHotels();
    };

    const handleFilterChange = (type, value) => {
        setFilters({ ...filters, [type]: value });
        if (!activeFilters.some((filter) => filter.type === type && filter.value === value)) {
            setActiveFilters([...activeFilters, { type, value }]);
        }
    };

    const handleRemoveFilter = (type) => {
        setFilters({ ...filters, [type]: "" });
        setActiveFilters(activeFilters.filter((filter) => filter.type !== type));
    };

    useEffect(() => {
        loadHotels();
    }, [page, searchQuery]);

    return (

         

        <PageContainer>
            <Toaster position="top-center" reverseOrder={false} />
            <Header>
                <MainHeading>Find the Perfect deal, always.</MainHeading>
                <Description>
                    Explore top-rated hotels with the best prices. Your dream stay awaits. Book now and enjoy unmatched experiences.<br/>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Similique officia non corrupti pariatur aspernatur <br/>sint modi commodi cum possimus blanditiis facilis beatae repellendus, autem voluptates ratione delectus architecto quae dolore.
                </Description>
            </Header>

            <SearchSection>
                <SearchForm onSubmit={handleSearch}>
                    <LocationInputWrapper>
                        <SearchIcon>
                            <FaSearch />
                        </SearchIcon>
                        <LocationInput
                            type="text"
                            placeholder="Type city, place, or hotel name"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <PinIcon>
                            <FaMapMarkerAlt />
                        </PinIcon>
                    </LocationInputWrapper>

                    <DatePickerWrapper>
                        <CalendarIcon>
                            <FaCalendarAlt />
                        </CalendarIcon>
                        <DatePicker
                            selected={checkInDate}
                            onChange={(dates) => {
                                const [start, end] = dates;
                                setCheckInDate(start);
                                setCheckOutDate(end);
                            }}
                            startDate={checkInDate}
                            endDate={checkOutDate}
                            selectsRange
                            placeholderText="Check-in → Check-out"
                            dateFormat="MMM dd, yyyy"
                            monthsShown={2}
                            minDate={new Date()}
                            customInput={<DateInput />}
                        />
                    </DatePickerWrapper>

                    <GuestInputWrapper>
                        <FaUsers />
                        <GuestInput
                            type="number"
                            min="1"
                            value={guestCount}
                            onChange={(e) => setGuestCount(Number(e.target.value))}
                            placeholder="Guests"
                        />
                    </GuestInputWrapper>

                    <SearchButton type="submit">Search</SearchButton>
                </SearchForm>
            </SearchSection>

            <h2 style={{position :"relative", textAlign:"center", top:"0%", left:" 8%",fontFamily:"Inter",fontWeight:'lighter',fontSize:"30px"}}>Explore Hotels </h2>

            <MainContent>
            <FilterSidebar>
    <h3>PRICE RANGE</h3>
    <div>
        <label>
            <input type="checkbox"
            
            value={filters.price}
            onChange={(e) => handleFilterChange("Price:Up to Rs. 1000", e.target.value)} />
            Up to Rs. 1000
        </label>
        <label>
            <input type="checkbox"
            value={filters.price}
            onChange={(e) => handleFilterChange("Rs. 1001 to Rs. 2000", e.target.value)} />
            Rs. 1001 to Rs. 2000
        </label>
        <label>
            <input type="checkbox"
            value={filters.price}
            onChange={(e) => handleFilterChange("Rs. 2001 to Rs. 5000", e.target.value)} />
            Rs. 2001 to Rs. 5000
        </label>
        <label>
            <input type="checkbox"
            value={filters.price}
            onChange={(e) => handleFilterChange("Above Rs. 5000", e.target.value)} />
            Above Rs. 5000
        </label>
    </div>

    <h3>RATING</h3>
    <div>
        <label>
            <input type="checkbox"
            value={filters.rating}
            onChange={(e) => handleFilterChange("0 - 1 Star", e.target.value)} />
            0 - 1 Star
        </label>
        <label>
            <input type="checkbox"
             value={filters.rating}
             onChange={(e) => handleFilterChange("1 - 2 Star", e.target.value)} />
            1 - 2 Star
        </label>
        <label>
            <input type="checkbox"
                        value={filters.rating}
                        onChange={(e) => handleFilterChange("3 - 4 Star", e.target.value)} />
            2 - 3 Star
        </label>
        <label>
            <input type="checkbox"
             />
            3 - 4 Star
        </label>
        <label>
            <input type="checkbox" 
            value={filters.rating}
            onChange={(e) => handleFilterChange("4 - 5 Star", e.target.value)}/>
            4 - 5 Star
        </label>
    </div>

    <h3>CITY</h3>
    <div>
        <label>
            <input type="checkbox"
             value={filters.city}
             onChange={(e) => handleFilterChange("Mumbai", e.target.value)} />
            Mumbai
        </label>
        <label>
            <input type="checkbox" 
            value={filters.city}
            onChange={(e) => handleFilterChange("Kolkata", e.target.value)}/>
            Kolkata
        </label>
        <label>
            <input type="checkbox"
            value={filters.city}
            onChange={(e) => handleFilterChange("Jaipur", e.target.value)} />
            Bangalore
        </label>
        <label>
            <input type="checkbox"
            value={filters.city}
            onChange={(e) => handleFilterChange("Jaipur", e.target.value)} />
            Jaipur
        </label>
        <label>
            <input type="checkbox"
            value={filters.city}
            onChange={(e) => handleFilterChange("Pune", e.target.value)} />
            Pune
        </label>
        
    </div>
    <ActiveFilters>
                        {activeFilters.map((filter, index) => (
                            <FilterTag key={index}>
                                {filter.type}: {filter.value}{" "}
                                <button onClick={() => handleRemoveFilter(filter.type)}>x</button>
                            </FilterTag>
                        ))}
                    </ActiveFilters>
</FilterSidebar>


                <ContentArea>
                    <HotelGrid>
                        {loading ? (
                            <p>Loading hotels...</p>
                        ) : hotels.length > 0 ? (
                            hotels.map((hotel) => <HotelCard key={hotel.id} hotel={hotel} />)
                        ) : (
                            <p>No hotels found.</p>
                        )}
                    </HotelGrid>

                    <Pagination>
                        <PageButton disabled={page === 1} onClick={() => setPage(page - 1)}>
                            &lt; Previous
                        </PageButton>
                        <p>Page {page}</p>
                        <PageButton onClick={() => setPage(page + 1)}>Next &gt;</PageButton>
                    </Pagination>
                </ContentArea>
            </MainContent>
        </PageContainer>
    );
};

const PageContainer = styled.div`
    background-color: #fff;
    min-height: 50vh;
    padding: 20px;
    font-family: Inter, sans-serif;
    background-image: url(${HotelBackground});
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    padding: 20px;
    color: #000;
`;

const Header = styled.header`
    text-align: left;
    margin-bottom: 20px;
    margin-left : 25px
`;

const MainHeading = styled.h1`
    font-size: 36px;
    color: #000;
    margin-bottom: 10px;
    font-family :  Inter;
    font- weight : 400 ;
    font- height :43.57px ;
    
`;

const Description = styled.p`
    color: #555;
    margin-bottom: 30px;
    font-family :  Inter;
    font-size: 14px;
    
`;

const SearchSection = styled.section`
    margin-bottom: 30px;
    padding: 25px;
    border-radius: 10px;
    margin-right:63%
    width : 67%
    
`;

const SearchForm = styled.form`
    display: flex;
    gap: 60px;
    max-width: 900px;
    margin: 20 auto;
    flex-wrap: nowrap;
`;

const LocationInputWrapper = styled.div`
    flex: 2;
    min-width: 350px;
    position: relative;
    display: flex;
    align-items: center;
    border: 1px solid #878787;
    border-radius: 4px;
    padding: 8px 12px;
    background: #fff;
    gap: 20
`;

const SearchIcon = styled.span`
    color: #0A66BB;
    margin-right: 8px;
`;

const PinIcon = styled.span`
    color: #0A66BB;
`;

const LocationInput = styled.input`
    flex: 1;
    border: none;
    outline: none;
    font-size: 14px;
    &::placeholder {
        color: #878787;
    }
`;

const DatePickerWrapper = styled.div`
    flex: 2;
    min-width: 250px;
    position: relative;
    display: flex;
    align-items: center;
    border: 1px solid #878787;
    border-radius: 4px;
    padding: 8px 12px;
    background: #fff;
`;

const CalendarIcon = styled.span`
    color: #0A66BB;
    margin-right: 8px;
`;

const DateInput = styled.input`
    border: none;
    outline: none;
    font-size: 14px;
    width: 100%;
    background: transparent;
`;

const GuestInputWrapper = styled.div`
    flex: 1;
    min-width: 150px;
    position: relative;
    display: flex;
    align-items: center;
    border: 1px solid #878787;
    border-radius: 4px;
    padding: 8px 12px;
    background: #fff;
    gap: 30px;
`;

const GuestInput = styled.input`
    width: 50px;
    border: none;
    outline: none;
    font-size: 18px;
    text-align: center;
    &::placeholder {
        color: #878787;
    }
`;

const SearchButton = styled.button`
    padding: 0 35px;
    height: 40px;
    background: #0a66bb;
    color: #fff;
    position: relative;
    min-width: 25% ;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-weight: 500;
    font-size:20px;
    transition: background-color 0.2s;

    &:hover {
        background: #085399;
    }
`;

const MainContent = styled.div`
    display: flex;
    gap: 20px;
    margin-top: 20px;
`;

const FilterSidebar = styled.aside`
    flex: 1;
    background-color: #f9f9f9;
    border-radius: 10px;
    padding: 20px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

    h3 {
        margin-bottom: 20px;
        font-size: 16px;
        font-weight: bold;
        color: #333;
        border-bottom: 1px solid #ddd;
        padding-bottom: 5px;
    }

    div {
        margin-bottom: 20px;
        gap:20px;

        label {
            display: flex; /* Align checkbox and label text */
            align-items: center;
            margin-bottom: 10px;
            font-size: 18px;
            color: #555;

            input[type="checkbox"] {
                margin-right: 10px; /* Space between checkbox and label text */
                width: auto;
                height: auto;
                cursor: pointer;
            }
        }
    }
`;

const ActiveFilters = styled.div`
    margin-top: 20px;
`;

const FilterTag = styled.div`
    display: inline-flex;
    align-items: center;
    background: #e0e0e0;
    padding: 5px 10px;
    border-radius: 5px;
    margin-right: 10px;
    font-size: 12px;
    color: #333;

    button {
        background: none;
        border: none;
        margin-left: 5px;
        cursor: pointer;
        color: #999;
        font-size: 14px;
        font-weight: bold;
    }
`;


const ContentArea = styled.div`
    flex: 3;
`;

const HotelGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
`;

const Pagination = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    margin-top: 20px;
`;

const PageButton = styled.button`
    padding: 10px 20px;
    border-radius: 5px;
    border: none;
    background: #0a66bb;
    color: white;
    cursor: pointer;
    transition: 0.3s;

    &:disabled {
        background: #ccc;
        cursor: not-allowed;
    }

    &:hover:not(:disabled) {
        background: #085399;
    }
`;

export default Home;
