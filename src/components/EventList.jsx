// components/EventList.jsx
import React, { useState, useEffect } from 'react';

function EventList() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      const data = await eventService.getAllEvents();
      setEvents(data);
    } catch (error) {
      setError('Failed to load events');
      console.error('Error loading events:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-error shadow-lg max-w-md mx-auto mt-8">
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <span>{error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <EventCard key={event._id} event={event} />
        ))}
      </div>
    </div>
  );
}

function EventCard({ event }) {
  const { showToast } = useToast();

  const shareOnTelegram = () => {
    const eventUrl = `${window.location.origin}/event/${event._id}`;
    const text = encodeURIComponent(
      `🎉 ${event.name}\n` +
      `📅 ${event.date} at ${event.time}\n` +
      `📍 ${event.location}\n` +
      `🎟️ ${event.ticketPrice} TON\n\n` +
      `Get your tickets here: ${eventUrl}`
    );
    
    window.open(`https://t.me/share/url?url=${eventUrl}&text=${text}`, '_blank');
  };

  const copyEventLink = () => {
    const eventUrl = `${window.location.origin}/event/${event._id}`;
    navigator.clipboard.writeText(eventUrl);
    showToast('Link copied to clipboard!', 'success');
  };

  return (
    <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300">
      <figure className="relative h-48">
        <img 
          src={event.imageUrl} 
          alt={event.name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2">
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-circle btn-sm btn-ghost bg-base-100/50">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
            </label>
            <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
              <li><button onClick={shareOnTelegram}>Share on Telegram</button></li>
              <li><button onClick={copyEventLink}>Copy Link</button></li>
            </ul>
          </div>
        </div>
      </figure>
      <div className="card-body">
        <h2 className="card-title">{event.name}</h2>
        <p className="text-sm line-clamp-2">{event.description}</p>
        <div className="flex flex-wrap gap-2 my-2">
          <span className="badge badge-primary">{event.date}</span>
          <span className="badge badge-secondary">{event.time}</span>
          <span className="badge badge-accent">{event.ticketPrice} TON</span>
        </div>
        <div className="card-actions justify-between items-center mt-4">
          <span className="text-sm text-base-content/70">
            {event.totalTickets - event.soldTickets} tickets left
          </span>
          <Link 
            to={`/event/${event._id}`}
            className="btn btn-primary btn-sm"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}

export default EventList;