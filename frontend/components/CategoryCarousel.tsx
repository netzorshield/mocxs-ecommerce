'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

interface Category {
  name: string;
  image: string;
  href: string;
}

interface CategoryCarouselProps {
  categories: Category[];
  autoSlideInterval?: number;
}

const CategoryCarousel = ({ categories, autoSlideInterval = 5000 }: CategoryCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [itemsPerSlide, setItemsPerSlide] = useState(6);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Calculate items per slide based on screen size
  useEffect(() => {
    const updateItemsPerSlide = () => {
      if (typeof window === 'undefined') return;
      if (window.innerWidth >= 1024) setItemsPerSlide(6); // Desktop: 6 items
      else if (window.innerWidth >= 768) setItemsPerSlide(4); // Tablet: 4 items
      else if (window.innerWidth >= 640) setItemsPerSlide(3); // Small tablet: 3 items
      else setItemsPerSlide(2); // Mobile: 2 items
    };

    updateItemsPerSlide();
    window.addEventListener('resize', updateItemsPerSlide);
    return () => window.removeEventListener('resize', updateItemsPerSlide);
  }, []);

  // Auto-slide functionality
  useEffect(() => {
    if (isHovered) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    intervalRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const maxIndex = Math.max(0, categories.length - itemsPerSlide);
        if (prevIndex >= maxIndex) {
          return 0; // Loop back to start
        }
        return prevIndex + 1;
      });
    }, autoSlideInterval);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isHovered, autoSlideInterval, categories.length, itemsPerSlide]);

  const goToSlide = (index: number) => {
    const maxIndex = Math.max(0, categories.length - itemsPerSlide);
    setCurrentIndex(Math.min(index, maxIndex));
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => {
      if (prevIndex <= 0) {
        const maxIndex = Math.max(0, categories.length - itemsPerSlide);
        return maxIndex; // Loop to end
      }
      return prevIndex - 1;
    });
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => {
      const maxIndex = Math.max(0, categories.length - itemsPerSlide);
      if (prevIndex >= maxIndex) {
        return 0; // Loop to start
      }
      return prevIndex + 1;
    });
  };

  // Get visible categories for current slide
  const visibleCategories = categories.slice(currentIndex, currentIndex + itemsPerSlide);
  const totalSlides = Math.ceil(categories.length / itemsPerSlide);

  return (
    <div
      className="relative w-full group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Carousel Container */}
      <div className="relative overflow-hidden rounded-lg">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
          >
            {visibleCategories.map((category, idx) => (
              <Link
                key={`${category.name}-${currentIndex}-${idx}`}
                href={category.href}
                className="group/item relative aspect-square overflow-hidden rounded-lg bg-gray-200 hover:shadow-2xl transition-all duration-300 cursor-pointer"
              >
                {/* Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60 z-10" />
                
                {/* Category Image */}
                {category.image ? (
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover group-hover/item:scale-110 transition-transform duration-700 ease-out"
                    sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 16vw"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-gray-300 via-gray-400 to-gray-500 group-hover/item:scale-110 transition-transform duration-700" />
                )}
                
                {/* Category Name */}
                <div className="absolute bottom-0 left-0 right-0 z-20 p-4 text-white">
                  <h3 className="font-bold text-lg md:text-xl mb-1 group-hover/item:translate-y-[-4px] transition-transform duration-300">
                    {category.name}
                  </h3>
                  <p className="text-sm text-white/90 opacity-0 group-hover/item:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover/item:translate-y-0">
                    Shop Now →
                  </p>
                </div>

                {/* Hover Effect Overlay */}
                <div className="absolute inset-0 bg-deepBlue/0 group-hover/item:bg-deepBlue/10 transition-colors duration-300 z-15" />
              </Link>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Arrows */}
      {categories.length > itemsPerSlide && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-30 bg-white/95 hover:bg-white text-charcoal p-3 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110"
            aria-label="Previous category"
          >
            <FiChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-30 bg-white/95 hover:bg-white text-charcoal p-3 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110"
            aria-label="Next category"
          >
            <FiChevronRight className="w-6 h-6" />
          </button>
        </>
      )}

      {/* Dots Indicator */}
      {totalSlides > 1 && (
        <div className="flex justify-center items-center gap-2 mt-8">
          {Array.from({ length: totalSlides }).map((_, index) => {
            const slideStartIndex = index * itemsPerSlide;
            const isActive = currentIndex >= slideStartIndex && currentIndex < slideStartIndex + itemsPerSlide;
            
            return (
              <button
                key={index}
                onClick={() => goToSlide(slideStartIndex)}
                className={`transition-all duration-300 rounded-full ${
                  isActive
                    ? 'w-10 h-2 bg-deepBlue shadow-lg'
                    : 'w-2 h-2 bg-gray-300 hover:bg-gray-400 hover:w-6'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CategoryCarousel;
