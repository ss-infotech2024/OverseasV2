import React from 'react';
import { Link } from "react-router-dom";


const BannerComponent = () => {
  return (
    <div className="bg-blue-900 text-white p-6 md:p-9 rounded-lg shadow-lg flex flex-col md:flex-row items-center justify-between w-[95%] max-w-7xl mx-auto gap-6 mt-14"> {/* Added mt-8 for top margin */}
      
     

      {/* Center: Main Content */}
      <div className="text-center md:text-left flex-1 order-3 md:order-2">
        <h2 className="text-2xl md:text-3xl font-bold">Get Ready To Begin</h2>
        <h3 className="text-xl md:text-2xl font-semibold mt-2">Your Journey</h3>
         <br />
       <br />
        <p className="mt-4 text-gray-300 text-sm md:text-base">
          Explore more, stay informed, and start your journey to academic excellence.
        </p>
       <br />
       <br />
       <Link
  to="/contact"
  className="mt-6 px-6 py-2 bg-white text-blue-900 rounded-full hover:bg-gray-200 transition-colors font-medium"
>
  Contact Us
</Link>
      </div>

      {/* Right: Image with Overlays */}
      <div className="relative order-2 md:order-3 mt-6 md:mt-0">
        <img
          src="https://cdn.prod.website-files.com/62babb554236d9c8c7236fec/6756b22b624f3c74098aebc0_hero.webp"
          alt="Student with globe"
          className="w-56 md:w-64 h-auto object-cover rounded-lg shadow-md"
        />
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center opacity-80">
          <svg className="w-10 h-10 md:w-12 md:h-12 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </div>
        <div className="absolute -top-3 -right-3 md:-top-4 md:-right-4">
          <svg className="w-8 h-8 md:w-10 md:h-10 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </div>
        <div className="absolute bottom-3 left-3 md:bottom-4 md:left-4">
          <svg className="w-7 h-7 md:w-8 md:h-8 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default BannerComponent;