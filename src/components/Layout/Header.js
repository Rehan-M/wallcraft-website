import React, { useState, useEffect } from "react";
import { ChevronDown, Menu, X, PaintBucket } from "lucide-react";
import { Link } from "react-router-dom";

export default function Header() {
  const [galleryDropdownOpen, setGalleryDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 cursor-pointer">
            <img 
              src="/logo.png" 
              alt="WallCraft Logo" 
              className="h-10 w-auto object-contain drop-shadow-md"
          />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="px-4 py-2 text-lg hover:text-pink-600 transition-colors">
              HOME
            </Link>
            <Link to="/about" className="px-4 py-2 text-lg hover:text-pink-600 transition-colors">
              ABOUT
            </Link>

            {/* Gallery Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setGalleryDropdownOpen(true)}
              onMouseLeave={() => setGalleryDropdownOpen(false)}
            >
              <Link
                to="/gallery"
                className="px-4 py-2 text-lg hover:text-pink-600 transition-colors flex items-center gap-1"
              >
                GALLERY
                <ChevronDown className="w-4 h-4" />
              </Link>

              {galleryDropdownOpen && (
                <div className="absolute top-full left-0 mt-1 bg-white border-2 border-pink-500 rounded-lg shadow-xl w-60 z-50">
                  <Link
                    to="/gallery"
                    className="block px-4 py-2 text-purple-700 hover:bg-pink-50"
                  >
                    All Gallery
                  </Link>
                  <Link
                    to="/gallery-fluted"
                    className="block px-4 py-2 text-purple-700 hover:bg-pink-50"
                  >
                    Fluted Panel Designs
                  </Link>
                  <Link
                    to="/gallery-pvc"
                    className="block px-4 py-2 text-purple-700 hover:bg-pink-50"
                  >
                    PVC Panel Designs
                  </Link>
                  <Link
                    to="/gallery-wainscoting"
                    className="block px-4 py-2 text-purple-700 hover:bg-pink-50"
                  >
                    Wainscoting Designs
                  </Link>
                </div>
              )}
            </div>

            <Link to="/services" className="px-4 py-2 text-lg hover:text-pink-600 transition-colors">
              SERVICES
            </Link>
            <Link to="/contact" className="px-4 py-2 text-lg hover:text-pink-600 transition-colors">
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
          <Link to="/" className="block px-4 py-3 text-purple-600 hover:bg-purple-50 hover:text-pink-600">
            Home
          </Link>
          <Link to="/about" className="block px-4 py-3 text-purple-600 hover:bg-purple-50 hover:text-pink-600">
            About
          </Link>
          <Link to="/gallery" className="block px-4 py-3 text-purple-600 hover:bg-purple-50 hover:text-pink-600">
            Gallery
          </Link>
          <Link to="/services" className="block px-4 py-3 text-purple-600 hover:bg-purple-50 hover:text-pink-600">
            Services
          </Link>
          <Link to="/contact" className="block px-4 py-3 text-purple-600 hover:bg-purple-50 hover:text-pink-600">
            Contact
          </Link>
        </div>
      )}
    </nav>
  );
}

