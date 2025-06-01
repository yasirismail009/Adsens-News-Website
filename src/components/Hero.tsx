import React from 'react';
import Image from 'next/image';

interface HeroProps {
  isDarkMode: boolean;
}

const Hero: React.FC<HeroProps> = ({ isDarkMode }) => {
  return (
    <div className="relative overflow-hidden rounded-lg mb-8">
      <div className="relative h-[400px] w-full">
        <Image
          src="/images/hero-bg.jpg"
          alt="Global Scholarships Hero"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="text-center px-4">
            <h1 className={`text-4xl md:text-5xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-white'}`}>
              Discover Global Scholarship Opportunities
            </h1>
            <p className={`text-xl md:text-2xl mb-8 ${isDarkMode ? 'text-gray-200' : 'text-gray-100'}`}>
              Your gateway to educational funding worldwide
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                className={`px-6 py-3 rounded-lg font-medium ${
                  isDarkMode 
                    ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                } transition-colors duration-200`}
              >
                Browse Scholarships
              </button>
              <button
                className={`px-6 py-3 rounded-lg font-medium ${
                  isDarkMode 
                    ? 'bg-transparent border-2 border-white text-white hover:bg-white hover:text-gray-900' 
                    : 'bg-transparent border-2 border-white text-white hover:bg-white hover:text-gray-900'
                } transition-colors duration-200`}
              >
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero; 