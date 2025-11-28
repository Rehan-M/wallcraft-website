import React from "react";
import { Facebook, Instagram, Twitter, Linkedin, PaintBucket } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-purple-900 to-pink-900 text-white py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Logo / About */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 cursor-pointer">
            <img
              src="/logo.png"
              alt="WallCrafter Logo"
              className="h-14 w-auto object-contain drop-shadow-lg transition-transform duration-300 hover:scale-105"
            />
          </Link>
              </div>
              <span className="text-xl font-bold">WallCrafter</span>
            </div>
            <p className="text-white/80">
              Transforming spaces with innovative wall designs since 2010.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-white/80">
              <li>
                <Link to="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-white transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold mb-4">Services</h4>
            <ul className="space-y-2 text-white/80">
              <li>
                <Link to="/gallery-fluted" className="hover:text-white transition-colors">
                  Fluted Panels
                </Link>
              </li>
              <li>
                <Link to="/gallery-pvc" className="hover:text-white transition-colors">
                  PVC Panels
                </Link>
              </li>
              <li>
                <Link to="/gallery-wainscoting" className="hover:text-white transition-colors">
                  Wainscoting
                </Link>
              </li>
              <li>Custom Designs</li>
            </ul>
          </div>

          {/* Social & Contact */}
          <div>
            <h4 className="font-bold mb-4">Connect</h4>
            <div className="flex gap-3 mb-4">
              <button
                onClick={() => alert("Facebook link coming soon!")}
                className="bg-white/20 p-2 rounded-lg hover:bg-white/30 transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </button>
              <button
                onClick={() => alert("Instagram link coming soon!")}
                className="bg-white/20 p-2 rounded-lg hover:bg-white/30 transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </button>
              <button
                onClick={() => alert("Twitter link coming soon!")}
                className="bg-white/20 p-2 rounded-lg hover:bg-white/30 transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </button>
              <button
                onClick={() => alert("LinkedIn link coming soon!")}
                className="bg-white/20 p-2 rounded-lg hover:bg-white/30 transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </button>
            </div>
            <p className="text-white/80">info@WallCrafter.com</p>
            <p className="text-white/80">+1 (416) 820-6060</p>
          </div>
        </div>

        <div className="border-t border-white/20 pt-8 text-center text-white/60">
          <p>&copy; 2025 WallCrafter. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

