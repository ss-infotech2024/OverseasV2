import React from "react";
import { GraduationCap, Mail, Phone, Clock, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Brand Info */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="bg-yellow-400 p-2 rounded-lg">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
          </div>
          <p className="text-sm leading-relaxed max-w-xs">
            Empowering students to achieve their global education dreams with expert guidance and personalized support.
          </p>
          <div className="flex gap-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-400 transition-colors">
              <Facebook className="w-5 h-5" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-400 transition-colors">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-400 transition-colors">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-400 transition-colors">
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Services */}
        <div>
          <h4 className="font-semibold text-lg text-yellow-400 mb-4">Our Services</h4>
          <ul className="text-sm space-y-3">
            <li><a href="/contact" className="hover:text-yellow-400 transition-colors">Profile Evaluation</a></li>
            <li><a href="/contact" className="hover:text-yellow-400 transition-colors">University Selection</a></li>
            <li><a href="/contact" className="hover:text-yellow-400 transition-colors">Visa Documentation</a></li>
            <li><a href="/contact" className="hover:text-yellow-400 transition-colors">Loan & Scholarships</a></li>
            <li><a href="/contact" className="hover:text-yellow-400 transition-colors">Test Preparation</a></li>
          </ul>
        </div>

        {/* Destinations */}
        <div>
          <h4 className="font-semibold text-lg text-yellow-400 mb-4">Top Destinations</h4>
          <ul className="text-sm space-y-3">
            <li><a href="/all-universities" className="hover:text-yellow-400 transition-colors">USA</a></li>
            <li><a href="/all-universities" className="hover:text-yellow-400 transition-colors">UK</a></li>
            <li><a href="/all-universities" className="hover:text-yellow-400 transition-colors">Canada</a></li>
            <li><a href="/all-universities" className="hover:text-yellow-400 transition-colors">Australia</a></li>
            <li><a href="/all-universities" className="hover:text-yellow-400 transition-colors">Germany</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="font-semibold text-lg text-yellow-400 mb-4">Get in Touch</h4>
          <ul className="text-sm space-y-3">
            <li className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-yellow-400" />
              <a href="mailto:ssoverseas333@gmail.com" className="hover:text-yellow-400 transition-colors">ssoverseas333@gmail.com</a>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-yellow-400" />
              <a href="tel:+919422129534" className="hover:text-yellow-400 transition-colors">+91 94221 29534</a>
            </li>
            <li className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-yellow-400" />
              <span>10 AM – 6 PM (Mon–Sat)</span>
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-yellow-400" />
              <span>Nagpur, Maharashtra, India</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto mt-8 border-t border-gray-700 pt-6 text-center text-sm">
        <p className="text-gray-300">
          &copy; {new Date().getFullYear()} SS Overseas. All rights reserved.
        </p>
        <p className="text-xs text-yellow-400 mt-2">
          <a href="/terms" className="hover:text-yellow-300">Terms & Conditions</a> | <a href="/privacy" className="hover:text-yellow-300">Privacy Policy</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;