import React, { useState } from 'react';
import { TonConnectUIProvider, TonConnectButton } from '@tonconnect/ui-react';
import "./App.css"
import EventDiscoveryContent from './components/EventDiscoveryContent';
import EventCreationContent from './components/EventCreationContent';
import EventList from './components/EventList';

function App() {
  const [walletAddress, setWalletAddress] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('home');

  const handleConnect = (address) => {
    setWalletAddress(address);
  };

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
  <>
    <div className="flex">
      <Navbar 
        walletAddress={walletAddress} 
        handleConnect={handleConnect} 
        isMenuOpen={isMenuOpen} 
        handleMenuToggle={handleMenuToggle} 
      />
    </div>
    <div className="app-container grid grid-rows-[auto,1fr,auto] min-h-screen">
      <MainContent activeTab={activeTab} />
      <BottomNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  </>
  );
}

function Navbar({ walletAddress, handleConnect, isMenuOpen, handleMenuToggle }) {
  return (
    <div className="navbar">
      <div className="flex-1">
        <img src="./evry-app-logo3.png" alt="logo" className='btn btn-link no-animation flex px-2' />
      </div>
      <TonConnectUIProvider manifestUrl="https://coral-cautious-hoverfly-673.mypinata.cloud/ipfs/QmYgTbUpnXH9J3ANMrTARMQt5uMEAMZfuQ6te88CU74LJt">
        <div className="flex justify-between items-center">
          <TonConnectButton
            className=""
            onConnect={handleConnect}
          />
          {walletAddress && (
            <WalletMenu 
              walletAddress={walletAddress} 
              isMenuOpen={isMenuOpen} 
              handleMenuToggle={handleMenuToggle} 
            />
          )}
        </div>
      </TonConnectUIProvider>
    </div>
  );
}

function WalletMenu({ walletAddress, isMenuOpen, handleMenuToggle }) {
  return (
    <div className="relative">
      <button onClick={handleMenuToggle} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded">
        {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
      </button>
      {isMenuOpen && (
        <div className="absolute right-0 mt-2 py-2 px-4 bg-white shadow-md rounded">
          <a href="#" className="block px-4 py-2 hover:bg-gray-100">My Profile</a>
          <a href="#" className="block px-4 py-2 hover:bg-gray-100">Log Out</a>
        </div>
      )}
    </div>
  );
}

function MainContent({ activeTab }) {
  return (
    <div className="main-content flex-grow p-4 overflow-y-auto">
      {activeTab === 'events' && <EventDiscoveryContent />}
      {activeTab === 'eventlist' && <EventList />}
      {activeTab === 'create' && <EventCreationContent />}
    </div>
  );
}

function HomeContent() {
  return (
    <div>
      <h1>Upcoming Events</h1>
      <EventList />
    </div>
  );
}

function BottomNavigation({ activeTab, setActiveTab }) {
  const navItems = [
    { id: 'events', icon: EventsIcon, label: 'Events' },
    { id: 'eventlist', icon: HomeIcon, label: 'Home' },
    { id: 'create', icon: CreateIcon, label: 'Create' },
  ];

  return (
    <div className="btm-nav btm-nav-sm bg-base-100">
      {navItems.map((item) => (
        <button
          key={item.id}
          className={`flex flex-col items-center justify-center ${
            activeTab === item.id 
              ? 'active text-primary' 
              : 'text-white opacity-50 hover:opacity-75'
          }`}
          onClick={() => setActiveTab(item.id)}
        >
          <item.icon className={activeTab === item.id ? 'text-primary' : 'text-white'} />
          <span className="btm-nav-label">{item.label}</span>
        </button>
      ))}
    </div>
  );
}

function HomeIcon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  );
}

function EventsIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 5c7.18 0 13 5.82 13 13M6 11a7 7 0 017 7m-6 0a1 1 0 11-2 0 1 1 0 012 0z" />
    </svg>
  )
}

function CreateIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
  </svg>
  )
}

export default App;