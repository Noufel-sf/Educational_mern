import * as React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Twitter, Facebook, Linkedin, Instagram } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-r from-cyan-100 via-blue-50 to-purple-100 py-16 mt-50 fonts">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Logo and Description */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className=" p-2 rounded-md">
                <img src="/logo.png" alt="Logo" className="" />
              </div>
            </div>
            <p className="text-gray-600">
              Unlock knowledge with expert-led online courses.
            </p>
            
            <div className="mt-6">
              <h3 className="font-semibold text-gray-800 mb-4">Stay connected</h3>
              <div className="flex space-x-4">
                <Link to="#" className="bg-gray-200 p-2 rounded-full hover:bg-gray-300 transition-all">
                  <Twitter className="h-5 w-5 text-gray-700" />
                </Link>
                <Link to="#" className="bg-gray-200 p-2 rounded-full hover:bg-gray-300 transition-all">
                  <Facebook className="h-5 w-5 text-gray-700" />
                </Link>
                <Link to="#" className="bg-gray-200 p-2 rounded-full hover:bg-gray-300 transition-all">
                  <Linkedin className="h-5 w-5 text-gray-700" />
                </Link>
                <Link to="#" className="bg-gray-200 p-2 rounded-full hover:bg-gray-300 transition-all">
                  <Instagram className="h-5 w-5 text-gray-700" />
                </Link>
              </div>
            </div>
          </div>

          {/* Pages */}
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Pages</h3>
            <ul className="space-y-3">
              <li><Link to="/" className="text-gray-600 hover:text-gray-900">Home 1</Link></li>
              <li><Link to="/home-2" className="text-gray-600 hover:text-gray-900">Home 2</Link></li>
              <li><Link to="/home-3" className="text-gray-600 hover:text-gray-900">Home 3</Link></li>
              <li><Link to="/about-us" className="text-gray-600 hover:text-gray-900">About Us</Link></li>
            </ul>
          </div>

          {/* Others */}
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Others</h3>
            <ul className="space-y-3">
              <li><Link to="/mentors" className="text-gray-600 hover:text-gray-900">Mentors</Link></li>
              <li><Link to="/blog" className="text-gray-600 hover:text-gray-900">Blog</Link></li>
              <li><Link to="/404" className="text-gray-600 hover:text-gray-900">404</Link></li>
              <li><Link to="/privacy-policy" className="text-gray-600 hover:text-gray-900">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-gray-700 mt-1" />
                <span className="text-gray-600">+8801798155521</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-gray-700 mt-1" />
                <span className="text-gray-600">hello@designmonks.co</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-gray-700 mt-1" />
                <span className="text-gray-600">
                  4886 Stroman Drives, California, South Stanton, USA
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-12 pt-6 text-center text-gray-600">
          <p>&copy; {new Date().getFullYear()} MonksHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;