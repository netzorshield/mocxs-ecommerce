'use client';

import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Autoplay, Navigation, Pagination } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface TrendItem {
  id: string;
  titleLine1: string;
  titleLine2: string;
  description: string;
  image: string;
  backgroundColor: string;
  buttonColor: string;
  href: string;
}

interface TrendsCarouselProps {
  trends: TrendItem[];
  autoSlideInterval?: number;
}

const TrendsCarousel = ({ trends, autoSlideInterval = 5000 }: TrendsCarouselProps) => {
  const swiperRef = useRef<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [imageLoaded, setImageLoaded] = useState<{ [key: string]: boolean }>({});
  
  // Pre-mark first 3 images as loading to show them immediately
  useEffect(() => {
    const initialLoaded: { [key: string]: boolean } = {};
    trends.slice(0, 3).forEach((trend) => {
      initialLoaded[trend.id] = false; // Will be set to true when loaded
    });
    setImageLoaded(initialLoaded);
  }, [trends]);

  // Ensure autoplay starts immediately when component loads
  useEffect(() => {
    if (swiperRef.current && swiperRef.current.autoplay) {
      // Start autoplay immediately
      swiperRef.current.autoplay.start();
    }
  }, []);

  return (
    <div className="relative w-full">
      <Swiper
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
          // Start autoplay immediately when Swiper is initialized
          if (swiper.autoplay) {
            swiper.autoplay.start();
          }
        }}
        onSlideChange={(swiper) => {
          setActiveIndex(swiper.activeIndex);
        }}
        effect="coverflow"
        grabCursor={true}
        centeredSlides={true}
        slidesPerView="auto"
        modules={[EffectCoverflow, Autoplay, Navigation, Pagination]}
        autoplay={{
          delay: autoSlideInterval,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
          waitForTransition: false,
        }}
        navigation={{
          nextEl: '.swiper-button-next-trends',
          prevEl: '.swiper-button-prev-trends',
        }}
        pagination={{
          el: '.swiper-pagination-trends',
          clickable: true,
          bulletClass: 'swiper-pagination-bullet-trends',
          bulletActiveClass: 'swiper-pagination-bullet-active-trends',
        }}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 300,
          modifier: 1,
          slideShadows: false,
          scale: 0.85,
        }}
        className="trends-swiper"
        style={{
          width: '100%',
          paddingTop: '50px',
          paddingBottom: '50px',
        }}
      >
        {trends.map((trend, index) => {
          const isActive = index === activeIndex;
          const isLoaded = imageLoaded[trend.id] || false;
          
          return (
            <SwiperSlide key={trend.id}>
              <Link
                href={trend.href}
                className="group relative block w-full h-full overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300"
                style={{ 
                  backgroundColor: 'transparent',
                  width: '370px',
                  height: '300px',
                  display: 'block',
                  position: 'relative'
                }}
              >
                {/* Image - Full Container */}
                <div 
                  className="trend-image-container absolute inset-0 z-20 overflow-hidden"
                  style={{
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    width: '100%',
                    height: '100%'
                  }}
                >
                  <img
                    src={trend.image}
                    alt={trend.titleLine2}
                    className="w-full h-full"
                    style={{ 
                      display: 'block',
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      objectPosition: 'center',
                      margin: 0,
                      padding: 0
                    }}
                    loading={isActive ? 'eager' : 'lazy'}
                    onLoad={() => {
                      console.log('✅ Image loaded:', trend.image);
                    }}
                    onError={(e) => {
                      console.error('❌ Image failed:', trend.image);
                      console.error('Tried URL:', e.currentTarget.src);
                    }}
                  />
                </div>
            </Link>
          </SwiperSlide>
          );
        })}
      </Swiper>

      {/* Custom Navigation Arrows */}
      <button
        className="swiper-button-prev-trends absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-6 z-30 bg-white border-2 border-gray-200 text-charcoal p-3 md:p-4 rounded-full shadow-md hover:shadow-lg hover:border-gray-300 transition-all duration-300 hover:scale-110"
        aria-label="Previous trends"
      >
        <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        className="swiper-button-next-trends absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-6 z-30 bg-white border-2 border-gray-200 text-charcoal p-3 md:p-4 rounded-full shadow-md hover:shadow-lg hover:border-gray-300 transition-all duration-300 hover:scale-110"
        aria-label="Next trends"
      >
        <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Custom Pagination Dots */}
      <div className="swiper-pagination-trends flex justify-center items-center gap-2 mt-8"></div>

      <style jsx global>{`
        .trends-swiper {
          overflow: visible !important;
        }
        
        .trends-swiper .swiper-wrapper {
          display: flex;
          align-items: center;
        }
        
        .trends-swiper .swiper-slide {
          width: 370px !important;
          height: 300px !important;
          display: flex;
          justify-content: center;
          align-items: center;
          transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          transform-style: preserve-3d;
          padding: 0 !important;
          margin: 0 !important;
        }
        
        .trends-swiper .swiper-slide > a {
          width: 100% !important;
          height: 100% !important;
          display: block !important;
          position: relative !important;
        }
        
        @media (max-width: 767px) {
          .trends-swiper .swiper-slide {
            width: 90% !important;
            max-width: 370px !important;
            height: calc(90vw * 0.8108) !important; /* Maintain 370:300 aspect ratio */
          }
        }
        
        /* Ensure slide content is visible */
        .trends-swiper .swiper-slide > * {
          transform-style: preserve-3d;
          backface-visibility: visible;
        }
        
        /* Active (center) card - comes forward */
        .trends-swiper .swiper-slide-active {
          transform: scale(1.1) translateZ(100px) !important;
          z-index: 10 !important;
          opacity: 1 !important;
        }
        
        .trends-swiper .swiper-slide-active img {
          opacity: 1 !important;
          visibility: visible !important;
        }
        
        /* Previous card - goes back left */
        .trends-swiper .swiper-slide-prev {
          transform: scale(0.8) translateX(-20%) translateZ(-150px) !important;
          z-index: 1 !important;
          opacity: 0.5 !important;
        }
        
        .trends-swiper .swiper-slide-prev img {
          opacity: 0.5 !important;
          visibility: visible !important;
        }
        
        /* Next card - goes back right */
        .trends-swiper .swiper-slide-next {
          transform: scale(0.8) translateX(20%) translateZ(-150px) !important;
          z-index: 1 !important;
          opacity: 0.5 !important;
        }
        
        .trends-swiper .swiper-slide-next img {
          opacity: 0.5 !important;
          visibility: visible !important;
        }
        
        /* Other cards - further back */
        .trends-swiper .swiper-slide:not(.swiper-slide-active):not(.swiper-slide-prev):not(.swiper-slide-next) {
          transform: scale(0.65) translateZ(-250px) !important;
          z-index: 0 !important;
          opacity: 0.2 !important;
        }
        
        .trends-swiper .swiper-slide:not(.swiper-slide-active):not(.swiper-slide-prev):not(.swiper-slide-next) img {
          opacity: 0.2 !important;
          visibility: visible !important;
        }
        
        /* Ensure images are always visible and properly positioned */
        .trends-swiper .swiper-slide img {
          display: block !important;
          width: 100% !important;
          height: 100% !important;
          object-fit: cover !important;
          object-position: center !important;
          opacity: 1 !important;
          visibility: visible !important;
        }
        
        /* Fix for Swiper coverflow - ensure images stay visible */
        .trends-swiper .swiper-slide > * {
          transform-style: preserve-3d !important;
          backface-visibility: visible !important;
        }
        
        .trends-swiper .swiper-slide img {
          transform: translateZ(0) !important;
          backface-visibility: visible !important;
        }
        
        /* Image container - fills entire card */
        .trends-swiper .swiper-slide .trend-image-container {
          position: absolute !important;
          top: 0 !important;
          left: 0 !important;
          right: 0 !important;
          bottom: 0 !important;
          width: 100% !important;
          height: 100% !important;
          z-index: 20 !important;
          margin: 0 !important;
          padding: 0 !important;
        }
        
        /* Ensure image fills container completely without overlapping (370x300) */
        .trends-swiper .swiper-slide .trend-image-container img {
          width: 100% !important;
          height: 100% !important;
          object-fit: cover !important;
          object-position: center !important;
          display: block !important;
          margin: 0 !important;
          padding: 0 !important;
          min-width: 100% !important;
          min-height: 100% !important;
        }
        
        /* Pagination dots styling */
        .swiper-pagination-bullet-trends {
          width: 8px;
          height: 8px;
          background: #d1d5db;
          opacity: 1;
          transition: all 0.3s;
        }
        
        .swiper-pagination-bullet-active-trends {
          width: 12px;
          height: 12px;
          background: #1f2937;
        }
        
        /* Navigation buttons */
        .swiper-button-prev-trends,
        .swiper-button-next-trends {
          cursor: pointer;
        }
        
        .swiper-button-prev-trends.swiper-button-disabled,
        .swiper-button-next-trends.swiper-button-disabled {
          opacity: 0.35;
          cursor: auto;
          pointer-events: none;
        }
      `}</style>
    </div>
  );
};

export default TrendsCarousel;
