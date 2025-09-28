import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Layout/Header";
import Footer from "./components/Layout/Footer";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ServicesPage from "./pages/ServicesPage";
import GalleryPage from "./pages/GalleryPage";
import ContactPage from "./pages/ContactPage";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header always visible */}
      <Header />

      {/* Page Content */}
      <div className="w-full">
        <Routes>
          {/* Home */}
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />

          {/* About */}
          <Route path="/about" element={<AboutPage />} />

          {/* Services */}
          <Route path="/services" element={<ServicesPage />} />

          {/* Gallery and subcategories */}
          <Route path="/gallery" element={<GalleryPage category="all" />} />
          <Route path="/gallery-fluted" element={<GalleryPage category="fluted" />} />
          <Route path="/gallery-pvc" element={<GalleryPage category="pvc" />} />
          <Route path="/gallery-wainscoting" element={<GalleryPage category="wainscoting" />} />

          {/* Contact */}
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </div>

      {/* Footer always visible */}
      <Footer />
    </div>
  );
}
