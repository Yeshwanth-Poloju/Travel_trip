// /frontend/src/components/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import TripForm from './TripForm';
import axios from 'axios';
import './Dashboard.css'; // Import the CSS file

const Dashboard = () => {
  const [trips, setTrips] = useState([]);
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [view, setView] = useState('viewTrips'); // State to toggle between views

  const fetchTrips = async () => {
    const response = await axios.get('http://localhost:5000/api/trips');
    setTrips(response.data);
  };

  useEffect(() => {
    fetchTrips();
  }, []);

  const handleEdit = (trip) => {
    setSelectedTrip(trip);
    setView('addTrip'); // Switch to add/edit view when editing a trip
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/trips/${id}`);
    fetchTrips();
  };

  const handleTripUpdated = () => {
    setSelectedTrip(null);
    fetchTrips();
    setView('viewTrips'); // Go back to viewTrips after submission
  };

  return (
    <div className="dashboard">
      <h2>Dashboard</h2>
      
      {/* Buttons to toggle between Add Trip and View Trips */}
      <div className="dashboard-buttons">
        <button 
          className={`toggle-button ${view === 'viewTrips' ? 'active' : ''}`} 
          onClick={() => setView('viewTrips')}
        >
          View Trips
        </button>
        <button 
          className={`toggle-button ${view === 'addTrip' ? 'active' : ''}`} 
          onClick={() => { 
            setSelectedTrip(null); 
            setView('addTrip');
          }}
        >
          Add Trip
        </button>
      </div>

      {/* Conditionally render TripForm or the list of trips */}
      {view === 'addTrip' ? (
        <div className="trip-form">
          <TripForm trip={selectedTrip} onTripUpdated={handleTripUpdated} />
        </div>
      ) : (
        <div className="trip-list-container">
          <h3>View Trips</h3>
          <ul className="trip-list">
            {trips.map((trip) => (
              <li key={trip._id} className="trip-item">
                {trip.name} - {trip.destination} - {trip.from} - {trip.to} - {trip.price}
                <div>
                  <button className="edit-button" onClick={() => handleEdit(trip)}>Edit</button>
                </div>
                <div>
                  <button className="delete-button" onClick={() => handleDelete(trip._id)}>Delete</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
