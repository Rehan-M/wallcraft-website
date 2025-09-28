import React from 'react';
import { Facebook, Instagram, Twitter, Linkedin, PaintBucket } from 'lucide-react';
import { Link } from '../Common/Router';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-purple-900 to-pink-900 text-white py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-white/20 p-2 rounded-lg">
                <PaintBucket className="w-6 h-6" />
              </div>
              <span className="text-xl font-bold">WallCraft</span>
            </div>
            <p className="text-white/80">Transforming spaces with innovative wall designs since 2010.</p>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-white/80">
              <li><Link to="home" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link to="about" className="hover:text-white transition-colors">About</Link></li>
              <li><Link to="services" className="hover:text-white transition-colors">Services</Link></li>
              <li><Link to="contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Services</h4>
            <ul className="space-y-2 text-white/80">
              <li><Link to="gallery-fluted" className="hover:text-white transition-colors">Fluted Panels</Link></li>
              <li><Link to="gallery-pvc" className="hover:text-white transition-colors">PVC Panels</Link></li>
              <li><Link to="gallery-wainscoting" className="hover:text-white transition-colors">Wainscoting</Link></li>
              <li>Custom Designs</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Connect</h4>
            <div className="flex gap-3 mb-4">
              <a href="#" className="bg-white/20 p-2 rounded-lg hover:bg-white/30 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="bg-white/20 p-2 rounded-lg hover:bg-white/30 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="bg-white/20 p-2 rounded-lg hover:bg-white/30 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="bg-white/20 p-2 rounded-lg hover:bg-white/30 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
            <p className="text-white/80">info@wallcraft.com</p>
            <p className="text-white/80">+1 (555) 123-4567</p>
          </div>
        </div>
        
        <div className="border-t border-white/20 pt-8 text-center text-white/60">
          <p>&copy; 2025 WallCraft. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}