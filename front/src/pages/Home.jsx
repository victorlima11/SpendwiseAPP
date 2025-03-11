import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '/src/pages/components/Navbar';
import FeaturesSection from './components/FeaturesSection';
import HeroSection from './components/HeroSection';
import '/src/pages/components/styles/home.css'

function Home() {
  return (
    <div className="container">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
    </div>
  );
}

export default Home;
