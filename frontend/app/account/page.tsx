'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getCurrentUser, logout } from '@/lib/auth';
import Link from 'next/link';
import toast from 'react-hot-toast';
import api from '@/lib/api';
import { validatePhone } from '@/lib/utils';
import { FiEdit, FiTrash2, FiX } from 'react-icons/fi';

export default function AccountPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState<any>(null);
  const [addressForm, setAddressForm] = useState({
    name: '',
    phone: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    pincode: '',
    isDefault: false,
  });

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const userData = await getCurrentUser();
    if (!userData) {
      router.push('/login');
      return;
    }
    setUser(userData);
    setLoading(false);
  };

  const resetForm = () => {
    setAddressForm({
      name: '',
      phone: '',
      addressLine1: '',
      addressLine2: '',
      city: '',
      state: '',
      pincode: '',
      isDefault: false,
    });
    setEditingAddress(null);
    setShowAddressForm(false);
  };

  const handleAddAddress = () => {
    resetForm();
    setShowAddressForm(true);
  };

  const handleEditAddress = (address: any) => {
    setAddressForm({
      name: address.name || '',
      phone: address.phone || '',
      addressLine1: address.addressLine1 || '',
      addressLine2: address.addressLine2 || '',
      city: address.city || '',
      state: address.state || '',
      pincode: address.pincode || '',
      isDefault: address.isDefault || false,
    });
    setEditingAddress(address);
    setShowAddressForm(true);
  };

  const handleDeleteAddress = async (addressId: string) => {
    if (!confirm('Are you sure you want to delete this address?')) return;

    if (!addressId) {
      toast.error('Invalid address ID');
      return;
    }

    try {
      const response = await api.delete(`/users/address/${addressId}`);
      toast.success('Address deleted successfully');
      await loadUser();
    } catch (error: any) {
      console.error('Delete address error:', error);
      toast.error(error.response?.data?.message || 'Failed to delete address');
    }
  };

  const handleSubmitAddress = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!addressForm.name || !addressForm.phone || !addressForm.addressLine1 || 
        !addressForm.city || !addressForm.state || !addressForm.pincode) {
      toast.error('Please fill in all required fields');
      return;
    }

    // Validate phone number
    if (!validatePhone(addressForm.phone)) {
      toast.error('Please enter a valid 10-digit phone number');
      return;
    }

    try {
      if (editingAddress) {
        const addressId = editingAddress._id || editingAddress.id;
        if (!addressId) {
          toast.error('Invalid address ID');
          return;
        }
        await api.put(`/users/address/${addressId}`, addressForm);
        toast.success('Address updated successfully');
      } else {
        await api.post('/users/address', addressForm);
        toast.success('Address added successfully');
      }
      resetForm();
      await loadUser();
    } catch (error: any) {
      console.error('Address save error:', error);
      toast.error(error.response?.data?.message || 'Failed to save address');
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
    <div className="min-h-screen">
      <Header />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-3xl font-bold mb-8">My Account</h1>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-6">
              {/* Profile Info */}
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h2 className="text-xl font-bold mb-4">Profile Information</h2>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm text-gray-600">Name</label>
                    <p className="font-semibold">{user.name}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Email</label>
                    <p className="font-semibold">{user.email}</p>
                  </div>
                  {user.phone && (
                    <div>
                      <label className="text-sm text-gray-600">Phone</label>
                      <p className="font-semibold">{user.phone}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Saved Addresses */}
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold">Saved Addresses</h2>
                  <button 
                    onClick={handleAddAddress}
                    className="text-deepBlue hover:underline text-sm font-medium"
                  >
                    Add New
                  </button>
                </div>
                {user.addresses && user.addresses.length > 0 ? (
                  <div className="space-y-4">
                    {user.addresses.map((addr: any, index: number) => (
                      <div key={addr._id || index} className="border p-4 rounded-lg relative group">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <p className="font-semibold">{addr.name}</p>
                            {addr.phone && <p className="text-gray-600 text-sm">{addr.phone}</p>}
                            <p className="text-gray-600 text-sm mt-1">{addr.addressLine1}</p>
                            {addr.addressLine2 && <p className="text-gray-600 text-sm">{addr.addressLine2}</p>}
                            <p className="text-gray-600 text-sm">
                              {addr.city}, {addr.state} - {addr.pincode}
                            </p>
                            {addr.isDefault && (
                              <span className="inline-block mt-2 text-xs bg-deepBlue text-white px-2 py-1 rounded">
                                Default
                              </span>
                            )}
                          </div>
                          <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                              onClick={() => handleEditAddress(addr)}
                              className="p-2 text-deepBlue hover:bg-deepBlue/10 rounded"
                              title="Edit"
                            >
                              <FiEdit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteAddress(addr._id || addr.id)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded"
                              title="Delete"
                            >
                              <FiTrash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">No saved addresses</p>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="md:col-span-1">
              <div className="bg-white p-6 rounded-lg shadow-sm border space-y-4">
                <Link
                  href="/account/orders"
                  className="block text-gray-700 hover:text-deepBlue transition-colors"
                >
                  My Orders
                </Link>
                <button
                  onClick={() => {
                    logout();
                    toast.success('Logged out successfully');
                  }}
                  className="block w-full text-left text-red-600 hover:text-red-700 transition-colors"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Address Form Modal */}
      {showAddressForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b p-6 flex justify-between items-center">
              <h2 className="text-2xl font-bold">
                {editingAddress ? 'Edit Address' : 'Add New Address'}
              </h2>
              <button
                onClick={resetForm}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <FiX className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={handleSubmitAddress} className="p-6 space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={addressForm.name}
                    onChange={(e) => setAddressForm({ ...addressForm, name: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-deepBlue"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Phone <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={addressForm.phone}
                    onChange={(e) => setAddressForm({ ...addressForm, phone: e.target.value })}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                      addressForm.phone && !validatePhone(addressForm.phone)
                        ? 'border-red-500 focus:ring-red-500'
                        : 'focus:ring-deepBlue'
                    }`}
                    placeholder="10-digit mobile number"
                  />
                  {addressForm.phone && !validatePhone(addressForm.phone) && (
                    <p className="text-red-500 text-sm mt-1">
                      Please enter a valid 10-digit phone number (starting with 6-9)
                    </p>
                  )}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Address Line 1 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={addressForm.addressLine1}
                  onChange={(e) => setAddressForm({ ...addressForm, addressLine1: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-deepBlue"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Address Line 2</label>
                <input
                  type="text"
                  value={addressForm.addressLine2}
                  onChange={(e) => setAddressForm({ ...addressForm, addressLine2: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-deepBlue"
                />
              </div>
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    City <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={addressForm.city}
                    onChange={(e) => setAddressForm({ ...addressForm, city: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-deepBlue"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    State <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={addressForm.state}
                    onChange={(e) => setAddressForm({ ...addressForm, state: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-deepBlue"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Pincode <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={addressForm.pincode}
                    onChange={(e) => setAddressForm({ ...addressForm, pincode: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-deepBlue"
                  />
                </div>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isDefault"
                  checked={addressForm.isDefault}
                  onChange={(e) => setAddressForm({ ...addressForm, isDefault: e.target.checked })}
                  className="w-4 h-4 text-deepBlue border-gray-300 rounded focus:ring-deepBlue"
                />
                <label htmlFor="isDefault" className="ml-2 text-sm text-gray-700">
                  Set as default address
                </label>
              </div>
              <div className="flex space-x-4 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-deepBlue text-white px-6 py-3 rounded-lg hover:bg-blue-800 transition-colors font-medium"
                >
                  {editingAddress ? 'Update Address' : 'Add Address'}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

