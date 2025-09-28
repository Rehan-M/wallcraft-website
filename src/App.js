import React, { useState, useEffect } from 'react';
import { Router } from './components/Common/Router';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import GalleryPage from './pages/GalleryPage';
import ContactPage from './pages/ContactPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');

  // Listen for navigation events
  useEffect(() => {
    const handleNavigate = (e) => {
      setCurrentPage(e.detail.page);
      window.scrollTo(0, 0);
    };
    
    window.addEventListener('navigate', handleNavigate);
    return () => window.removeEventListener('navigate', handleNavigate);
  }, []);

  // Handle browser back/forward
  useEffect(() => {
    const handlePopState = () => {
      const hash = window.location.hash.slice(1) || 'home';
      setCurrentPage(hash);
    };
    
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Update URL hash when page changes
  useEffect(() => {
    window.location.hash = currentPage;
  }, [currentPage]);

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header currentPage={currentPage} />
        
        {/* Page Content */}
        <div className="w-full">
          {currentPage === 'home' && <HomePage />}
          {currentPage === 'about' && <AboutPage />}
          {currentPage === 'services' && <ServicesPage />}
          {currentPage === 'gallery' && <GalleryPage category="all" />}
          {currentPage === 'gallery-fluted' && <GalleryPage category="fluted" />}
          {currentPage === 'gallery-pvc' && <GalleryPage category="pvc" />}
          {currentPage === 'gallery-wainscoting' && <GalleryPage category="wainscoting" />}
          {currentPage === 'contact' && <ContactPage />}
        </div>

        <Footer />
      </div>
    </Router>
  );
}