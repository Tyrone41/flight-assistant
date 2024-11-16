import React, { useState, useEffect } from 'react';
import axios from 'axios';
import backgroundWellness from './backgroundWellness.png';

const AIWellness = () => {
    const backgroundStyle = {
        backgroundImage: `url(${backgroundWellness})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        height: '100vh',
    };

    const [flightData, setFlightData] = useState({
        departure_date: '2024-11-17',
        departure_time: '6:00 AM',
        arrival_date: '2024-11-17',
        arrival_time: '4:00 PM',
    });

    const [inData, setInData] = useState({
        flight_duration: '10',
        preferences: "Vegan",
    });

    const [postData, setPostData] = useState({
        flight_duration: '10',
        arrival_time: '4:00 PM',
    });

    const [inFlightData, setInFlightData] = useState([]);
    const [postFlightData, setPostFlightData] = useState([]);
    const [formData, setFormData] = useState({
        lastName: '',
        confirmationNum: '',
    });

    const [isFormSubmitted, setIsFormSubmitted] = useState(false);
    const [submittedData, setSubmittedData] = useState(null);
    const [activeSection, setActiveSection] = useState(null);
    const [preFlightData, setPreFlightData] = useState([]);

    // Fetch the wellness plan data when the form is submitted
    const handleFormSubmit = (e) => {
        e.preventDefault();
        setSubmittedData(formData);
        setIsFormSubmitted(true);
        fetchPreFlightData(); // Fetch data for Pre-Flight
    };

    // Fetch pre-flight data from the API
    const fetchPreFlightData = async () => {
        try {
            const response = await axios.post('http://localhost:5000/pre_flight/plan', flightData);
            setPreFlightData(response.data.plan || []); // Handle empty or missing data gracefully
        } catch (error) {
            console.error("Error fetching pre-flight data:", error);
        }
    };

    // Fetch in-flight data from the API
    const fetchInFlightData = async () => {
        try {
            const response = await axios.post('http://localhost:5000/in_flight/recommendations', inData);
            
            setInFlightData(response.data.plan || []); // Handle empty or missing data gracefully
        } catch (error) {
            console.error("Error fetching in-flight data:", error);
        }
    };

    // Fetch post-flight data from the API
    const fetchPostFlightData = async () => {
        try {
            const response = await axios.post('http://localhost:5000/post_flight/recovery', postData);
            console.log(response.data)
            setPostFlightData(response.data.plan || []); // Handle empty or missing data gracefully
        } catch (error) {
            console.error("Error fetching post-flight data:", error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleReset = () => {
        setFormData({
            lastName: '',
            confirmationNum: '',
        });
        setIsFormSubmitted(false);
    };

    const handleSectionChange = (section) => {
        setActiveSection(section);
        // Fetch data based on the selected section
        if (section === 'InFlight' && inFlightData.length === 0) {
            fetchInFlightData();
        } else if (section === 'PostFlight' && postFlightData.length === 0) {
            fetchPostFlightData();
        }
    };

    return (
        <div style={backgroundStyle}>
            {!isFormSubmitted ? (
                <div className="row-form">
                    <label className="zeta">
                        Passenger last name
                        <span> : </span>
                        <input
                            type="text"
                            name="lastName"
                            onChange={handleInputChange}
                            value={formData.lastName}
                            maxLength="30"
                        />
                    </label>
                    <label className="zeta" style={{ paddingLeft: '10px' }}>
                        Confirmation Number
                        <span> : </span>
                        <input
                            type="text"
                            name="confirmationNum"
                            onChange={handleInputChange}
                            value={formData.confirmationNum}
                            maxLength="30"
                        />
                    </label>
                    <button type="submit" className="submit-button" onClick={handleFormSubmit}>
                        Submit
                    </button>
                </div>
            ) : (
                <div className="row-form main container">
                    <aside className="sidebar">
                        <div className="sidebarHeading">
                            <div className='relative'>
                            <h2>Welcome!</h2>
                            <p>Thank you for being a loyal FlyFit member</p>
                            </div>
                        </div>
                        <div style={{ backgroundColor: 'white' }}>
                            <div className="trip-info">
                                <p><strong>Confirmation code:</strong> {submittedData?.confirmationNum}</p>
                                <p><strong>Trip name:</strong> BTR/CLT</p>
                            </div>
                            <div className="change-seats-container">
                                <button className="change-seats-button" onClick={() => handleSectionChange('PreFlight')}>
                                    Pre-Flight
                                </button>
                                <button className="change-seats-button" onClick={() => handleSectionChange('InFlight')}>
                                    In-Flight
                                </button>
                                <button className="change-seats-button" onClick={() => handleSectionChange('PostFlight')}>
                                    Post-Flight
                                </button>
                                <button className="change-seats-button" onClick={handleReset}>
                                    Change Trip
                                </button>
                            </div>
                        </div>
                    </aside>
                    <main className="main-content">
                        {activeSection === 'PreFlight' && preFlightData.length > 0 && (
                            <section className="PreFlight">
                                <h2>Pre-Flight Wellness Plan</h2>
                                {preFlightData.map((item, index) => (
                                    <div key={index}>
                                        <h3>{item.title}</h3>
                                        <ul>
                                            {item.recommendations.map((recommendation, i) => (
                                                <li key={i}>{recommendation}</li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </section>
                        )}

                        {activeSection === 'InFlight' && inFlightData.length > 0 && (
                            <section className="InFlight">
                                <h2>In-Flight Wellness Recommendations</h2>
                                {inFlightData.map((item, index) => (
                                    <div key={index}>
                                        <h3>{item.title}</h3>
                                        <ul>
                                            {item.details.map((detail, subIndex) => (
                                                <li key={subIndex}>{detail}</li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </section>
                        )}

                        {activeSection === 'PostFlight' && postFlightData.length > 0 && (
                            <section className="PostFlight">
                                <h2>Post-Flight Recovery</h2>
                                {postFlightData.map((item, index) => (
                                    <div key={index}>
                                        <h3>{item.title}</h3>
                                        <ul>
                                            {item.details.map((detail, subIndex) => (
                                                <li key={subIndex}>{detail}</li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </section>
                        )}
                    </main>
                </div>
            )}
        </div>
    );
};

export default AIWellness;
