import React from 'react';

const Footer = () => (
  <footer className="bg-green-800 text-white p-6 md:p-10">
    <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center md:items-start justify-between space-y-6 md:space-y-0">
      
      {/* Website Name and Copyright */}
      <div className="text-center md:text-left flex-1">
        <h3 className="text-2xl font-semibold">PlantCare</h3>
        <p className="text-sm mt-1">&copy; {new Date().getFullYear()} PlantCare. All rights reserved.</p>
      </div>

      {/* Contact Info */}
      <div className="text-lg text-center md:text-left flex-1">
        <p>
          Contact us:{" "}
          <a href="mailto:info@plantcare.com" className="underline hover:text-gray-300">
            info@plantcare.com
          </a>
        </p>
      </div>

      {/* Social Media Links */}
      <div className="flex space-x-6 justify-center md:justify-end flex-1">
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Facebook"
          className="hover:opacity-80"
        >
          <img
            src="https://cdn.simpleicons.org/facebook/black"
            alt="Facebook"
            className="h-8 w-8"
          />
        </a>
        <a
          href="https://twitter.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Twitter"
          className="hover:opacity-80"
        >
          <img
            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/twitter/twitter-original.svg"
            alt="Twitter"
            className="h-7 w-7"
          />
        </a>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
          className="hover:opacity-80"
        >
          <img
            src="https://cdn.simpleicons.org/instagram/black"
            alt="Instagram"
            className="h-7 w-7"
          />
        </a>
      </div>
    </div>
  </footer>
);

export default Footer;
