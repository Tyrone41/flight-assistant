import React, { useState } from 'react';
import backgroundWellness from './backgroundWellness.png';

const AIWellness = () => {
    const backgroundStyle = {
        backgroundImage: `url(${backgroundWellness})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        height: '100vh',
    };

    const [formData, setFormData] = useState({
        lastName: '',
        confirmationNum: '',
    });

    const handleReset = () => {
        setFormData({
            lastName: '',
            confirmationNum: '',
        });
        setIsFormSubmitted(false);
    };

    const [isFormSubmitted, setIsFormSubmitted] = useState(false);

    const handleFormSubmit = () => {
        setSubmittedData(formData);
        setIsFormSubmitted(true); // Show the rest of the content upon form submission
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value }); // Update form data dynamically
    };

    const [submittedData, setSubmittedData] = useState(null); // State to store submitted info


    const [activeSection, setActiveSection] = useState('PreFlight'); // State to track the visible section

    const handleSectionChange = (section) => {
        setActiveSection(section); // Update the active section
    };

    return (
        <div style={backgroundStyle}>
            {!isFormSubmitted ? ( // Show only the form when not submitted
                <div class="row-form" style={{ fontFamily: 'font-family: Arial,sans-serif' }}>
                    <label class="zeta">
                        Passenger last name
                        <span> : </span>
                        <input type="text" name="lastName" value={formData.lastName}
                            onChange={handleInputChange} maxlength="30" />
                    </label>
                    <label class="zeta" style={{ paddingLeft: '10px' }}>
                        Confirmation Number
                        <span> : </span>
                        <input type="text" name="confirmationNum" value={formData.confirmationNum}
                            onChange={handleInputChange} maxlength="30" />
                    </label>
                    <button
                        type="submit"
                        className="submit-button" onClick={handleFormSubmit}>                           
                        Submit
                    </button>
                </div>
            ) : ( // Show the rest of the content when the form is submitted
                <div class=" row-form main container">
                    <aside class="sidebar">
                        <div class="sidebarHeading">
                            <span style={{ position: 'relative', top: '20px', left: '20px' }}>
                                <h2>Welcome!</h2>
                                <p>Thank you for being a loyal FlyFit<br></br> member</p>
                            </span>
                        </div>
                        <div style={{ backgroundColor: 'white' }}>
                            <div class="trip-info">
                                <span style={{ position: 'relative', top: '20px', left: '20px' }}>
                                    <p><strong>Confirmation code:</strong> FUXAXE</p>
                                    <p><strong>Trip name:</strong> BTR/CLT</p>
                                    <p><strong>Departs:</strong> September 25, 2024</p>
                                    <p><strong>Arrives:</strong> </p>
                                    <br></br>
                                </span>
                            </div>
                            {/* <div class="border">

                    <button class="btn2">Pre-Flight</button>
                    <button class="btn2">In-Flight</button>
                    <button class="btn2">Post-Flight</button>
                    <button class="btn">Change trip</button>

                    </div> */}

                            <div class="change-seats-container">
                                <button className="change-seats-button" onClick={() => handleSectionChange('PreFlight')}>
                                    Pre-Flight
                                </button><br />
                                <button className="change-seats-button" onClick={() => handleSectionChange('InFlight')}>
                                    In-Flight
                                </button><br />
                                <button className="change-seats-button" onClick={() => handleSectionChange('PostFlight')}>
                                    Post-Flight
                                </button><br />
                                <button className="change-seats-button" id="ChangeTrip" onClick={handleReset}>
                                    Change Trip
                                </button>
                            </div>
                        </div>
                    </aside>

                    <main className="main-content">
                        {activeSection === 'PreFlight' && (
                            <section className="PreFlight">
                                <h2>Pre-Flight</h2>
                                <p><strong>Thursday, November 14, 2024</strong></p>
                                <p>Baton Rouge, LA to Charlotte, NC</p>
                                <p>Nonstop · Travel time: <strong>2h 01m</strong></p>

                                <div className="flight-info">
                                    <div className="departure">
                                        <p><strong>Departs:</strong> BTR</p>
                                        <p>1:39 PM</p>
                                        <p>Baton Rouge, LA</p>
                                    </div>
                                    <div className="arrival">
                                        <p><strong>Arrives:</strong> CLT</p>
                                        <p>4:42 PM</p>
                                        <p>Charlotte, NC</p>
                                    </div>
                                </div>

                                <p><strong>Flight:</strong> AA 5131 · Economy</p>

                                <div className="details">
                                    <p><strong>Seats:</strong> 18A, 18C, 19A, 19C</p>
                                    <p><strong>Gate:</strong> B1</p>
                                </div>
                            </section>
                        )}

                        {activeSection === 'InFlight' && (
                            <section className="InFlight">
                                <h2>In-Flight Services</h2>
                                <p><strong>Thursday, November 14, 2024</strong></p>
                                <p>Baton Rouge, LA to Charlotte, NC</p>
                                <p>Nonstop · Travel time: <strong>2h 01m</strong></p>
                                <p>Enjoy our complimentary snacks and WiFi!</p>
                            </section>
                        )}

                        {activeSection === 'PostFlight' && (
                            <section className="PostFlight">
                                <h2>Post-Flight</h2>
                                <p><strong>Thursday, November 14, 2024</strong></p>
                                <p>Baton Rouge, LA to Charlotte, NC</p>
                                <p>Thank you for flying with us. We hope to see you again soon!</p>
                            </section>
                        )}
                    </main>
                </div>
            )}
        </div>
    );
};

export default AIWellness;
