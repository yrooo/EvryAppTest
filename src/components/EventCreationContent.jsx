import React, { useState } from 'react';

function EventCreationContent() {
  const [eventData, setEventData] = useState({
    name: '',
    date: '',
    time: '',
    location: '',
    description: '',
    ticketPrice: '',
    totalTickets: '',
    coverImage: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEventData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setEventData(prev => ({
      ...prev,
      coverImage: file
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // TODO: Implement contract deployment and event creation logic
    console.log('Event Data:', eventData);
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">Create New Event</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Event Name</span>
          </label>
          <input
            type="text"
            name="name"
            value={eventData.name}
            onChange={handleInputChange}
            placeholder="Enter event name"
            className="input input-bordered w-full"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Date</span>
            </label>
            <input
              type="date"
              name="date"
              value={eventData.date}
              onChange={handleInputChange}
              className="input input-bordered"
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Time</span>
            </label>
            <input
              type="time"
              name="time"
              value={eventData.time}
              onChange={handleInputChange}
              className="input input-bordered"
              required
            />
          </div>
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Location</span>
          </label>
          <input
            type="text"
            name="location"
            value={eventData.location}
            onChange={handleInputChange}
            placeholder="Enter event location"
            className="input input-bordered"
            required
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Description</span>
          </label>
          <textarea
            name="description"
            value={eventData.description}
            onChange={handleInputChange}
            placeholder="Enter event description"
            className="textarea textarea-bordered h-24"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Ticket Price (TON)</span>
            </label>
            <input
              type="number"
              name="ticketPrice"
              value={eventData.ticketPrice}
              onChange={handleInputChange}
              placeholder="0.00"
              className="input input-bordered"
              required
              min="0"
              step="0.01"
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Total Tickets</span>
            </label>
            <input
              type="number"
              name="totalTickets"
              value={eventData.totalTickets}
              onChange={handleInputChange}
              placeholder="100"
              className="input input-bordered"
              required
              min="1"
            />
          </div>
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Cover Image</span>
          </label>
          <input
            type="file"
            onChange={handleImageUpload}
            accept="image/*"
            className="file-input file-input-bordered w-full"
          />
        </div>

        <div className="form-control mt-6">
          <button type="submit" className="btn btn-primary">
            Create Event
          </button>
        </div>
      </form>
    </div>
  );
}

export default EventCreationContent;