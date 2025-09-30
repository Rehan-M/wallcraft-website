import React, { useState, useEffect } from 'react';
import { ChevronDown, Star, Palette, Layers, Shield, Sparkles } from 'lucide-react';
import { Link } from "react-router-dom";   // ✅ Correct import
import '../elegantAnimations.css';

export default function HomePage() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [counters, setCounters] = useState({ projects: 0, years: 0, clients: 0 });

  // Counter animation
  useEffect(() => {
    const interval = setInterval(() => {
      setCounters(prev => ({
        projects: Math.min(prev.projects + 5, 500),
        years: Math.min(prev.years + 1, 15),
        clients: Math.min(prev.clients + 3, 300)
      }));
    }, 50);
    
    setTimeout(() => clearInterval(interval), 3000);
    return () => clearInterval(interval);
  }, []);

  // Testimonial rotation
  useEffect(() => {
    const testimonialInterval = setInterval(() => {
      setActiveTestimonial(prev => (prev + 1) % 3);
    }, 4000);
    return () => clearInterval(testimonialInterval);
  }, []);

  const testimonials = [
    { name: 'Sarah Johnson', text: 'Transformed our living room completely! The attention to detail was exceptional.', rating: 5 },
    { name: 'Mike Chen', text: 'Professional team, stunning results. Our office looks incredible now!', rating: 5 },
    { name: 'Emily Davis', text: 'Best wall design service in the city. Highly recommend their PVC panels!', rating: 5 }
  ];

  const services = [
    { icon: <Palette className="w-8 h-8" />, title: 'Custom Design', desc: 'Tailored wall solutions for your unique space', color: 'from-purple-500 to-pink-500' },
    { icon: <Layers className="w-8 h-8" />, title: 'Material Selection', desc: 'Premium PVC, fluted panels, and more', color: 'from-blue-500 to-cyan-500' },
    { icon: <Shield className="w-8 h-8" />, title: 'Professional Installation', desc: 'Expert fitting with warranty protection', color: 'from-green-500 to-emerald-500' },
    { icon: <Sparkles className="w-8 h-8" />, title: '3D Visualization', desc: 'See your space transformed before installation', color: 'from-orange-500 to-red-500' }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-screen overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-teal-900 opacity-90"></div>

        {/* Background orbs */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-r from-pink-500 to-yellow-500 rounded-full opacity-20 blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-blue-500 to-green-500 rounded-full opacity-20 blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        </div>

        <div className="relative z-10 h-full flex items-center justify-center px-4">
          <div className="text-center text-white max-w-4xl">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 gradient-animate">
              Transform Your Walls
            </h1>
            <p className="text-xl md:text-2xl mb-8">
              Innovative designs that bring life to your spaces
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/gallery" className="px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full font-semibold shadow-2xl hover:shadow-pink-500/50 text-white transition-all duration-300 hover:scale-105 shimmer-btn">
                Explore Gallery
              </Link>
              <Link to="/contact" className="px-8 py-4 bg-transparent border-2 border-white rounded-full font-semibold hover:bg-white hover:text-purple-900 transition-all duration-300 hover:scale-105">
                Get Quote
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-8 h-8 text-white" />
        </div>
      </div>

      {/* Counters */}
      <div className="py-20 bg-gradient-to-r from-purple-600 to-pink-600">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center text-white">
            <div className="text-5xl font-bold mb-2">{counters.projects}+</div>
            <div className="text-xl">Projects Completed</div>
          </div>
          <div className="text-center text-white">
            <div className="text-5xl font-bold mb-2">{counters.years}+</div>
            <div className="text-xl">Years Experience</div>
          </div>
          <div className="text-center text-white">
            <div className="text-5xl font-bold mb-2">{counters.clients}+</div>
            <div className="text-xl">Happy Clients</div>
          </div>
        </div>
      </div>

      {/* Services */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 gradient-animate">
            Our Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, idx) => (
              <div key={idx} className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl blur-xl from-purple-500 to-pink-500"></div>
                <div className="relative bg-white p-6 rounded-2xl shadow-lg">
                  <div className={`bg-gradient-to-r ${service.color} p-3 rounded-xl inline-block mb-4 text-white`}>
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                  <p className="text-gray-600">{service.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/services" className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300 inline-block shimmer-btn">
              View All Services
            </Link>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="py-20 bg-gradient-to-br from-purple-100 to-pink-100">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Client Testimonials</h2>
          <div className="relative h-48">
            {testimonials.map((testimonial, idx) => (
              <div key={idx} className={`absolute inset-0 transition-all duration-500 ${idx === activeTestimonial ? 'opacity-100' : 'opacity-0'}`}>
                <div className="bg-white p-8 rounded-2xl shadow-xl text-center">
                  <div className="flex justify-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-lg mb-4 italic">"{testimonial.text}"</p>
                  <p className="font-semibold text-purple-600">- {testimonial.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="py-20 bg-gradient-to-r from-purple-600 to-pink-600">
        <div className="max-w-4xl mx-auto px-4 text-center text-white">
          <h2 className="text-4xl font-bold mb-4">Ready to Transform Your Space?</h2>
          <p className="text-xl mb-8">Get a free consultation and quote today!</p>
          <Link to="/contact" className="px-8 py-4 bg-white text-purple-600 rounded-full font-semibold hover:shadow-lg transform hover:scale-110 transition-all duration-300 inline-block shimmer-btn">
            Get Started Now
          </Link>
        </div>
      </div>
    </div>
  );
}

