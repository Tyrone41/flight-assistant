import React, { useState } from 'react';
import axios from 'axios';
import backgroundHome from './backgroundHome.png';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Home from './Home';
import AIWellness from './AIWellness';
import AITravelAssistance from './AITravelAssistance';

function App() {
    const [flightData, setFlightData] = useState({
        departure_time: '',
        flight_number: '',
        airline: 'American', // Default to American
        weather_condition: ''
    });
    const [prediction, setPrediction] = useState(null);

    const handleChange = (e) => {
        setFlightData({ ...flightData, [e.target.name]: e.target.value });
    };

    const backgroundHomeStyle = {
        backgroundImage: `url(${backgroundHome})`,
        backgroundSize: 'cover', // Adjust to fit the container
        backgroundRepeat: 'no-repeat', // Prevent tiling
        height: '100vh', // Full viewport height
      };
      

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/predict', flightData);
            setPrediction(response.data.prediction ? "Delay" : "No Delay");
        } catch (error) {
            console.error("Error fetching prediction:", error);
        }
    };

    return (
        <Router>
        <Routes>
            {/* Define routes for each page */}
            <Route path="/" element={<Home />} />
            <Route path="/ai-wellness" element={<AIWellness />} />
            <Route path="/ai-travel-assistance" element={<AITravelAssistance />} />
        </Routes>
    </Router>
    );
}

export default App;

