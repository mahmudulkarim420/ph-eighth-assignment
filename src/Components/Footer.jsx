import React from 'react';
import logo from '../assets/logo.png';
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaEnvelope,
} from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-[#8453e9] text-white py-10">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <aside className="flex flex-col items-center md:items-start gap-2">
            <img
              className="w-[70px] h-[70px] object-contain"
              src={logo}
              alt="Hero Logo"
            />
            <p className="font-bold text-lg">
              HERO.IO
              <br />
              Providing reliable tech apps since 1992
            </p>
            <p className="text-sm">
              Copyright © {new Date().getFullYear()} - All rights reserved
            </p>
          </aside>

          <nav className="flex gap-5 text-xl">
            <a
              href="#"
              className="hover:text-gray-200 transition-colors duration-300"
            >
              <FaTwitter />
            </a>
            <a
              href="#"
              className="hover:text-gray-200 transition-colors duration-300"
            >
              <FaInstagram />
            </a>
            <a
              href="#"
              className="hover:text-gray-200 transition-colors duration-300"
            >
              <FaFacebookF />
            </a>
            <a
              href="#"
              className="hover:text-gray-200 transition-colors duration-300"
            >
              <FaEnvelope />
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
