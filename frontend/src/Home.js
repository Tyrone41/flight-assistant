import React from 'react';
import { Link } from 'react-router-dom';
import backgroundHome from './backgroundHome.png';

const Home = () => {
    const backgroundStyle = {
        backgroundImage: `url(${backgroundHome})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        height: '100vh',
    };

    return (
        <div style={backgroundStyle}>
            <div id="mySidenav" className="sidenav">
                <Link to="/ai-wellness">AI Wellness</Link>
                <Link to="/ai-travel-assistance">AI Travel Assistance</Link>
            </div>
        </div>
    );
};

export default Home;
