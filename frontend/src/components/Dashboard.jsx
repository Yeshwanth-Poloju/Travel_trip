// /frontend/src/components/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import TripForm from './TripForm';
import axios from 'axios';
import './Dashboard.css'; // Import the CSS file

const Dashboard = () => {
  const [trips, setTrips] = useState([]);
  const [selectedTrip, setSelectedTrip] = useState(null);

  const fetchTrips = async () => {
    const response = await axios.get('http://localhost:5000/api/trips');
    setTrips(response.data);
  };

  useEffect(() => {
    fetchTrips();
  }, []);

  const handleEdit = (trip) => {
    setSelectedTrip(trip);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/trips/${id}`);
    fetchTrips();
  };

  const handleTripUpdated = () => {
    setSelectedTrip(null);
    fetchTrips();
  };

  return (
    <div className="dashboard"> {/* Apply the dashboard class */}
      <h2>Dashboard</h2>
      <div className="trip-form">
        <TripForm trip={selectedTrip} onTripUpdated={handleTripUpdated} />
      </div>
      <h3>View Trips</h3>
      <ul className="trip-list"> {/* Apply the trip-list class */}
        {trips.map((trip) => (
          <li key={trip._id} className="trip-item"> {/* Apply the trip-item class */}
            {trip.name} - {trip.destination} - {trip.from} - {trip.to}
            <div>
              <button className="edit-button" onClick={() => handleEdit(trip)}>Edit</button>
            </div>            <div>


              <button className="delete-button" onClick={() => handleDelete(trip._id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
