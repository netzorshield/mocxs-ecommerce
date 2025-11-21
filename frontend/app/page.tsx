'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CategoryCarousel from '@/components/CategoryCarousel';
import HeroSlider from '@/components/HeroSlider';
import TrendsCarousel from '@/components/TrendsCarousel';

export default function Home() {

  const categories = [
    { name: 'Men', image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=500&h=500&fit=crop', href: '/shop?category=Men' },
    { name: 'Women', image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=500&h=500&fit=crop', href: '/shop?category=Women' },
    { name: 'Kids', image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=500&h=500&fit=crop', href: '/shop?category=Kids' },
    { name: 'Innerwear', image: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?w=500&h=500&fit=crop', href: '/shop?category=Innerwear' },
    { name: 'Sportswear', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=500&fit=crop', href: '/shop?category=Sportswear' },
    { name: 'Accessories', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop', href: '/shop?category=Accessories' },
  ];

  const heroSlides = [
    {
      id: '1',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920&h=1080&fit=crop',
      subtitle: 'Premium Collection',
      title: 'Redefine Comfort.',
      description: 'Redefine You — MOCXS.',
      buttonText: 'Shop Now',
      buttonLink: '/shop',
      overlay: 'gradient',
    },
    {
      id: '2',
      image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1920&h=1080&fit=crop',
      subtitle: 'New Arrivals',
      title: 'Style Meets Comfort',
      description: 'Discover our latest premium fashion collection designed for the modern you',
      buttonText: 'Explore Collection',
      buttonLink: '/shop?category=Women',
      overlay: 'gradient',
    },
    {
      id: '3',
      image: 'https://images.unsplash.com/photo-1594938291221-94f18b5b4b3e?w=1920&h=1080&fit=crop',
      subtitle: 'Limited Edition',
      title: 'Elevate Your Wardrobe',
      description: 'Premium quality clothing for the modern lifestyle',
      buttonText: 'Shop Men\'s',
      buttonLink: '/shop?category=Men',
      overlay: 'gradient',
    },
    {
      id: '4',
      image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=1920&h=1080&fit=crop',
      subtitle: 'Kids Collection',
      title: 'Comfort for Little Ones',
      description: 'Soft, comfortable, and stylish clothing for your kids',
      buttonText: 'Shop Kids',
      buttonLink: '/shop?category=Kids',
      overlay: 'gradient',
    },
  ];

  const trendItems = [
    {
      id: '1',
      titleLine1: 'PANTS',
      titleLine2: 'ON POINT',
      description: 'Comfort you can count on',
      image: '/images/trends/Screenshot 2025-11-14 170142.png',
      backgroundColor: '#F8D7DA',
      buttonColor: '#F8D7DA',
      href: '/shop?category=Women',
    },
    {
      id: '2',
      titleLine1: 'BIG TEE',
      titleLine2: 'ENERGY',
      description: 'Oversized Fit Done Right',
      image: '/images/trends/T-Shirts_d9ea7289-357e-44ba-9a8d-cbaa96a5f891.png',
      backgroundColor: '#FFE5B4',
      buttonColor: '#FFE5B4',
      href: '/shop?category=Men',
    },
    {
      id: '3',
      titleLine1: 'SLEEP',
      titleLine2: 'DRESS EDIT',
      description: 'For dreams and downtime',
      image: '/images/trends/Sleep_Dress_8948eed7-7f89-42a7-9a8f-258df0b24e08.png',
      backgroundColor: '#FFF9C4',
      buttonColor: '#FFF9C4',
      href: '/shop?category=Women',
    },
    {
      id: '4',
      titleLine1: 'PERFORMANCE',
      titleLine2: 'INNERWEAR',
      description: 'Designed for every rep',
      image: '/images/trends/Innerwear_90b511e4-5a96-416d-9077-2bc4b762b713.png',
      backgroundColor: '#D1ECF1',
      buttonColor: '#D1ECF1',
      href: '/shop?category=Innerwear',
    },
    {
      id: '5',
      titleLine1: 'PANTIES,',
      titleLine2: 'PERFECTED',
      description: 'Bikini fit, comfy feel!',
      image: '/images/trends/Panties_dc2b266b-9a3d-4d42-836a-be682f902690.png',
      backgroundColor: '#E1D5E7',
      buttonColor: '#E1D5E7',
      href: '/shop?category=Innerwear',
    },
    {
      id: '6',
      titleLine1: 'SUMMER',
      titleLine2: 'SHORTS',
      description: 'Made for every plan',
      image: '/images/trends/Shorts_3bd61a03-ba6e-43a2-94b6-85478c20b13b.png',
      backgroundColor: '#D4EDDA',
      buttonColor: '#D4EDDA',
      href: '/shop?category=Men',
    },
  ];

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Hero Slider Section */}
        <section className="relative">
          <HeroSlider 
            slides={heroSlides} 
            autoSlideInterval={6000}
            showNavigation={true}
            showDots={true}
          />
        </section>

        {/* Categories Section - Carousel */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-2 text-charcoal">Shop by Category</h2>
              <p className="text-gray-600">Discover our premium collections</p>
            </div>
            <CategoryCarousel categories={categories} autoSlideInterval={4000} />
          </div>
        </section>

        {/* ON-TREND PICKS Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-2 text-charcoal uppercase tracking-tight">ON-TREND PICKS</h2>
              <p className="text-lg md:text-xl text-gray-600 mt-2">Explore Our Promising Line-up</p>
            </div>
            <TrendsCarousel trends={trendItems} autoSlideInterval={5000} />
          </div>
        </section>

        {/* Running Text Banner */}
        <section className="bg-gray-200 py-3 overflow-hidden relative border-t border-black">
          <div className="flex animate-scroll whitespace-nowrap">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="flex items-center mx-8 shrink-0">
                <span className="text-gray-800 text-sm md:text-base">
                  Special discount up to 30% off on all premium collections. Limited time offer valid until{' '}
                  <span className="text-blue-600 font-semibold">31st December 2025</span>. T&C Apply.
                </span>
                <span className="mx-4 w-2 h-2 bg-blue-600 rounded-full shrink-0"></span>
              </div>
            ))}
          </div>
        </section>

        {/* Offers Section */}
        <section className="py-16 bg-deepBlue text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-8">Special Offers</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <h3 className="text-2xl font-bold mb-2">Buy 2 Get 1 Free</h3>
                <p className="text-gray-200">On selected items</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <h3 className="text-2xl font-bold mb-2">Flat 20% Off</h3>
                <p className="text-gray-200">On orders above ₹2000</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <h3 className="text-2xl font-bold mb-2">Free Shipping</h3>
                <p className="text-gray-200">On orders above ₹999</p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Promises */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h3 className="text-3xl font-bold mb-4 text-charcoal">Our Promises</h3>
            <p className="text-gray-600">We are committed to delivering exceptional quality and service to our customers.</p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

