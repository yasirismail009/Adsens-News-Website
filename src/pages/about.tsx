import { useState } from 'react';
import Image from 'next/image';
import Layout from '../components/Layout';
import { useTheme } from '../contexts/ThemeContext';
import Link from 'next/link';

const AboutPage = () => {
  const { isDarkMode } = useTheme();

  // Team members data
  const teamMembers = [
    {
      name: 'Make Jhane',
      position: 'Founder & Director',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
      socials: {
        linkedin: '#',
        twitter: '#',
        facebook: '#'
      }
    },
    {
      name: 'Jinny Owen',
      position: 'Marketing Manager',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80',
      socials: {
        linkedin: '#',
        twitter: '#',
        facebook: '#'
      }
    },
    {
      name: 'Mia Lobey',
      position: 'Coordinator',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=761&q=80',
      socials: {
        linkedin: '#',
        twitter: '#',
        facebook: '#'
      }
    }
  ];

  return (
    <Layout>
      <div className={`${isDarkMode ? 'bg-gray-900' : 'bg-white'} transition-colors duration-200`}>
        {/* Hero section */}
        <div className="container mx-auto px-4 py-12 md:py-20">
          <div className="text-center mb-12">
            <h1 className={`text-4xl md:text-5xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              About
            </h1>
            <p className={`max-w-3xl mx-auto text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              We provide the best designed plugins to our clients by maximizing the innovation.
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-10 items-center mb-16">
            <div className="md:w-1/2">
              <div className="relative aspect-video overflow-hidden rounded-lg shadow-lg">
                <Image 
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                  alt="Our office"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="md:w-1/2">
              <h2 className={`text-2xl md:text-3xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Our Values
              </h2>
              <h3 className={`text-xl md:text-2xl font-bold mb-5 ${isDarkMode ? 'text-primary-400' : 'text-primary-600'}`}>
                Meet OK Media.
                <br />digital.
                <br />innovative.
                <br />creative.
              </h3>
              <p className={`mb-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Join a team who works as hard as you do and allows your business and technology maneuvers big wins.
              </p>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'} py-16 transition-colors duration-200`}>
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Meet Our Team
              </h2>
              <p className={`max-w-3xl mx-auto ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                We write various things related to furniture, from tips and what things I need to pay attention to when choosing furniture
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {teamMembers.map((member, index) => (
                <div key={index} className={`rounded-lg overflow-hidden ${isDarkMode ? 'bg-gray-900' : 'bg-white'} shadow-md transition-colors duration-200`}>
                  <div className="relative h-80">
                    <Image 
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className={`text-xl font-bold mb-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{member.name}</h3>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} mb-3`}>{member.position}</p>
                    <div className="flex space-x-3">
                      <a href={member.socials.linkedin} className={`${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-blue-600'}`}>
                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                        </svg>
                      </a>
                      <a href={member.socials.twitter} className={`${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-blue-600'}`}>
                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                        </svg>
                      </a>
                      <a href={member.socials.facebook} className={`${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-blue-600'}`}>
                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mission Section */}
        <div className="container mx-auto px-4 py-16">
          <div className="flex flex-col md:flex-row gap-10 items-center">
            <div className="md:w-1/2">
              <div className="p-4">
                <div className={`mb-4 inline-block ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  <span className="text-3xl font-light">01</span>
                </div>
                <h2 className={`text-2xl md:text-3xl font-bold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  OK Media Business Vision
                </h2>
                <p className={`mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  Order, consistent work means more than how hard it looks. Everything we do is a big priority.
                </p>
              </div>

              <div className="p-4">
                <div className={`mb-4 inline-block ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  <span className="text-3xl font-light">02</span>
                </div>
                <h2 className={`text-2xl md:text-3xl font-bold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Our mission for sustainability
                </h2>
                <p className={`mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  We help people create and build wealth. We have marked our presence globally reaching over a million of website owners using our products.
                </p>
              </div>
            </div>

            <div className="md:w-1/2">
              <div className="relative h-96 overflow-hidden rounded-lg shadow-lg">
                <Image 
                  src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                  alt="Our team meeting"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Grow with us */}
        <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'} py-16 transition-colors duration-200`}>
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-10 items-center">
              <div className="md:w-1/2">
                <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Grow with us
                </h2>
                <p className={`mb-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  We are committed to making user-friendly, beautifully designed ecommerce plugins that help store owners succeed.
                </p>
                <p className={`mb-6 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Stay updated with the upcoming updates of Drift
                </p>
                <div className="flex">
                  <input 
                    type="email" 
                    placeholder="Your email address" 
                    className={`flex-1 rounded-l-md px-4 py-2 ${isDarkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-900 border-gray-200'} border`}
                  />
                  <button 
                    className={`px-4 py-2 rounded-r-md font-medium ${isDarkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-600 hover:bg-blue-700'} text-white transition-colors`}
                  >
                    Submit
                  </button>
                </div>
              </div>
              <div className="md:w-1/2">
                <div className="relative h-96">
                  <Image 
                    src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                    alt="Working together"
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AboutPage; 