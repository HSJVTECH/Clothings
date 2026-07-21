import React from 'react';

const InstagramGallery = () => {
  const images = [
    '/frames/ezgif-frame-030.jpg', 
    '/frames/ezgif-frame-060.jpg', 
    '/frames/ezgif-frame-090.jpg',
    '/frames/ezgif-frame-150.jpg', 
    '/frames/ezgif-frame-200.jpg', 
    '/frames/ezgif-frame-001.jpg'
  ];

  return (
    <section className="container-luxury section-padding-sm">
      <div className="text-center mb-12">
        <p className="text-caption uppercase tracking-[0.2em] text-accent mb-2">Follow Us</p>
        <h2 className="text-2xl font-display text-white">@zmarks_clothing</h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3">
        {images.map((src, index) => (
          <a 
            key={index} 
            href="https://instagram.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="aspect-square overflow-hidden bg-secondary/80 border border-white/10 group cursor-pointer relative block"
          >
            <img 
              src={src} 
              alt={`Instagram post ${index + 1}`} 
              className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700"
              onError={(e) => { e.target.style.display = 'none'; }}
            />
            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="text-white w-6 h-6"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};

export default InstagramGallery;
