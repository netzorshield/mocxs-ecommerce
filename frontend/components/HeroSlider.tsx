'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

interface Slide {
  id: string;
  image: string;
  title: string;
  subtitle?: string;
  description?: string;
  buttonText?: string;
  buttonLink?: string;
  overlay?: 'dark' | 'light' | 'gradient';
}

interface HeroSliderProps {
  slides: Slide[];
  autoSlideInterval?: number;
  showNavigation?: boolean;
  showDots?: boolean;
}

const HeroSlider = ({ 
  slides, 
  autoSlideInterval = 5000,
  showNavigation = true,
  showDots = true 
}: HeroSliderProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-slide functionality
  useEffect(() => {
    if (isHovered || slides.length <= 1) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    intervalRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, autoSlideInterval);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isHovered, autoSlideInterval, slides.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const currentSlide = slides[currentIndex];

  const getOverlayClass = () => {
    switch (currentSlide.overlay) {
      case 'dark':
        return 'bg-black/50';
      case 'light':
        return 'bg-white/30';
      case 'gradient':
      default:
        return 'bg-gradient-to-r from-black/70 via-black/50 to-black/30';
    }
  };

  return (
    <div
      className="relative w-full h-[600px] md:h-[700px] lg:h-[800px] overflow-hidden group mt-16"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Slides */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide.id}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 1, ease: 'easeInOut' }}
          className="absolute inset-0"
        >
          {/* Background Image */}
          {currentSlide.image ? (
            <Image
              src={currentSlide.image}
              alt={currentSlide.title}
              fill
              priority={currentIndex === 0}
              className="object-cover"
              sizes="100vw"
              quality={95}
              unoptimized={currentSlide.image.startsWith('http') && !currentSlide.image.includes('localhost')}
              onError={(e) => {
                console.error('❌ Hero image failed to load:', currentSlide.image);
                // Fallback to gradient on error
                e.currentTarget.style.display = 'none';
              }}
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-charcoal via-deepBlue to-charcoal" />
          )}

          {/* Overlay */}
          <div className={`absolute inset-0 ${getOverlayClass()}`} />

          {/* Content */}
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="space-y-4 md:space-y-6"
              >
                {currentSlide.subtitle && (
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="text-sm md:text-base lg:text-lg mb-2 font-light tracking-[0.3em] uppercase"
                  >
                    {currentSlide.subtitle}
                  </motion.p>
                )}
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 md:mb-6 leading-[1.1] tracking-tight"
                >
                  {currentSlide.title}
                </motion.h1>
                {currentSlide.description && (
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="text-base md:text-lg lg:text-xl mb-8 md:mb-10 max-w-3xl mx-auto font-light leading-relaxed"
                  >
                    {currentSlide.description}
                  </motion.p>
                )}
                {currentSlide.buttonText && currentSlide.buttonLink && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                  >
                    <Link
                      href={currentSlide.buttonLink}
                      className="inline-block bg-white text-charcoal px-8 md:px-12 py-3 md:py-4 rounded-lg font-semibold text-base md:text-lg hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-xl hover:shadow-2xl uppercase tracking-wide"
                    >
                      {currentSlide.buttonText}
                    </Link>
                  </motion.div>
                )}
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      {showNavigation && slides.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 bg-white/95 hover:bg-white text-charcoal p-3 md:p-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110"
            aria-label="Previous slide"
          >
            <FiChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 bg-white/95 hover:bg-white text-charcoal p-3 md:p-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110"
            aria-label="Next slide"
          >
            <FiChevronRight className="w-6 h-6 md:w-8 md:h-8" />
          </button>
        </>
      )}

      {/* Dots Indicator */}
      {showDots && slides.length > 1 && (
        <div className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2 md:gap-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all duration-300 rounded-full ${
                index === currentIndex
                  ? 'w-10 md:w-12 h-2 md:h-3 bg-white shadow-lg'
                  : 'w-2 md:w-3 h-2 md:h-3 bg-white/50 hover:bg-white/80 hover:w-6 md:hover:w-8'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Progress Bar */}
      {!isHovered && slides.length > 1 && (
        <div className="absolute bottom-0 left-0 h-1 bg-white/20 z-20 w-full">
          <motion.div
            className="h-full bg-white shadow-lg"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: autoSlideInterval / 1000, ease: 'linear' }}
            key={currentIndex}
          />
        </div>
      )}

      {/* Slide Counter */}
      {slides.length > 1 && (
        <div className="absolute top-6 right-6 md:top-8 md:right-8 z-20 bg-black/40 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm font-medium">
          {currentIndex + 1} / {slides.length}
        </div>
      )}
    </div>
  );
};

export default HeroSlider;
