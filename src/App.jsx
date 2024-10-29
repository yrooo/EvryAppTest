import React, { useState } from 'react';
import { TonConnectUIProvider, TonConnectButton } from '@tonconnect/ui-react';

function App() {
  const [walletAddress, setWalletAddress] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleConnect = (address) => {
    setWalletAddress(address);
  };

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <div className="navbar">
        <div className="flex-1">
          <img src="./Evry-app-logo.png" alt="logo" className='btn btn-lg no-animation' />
        </div>
        <TonConnectUIProvider manifestUrl="https://coral-cautious-hoverfly-673.mypinata.cloud/ipfs/QmYgTbUpnXH9J3ANMrTARMQt5uMEAMZfuQ6te88CU74LJt">
          <div className="flex justify-between items-center">
            <TonConnectButton
              className="py-4 px-4"
              onConnect={handleConnect}
            />
            {walletAddress && (
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
            )}
          </div>
        </TonConnectUIProvider>
      </div>
      <button className="btn w-63 rounded-full">Button</button>
    </>
  );
}

export default App;