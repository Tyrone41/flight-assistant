import React from 'react';
import backgroundTravel from './backgroundWellness.png';

const AITravelAssistance = () => {
    const backgroundStyle = {
        backgroundImage: `url(${backgroundTravel})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        height: '100vh',
    };

    return (
        <div style={backgroundStyle}>
            {/* Content for AI Travel Assistance */}
        </div>
    );
};

export default AITravelAssistance;
