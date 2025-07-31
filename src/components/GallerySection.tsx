import React, { useState, useEffect } from 'react';
import { Play, ExternalLink, Star } from 'lucide-react';

const GallerySection = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Sample images for rotation (you can replace these with your actual image URLs)
  const rotatingImages = [
    'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1543269865-cbf427effbad?w=400&h=300&fit=crop'
  ];

  // Auto-rotate images every second
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        (prevIndex + 1) % rotatingImages.length
      );
    }, 1000);

    return () => clearInterval(interval);
  }, [rotatingImages.length]);

  const mediaItems = [
    { type: 'news', title: 'Featured in Times of India', source: 'TOI' },
    { type: 'testimonial', title: 'Student Success Story', author: 'Priya S.' },
    { type: 'social', title: 'LinkedIn Post Viral', engagement: '10K+ likes' },
    { type: 'video', title: 'Demo Day Highlights', duration: '5:30' },
    { type: 'news', title: 'TechCrunch Coverage', source: 'TC' },
    { type: 'testimonial', title: 'Mentor Feedback', author: 'Industry Expert' },
  ];

  return (
    <section id="gallery" className="py-20 bg-gradient-to-br from-gray-900 to-black relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-[#543ef7]/10 to-[#9cecd5]/10"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Media & Impact Gallery
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Celebrating our journey through news features, testimonials, and the incredible 
            transformations of our JAZBAA community.
          </p>
        </div>

        <div className="flex justify-center mb-16">
          <div className="w-full max-w-md">
            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-4 border border-white/10 hover:border-[#e86888]/50 transition-all duration-300 hover:scale-105">
              <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg overflow-hidden relative">
                <img 
                  src={rotatingImages[currentImageIndex]}
                  alt="Gallery content"
                  className="w-full h-full object-cover transition-all duration-1000 ease-in-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-[#e86888] to-[#7d7eed] text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl flex items-center gap-2 justify-center">
              Submit Your JAZBAA Story
              <Star size={20} />
            </button>
            <button className="bg-white/10 backdrop-blur-md text-white px-8 py-4 rounded-full font-semibold text-lg border border-white/20 transition-all duration-300 hover:bg-white/20 hover:scale-105 flex items-center gap-2 justify-center">
              Download Media Kit
              <ExternalLink size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GallerySection;