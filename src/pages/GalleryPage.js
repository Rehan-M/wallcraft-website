import React, { useState } from 'react';
import { Eye, X } from 'lucide-react';
import wall3d1 from '../assets/images/3D_wall/3D-1.jpeg';
import wall3d2 from '../assets/images/3D_wall/3D-2.jpeg';
import wall3d3 from '../assets/images/3D_wall/3D-3.jpeg';
import wall3d4 from '../assets/images/3D_wall/3D-4.jpeg';
import wall3d5 from '../assets/images/3D_wall/3D-5.jpeg';
import wall3d6 from '../assets/images/3D_wall/3D-6.jpeg';
import wall3d7 from '../assets/images/3D_wall/3D-7.jpeg';
import wall3d8 from '../assets/images/3D_wall/3D-8.jpeg';
import wall3d9 from '../assets/images/3D_wall/3D-9.jpeg';
import wall3d10 from '../assets/images/3D_wall/3D-10.jpeg';
import wall3d11 from '../assets/images/3D_wall/3D-11.jpeg';
import stencil1 from '../assets/images/Stencil_wall/St-1.jpeg';
import stencil2 from '../assets/images/Stencil_wall/ST-2.jpeg';
import stencil3 from '../assets/images/Stencil_wall/ST-3.jpeg';
import stencil4 from '../assets/images/Stencil_wall/ST-4.jpeg';
import stencil5 from '../assets/images/Stencil_wall/ST-5.jpeg';
import stencil6 from '../assets/images/Stencil_wall/ST-6.jpeg';
import stencil7 from '../assets/images/Stencil_wall/ST-7.jpeg';
import stencil8 from '../assets/images/Stencil_wall/ST-8.jpeg';
import stencil9 from '../assets/images/Stencil_wall/ST-9.jpeg';
import stencil10 from '../assets/images/Stencil_wall/ST-10.jpeg';
import stencil11 from '../assets/images/Stencil_wall/ST-11.jpeg';
import stencil12 from '../assets/images/Stencil_wall/ST-12.jpeg';
import stencil12b from '../assets/images/Stencil_wall/ST_12.jpeg';
import stencil13 from '../assets/images/Stencil_wall/ST-13.jpeg';
import stencil14 from '../assets/images/Stencil_wall/ST-14.jpeg';
import stencil15 from '../assets/images/Stencil_wall/ST-15.jpeg';
import stencil16 from '../assets/images/Stencil_wall/ST-16.jpeg';
import stencil17 from '../assets/images/Stencil_wall/ST-17.jpeg';
import stencil18 from '../assets/images/Stencil_wall/ST-18.jpeg';
import stencil19 from '../assets/images/Stencil_wall/ST-19.jpeg';
import stencil20 from '../assets/images/Stencil_wall/ST-20.jpeg';
import stencil21 from '../assets/images/Stencil_wall/ST-21.jpeg';
import stencil22 from '../assets/images/Stencil_wall/ST-22.jpeg';
import stencil23 from '../assets/images/Stencil_wall/ST-23.jpeg';
import stencil24 from '../assets/images/Stencil_wall/ST-24.jpeg';
import stencil25 from '../assets/images/Stencil_wall/ST-25.jpeg';
import stencil26 from '../assets/images/Stencil_wall/ST-26.jpeg';
import stencil27 from '../assets/images/Stencil_wall/ST-27.jpeg';
import stencil28 from '../assets/images/Stencil_wall/ST-28.jpeg';
import pvc1 from '../assets/images/pvc/PV-1.jpeg';
import pvc2 from '../assets/images/pvc/PV-2.jpg';
import pvc3 from '../assets/images/pvc/PV-3.jpg';
import pvc4 from '../assets/images/pvc/PV-4.jpg';
import pvc5 from '../assets/images/pvc/PV-5.jpg';
import pvc6 from '../assets/images/pvc/PV-6.jpg';
import pvc7 from '../assets/images/pvc/PV-7.jpg';
import pvc8 from '../assets/images/pvc/PV-8.jpg';
import pvc9 from '../assets/images/pvc/PV-9.jpg';
import pvc10 from '../assets/images/pvc/PV-10.jpg';
import pvc11 from '../assets/images/pvc/PV-11.jpg';
import pvc12 from '../assets/images/pvc/PV-12.jpg';
import pvc13 from '../assets/images/pvc/PV-13.jpg';
import pvc14 from '../assets/images/pvc/PV-14.jpg';
import pvc15 from '../assets/images/pvc/PV-15.jpg';
import pvc16 from '../assets/images/pvc/PV-16.jpg';
import pvcVideo from '../assets/images/pvc/pvc-video.mp4';

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
      { id: 301, title: 'PVC Accent Wall', category: 'Residential', desc: 'Modern PVC panels that elevate everyday living spaces',
        image: pvc1 },
      { id: 302, title: 'Sleek PVC Feature Wall', category: 'Residential', desc: 'Clean PVC design for a polished interior look',
        image: pvc2 },
      { id: 303, title: 'Durable PVC Installation', category: 'Commercial', desc: 'Hard-wearing PVC panels for high-traffic areas',
        image: pvc3 },
      { id: 304, title: 'Textured PVC Wall', category: 'Residential', desc: 'Rich PVC texture that adds depth and style',
        image: pvc4 },
      { id: 305, title: 'Premium PVC Panel Wall', category: 'Commercial', desc: 'Premium PVC finish for professional interiors',
        image: pvc5 },
      { id: 306, title: 'Contemporary PVC Design', category: 'Residential', desc: 'Contemporary PVC panels for modern homes',
        image: pvc6 },
      { id: 307, title: 'Waterproof PVC Wall', category: 'Residential', desc: 'Moisture-resistant PVC ideal for kitchens and baths',
        image: pvc7 },
      { id: 308, title: 'Bold PVC Statement Wall', category: 'Commercial', desc: 'Bold PVC design that creates a strong focal point',
        image: pvc8 },
      { id: 309, title: 'Classic PVC Panel Look', category: 'Residential', desc: 'Classic PVC paneling with timeless appeal',
        image: pvc9 },
      { id: 310, title: 'Bright PVC Accent', category: 'Commercial', desc: 'Bright PVC panels that refresh commercial spaces',
        image: pvc10 },
      { id: 311, title: 'Layered PVC Feature', category: 'Residential', desc: 'Layered PVC detailing for a custom feature wall',
        image: pvc11 },
      { id: 312, title: 'Minimal PVC Wall', category: 'Commercial', desc: 'Minimal PVC design for clean, modern interiors',
        image: pvc12 },
      { id: 313, title: 'Warm Tone PVC Wall', category: 'Residential', desc: 'Warm-toned PVC panels for inviting rooms',
        image: pvc13 },
      { id: 314, title: 'Luxury PVC Finish', category: 'Commercial', desc: 'Luxury PVC finish for upscale interiors',
        image: pvc14 },
      { id: 315, title: 'Compact PVC Accent', category: 'Residential', desc: 'Compact PVC accent wall for smaller spaces',
        image: pvc15 },
      { id: 316, title: 'Signature PVC Feature', category: 'Commercial', desc: 'Signature PVC feature wall with lasting impact',
        image: pvc16 },
      { id: 317, title: 'PVC Installation Video', category: 'Commercial', desc: 'Watch a PVC wall installation come to life',
        image: pvcVideo, type: 'video' }
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
    ],
    '3d': [
      { id: 101, title: 'Geometric Accent Wall', category: 'Residential', desc: 'Bold 3D wall panels that add depth and dimension',
        image: wall3d1 },
      { id: 102, title: 'Modern Feature Wall', category: 'Residential', desc: 'Sculptural 3D design for a standout living space',
        image: wall3d2 },
      { id: 103, title: 'Textured Statement Wall', category: 'Commercial', desc: 'Eye-catching 3D panels for contemporary interiors',
        image: wall3d3 },
      { id: 104, title: 'Luxury 3D Panel Wall', category: 'Residential', desc: 'Premium dimensional wall design with rich texture',
        image: wall3d4 },
      { id: 105, title: 'Architectural Wall Art', category: 'Commercial', desc: '3D wall installation that transforms any room',
        image: wall3d5 },
      { id: 106, title: 'Layered Relief Design', category: 'Residential', desc: 'Multi-dimensional panels for elegant spaces',
        image: wall3d6 },
      { id: 107, title: 'Contemporary 3D Wall', category: 'Commercial', desc: 'Sleek dimensional panels for modern interiors',
        image: wall3d7 },
      { id: 108, title: 'Sculpted Wall Panel', category: 'Residential', desc: 'Artistic 3D wall design with striking depth',
        image: wall3d8 },
      { id: 109, title: 'Dimensional Accent Wall', category: 'Commercial', desc: 'Dynamic 3D panels that elevate the space',
        image: wall3d9 },
      { id: 110, title: 'Wave Pattern Wall', category: 'Residential', desc: 'Fluid 3D wall design with flowing texture',
        image: wall3d10 },
      { id: 111, title: 'Premium 3D Feature Wall', category: 'Commercial', desc: 'High-impact dimensional wall for luxury spaces',
        image: wall3d11 }
    ],
    stencil: [
      { id: 201, title: 'Classic Stencil Accent', category: 'Residential', desc: 'Elegant stencil pattern that adds character to any wall',
        image: stencil1 },
      { id: 202, title: 'Modern Stencil Feature', category: 'Residential', desc: 'Bold stencil design for a standout living space',
        image: stencil2 },
      { id: 203, title: 'Decorative Wall Stencil', category: 'Commercial', desc: 'Artistic stencil work for contemporary interiors',
        image: stencil3 },
      { id: 204, title: 'Luxury Stencil Wall', category: 'Residential', desc: 'Premium stencil detailing with refined style',
        image: stencil4 },
      { id: 205, title: 'Patterned Statement Wall', category: 'Commercial', desc: 'Eye-catching stencil installation that transforms a room',
        image: stencil5 },
      { id: 206, title: 'Ornate Stencil Design', category: 'Residential', desc: 'Detailed stencil art for elegant interiors',
        image: stencil6 },
      { id: 207, title: 'Contemporary Stencil Wall', category: 'Commercial', desc: 'Clean stencil patterns for modern spaces',
        image: stencil7 },
      { id: 208, title: 'Artistic Accent Wall', category: 'Residential', desc: 'Custom stencil design with striking visual impact',
        image: stencil8 },
      { id: 209, title: 'Textured Stencil Feature', category: 'Commercial', desc: 'Layered stencil look that elevates the space',
        image: stencil9 },
      { id: 210, title: 'Floral Stencil Wall', category: 'Residential', desc: 'Soft stencil motifs for a warm, inviting feel',
        image: stencil10 },
      { id: 211, title: 'Geometric Stencil Panel', category: 'Commercial', desc: 'Structured stencil patterns for polished interiors',
        image: stencil11 },
      { id: 212, title: 'Boutique Stencil Wall', category: 'Residential', desc: 'Stylish stencil design for unique feature walls',
        image: stencil12 },
      { id: 213, title: 'Custom Stencil Accent', category: 'Commercial', desc: 'Tailored stencil artwork for distinctive spaces',
        image: stencil12b },
      { id: 214, title: 'Heritage Stencil Wall', category: 'Residential', desc: 'Timeless stencil patterns with classic charm',
        image: stencil13 },
      { id: 215, title: 'Studio Stencil Feature', category: 'Commercial', desc: 'Creative stencil design for inspiring interiors',
        image: stencil14 },
      { id: 216, title: 'Grand Stencil Wall', category: 'Residential', desc: 'Large-scale stencil pattern for dramatic impact',
        image: stencil15 },
      { id: 217, title: 'Minimal Stencil Accent', category: 'Commercial', desc: 'Subtle stencil detailing for modern spaces',
        image: stencil16 },
      { id: 218, title: 'Royal Stencil Design', category: 'Residential', desc: 'Rich stencil motifs for luxurious rooms',
        image: stencil17 },
      { id: 219, title: 'Gallery Stencil Wall', category: 'Commercial', desc: 'Exhibition-style stencil art for bold interiors',
        image: stencil18 },
      { id: 220, title: 'Garden Stencil Feature', category: 'Residential', desc: 'Nature-inspired stencil patterns for calm spaces',
        image: stencil19 },
      { id: 221, title: 'Urban Stencil Wall', category: 'Commercial', desc: 'Contemporary stencil looks for city interiors',
        image: stencil20 },
      { id: 222, title: 'Signature Stencil Accent', category: 'Residential', desc: 'Signature stencil design that defines the room',
        image: stencil21 },
      { id: 223, title: 'Premium Stencil Feature', category: 'Commercial', desc: 'High-end stencil installation for luxury spaces',
        image: stencil22 },
      { id: 224, title: 'Vintage Stencil Wall', category: 'Residential', desc: 'Classic stencil charm with a vintage feel',
        image: stencil23 },
      { id: 225, title: 'Luxe Pattern Wall', category: 'Commercial', desc: 'Opulent stencil patterns for upscale interiors',
        image: stencil24 },
      { id: 226, title: 'Soft Motif Stencil', category: 'Residential', desc: 'Gentle stencil motifs for serene living spaces',
        image: stencil25 },
      { id: 227, title: 'Bold Stencil Statement', category: 'Commercial', desc: 'High-contrast stencil design that stands out',
        image: stencil26 },
      { id: 228, title: 'Crafted Stencil Wall', category: 'Residential', desc: 'Hand-crafted stencil style for personalized spaces',
        image: stencil27 },
      { id: 229, title: 'Finale Stencil Feature', category: 'Commercial', desc: 'Finishing stencil design for a complete look',
        image: stencil28 }
    ]
  };

  // Build the image list by category
  let images = [];
  if (category === 'all') {
    images = [
      ...galleryImages.fluted,
      ...galleryImages.pvc,
      ...galleryImages.wainscoting,
      ...galleryImages['3d'],
      ...galleryImages.stencil,
    ];
  } else if (category === 'fluted') {
    images = galleryImages.fluted;
  } else if (category === 'pvc') {
    images = galleryImages.pvc;
  } else if (category === 'wainscoting') {
    images = galleryImages.wainscoting;
  } else if (category === '3d') {
    images = galleryImages['3d'];
  } else if (category === 'stencil') {
    images = galleryImages.stencil;
  }

  const categoryTitles = {
    all: 'Our Gallery',
    fluted: 'Fluted Panel Designs',
    pvc: 'PVC Panel Designs',
    wainscoting: 'Wainscoting Designs',
    '3d': '3D Wall Designs',
    stencil: 'Stencil Wall Designs'
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
                  {image.type === 'video' ? (
                    <video
                      src={image.image}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      muted
                      playsInline
                      preload="metadata"
                    />
                  ) : (
                    <img
                      src={image.image}
                      alt={image.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      onError={(e) => {
                        e.currentTarget.src =
                          'https://via.placeholder.com/800x600/9333ea/ffffff?text=WallCrafter';
                      }}
                    />
                  )}
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
              <div className="rounded-lg overflow-hidden bg-gray-900" onClick={(e) => e.stopPropagation()}>
                {selectedImage.type === 'video' ? (
                  <video
                    src={selectedImage.image}
                    className="w-full h-auto max-h-[80vh] object-contain"
                    controls
                    autoPlay
                    playsInline
                  />
                ) : (
                  <img
                    src={selectedImage.image}
                    alt={selectedImage.title}
                    className="w-full h-auto max-h-[80vh] object-contain"
                  />
                )}
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
