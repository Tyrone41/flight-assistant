import React, { useState } from 'react';
import axios from 'axios';

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
        <div className="App">
            <h1>AI-Powered Flight Delay Predictor</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Departure Time:
                    <input type="text" name="departure_time" value={flightData.departure_time} onChange={handleChange} />
                </label>
                <br />
                <label>
                    Flight Number:
                    <input type="text" name="flight_number" value={flightData.flight_number} onChange={handleChange} />
                </label>
                <br />
                <label>
                    Airline:
                    <input type="text" name="airline" value={flightData.airline} onChange={handleChange} />
                </label>
                <br />
                <label>
                    Weather Condition:
                    <input type="text" name="weather_condition" value={flightData.weather_condition} onChange={handleChange} />
                </label>
                <br />
                <button type="submit">Predict Delay</button>
            </form>
            {prediction !== null && <h2>Prediction: {prediction}</h2>}
        </div>
    );
}

export default App;

