import React, { useState } from 'react';
import { TonConnectUIProvider, TonConnectButton } from '@tonconnect/ui-react';
import "./App.css"

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
    <div className="app-container flex flex-col min-h-screen">
      <Navbar 
        walletAddress={walletAddress} 
        handleConnect={handleConnect} 
        isMenuOpen={isMenuOpen} 
        handleMenuToggle={handleMenuToggle} 
      />
      <MainContent activeTab={activeTab} />
      <BottomNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
}

function Navbar({ walletAddress, handleConnect, isMenuOpen, handleMenuToggle }) {
  return (
    <div className="navbar">
      <div className="flex-1">
        <img src="./Evry-app-logo.png" alt="logo" className='btn btn-link no-animation px-4 py-1' />
      </div>
      <TonConnectUIProvider manifestUrl="https://coral-cautious-hoverfly-673.mypinata.cloud/ipfs/QmYgTbUpnXH9J3ANMrTARMQt5uMEAMZfuQ6te88CU74LJt">
        <div className="flex justify-between items-center">
          <TonConnectButton
            className=" "
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
    <div className="main-content flex-grow p-4">
      {activeTab === 'home' && <HomeContent />}
      {activeTab === 'info' && <InfoContent />}
      {activeTab === 'stats' && <StatsContent />}
    </div>
  );
}

function HomeContent() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Home</h2>
      <p className="mt-4">Welcome to the home page!</p>
    </div>
  );
}

function InfoContent() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Info</h2>
      <p>This is the info page. You can add more content here.</p>
    </div>
  );
}

function StatsContent() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Stats</h2>
      <p>Here you can display various statistics or charts.</p>
    </div>
  );
}

function BottomNavigation({ activeTab, setActiveTab }) {
  const navItems = [
    { id: 'home', icon: HomeIcon, label: 'Home' },
    { id: 'info', icon: InfoIcon, label: 'Info' },
    { id: 'stats', icon: StatsIcon, label: 'Stats' },
  ];

  return (
    <div className="btm-nav btm-nav-sm">
      {navItems.map((item) => (
        <button
          key={item.id}
          className={`flex flex-col items-center justify-center ${activeTab === item.id ? 'active' : ''}`}
          onClick={() => setActiveTab(item.id)}
        >
          <item.icon />
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

function InfoIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function StatsIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  );
}

export default App;