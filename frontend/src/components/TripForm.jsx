// /frontend/src/components/TripForm.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TripForm = ({ trip, onTripUpdated }) => {
  const [name, setName] = useState('');
  const [destination, setDestination] = useState('');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [price, setPrice] = useState('');
  const [detailedItinerary, setDetailedItinerary] = useState('');

  useEffect(() => {
    if (trip) {
      setName(trip.name);
      setDestination(trip.destination);
      setFrom(trip.from);
      setTo(trip.to);
      setPrice(trip.price);
      setDetailedItinerary(trip.detailedItinerary);
    } else {
      // Reset the form when there's no trip to edit
      setName('');
      setDestination('');
      setFrom('');
      setTo('');
      setPrice('');
      setDetailedItinerary('');
    }
  }, [trip]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (trip) {
      // Update existing trip
      await axios.put(`http://localhost:5000/api/trips/${trip._id}`, {
        name,
        destination,
        from,
        to,
        price,
        detailedItinerary,
      });
    } else {
      // Add new trip
      await axios.post('http://localhost:5000/api/trips', {
        name,
        destination,
        from,
        to,
        price,
        detailedItinerary,
      });
    }
    onTripUpdated(); // Call the parent function to refresh trips
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{trip ? 'Edit Trip' : 'Add Trip'}</h2>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Trip Name"
        required
      />
      <input
        type="text"
        value={destination}
        onChange={(e) => setDestination(e.target.value)}
        placeholder="Destination"
        required
      />
      <input
        type="text"
        value={from}
        onChange={(e) => setFrom(e.target.value)}
        placeholder="From"
        required
      />
      <input
        type="text"
        value={to}
        onChange={(e) => setTo(e.target.value)}
        placeholder="To"
        required
      />
      <input
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="Price"
        required
      />
      <textarea
        value={detailedItinerary}
        onChange={(e) => setDetailedItinerary(e.target.value)}
        placeholder="Detailed Itinerary"
        required
      />
      <button type="submit">{trip ? 'Update' : 'Submit'}</button>
    </form>
  );
};

export default TripForm;
