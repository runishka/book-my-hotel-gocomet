import axios from "axios";

const BASE_URL = "https://www.gocomet.com/api/assignment";

// Fetch all hotel names for the search bar
export const fetchHotelNames = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/hotels-name`);
        return response.data; // Array of hotel names and cities
    } catch (error) {
        console.error("Error fetching hotel names:", error.message);
        return [];
    }
};
export const fetchHotelRooms = async (hotelId) => {
    try {
        const response = await axios.get(`${BASE_URL}/hotels/${hotelId}/rooms`);
        return response.data.rooms; // Return rooms array
    } catch (error) {
        console.error("Error fetching hotel rooms:", error.message);
        return [];
    }
};


// Fetch hotels with pagination
// export const fetchHotelsList = async (page, size) => {
//     try {
//         const response = await axios.get(`${BASE_URL}/hotels`, {
//             params: { page, size },
//         });
//         return response.data.hotels; // Return hotels array
//     } catch (error) {
//         console.error("Error fetching hotels list:", error.message);
//         return [];
//     }
// };
export const fetchGlobalSearchResults = async (query) => {
    try {
        const allHotels = await fetchHotelNames();
        return allHotels.filter(
            (hotel) =>
                hotel.name.toLowerCase().includes(query.toLowerCase()) ||
                hotel.city.toLowerCase().includes(query.toLowerCase())
        );
    } catch (error) {
        console.error("Error fetching global search results:", error.message);
        return [];
    }
};


// Fetch hotel details by ID
// export const fetchHotelDetails = async (hotelId) => {
//     try {
//         const response = await axios.get(`${BASE_URL}/hotels/${hotelId}`);
//         return response.data.hotel; // Return single hotel object
//     } catch (error) {
//         console.error("Error fetching hotel details:", error.message);
//         return null;
//     }
// };
export const fetchHotelsList = async (page, size) => {
    try {
        const response = await axios.get(`${BASE_URL}/hotels`, {
            params: { page, size },
        });
        const hotels = response.data.hotels;

        // Fetch room details for each hotel and calculate price range
        const hotelsWithPrices = await Promise.all(
            hotels.map(async (hotel) => {
                const rooms = await fetchHotelRooms(hotel.id); // Fetch rooms for each hotel
                const prices = rooms.map((room) => room.price);

                return {
                    ...hotel,
                    minPrice: prices.length ? Math.min(...prices) : "N/A",
                    maxPrice: prices.length ? Math.max(...prices) : "N/A",
                };
            })
        );

        return hotelsWithPrices;
    } catch (error) {
        console.error("Error fetching hotels list:", error.message);
        return [];
    }
};

export const fetchHotelDetails = async (hotelId) => {
    try {
        const response = await axios.get(`${BASE_URL}/hotels/${hotelId}`);
        const hotel = response.data.hotel;

        // Calculate price range for the hotel's rooms
        const prices = hotel.rooms.map((room) => room.price);
        hotel.minPrice = prices.length ? Math.min(...prices) : "N/A";
        hotel.maxPrice = prices.length ? Math.max(...prices) : "N/A";

        return hotel; // Return hotel object with price range
    } catch (error) {
        console.error("Error fetching hotel details:", error.message);
        return null;
    }
};


