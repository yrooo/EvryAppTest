import React, { useState, useEffect } from 'react';

function EventDiscoveryContent() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // TODO: Fetch events from backend or smart contract
    const mockEvents = [
      { id: 1, name: "TON Blockchain Conference", date: "2023-07-15", location: "New York", price: "50 TON" },
      { id: 2, name: "Web3 Hackathon", date: "2023-08-01", location: "San Francisco", price: "30 TON" },
      { id: 3, name: "Crypto Art Exhibition", date: "2023-07-22", location: "London", price: "25 TON" },
    ];
    setEvents(mockEvents);
  }, []);

  return (
    <div className="event-discovery">
      <h2 className="text-2xl font-bold mb-4">Discover Events</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {events.map(event => (
          <div key={event.id} className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">{event.name}</h2>
              <p>Date: {event.date}</p>
              <p>Location: {event.location}</p>
              <p>Price: {event.price}</p>
              <div className="card-actions justify-end">
                <button className="btn btn-primary">Buy Ticket</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EventDiscoveryContent;