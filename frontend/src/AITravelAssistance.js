import React, { useState } from 'react';
import backgroundTravel from './backgroundWellness.png';
import { Form, Link } from 'react-router-dom';
import axios from 'axios';
import response from './api.json';

const AITravelAssistance = () => {
    const backgroundStyle = {
        backgroundImage: `url(${backgroundTravel})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        height: '100vh',
    };

    const [formData, setFormData] = useState({
monthly_income: "",
  fixed_expenses: "",
  savings_allocation: "",
  preferred_destination: "",
  duration_of_stay: "",
  current_location: ""
    });

    const [submittedData, setSubmittedData] = useState(null);
    const [budgetData, setBudgetData] = useState(null); // Updated state for budget data
    const [travelPlan, setTravelPlan] = useState(null); 
    const [hotelData, setHotelData] = useState(null); 
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalData, setModalData] = useState({});
    const [recommendation, setRecommendation] = useState(null);

    const handleFormSubmit = async () => {
        setSubmittedData(formData);
        const sendData = {
            monthly_income: parseInt(formData.monthly_income),
    fixed_expenses: parseInt(formData.fixed_expenses),
    savings_allocation: parseInt(formData.savings_allocation),
    preferred_destination: formData.preferred_destination,
    duration_of_stay: parseInt(formData.duration_of_stay),
    current_location: formData.current_location
        }
        console.log(response)
        try {
            const respons = await axios.post('http://localhost:5000/budget_planning/plan', sendData);
            setBudgetData(response.budget_plan.budget_plan);
            setTravelPlan(response.budget_plan.travel_plan);
            setHotelData(response.budget_plan.hotel);
            setRecommendation(response.budget_plan.recommendations);
             setIsFormSubmitted(true);
        } catch (error) {
            console.error("Error fetching budget data:", error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleReset = () => {
        setFormData({
            monthly_income: "",
            fixed_expenses: "",
            savings_allocation: "",
            preferred_destination: "",
            duration_of_stay: "",
            current_location: ""
        });
        setIsFormSubmitted(false);
        setBudgetData(null);
    };

    const handleViewDetails = (destination, cost) => {
        setModalData({ destination, cost });
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    return (
        <div style={backgroundStyle}>
            <div className="row-form" style={{ fontFamily: 'Arial, sans-serif' }}>
            <h style={{fontSize : '20px',marginLeft : '500px',marginBottom :  '0px', color: '#0078d2'}}>AI Travel Assistance</h>
                {!isFormSubmitted ? (
                    <div className='FormClass' style={{ marginLeft: '25px' , marginTop:'20px'}}>
                        <label className="zeta">
                            Monthly Income:
                            <input
                                type="text"
                                style={{ width: '10%', marginLeft: '5px' }}
                                name="monthly_income"
                                value={formData.monthly_income}
                                onChange={handleInputChange}
                            />
                        </label>
                        <label className="zeta" style={{ marginLeft: '25px' }}>
                            Monthly Expense:
                            <input
                                type="text"
                                style={{ width: '10%', marginLeft: '5px' }}
                                name="fixed_expenses"
                                value={formData.fixed_expenses}
                                onChange={handleInputChange}
                            />
                        </label>
                        <label className="zeta" style={{ marginLeft: '25px' }}>
                            Monthly Savings Allocation:
                            <input
                                type="text"
                                style={{ width: '10%' }}
                                name="savings_allocation"
                                value={formData.savings_allocation}
                                onChange={handleInputChange}
                            />
                        </label>
                        <br /><br />
                        <label className="zeta">
                            Current Location:
                            <input
                                type="text"
                                style={{ width: '10%' }}
                                name="current_location"
                                value={formData.current_location}
                                onChange={handleInputChange}
                            />
                        </label>
                        <label className="zeta" style={{ marginLeft: '25px' }}>
                            Destination Preference:
                            <input
                                type="text"
                                style={{ width: '10%' }}
                                name="preferred_destination"
                                value={formData.preferred_destination}
                                onChange={handleInputChange}
                            />
                        </label>
                        <label className="zeta" style={{ marginLeft: '25px' }}>
                            No. of Days:
                            <input
                                type="text"
                                style={{ width: '10%' }}
                                name="duration_of_stay"
                                value={formData.duration_of_stay}
                                onChange={handleInputChange}
                            />
                        </label>
                        <button
                            type="submit"
                            style={{ marginLeft: '25px' }}
                            className="submit-button"
                            onClick={handleFormSubmit}
                        >
                            Submit
                        </button>
                    </div>
                ) : (
                    <div className="main container">
                        <aside className="sidebar">
                        <div className="sidebarHeading">
                            <div className='relative'>
                            <h2>Welcome!</h2>
                            <p>Thank you for being a loyal FlyFit<br/> member</p>
                            </div>
                        </div>
                            <div style={{ backgroundColor: 'white' }}>
                                <div className="trip-info">
                                    <p style={{marginLeft:'25px'}}><strong>Monthly Income:</strong> ${formData.monthly_income || 'N/A'}</p>
                                    <p style={{marginLeft:'25px'}}><strong>Expenses:</strong> ${formData.fixed_expenses || 'N/A'}</p>
                                    <p style={{marginLeft:'25px'}}><strong>Savings :</strong> {formData.savings_allocation || 'N/A'}</p>
                                    <p style={{marginLeft:'25px'}}><strong>Preferred Destination:</strong> {formData.preferred_destination}</p>
                                    <p style={{marginLeft:'25px'}}><strong>No. of Days:</strong> {formData.duration_of_stay}</p>
                                    <p style={{marginLeft:'25px'}}><strong>Current Location</strong> {formData.current_location}</p>
                                </div>
                                <button className="change-seats-button" onClick={handleReset}>
                                    Change Trip
                                </button>
                            </div>
                        </aside>
                        <main className="main-content">
                            <h2>Preferred Travel Plan</h2>
                                    <p><strong>Destination:</strong> {travelPlan.destination || 'N/A'}</p>
                                    <p><strong>In Or Out of Budget :</strong> {travelPlan.logic || 'N/A'}</p>
                                    <p><strong>Reason:</strong> {travelPlan.reason}</p>
                                    <p><strong>Airline:</strong> {travelPlan.details.flight.airline}</p>
                                    <p><strong>Flight Cost</strong> {travelPlan.details.flight.price}</p>
                                    <p><strong>Hotel Name:</strong> {travelPlan.details.hotel.name}</p>
                                    <p><strong>Location</strong> {travelPlan.details.hotel.location}</p>
                                    <p><strong>Nightly Rate:</strong> {travelPlan.details.hotel.nightly_rate}</p>
                                    <p><strong>Total Cost</strong> {travelPlan.details.hotel.total_cost}</p>        
                                    <p><strong>Total Trip Cost</strong> {travelPlan.details.total_trip_cost}</p>                                   
                           
                            <h2>Alternative Travel Recommendations</h2>
                            {recommendation ? (
        <table className="recommendations-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
                <tr>
                    <th style={{ border: '1px solid #ccc', padding: '8px' }}>Destination</th>
                    <th style={{ border: '1px solid #ccc', padding: '8px' }}>Airline </th>
                    <th style={{ border: '1px solid #ccc', padding: '8px' }}>Flight Cost</th>
                    <th style={{ border: '1px solid #ccc', padding: '8px' }}>Hotel Name</th>
                    <th style={{ border: '1px solid #ccc', padding: '8px' }}>Hotel Location</th>
                    <th style={{ border: '1px solid #ccc', padding: '8px' }}>Nightly Rate</th>
                    <th style={{ border: '1px solid #ccc', padding: '8px' }}>Total Hotel Cost</th>
                </tr>
            </thead>
            <tbody>
                {recommendation.details.map((detail, index) => (
                    <tr key={index}>
                        <td style={{ border: '1px solid #ccc', padding: '8px' }}>{detail.destination}</td>
                        <td style={{ border: '1px solid #ccc', padding: '8px' }}>{detail.flight.airline}</td>
                        <td style={{ border: '1px solid #ccc', padding: '8px' }}>{detail.flight.price}</td>
                        <td style={{ border: '1px solid #ccc', padding: '8px' }}>{detail.hotel.name}</td>
                        <td style={{ border: '1px solid #ccc', padding: '8px' }}>{detail.hotel.location}</td>
                        <td style={{ border: '1px solid #ccc', padding: '8px' }}>{detail.hotel.nightly_rate}</td>
                        <td style={{ border: '1px solid #ccc', padding: '8px' }}>{detail.hotel.total_cost}</td>


                    </tr>
                ))}
            </tbody>
        </table>
    ) : (
        <p>No alternative travel recommendations are available at the moment.</p>
    )}
                        </main>
                    </div>
                )}
            </div>
            {modalVisible && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <span className="close-button" onClick={closeModal}>
                            &times;
                        </span>
                        <h3>Destination Details</h3>
                        <p><strong>Destination:</strong> {modalData.destination}</p>
                        <p><strong>Estimated Cost:</strong> {modalData.cost}</p>
                        <p><strong>Details:</strong> Includes flight, hotel, and activities.</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AITravelAssistance;
