import React from 'react';
import { CheckCircle, Palette, Layers, Shield, Sparkles } from 'lucide-react';

export default function ServicesPage() {
  const services = [
    { icon: <Palette className="w-8 h-8" />, title: 'Custom Design', desc: 'Tailored wall solutions for your unique space', color: 'from-purple-500 to-pink-500' },
    { icon: <Layers className="w-8 h-8" />, title: 'Material Selection', desc: 'Premium PVC, fluted panels, and more', color: 'from-blue-500 to-cyan-500' },
    { icon: <Shield className="w-8 h-8" />, title: 'Professional Installation', desc: 'Expert fitting with warranty protection', color: 'from-green-500 to-emerald-500' },
    { icon: <Sparkles className="w-8 h-8" />, title: '3D Visualization', desc: 'See your space transformed before installation', color: 'from-orange-500 to-red-500' }
  ];

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-5xl font-bold mb-12 text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Our Premium Services
        </h1>
        
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {services.map((service, idx) => (
            <div key={idx} className="group">
              <div className="relative overflow-hidden rounded-2xl shadow-xl bg-white p-8 hover:shadow-2xl transition-all duration-300">
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${service.color} opacity-10 rounded-bl-full`}></div>
                <div className="relative z-10">
                  <div className={`bg-gradient-to-r ${service.color} p-4 rounded-xl inline-block mb-4 text-white transform group-hover:scale-110 transition-transform duration-300`}>
                    {service.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
                  <p className="text-gray-600 mb-4">{service.desc}</p>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span>Professional consultation</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span>Quality guarantee</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span>Timely delivery</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Process Section */}
        <div className="bg-white rounded-3xl shadow-xl p-12 mb-12">
          <h2 className="text-3xl font-bold mb-8 text-center">Our Process</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: '01', title: 'Consultation', desc: 'Discuss your vision', icon: '💬' },
              { step: '02', title: 'Design', desc: 'Create custom plans', icon: '✏️' },
              { step: '03', title: 'Approval', desc: 'Review & refine', icon: '✅' },
              { step: '04', title: 'Installation', desc: 'Professional fitting', icon: '🔨' }
            ].map((item, idx) => (
              <div key={idx} className="text-center group">
                <div className="relative">
                  <div className="text-6xl mb-4 transform group-hover:scale-110 transition-transform duration-300">{item.icon}</div>
                  <div className="absolute top-0 right-0 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-bold rounded-full w-8 h-8 flex items-center justify-center">
                    {item.step}
                  </div>
                </div>
                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-8">Flexible Pricing Plans</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: 'Basic', price: '$1200-$1500', features: ['Single wall', 'Standard materials', 'Lifetime warranty'] },
              { name: 'Premium', price: '$2499-$3499', features: ['2 to 3 walls', 'Premium materials', 'Lifetime warranty'], popular: true },
              { name: 'Luxury', price: '$4999+', features: ['3 Plus walls', 'Luxury materials', 'Lifetime warranty'] }
            ].map((plan, idx) => (
              <div key={idx} className={`relative rounded-2xl p-8 ${plan.popular ? 'bg-gradient-to-br from-purple-600 to-pink-600 text-white shadow-2xl scale-105' : 'bg-white shadow-xl'}`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-black px-4 py-1 rounded-full text-sm font-bold">
                    Most Popular
                  </div>
                )}
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="text-3xl font-bold mb-6">{plan.price}</div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckCircle className={`w-5 h-5 ${plan.popular ? 'text-white' : 'text-green-500'}`} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <button className={`w-full py-3 rounded-full font-semibold transition-all ${
                  plan.popular 
                    ? 'bg-white text-purple-600 hover:bg-gray-100' 
                    : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-lg'
                }`}>
                  Get Started
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}