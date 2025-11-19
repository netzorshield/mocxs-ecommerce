'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { FiTrash2, FiPlus, FiMinus } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { getLocalStorage, setLocalStorage, removeLocalStorage } from '@/lib/storage';
import { getImageUrl, PLACEHOLDER_IMAGE } from '@/lib/utils';

export default function CartPage() {
  const router = useRouter();
  const [cart, setCart] = useState<any[]>([]);

  useEffect(() => {
    loadCart();
    
    // Listen for cart updates from other pages
    const handleCartUpdate = () => {
      loadCart();
    };
    
    if (typeof window !== 'undefined') {
      window.addEventListener('cartUpdated', handleCartUpdate);
      return () => window.removeEventListener('cartUpdated', handleCartUpdate);
    }
  }, []);

  const loadCart = () => {
    const cartData = getLocalStorage('cart', []);
    setCart(cartData);
  };

  const updateQuantity = (index: number, change: number) => {
    const newCart = [...cart];
    newCart[index].quantity = Math.max(1, newCart[index].quantity + change);
    setLocalStorage('cart', newCart);
    setCart(newCart);
  };

  const removeItem = (index: number) => {
    const newCart = cart.filter((_, i) => i !== index);
    setLocalStorage('cart', newCart);
    setCart(newCart);
    toast.success('Item removed from cart');
  };

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 999 ? 0 : 50;
  const total = subtotal + shipping;

  if (cart.length === 0) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="pt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center">
              <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
              <p className="text-gray-600 mb-8">Add some products to your cart</p>
              <Link
                href="/shop"
                className="bg-deepBlue text-white px-6 py-3 rounded-lg hover:bg-blue-800 transition-colors inline-block"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="md:col-span-2 space-y-4">
              {cart.map((item, index) => (
                <div key={index} className="flex gap-4 bg-white p-4 rounded-lg shadow-sm border">
                  <div className="relative w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                    {item.image ? (
                      <Image 
                        src={getImageUrl(item.image)} 
                        alt={item.name} 
                        fill 
                        className="object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = PLACEHOLDER_IMAGE;
                        }}
                        unoptimized={getImageUrl(item.image).includes('railway.app')}
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800 mb-1">{item.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">
                      Size: {item.size} | Color: {item.color}
                    </p>
                    <p className="text-deepBlue font-bold mb-2">₹{item.price}</p>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2 border rounded-lg">
                        <button
                          onClick={() => updateQuantity(index, -1)}
                          className="p-2 hover:bg-gray-100"
                        >
                          <FiMinus className="w-4 h-4" />
                        </button>
                        <span className="px-3">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(index, 1)}
                          className="p-2 hover:bg-gray-100"
                        >
                          <FiPlus className="w-4 h-4" />
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(index)}
                        className="text-red-600 hover:text-red-700 p-2"
                      >
                        <FiTrash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg">₹{item.price * item.quantity}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="md:col-span-1">
              <div className="bg-white p-6 rounded-lg shadow-sm border sticky top-24">
                <h2 className="text-xl font-bold mb-4">Order Summary</h2>

                <div className="space-y-3 mb-4">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>₹{subtotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? 'Free' : `₹${shipping}`}</span>
                  </div>
                  <div className="border-t pt-3 flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>₹{total.toFixed(2)}</span>
                  </div>
                </div>

              <Link
                href="/checkout"
                className="block w-full bg-deepBlue text-white text-center px-6 py-3 rounded-lg hover:bg-blue-800 transition-colors mb-4"
                onClick={(e) => {
                  if (cart.length === 0) {
                    e.preventDefault();
                    toast.error('Your cart is empty');
                  }
                }}
              >
                Proceed to Checkout
              </Link>

                <Link
                  href="/shop"
                  className="block w-full text-center text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

