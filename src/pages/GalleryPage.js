import React, { useState } from 'react';
import { Eye, X } from 'lucide-react';

export default function GalleryPage({ category = 'all' }) {
  const [selectedImage, setSelectedImage] = useState(null);

  // Gallery data
  const galleryImages = {
    fluted: [
      { id: 1, title: 'Modern Living Room', category: 'Residential', desc: 'Elegant fluted panels creating depth and texture',
        image: 'https://i.pinimg.com/736x/41/e6/e0/41e6e0cd6cba1c0e2cc3c9fcaf69b211.jpg' },
      { id: 2, title: 'Luxury Style', category: 'Residential', desc: 'Sophisticated fluted design for a peaceful retreat',
        image: 'https://i.pinimg.com/1200x/26/01/8c/26018c7f63c4d2724d7833dc3e6f8d46.jpg' },
      { id: 3, title: 'Two tone Wall', category: 'Commercial', desc: 'Professional fluted panels for modern workspace',
        image: 'https://i.pinimg.com/1200x/a4/8a/9d/a48a9d50c28525fd6c037b451eec2e58.jpg' },
      { id: 4, title: 'Golden Touch', category: 'Commercial', desc: 'Grand fluted installation for luxurious ambiance',
        image: 'https://i.pinimg.com/736x/3c/66/83/3c66836ff82f1a923bd1a371637448eb.jpg' },
      { id: 5, title: 'Family Fun Room', category: 'Residential', desc: 'Elegant fluted panels creating depth and texture',
        image: 'https://i.pinimg.com/1200x/e5/16/aa/e516aa3122c1780f47e44b70abe312c4.jpg' },
      { id: 6, title: 'Cooridor Style', category: 'Residential', desc: 'Sophisticated fluted design for a peaceful retreat',
        image: 'https://i.pinimg.com/736x/94/a4/8a/94a48a937eda958f564d500549efa4b0.jpg' },
      { id: 7, title: 'Sleak Wall', category: 'Commercial', desc: 'Professional fluted panels for modern workspace',
        image: 'https://i.pinimg.com/1200x/9e/8a/31/9e8a31b2f4c156b462d529e6c9f37805.jpg' },
      { id: 8, title: 'Fluted Touch', category: 'Commercial', desc: 'Grand fluted installation for luxurious ambiance',
        image: 'https://i.pinimg.com/736x/1c/d2/05/1cd2057fbf61165e8897982b434d13d8.jpg' },
      { id: 9, title: 'Fluted Touch', category: 'Commercial', desc: 'Grand fluted installation for luxurious ambiance',
        image: 'https://i.pinimg.com/736x/2f/01/d2/2f01d2fce10c71cc10c6aae3d14139e4.jpg' }
    ],
    pvc: [
      { id: 5, title: 'Kitchen Backsplash', category: 'Residential', desc: 'Waterproof PVC panels perfect for kitchens',
        image: 'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=800&q=80' },
      { id: 6, title: 'Bathroom Walls', category: 'Residential', desc: 'Moisture-resistant PVC for bathroom elegance',
        image: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&q=80' },
      { id: 7, title: 'Restaurant Interior', category: 'Commercial', desc: 'Durable PVC panels for high-traffic areas',
        image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80' },
      { id: 8, title: 'Retail Store', category: 'Commercial', desc: 'Colorful PVC designs for brand identity',
        image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80' }
    ],
    wainscoting: [
      { id: 1, title: 'Classic Dining Room', category: 'Residential', desc: 'Traditional wainscoting for timeless elegance',
        image: 'https://cdn.shopify.com/s/files/1/0657/3100/2634/files/Papier-peint-imitation-boiserie-Simple-et-design-style-haussmanien.jpg?v=1707898607' },
      { id: 2, title: 'Hotel Suite', category: 'Commercial', desc: 'Luxury wainscoting for premium hospitality',
        image: 'https://i.pinimg.com/736x/b2/e2/d6/b2e2d6ad3fac06cb03214e160af2feec.jpg' },
      { id: 3, title: 'Study Room', category: 'Residential', desc: 'Sophisticated wainscoting for productive spaces',
        image: 'https://i.pinimg.com/1200x/14/ad/f1/14adf1779d71168f756d4019f3435902.jpg' },
      { id: 4, title: 'Conference Room', category: 'Commercial', desc: 'Professional wainscoting for corporate settings',
        image: 'https://i.pinimg.com/736x/55/32/93/553293d21997150707eb7eb71dc7bb87.jpg' },
      { id: 5, title: 'Classic Dining Room', category: 'Residential', desc: 'Traditional wainscoting for timeless elegance',
        image: 'https://i.pinimg.com/736x/61/c1/1c/61c11c2dd6f86dece78126433fc95368.jpg' },
      { id: 6, title: 'Hotel Suite', category: 'Commercial', desc: 'Luxury wainscoting for premium hospitality',
        image: 'https://i.pinimg.com/1200x/c0/0a/77/c00a77dc46830ec687087088c17b6f05.jpg' },
      { id: 7, title: 'Study Room', category: 'Residential', desc: 'Sophisticated wainscoting for productive spaces',
        image: 'https://i.pinimg.com/736x/5e/c5/e4/5ec5e4aeadcdcd625079f16deeb6b66c.jpg' },
      { id: 8, title: 'Conference Room', category: 'Commercial', desc: 'Professional wainscoting for corporate settings',
        image: 'https://i.pinimg.com/1200x/c1/e1/ac/c1e1acdfff1b287dd01de4998c771921.jpg' },
      { id: 9, title: 'Conference Room', category: 'Commercial', desc: 'Professional wainscoting for corporate settings',
        image: 'https://i.pinimg.com/736x/f1/cc/d3/f1ccd3df2e978ed9262c436c65c46713.jpg' }
    ]
  };

  // Build the image list by category
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

  const categoryTitles = {
    all: 'Our Gallery',
    fluted: 'Fluted Panel Designs',
    pvc: 'PVC Panel Designs',
    wainscoting: 'Wainscoting Designs'
  };

  // No filtering by Residential/Commercial anymore
  const filteredImages = images;

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Page Title */}
        <h1 className="text-5xl font-bold mb-8 text-center bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          {categoryTitles[category] || 'Our Gallery'}
        </h1>

        {/* Single “All Projects” Button (visual only) */}
        <div className="flex justify-center gap-4 mb-8">
          <button
            className="px-6 py-2 rounded-full font-semibold bg-gradient-to-r from-purple-500 to-pink-500 text-white"
            disabled
            aria-disabled="true"
            title="Showing all projects"
          >
            All Projects
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
                      e.currentTarget.src =
                        'https://via.placeholder.com/800x600/9333ea/ffffff?text=WallCrafter';
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
              <p className="text-gray-500 text-lg">No projects found.</p>
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
