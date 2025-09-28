import React, { useState, useEffect } from 'react';
import { ChevronDown, Menu, X, PaintBucket } from 'lucide-react';
import { Link } from '../Common/Router';

export default function Header({ currentPage }) {
  const [galleryDropdownOpen, setGalleryDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <Link to="home" className="flex items-center gap-2 cursor-pointer">
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-2 rounded-lg">
              <PaintBucket className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              WallCraft
            </span>
          </Link>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              to="home"
              className="px-4 py-2 text-lg hover:text-pink-600 transition-colors"
              style={{ 
                color: currentPage === 'home' ? '#db2777' : '#9333ea',
                fontWeight: '500',
                textDecoration: 'none'
              }}
            >
              HOME
            </Link>
            
            <Link
              to="about"
              className="px-4 py-2 text-lg hover:text-pink-600 transition-colors"
              style={{ 
                color: currentPage === 'about' ? '#db2777' : '#9333ea',
                fontWeight: '500',
                textDecoration: 'none'
              }}
            >
              ABOUT
            </Link>
            
            {/* Gallery Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setGalleryDropdownOpen(true)}
              onMouseLeave={() => setGalleryDropdownOpen(false)}
            >
              <Link
                to="gallery"
                className="px-4 py-2 text-lg hover:text-pink-600 transition-colors flex items-center gap-1"
                style={{ 
                  color: currentPage.includes('gallery') ? '#db2777' : '#9333ea',
                  fontWeight: '500',
                  display: 'flex',
                  textDecoration: 'none'
                }}
              >
                GALLERY
                <ChevronDown className="w-4 h-4" />
              </Link>
              
              {/* Dropdown Menu */}
              <div 
                style={{
                  display: galleryDropdownOpen ? 'block' : 'none',
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  marginTop: '4px',
                  backgroundColor: 'white',
                  border: '2px solid #db2777',
                  borderRadius: '8px',
                  boxShadow: '0 10px 25px rgba(219, 39, 119, 0.2)',
                  width: '250px',
                  zIndex: 1000
                }}
              >
                <Link
                  to="gallery"
                  style={{
                    display: 'block',
                    padding: '12px 16px',
                    color: '#9333ea',
                    fontWeight: '500',
                    textDecoration: 'none',
                    borderRadius: '6px 6px 0 0'
                  }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#fae8ff'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                >
                  All Gallery
                </Link>
                
                <div style={{ borderTop: '2px solid #f9a8d4' }}></div>
                
                <Link
                  to="gallery-fluted"
                  style={{
                    display: 'block',
                    padding: '12px 16px',
                    color: '#9333ea',
                    fontWeight: '500',
                    textDecoration: 'none'
                  }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#fae8ff'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                >
                  Fluted Panel Designs
                </Link>
                
                <Link
                  to="gallery-pvc"
                  style={{
                    display: 'block',
                    padding: '12px 16px',
                    color: '#9333ea',
                    fontWeight: '500',
                    textDecoration: 'none'
                  }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#fae8ff'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                >
                  PVC Panel Designs
                </Link>
                
                <Link
                  to="gallery-wainscoting"
                  style={{
                    display: 'block',
                    padding: '12px 16px',
                    color: '#9333ea',
                    fontWeight: '500',
                    textDecoration: 'none',
                    borderRadius: '0 0 6px 6px'
                  }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#fae8ff'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                >
                  Wainscoting Designs
                </Link>
              </div>
            </div>
            
            <Link
              to="services"
              className="px-4 py-2 text-lg hover:text-pink-600 transition-colors"
              style={{ 
                color: currentPage === 'services' ? '#db2777' : '#9333ea',
                fontWeight: '500',
                textDecoration: 'none'
              }}
            >
              SERVICES
            </Link>
            
            <Link
              to="contact"
              className="px-4 py-2 text-lg hover:text-pink-600 transition-colors"
              style={{ 
                color: currentPage === 'contact' ? '#db2777' : '#9333ea',
                fontWeight: '500',
                textDecoration: 'none'
              }}
            >
              CONTACT
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-purple-600"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
          <Link
            to="home"
            className="block w-full text-left px-4 py-3 font-medium text-purple-600 hover:bg-purple-50 hover:text-pink-600 transition-colors"
          >
            Home
          </Link>
          <Link
            to="about"
            className="block w-full text-left px-4 py-3 font-medium text-purple-600 hover:bg-purple-50 hover:text-pink-600 transition-colors"
          >
            About
          </Link>
          <Link
            to="gallery"
            className="block w-full text-left px-4 py-3 font-medium text-purple-600 hover:bg-purple-50 hover:text-pink-600 transition-colors"
          >
            Gallery
          </Link>
          <Link
            to="services"
            className="block w-full text-left px-4 py-3 font-medium text-purple-600 hover:bg-purple-50 hover:text-pink-600 transition-colors"
          >
            Services
          </Link>
          <Link
            to="contact"
            className="block w-full text-left px-4 py-3 font-medium text-purple-600 hover:bg-purple-50 hover:text-pink-600 transition-colors"
          >
            Contact
          </Link>
        </div>
      )}
    </nav>
  );
}