import React from "react";
import { Link } from "react-router-dom";
import {
  Facebook,
  Twitter,
  Instagram,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface FooterProps {
  onContactClick?: () => void;
}

const Footer = ({ onContactClick = () => {} }: FooterProps) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-navy-900 text-white py-12 px-4 md:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Column 1: Logo and About */}
          <div>
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-gold-500 rounded-full flex items-center justify-center mr-3">
                <span className="text-navy-900 font-serif font-bold text-lg">
                  AJ
                </span>
              </div>
              <h3 className="text-xl font-serif font-bold">
                AI Indian Court Judge
              </h3>
            </div>
            <p className="text-gray-300 mb-4">
              An AI-powered platform designed to help users understand potential
              legal outcomes based on Indian law.
            </p>
            <div className="flex space-x-4">
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-300 hover:text-gold-500 hover:bg-navy-800"
              >
                <Facebook size={20} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-300 hover:text-gold-500 hover:bg-navy-800"
              >
                <Twitter size={20} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-300 hover:text-gold-500 hover:bg-navy-800"
              >
                <Instagram size={20} />
              </Button>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-lg font-serif font-bold mb-4 text-gold-500">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-gray-300 hover:text-gold-500 transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-gray-300 hover:text-gold-500 transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/how-it-works"
                  className="text-gray-300 hover:text-gold-500 transition-colors"
                >
                  How It Works
                </Link>
              </li>
              <li>
                <Link
                  to="/faq"
                  className="text-gray-300 hover:text-gold-500 transition-colors"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  to="/legal-disclaimer"
                  className="text-gray-300 hover:text-gold-500 transition-colors"
                >
                  Legal Disclaimer
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy-policy"
                  className="text-gray-300 hover:text-gold-500 transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/terms-of-service"
                  className="text-gray-300 hover:text-gold-500 transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Information */}
          <div>
            <h3 className="text-lg font-serif font-bold mb-4 text-gold-500">
              Contact Us
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="mr-2 h-5 w-5 text-gold-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-300">
                  123 Legal Avenue, New Delhi, 110001, India
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="mr-2 h-5 w-5 text-gold-500 flex-shrink-0" />
                <span className="text-gray-300">+91 98765 43210</span>
              </li>
              <li className="flex items-center">
                <Mail className="mr-2 h-5 w-5 text-gold-500 flex-shrink-0" />
                <span className="text-gray-300">contact@aiindianjudge.com</span>
              </li>
            </ul>
            <Button
              onClick={onContactClick}
              className="mt-4 bg-gold-500 hover:bg-gold-600 text-navy-900 font-medium"
            >
              Contact Us
            </Button>
          </div>
        </div>

        <Separator className="bg-navy-700 my-6" />

        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <p>© {currentYear} AI Indian Court Judge. All rights reserved.</p>
          <p className="mt-2 md:mt-0">
            <span className="text-xs">
              This platform is for informational purposes only and does not
              constitute legal advice.
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
