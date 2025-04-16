// import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import LandingPage from './pages/LandingPage';
import EntertainersPage from './pages/EntertainersPage';
import EntertainerDetailsPage from './pages/EntertainerDetailsPage';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/entertainers" element={<EntertainersPage />} />
          <Route path="/entertainer/:id" element={<EntertainerDetailsPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
