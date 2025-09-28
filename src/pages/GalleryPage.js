import React, { useState } from 'react';
import { Eye, X } from 'lucide-react';

export default function GalleryPage({ category = 'all' }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [filter, setFilter] = useState('all');

  // Gallery data with Unsplash images
  const galleryImages = {
    fluted: [
      { 
        id: 1, 
        title: 'Modern Living Room', 
        category: 'Residential', 
        desc: 'Elegant fluted panels creating depth and texture',
        image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80'
      },
      { 
        id: 2, 
        title: 'Luxury Bedroom', 
        category: 'Residential', 
        desc: 'Sophisticated fluted design for a peaceful retreat',
        image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&q=80'
      },
      { 
        id: 3, 
        title: 'Corporate Office', 
        category: 'Commercial', 
        desc: 'Professional fluted panels for modern workspace',
        image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&q=80'
      },
      { 
        id: 4, 
        title: 'Hotel Lobby', 
        category: 'Commercial', 
        desc: 'Grand fluted installation for luxurious ambiance',
        image: 'https://images.unsplash.com/photo-1564078516393-cf04bd966897?w=800&q=80'
      }
    ],
    pvc: [
      { 
        id: 5, 
        title: 'Kitchen Backsplash', 
        category: 'Residential', 
        desc: 'Waterproof PVC panels perfect for kitchens',
        image: 'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=800&q=80'
      },
      { 
        id: 6, 
        title: 'Bathroom Walls', 
        category: 'Residential', 
        desc: 'Moisture-resistant PVC for bathroom elegance',
        image: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&q=80'
      },
      { 
        id: 7, 
        title: 'Restaurant Interior', 
        category: 'Commercial', 
        desc: 'Durable PVC panels for high-traffic areas',
        image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80'
      },
      { 
        id: 8, 
        title: 'Retail Store', 
        category: 'Commercial', 
        desc: 'Colorful PVC designs for brand identity',
        image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80'
      }
    ],
    wainscoting: [
      { 
        id: 9, 
        title: 'Classic Dining Room', 
        category: 'Residential', 
        desc: 'Traditional wainscoting for timeless elegance',
        image: 'https://images.unsplash.com/photo-1615873968403-89e068629265?w=800&q=80'
      },
      { 
        id: 10, 
        title: 'Hotel Suite', 
        category: 'Commercial', 
        desc: 'Luxury wainscoting for premium hospitality',
        image: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&q=80'
      },
      { 
        id: 11, 
        title: 'Study Room', 
        category: 'Residential', 
        desc: 'Sophisticated wainscoting for productive spaces',
        image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80'
      },
      { 
        id: 12, 
        title: 'Conference Room', 
        category: 'Commercial', 
        desc: 'Professional wainscoting for corporate settings',
        image: 'https://images.unsplash.com/photo-1582653291997-079a1c04e5a1?w=800&q=80'
      }
    ]
  };

  // Get images based on category
  let images = [];
  if (category === 'all') {
    images = [...galleryImages.fluted, ...galleryImages.pvc, ...galleryImages.wainscoting];
  } else if (category === 'fluted') {
    images = galleryImages.fluted;
  } else if (category === 'pvc') {
    images = galleryImages.pvc;
  } else if (category === 'wainscoting') {
    images = galleryImages.wainscoting;
  }

  // Category titles
  const categoryTitles = {
    all: 'Our Gallery',
    fluted: 'Fluted Panel Designs',
    pvc: 'PVC Panel Designs',
    wainscoting: 'Wainscoting Designs'
  };

  // Filter images
  const filteredImages = filter === 'all' 
    ? images 
    : images.filter(img => img.category === filter);

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Page Title */}
        <h1 className="text-5xl font-bold mb-8 text-center bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          {categoryTitles[category] || 'Our Gallery'}
        </h1>
        
        {/* Filter Buttons */}
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => setFilter('all')}
            className={`px-6 py-2 rounded-full font-semibold transition-all ${
              filter === 'all' 
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' 
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            All Projects
          </button>
          <button
            onClick={() => setFilter('Residential')}
            className={`px-6 py-2 rounded-full font-semibold transition-all ${
              filter === 'Residential' 
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' 
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            Residential
          </button>
          <button
            onClick={() => setFilter('Commercial')}
            className={`px-6 py-2 rounded-full font-semibold transition-all ${
              filter === 'Commercial' 
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' 
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            Commercial
          </button>
        </div>
        
        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredImages.length > 0 ? (
            filteredImages.map((image) => (
              <div
                key={image.id}
                className="group relative overflow-hidden rounded-2xl shadow-xl cursor-pointer transform hover:scale-105 transition-all duration-300"
                onClick={() => setSelectedImage(image)}
              >
                <div className="h-64 overflow-hidden bg-gray-200">
                  <img 
                    src={image.image} 
                    alt={image.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/800x600/9333ea/ffffff?text=WallCraft';
                    }}
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-xl font-bold mb-1">{image.title}</h3>
                    <p className="text-sm opacity-90 mb-2">{image.category}</p>
                    <p className="text-xs">{image.desc}</p>
                    <div className="flex items-center gap-2 mt-3">
                      <Eye className="w-4 h-4" />
                      <span className="text-sm">Click to view details</span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500 text-lg">No projects found in this category.</p>
            </div>
          )}
        </div>
        
        {/* Lightbox */}
        {selectedImage && (
          <div 
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <div className="relative max-w-4xl w-full">
              <button
                className="absolute -top-12 right-0 text-white hover:text-gray-300 z-10"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedImage(null);
                }}
              >
                <X className="w-8 h-8" />
              </button>
              <div className="rounded-lg overflow-hidden bg-gray-900">
                <img 
                  src={selectedImage.image} 
                  alt={selectedImage.title}
                  className="w-full h-auto max-h-[80vh] object-contain"
                />
              </div>
              <div className="mt-4 text-white">
                <h2 className="text-2xl font-bold">{selectedImage.title}</h2>
                <p className="text-gray-300 mb-2">{selectedImage.category}</p>
                <p className="text-gray-400">{selectedImage.desc}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}