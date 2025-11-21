import Link from 'next/link';
import { FiFacebook, FiInstagram } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-charcoal text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-start gap-8 md:gap-0">
          {/* About */}
          <div className="flex-1">
            <h3 className="text-xl font-bold mb-4">MOCXS</h3>
            <p className="text-gray-300 text-sm">
              Redefine Comfort. Redefine You. Premium Indian clothing and lifestyle brand.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex-1 md:text-center">
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link href="/shop" className="hover:text-white transition-colors">Shop</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="flex-1 md:text-right">
            <h4 className="font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-4 mt-4 md:justify-end">
              <a href="https://www.facebook.com/share/17hBZ7mYHi/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" title="Facebook">
                <FiFacebook className="w-5 h-5" />
              </a>
              <a href="https://www.instagram.com/mocxs.fashion?igsh=eDV3cXlmdHZtZGI2" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" title="Instagram">
                <FiInstagram className="w-5 h-5" />
              </a>
              <a href="https://wa.me/916235215618" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" title="WhatsApp">
                <FaWhatsapp className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} All rights reserved. MOCXS</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

