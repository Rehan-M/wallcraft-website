import React from 'react';
import { CheckCircle } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-20 bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-5xl font-bold mb-8 text-center bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          About WallCrafter
        </h1>
        
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div className="space-y-6">
            <div className="bg-white p-8 rounded-2xl shadow-xl transform hover:scale-105 transition-transform duration-300">
              <h2 className="text-2xl font-bold mb-4 text-purple-600">Our Story</h2>
              <p className="text-gray-700 leading-relaxed">
                Founded in 2010, WallCrafter has been at the forefront of innovative wall design for over a decade. 
                What started as a small family business has grown into the region's leading wall design company, 
                serving hundreds of satisfied clients across residential and commercial sectors.
              </p>
            </div>
            
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-8 rounded-2xl text-white shadow-xl">
              <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
              <p className="leading-relaxed">
                To create stunning, functional wall designs that transform ordinary spaces into extraordinary environments, 
                while providing exceptional service and value to our clients. We believe every wall tells a story, 
                and we're here to help you write yours.
              </p>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-8 rounded-2xl text-white shadow-xl">
              <h2 className="text-2xl font-bold mb-4">Why Choose Us?</h2>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-6 h-6 flex-shrink-0 mt-0.5" />
                  <span>15+ years of industry experience</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-6 h-6 flex-shrink-0 mt-0.5" />
                  <span>500+ successful projects completed</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-6 h-6 flex-shrink-0 mt-0.5" />
                  <span>Premium quality materials</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-6 h-6 flex-shrink-0 mt-0.5" />
                  <span>100% customer satisfaction guarantee</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-xl transform hover:scale-105 transition-transform duration-300">
              <h2 className="text-2xl font-bold mb-4 text-purple-600">Our Values</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-purple-100 rounded-xl">
                  <div className="text-3xl mb-2">🎨</div>
                  <div className="font-semibold">Creativity</div>
                </div>
                <div className="text-center p-4 bg-pink-100 rounded-xl">
                  <div className="text-3xl mb-2">⭐</div>
                  <div className="font-semibold">Quality</div>
                </div>
                <div className="text-center p-4 bg-blue-100 rounded-xl">
                  <div className="text-3xl mb-2">🤝</div>
                  <div className="font-semibold">Trust</div>
                </div>
                <div className="text-center p-4 bg-green-100 rounded-xl">
                  <div className="text-3xl mb-2">💡</div>
                  <div className="font-semibold">Innovation</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}