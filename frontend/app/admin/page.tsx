'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import api from '@/lib/api';
import { getCurrentUser } from '@/lib/auth';
import { FiPackage, FiUsers, FiShoppingBag, FiDollarSign, FiArrowRight } from 'react-icons/fi';

export default function AdminDashboard() {
  const router = useRouter();
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    checkAdmin();
  }, []);

  const checkAdmin = async () => {
    const userData = await getCurrentUser();
    if (!userData) {
      router.push('/admin/login');
      return;
    }
    
    if (userData.role !== 'admin') {
      router.push('/admin/login');
      return;
    }
    
    setUser(userData);
    loadStats();
  };

  const loadStats = async () => {
    try {
      const response = await api.get('/admin/stats');
      setStats(response.data);
    } catch (error) {
      console.error('Error loading stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="pt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="animate-pulse">Loading...</div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Total Products</p>
                  <p className="text-3xl font-bold text-charcoal">{stats?.totalProducts || 0}</p>
                </div>
                <FiPackage className="w-12 h-12 text-deepBlue opacity-20" />
              </div>
              <Link href="/admin/products" className="text-deepBlue text-sm mt-4 inline-flex items-center hover:underline">
                Manage Products <FiArrowRight className="ml-1" />
              </Link>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Total Users</p>
                  <p className="text-3xl font-bold text-charcoal">{stats?.totalUsers || 0}</p>
                </div>
                <FiUsers className="w-12 h-12 text-green-600 opacity-20" />
              </div>
              <Link href="/admin/users" className="text-green-600 text-sm mt-4 inline-flex items-center hover:underline">
                Manage Users <FiArrowRight className="ml-1" />
              </Link>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Total Orders</p>
                  <p className="text-3xl font-bold text-charcoal">{stats?.totalOrders || 0}</p>
                </div>
                <FiShoppingBag className="w-12 h-12 text-yellow-600 opacity-20" />
              </div>
              <Link href="/admin/orders" className="text-yellow-600 text-sm mt-4 inline-flex items-center hover:underline">
                Manage Orders <FiArrowRight className="ml-1" />
              </Link>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Total Revenue</p>
                  <p className="text-3xl font-bold text-charcoal">₹{stats?.totalRevenue?.toLocaleString() || 0}</p>
                </div>
                <FiDollarSign className="w-12 h-12 text-green-600 opacity-20" />
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Link href="/admin/products/new" className="bg-deepBlue text-white p-6 rounded-lg shadow-md hover:bg-blue-800 transition-colors">
              <h3 className="text-xl font-bold mb-2">Add New Product</h3>
              <p className="text-blue-100">Create a new product listing</p>
            </Link>

            <Link href="/admin/users" className="bg-green-600 text-white p-6 rounded-lg shadow-md hover:bg-green-700 transition-colors">
              <h3 className="text-xl font-bold mb-2">Manage Users</h3>
              <p className="text-green-100">View and manage user accounts</p>
            </Link>

            <Link href="/admin/orders" className="bg-yellow-600 text-white p-6 rounded-lg shadow-md hover:bg-yellow-700 transition-colors">
              <h3 className="text-xl font-bold mb-2">View Orders</h3>
              <p className="text-yellow-100">Process and track orders</p>
            </Link>
          </div>

          {/* Recent Orders */}
          {stats?.recentOrders && stats.recentOrders.length > 0 && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold mb-4">Recent Orders</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2">Order ID</th>
                      <th className="text-left py-2">Customer</th>
                      <th className="text-left py-2">Total</th>
                      <th className="text-left py-2">Status</th>
                      <th className="text-left py-2">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stats.recentOrders.map((order: any) => (
                      <tr key={order._id} className="border-b hover:bg-gray-50">
                        <td className="py-2">
                          <Link href={`/admin/orders/${order._id}`} className="text-deepBlue hover:underline">
                            {order._id.slice(-8).toUpperCase()}
                          </Link>
                        </td>
                        <td className="py-2">{order.user?.name || 'N/A'}</td>
                        <td className="py-2">₹{order.total}</td>
                        <td className="py-2">
                          <span className={`px-2 py-1 rounded text-xs ${
                            order.orderStatus === 'delivered' ? 'bg-green-100 text-green-800' :
                            order.orderStatus === 'shipped' ? 'bg-blue-100 text-blue-800' :
                            order.orderStatus === 'processing' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {order.orderStatus}
                          </span>
                        </td>
                        <td className="py-2">{new Date(order.createdAt).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}


