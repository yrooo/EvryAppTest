import React, { useState } from 'react';
import { TonConnectUIProvider, TonConnectButton } from '@tonconnect/ui-react';
import { Calendar, Home, PlusCircle} from 'lucide-react';
import "./App.css"
import EventDiscoveryContent from './components/EventDiscoveryContent';
import EventCreationContent from './components/EventCreationContent';
import EventList from './components/EventList';

function App() {
  const [walletAddress, setWalletAddress] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('eventlist');

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

function BottomNavigation({ activeTab, setActiveTab }) {
  const navItems = [
    { 
      id: 'events', 
      icon: Calendar, 
      label: 'Events',
    },
    { 
      id: 'eventlist', 
      icon: Home, 
      label: 'My Tickets',
      isPrimary: true,
    },
    { 
      id: 'create', 
      icon: PlusCircle, 
      label: 'Create',
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-base-100 border-t border-base-200 px-2 py-1 z-50">
      <div className="max-w-lg mx-auto">
        <div className="flex justify-between items-center">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center justify-center px-3 py-2 relative ${
                activeTab === item.id 
                  ? 'text-primary' 
                  : 'text-base-content/70 hover:text-base-content/90'
              }`}
            >
              {/* Notification Badge */}
              {item.notification > 0 && (
                <div className="absolute -top-1 -right-1">
                  <div className="bg-error text-error-content text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {item.notification}
                  </div>
                </div>
              )}
              
              {/* Icon with special styling for create button */}
              <div className={`${
                item.isPrimary 
                  ? 'bg-primary rounded-full p-3 -mt-8 shadow-lg hover:shadow-xl transition-shadow' 
                  : ''
              }`}>
                <item.icon 
                  className={`${
                    item.isPrimary 
                      ? 'text-primary-content w-6 h-6' 
                      : `w-5 h-5 ${activeTab === item.id ? 'text-primary' : ''}`
                  }`}
                />
              </div>
              
              {/* Label */}
              <span className={`text-xs mt-1 ${
                item.isPrimary ? 'mt-2' : ''
              }`}>
                {item.label}
              </span>
            </button>
          ))}
        </div>
      </div>
      
      {/* Safe area spacing for iOS */}
      <div className="h-safe-area-inset-bottom bg-base-100" />
    </div>
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

export default App;