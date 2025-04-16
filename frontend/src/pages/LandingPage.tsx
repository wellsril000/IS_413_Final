import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../component/Navbar';

const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6 pt-24">
        <h1 className="text-5xl font-bold text-center text-gray-800 mb-6">
          Welcome to the Entertainment Agency
        </h1>
        <p className="text-lg text-gray-600 mb-8 text-center max-w-xl">
          Discover amazing talent, book entertainment, and create unforgettable
          experiences. Start exploring our offerings today!
        </p>

        <h6>Click here to see our entertainers!</h6>
        <button
          className="btn btn-info"
          style={{ cursor: 'pointer' }}
          onClick={() => navigate('/entertainers')}
        >
          Click me!
        </button>
      </div>
    </>
  );
};

export default LandingPage;
