'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi';

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4 text-charcoal">Contact Us</h1>
          <p className="text-center text-gray-600 mb-12">Get in touch with us. We'd love to hear from you.</p>

          {/* Contact Info */}
          <div className="max-w-2xl mx-auto">
            <div className="space-y-8">
              <div className="flex items-start space-x-6 p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 bg-deepBlue/10 rounded-full flex items-center justify-center">
                    <FiMail className="w-7 h-7 text-deepBlue" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2 text-charcoal">Email</h3>
                  <p className="text-gray-600 mb-1">support@mocxs.com</p>
                  <p className="text-gray-600">info@mocxs.com</p>
                </div>
              </div>

              <div className="flex items-start space-x-6 p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 bg-deepBlue/10 rounded-full flex items-center justify-center">
                    <FiPhone className="w-7 h-7 text-deepBlue" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2 text-charcoal">Phone</h3>
                  <p className="text-gray-600 mb-1">+91 1800-XXX-XXXX</p>
                  <p className="text-gray-600">Mon-Sat: 9 AM - 6 PM IST</p>
                </div>
              </div>

              <div className="flex items-start space-x-6 p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 bg-deepBlue/10 rounded-full flex items-center justify-center">
                    <FiMapPin className="w-7 h-7 text-deepBlue" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2 text-charcoal">Address</h3>
                  <p className="text-gray-600">
                    MOCXS Headquarters<br />
                    Kerala 673579<br />
                    India
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-10 p-8 bg-gradient-to-br from-deepBlue/5 to-charcoal/5 rounded-xl border border-gray-200">
              <h3 className="text-2xl font-semibold mb-4 text-charcoal">Customer Service</h3>
              <p className="text-gray-700 mb-4 leading-relaxed">
                Our customer service team is available to help you with any questions or concerns.
              </p>
              <div className="space-y-2 text-gray-700">
                <p>
                  <strong className="text-charcoal">Response Time:</strong> Within 24 hours
                </p>
                <p>
                  <strong className="text-charcoal">Business Hours:</strong> Monday - Saturday, 9 AM - 6 PM IST
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

