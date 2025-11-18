'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { FiMenu, FiX, FiShoppingCart, FiUser, FiSearch } from 'react-icons/fi';
import { getAuthToken, logout, getCurrentUser } from '@/lib/auth';
import api from '@/lib/api';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [cartCount, setCartCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);

    // Check auth status
    const token = getAuthToken();
    if (token) {
      getCurrentUser().then(setUser).catch(() => setUser(null));
    }

    // Get cart count from localStorage
    const updateCartCount = () => {
      try {
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        setCartCount(cart.length);
      } catch (error) {
        console.error('Error reading cart:', error);
        setCartCount(0);
      }
    };

    updateCartCount();

    // Listen for cart updates
    window.addEventListener('cartUpdated', updateCartCount);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('cartUpdated', updateCartCount);
    };
  }, []);

  // Sync search query with URL parameter
  useEffect(() => {
    if (pathname === '/shop') {
      const searchFromUrl = searchParams.get('search') || '';
      // Only update if different to avoid loops
      if (searchFromUrl !== searchQuery) {
        setSearchQuery(searchFromUrl);
      }
    } else {
      // Clear search when not on shop page
      if (searchQuery) {
        setSearchQuery('');
        setSearchResults([]);
        setShowSuggestions(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams, pathname]);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Debounced search
  useEffect(() => {
    const searchProducts = async () => {
      const trimmedQuery = searchQuery.trim();
      if (trimmedQuery.length === 0) {
        setSearchResults([]);
        setShowSuggestions(false);
        // If on shop page and search is cleared, navigate to shop without search param
        if (pathname === '/shop' && searchParams.get('search')) {
          const currentParams = new URLSearchParams(window.location.search);
          currentParams.delete('search');
          const newUrl = currentParams.toString() 
            ? `/shop?${currentParams.toString()}`
            : '/shop';
          router.push(newUrl);
        }
        return;
      }

      setIsSearching(true);
      try {
        const response = await api.get('/products', {
          params: {
            search: trimmedQuery,
          },
        });
        
        // Filter products that start with the search query (case insensitive)
        const filtered = response.data.filter((product: any) =>
          product.name.toLowerCase().startsWith(trimmedQuery.toLowerCase())
        ).slice(0, 5); // Limit to 5 results
        
        setSearchResults(filtered);
        setShowSuggestions(filtered.length > 0);
      } catch (error) {
        console.error('Search error:', error);
        setSearchResults([]);
        setShowSuggestions(false);
      } finally {
        setIsSearching(false);
      }
    };

    const debounceTimer = setTimeout(searchProducts, 300);
    return () => clearTimeout(debounceTimer);
  }, [searchQuery, pathname, router, searchParams]);

  const handleLogout = () => {
    logout();
    setUser(null);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedQuery = searchQuery.trim();
    if (trimmedQuery.length > 0) {
      setShowSuggestions(false);
      router.push(`/shop?search=${encodeURIComponent(trimmedQuery)}`);
    }
  };

  const handleProductClick = (productId: string) => {
    setShowSuggestions(false);
    setSearchQuery('');
    router.push(`/product/${productId}`);
  };

  const categories = [
    { name: 'Men', href: '/shop?category=Men' },
    { name: 'Women', href: '/shop?category=Women' },
    { name: 'Kids', href: '/shop?category=Kids' },
    { name: 'Innerwear', href: '/shop?category=Innerwear' },
    { name: 'Sportswear', href: '/shop?category=Sportswear' },
    { name: 'Accessories', href: '/shop?category=Accessories' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md' : 'bg-white/95 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Bar */}
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-charcoal">MOCXS</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {categories.map((cat) => (
              <Link
                key={cat.name}
                href={cat.href}
                className="text-gray-700 hover:text-deepBlue transition-colors font-medium"
              >
                {cat.name}
              </Link>
            ))}
          </nav>

          {/* Right Icons */}
          <div className="flex items-center space-x-4">
            {/* Search Bar */}
            <div ref={searchRef} className="relative hidden md:block">
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    const newValue = e.target.value;
                    setSearchQuery(newValue);
                    if (newValue.trim().length > 0) {
                      setShowSuggestions(true);
                    } else {
                      setShowSuggestions(false);
                      setSearchResults([]);
                    }
                  }}
                  onFocus={() => {
                    if (searchResults.length > 0 && searchQuery.trim().length > 0) {
                      setShowSuggestions(true);
                    }
                  }}
                  placeholder="Search products..."
                  className="w-48 lg:w-64 px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-deepBlue text-sm"
                />
                <button
                  type="submit"
                  disabled={!searchQuery.trim()}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-deepBlue hover:text-blue-800 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors"
                  aria-label="Search"
                >
                  <FiSearch className="w-5 h-5" />
                </button>
              </form>

              {/* Search Suggestions Dropdown */}
              {showSuggestions && searchQuery.trim().length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-96 overflow-y-auto z-50">
                  {isSearching ? (
                    <div className="p-4 text-center text-gray-500 text-sm">
                      Searching...
                    </div>
                  ) : searchResults.length > 0 ? (
                    <div className="py-2">
                      {searchResults.map((product: any) => (
                        <button
                          key={product._id}
                          onClick={() => handleProductClick(product._id)}
                          className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-left"
                        >
                          <div className="relative w-12 h-12 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                            {product.images && product.images[0] ? (
                              <Image
                                src={product.images[0]}
                                alt={product.name}
                                fill
                                className="object-cover"
                              />
                            ) : (
                              <div className="w-full h-full bg-gray-200" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">
                              {product.name}
                            </p>
                            <p className="text-sm text-deepBlue font-semibold">
                              ₹{product.price}
                            </p>
                          </div>
                        </button>
                      ))}
                      <div className="border-t border-gray-200 px-4 py-2">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            setShowSuggestions(false);
                            router.push(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
                          }}
                          className="w-full text-sm text-deepBlue hover:underline text-center"
                        >
                          View all results for &quot;{searchQuery}&quot;
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="p-4 text-center text-gray-500 text-sm">
                      No products found starting with &quot;{searchQuery}&quot;
                    </div>
                  )}
                </div>
              )}
            </div>
            {/* Mobile Search Icon */}
            <button
              onClick={() => router.push('/shop')}
              className="md:hidden p-2 hover:text-deepBlue transition-colors"
              aria-label="Search"
            >
              <FiSearch className="w-5 h-5" />
            </button>
            <Link href="/cart" className="relative p-2 hover:text-deepBlue transition-colors">
              <FiShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-deepBlue text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
            {user ? (
              <div className="relative group">
                <button className="p-2 hover:text-deepBlue transition-colors">
                  <FiUser className="w-5 h-5" />
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  {user.role === 'admin' && (
                    <Link href="/admin" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 font-semibold text-deepBlue">
                      Admin Panel
                    </Link>
                  )}
                  <Link href="/account" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    My Account
                  </Link>
                  <Link href="/account/orders" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Orders
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <Link href="/login" className="text-gray-700 hover:text-deepBlue transition-colors font-medium">
                Login
              </Link>
            )}
            <button
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-3">
              {categories.map((cat) => (
                <Link
                  key={cat.name}
                  href={cat.href}
                  className="text-gray-700 hover:text-deepBlue transition-colors font-medium py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {cat.name}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

