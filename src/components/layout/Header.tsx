import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, User, LogIn, Scale } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface HeaderProps {
  isLoggedIn?: boolean;
  userName?: string;
  userAvatar?: string;
  onLoginClick?: () => void;
  onRegisterClick?: () => void;
  onLogoutClick?: () => void;
}

const Header = ({
  isLoggedIn = false,
  userName = "Guest User",
  userAvatar = "",
  onLoginClick = () => {},
  onRegisterClick = () => {},
  onLogoutClick = () => {},
}: HeaderProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="w-full h-20 bg-navy-900 text-white shadow-md fixed top-0 left-0 z-50">
      <div className="container mx-auto h-full px-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <div className="w-10 h-10 mr-3 flex items-center justify-center">
              <Scale className="h-8 w-8 text-gold-500" />
            </div>
            <span className="font-serif text-xl font-bold hidden sm:block">
              AI Indian Judge
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link
            to="/"
            className={`transition-colors ${isActive("/") ? "text-gold-400 font-medium" : "text-white hover:text-gold-300"}`}
          >
            Home
          </Link>
          <Link
            to="/about"
            className={`transition-colors ${isActive("/about") ? "text-gold-400 font-medium" : "text-white hover:text-gold-300"}`}
          >
            About
          </Link>
          <Link
            to="/how-it-works"
            className={`transition-colors ${isActive("/how-it-works") ? "text-gold-400 font-medium" : "text-white hover:text-gold-300"}`}
          >
            How It Works
          </Link>
          <Link
            to="/faq"
            className={`transition-colors ${isActive("/faq") ? "text-gold-400 font-medium" : "text-white hover:text-gold-300"}`}
          >
            FAQ
          </Link>
        </nav>

        {/* Auth Buttons / User Menu */}
        <div className="flex items-center">
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              className={`${isActive("/courtroom") ? "bg-navy-700 border-navy-600" : "border-navy-500 hover:bg-navy-700"}`}
              onClick={() => (window.location.href = "/courtroom")}
            >
              <span className="text-white">Virtual Courtroom</span>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden ml-2"
            onClick={toggleMobileMenu}
          >
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-navy-800 py-4 px-4 absolute w-full">
          <nav className="flex flex-col space-y-4">
            <Link
              to="/"
              className={`transition-colors py-2 border-b border-navy-700 ${isActive("/") ? "text-gold-400 font-medium" : "text-white hover:text-gold-300"}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/about"
              className={`transition-colors py-2 border-b border-navy-700 ${isActive("/about") ? "text-gold-400 font-medium" : "text-white hover:text-gold-300"}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link
              to="/how-it-works"
              className={`transition-colors py-2 border-b border-navy-700 ${isActive("/how-it-works") ? "text-gold-400 font-medium" : "text-white hover:text-gold-300"}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              How It Works
            </Link>
            <Link
              to="/faq"
              className={`transition-colors py-2 border-b border-navy-700 ${isActive("/faq") ? "text-gold-400 font-medium" : "text-white hover:text-gold-300"}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              FAQ
            </Link>
            <Link
              to="/courtroom"
              className={`transition-colors py-2 border-b border-navy-700 ${isActive("/courtroom") ? "text-gold-400 font-medium" : "text-white hover:text-gold-300"}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Virtual Courtroom
            </Link>
            {!isLoggedIn && (
              <div className="flex flex-col space-y-2 pt-2">
                <Button
                  variant="ghost"
                  className="justify-start text-white hover:text-gold-300 hover:bg-navy-700"
                  onClick={() => {
                    onLoginClick();
                    setIsMobileMenuOpen(false);
                  }}
                >
                  <LogIn className="mr-2 h-4 w-4" />
                  Login
                </Button>
                <Button
                  variant="outline"
                  className="justify-start border-gold-500 text-gold-500 hover:bg-gold-500 hover:text-navy-900"
                  onClick={() => {
                    onRegisterClick();
                    setIsMobileMenuOpen(false);
                  }}
                >
                  <User className="mr-2 h-4 w-4" />
                  Register
                </Button>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
