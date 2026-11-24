import React, { useState } from 'react';
import { Eye, X } from 'lucide-react';

const MEDIA_PATTERN = /\.(jpe?g|png|webp|gif|mp4|webm|mov)$/i;

function loadMediaFolder(webpackContext, { idPrefix, label, desc }) {
  return webpackContext
    .keys()
    .filter((key) => MEDIA_PATTERN.test(key))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }))
    .map((key, index) => {
      const fileName = key.replace(/^\.\//, '');
      const isVideo = /\.(mp4|webm|mov)$/i.test(fileName);
      return {
        id: `${idPrefix}-${index + 1}`,
        title: `${label} ${index + 1}`,
        category: isVideo ? 'Video' : 'Gallery',
        desc: isVideo ? `${desc} video` : desc,
        image: webpackContext(key),
        type: isVideo ? 'video' : 'image',
      };
    });
}

// Drop files into these folders — they appear in the gallery automatically.
const galleryImages = {
  fluted: loadMediaFolder(
    require.context('../assets/images/fluted', false, /\.(jpe?g|png|webp|gif|mp4|webm|mov)$/i),
    { idPrefix: 'fluted', label: 'Fluted Panel', desc: 'Elegant fluted panel design' }
  ),
  pvc: loadMediaFolder(
    require.context('../assets/images/pvc', false, /\.(jpe?g|png|webp|gif|mp4|webm|mov)$/i),
    { idPrefix: 'pvc', label: 'PVC Panel', desc: 'Durable PVC panel design' }
  ),
  wainscoting: loadMediaFolder(
    require.context('../assets/images/wainscoting', false, /\.(jpe?g|png|webp|gif|mp4|webm|mov)$/i),
    { idPrefix: 'wainscoting', label: 'Wainscoting', desc: 'Classic wainscoting design' }
  ),
  '3d': loadMediaFolder(
    require.context('../assets/images/3D_wall', false, /\.(jpe?g|png|webp|gif|mp4|webm|mov)$/i),
    { idPrefix: '3d', label: '3D Wall', desc: 'Dimensional 3D wall design' }
  ),
  stencil: loadMediaFolder(
    require.context('../assets/images/Stencil_wall', false, /\.(jpe?g|png|webp|gif|mp4|webm|mov)$/i),
    { idPrefix: 'stencil', label: 'Stencil Wall', desc: 'Decorative stencil wall design' }
  ),
};

export default function GalleryPage({ category = 'all' }) {
  const [selectedImage, setSelectedImage] = useState(null);

  let images = [];
  if (category === 'all') {
    images = [
      ...galleryImages.fluted,
      ...galleryImages.pvc,
      ...galleryImages.wainscoting,
      ...galleryImages['3d'],
      ...galleryImages.stencil,
    ];
  } else {
    images = galleryImages[category] || [];
  }

  const categoryTitles = {
    all: 'Our Gallery',
    fluted: 'Fluted Panel Designs',
    pvc: 'PVC Panel Designs',
    wainscoting: 'Wainscoting Designs',
    '3d': '3D Wall Designs',
    stencil: 'Stencil Wall Designs',
  };

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-5xl font-bold mb-8 text-center bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          {categoryTitles[category] || 'Our Gallery'}
        </h1>

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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {images.length > 0 ? (
            images.map((image) => (
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
