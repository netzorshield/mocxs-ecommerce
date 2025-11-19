'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import api from '@/lib/api';
import { FiFilter, FiX } from 'react-icons/fi';
import { getImageUrl, PLACEHOLDER_IMAGE } from '@/lib/utils';

export default function ShopPage() {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: searchParams.get('category') || '',
    minPrice: '',
    maxPrice: '',
    search: '',
    sort: 'newest',
  });
  const [showFilters, setShowFilters] = useState(false);

  // Sync filters with URL params when they change
  useEffect(() => {
    const categoryFromUrl = searchParams.get('category') || '';
    const searchFromUrl = searchParams.get('search') || '';
    setFilters(prev => {
      const updated = { ...prev };
      if (prev.category !== categoryFromUrl) {
        updated.category = categoryFromUrl;
      }
      if (prev.search !== searchFromUrl) {
        updated.search = searchFromUrl;
      }
      return updated;
    });
  }, [searchParams]);

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.category, filters.minPrice, filters.maxPrice, filters.search, filters.sort]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const params: any = {};
      if (filters.category) params.category = filters.category;
      if (filters.minPrice) params.minPrice = filters.minPrice;
      if (filters.maxPrice) params.maxPrice = filters.maxPrice;
      if (filters.search) params.search = filters.search;
      if (filters.sort) params.sort = filters.sort;

      const response = await api.get('/products', { params });
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const categories = ['Men', 'Women', 'Kids', 'Innerwear', 'Sportswear', 'Accessories'];

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-charcoal mb-4 md:mb-0">Shop</h1>
            <div className="flex items-center space-x-4 w-full md:w-auto">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2 px-4 py-2 border rounded-lg hover:bg-gray-50"
              >
                <FiFilter />
                <span>Filters</span>
              </button>
              <select
                value={filters.sort}
                onChange={(e) => setFilters({ ...filters, sort: e.target.value })}
                className="px-4 py-2 border rounded-lg"
              >
                <option value="newest">Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="popular">Popular</option>
              </select>
            </div>
          </div>

          {/* Filters Sidebar */}
          {showFilters && (
            <div className="fixed inset-0 bg-black/50 z-50 md:hidden" onClick={() => setShowFilters(false)}>
              <div className="bg-white h-full w-80 p-6 overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold">Filters</h2>
                  <button onClick={() => setShowFilters(false)}>
                    <FiX className="w-6 h-6" />
                  </button>
                </div>
                <FilterContent filters={filters} setFilters={setFilters} categories={categories} />
              </div>
            </div>
          )}

          <div className="flex gap-8">
            {/* Desktop Filters */}
            <aside className="hidden md:block w-64 flex-shrink-0">
              <FilterContent filters={filters} setFilters={setFilters} categories={categories} />
            </aside>

            {/* Products Grid */}
            <div className="flex-1">
              {loading ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {[...Array(12)].map((_, i) => (
                    <div key={i} className="animate-pulse">
                      <div className="bg-gray-200 aspect-square rounded-lg mb-4" />
                      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                      <div className="h-4 bg-gray-200 rounded w-1/2" />
                    </div>
                  ))}
                </div>
              ) : products.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">No products found</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {products.map((product) => (
                    <Link
                      key={product._id}
                      href={`/product/${product._id}`}
                      className="group"
                    >
                      <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden mb-4">
                        {product.images && product.images[0] ? (
                          <Image
                            src={getImageUrl(product.images[0])}
                            alt={product.name}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-300"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = PLACEHOLDER_IMAGE;
                            }}
                            unoptimized={getImageUrl(product.images[0]).includes('railway.app')}
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-200" />
                        )}
                      </div>
                      <h3 className="font-semibold text-gray-800 mb-1">{product.name}</h3>
                      <p className="text-deepBlue font-bold">₹{product.price}</p>
                      {product.originalPrice && product.originalPrice > product.price && (
                        <p className="text-gray-500 text-sm line-through">₹{product.originalPrice}</p>
                      )}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function FilterContent({ filters, setFilters, categories }: any) {
  return (
    <div className="space-y-6">
      {/* Category Filter */}
      <div>
        <h3 className="font-semibold mb-3">Category</h3>
        <div className="space-y-2">
          {categories.map((cat: string) => (
            <label key={cat} className="flex items-center">
              <input
                type="radio"
                name="category"
                value={cat}
                checked={filters.category === cat}
                onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                className="mr-2"
              />
              <span>{cat}</span>
            </label>
          ))}
          <label className="flex items-center">
            <input
              type="radio"
              name="category"
              value=""
              checked={filters.category === ''}
              onChange={(e) => setFilters({ ...filters, category: e.target.value })}
              className="mr-2"
            />
            <span>All</span>
          </label>
        </div>
      </div>

      {/* Price Filter */}
      <div>
        <h3 className="font-semibold mb-3">Price Range</h3>
        <div className="flex space-x-2">
          <input
            type="number"
            placeholder="Min"
            value={filters.minPrice}
            onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
            className="w-full px-3 py-2 border rounded-lg"
          />
          <input
            type="number"
            placeholder="Max"
            value={filters.maxPrice}
            onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>
      </div>

      {/* Search */}
      <div>
        <h3 className="font-semibold mb-3">Search</h3>
        <input
          type="text"
          placeholder="Search products..."
          value={filters.search}
          onChange={(e) => setFilters({ ...filters, search: e.target.value })}
          className="w-full px-3 py-2 border rounded-lg"
        />
      </div>

      {/* Clear Filters */}
      <button
        onClick={() => setFilters({ category: '', minPrice: '', maxPrice: '', search: '', sort: 'newest' })}
        className="w-full px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors"
      >
        Clear Filters
      </button>
    </div>
  );
}

