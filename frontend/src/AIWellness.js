import React from 'react';
import backgroundWellness from './backgroundWellness.png';

const AIWellness = () => {
    const backgroundStyle = {
        backgroundImage: `url(${backgroundWellness})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        height: '100vh',
    };

    return (
        <div style={backgroundStyle}>
            <div class="row-form" style={{ fontFamily: 'font-family: Arial,sans-serif' }}>
                <label class="zeta">
                    Passenger last name
                    <span> : </span>
                    <input type="text" name="lastName" maxlength="30" />
                </label>
                <label class="zeta" style={{ paddingLeft: '10px' }}>
                    Confirmation Number
                    <span> : </span>
                    <input type="text" name="confirmationNum" maxlength="30" />
                </label>
                <button
                    type="submit"
                    className="submit-button">
                    Submit
                </button>
            </div>
            <div class="main container">
                <aside class="sidebar">
                    <div class="sidebarHeading">
                        <span style={{position: 'relative', top:'20px', left:'20px'}}>
                        <h2>Welcome!</h2>
                        <p>Thank you for being loyal FlyFit<br></br> members</p>
                        </span>
                    </div>
                    <div style={{backgroundColor: 'white'}}>
                    <div class="trip-info">
                    <span style={{position: 'relative', top:'20px', left:'20px'}}>
                        <p><strong>Confirmation code:</strong> FUXAXE</p>
                        <p><strong>Trip name:</strong> BTR/CLT</p>
                        <p><strong>Issued:</strong> September 25, 2024</p>
                        <p><strong>Status:</strong> Ticketed</p>
                        </span>
                    </div>
                    <div>
                    <button class="btn">Change trip</button>
                    </div>
                    <ul class="sidebar-options">
                        <li>Get trip notifications</li>
                        <li>Change seats</li>
                        <li>Cancel trip</li>
                        <li>Add bags</li>
                        <li>Track your bags</li>
                        <li>Cost summary</li>
                    </ul>
                    </div>
                </aside>

                <main class="main-content">
                    <div class="check-in">
                        <p><strong>Check-in:</strong> Available 24 hours before departure</p>
                        <p>Time until check-in: <strong>15h 48m</strong></p>
                    </div>

                    <section class="flight-details">
                        <h2>Depart</h2>
                        <p><strong>Thursday, November 14, 2024</strong></p>
                        <p>Baton Rouge, LA to Charlotte, NC</p>
                        <p>Nonstop · Travel time: <strong>2h 01m</strong></p>

                        <div class="flight-info">
                            <div class="departure">
                                <p><strong>Departs:</strong> BTR</p>
                                <p>1:39 PM</p>
                                <p>Baton Rouge, LA</p>
                            </div>
                            <div class="arrival">
                                <p><strong>Arrives:</strong> CLT</p>
                                <p>4:42 PM</p>
                                <p>Charlotte, NC</p>
                            </div>
                        </div>

                        <p><strong>Flight:</strong> AA 5131 · Economy</p>

                        <div class="details">
                            <p><strong>Seats:</strong> 18A, 18C, 19A, 19C</p>
                            <p><strong>Gate:</strong> B1</p>
                        </div>
                    </section>
                </main>
            </div>
        </div>
    );
};

export default AIWellness;
