import { useState } from 'react';
import Layout from '../components/Layout';
import { useTheme } from '../contexts/ThemeContext';
import emailjs from '@emailjs/browser';

const ContactPage = () => {
  const { isDarkMode } = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Services options for the form
  const services = [
    { id: 'website', label: 'Website design' },
    { id: 'ux', label: 'UX design' },
    { id: 'user', label: 'User research' },
    { id: 'content', label: 'Content creation' },
    { id: 'strategy', label: 'Strategy & consulting' },
    { id: 'other', label: 'Other' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setSubmitStatus('idle');

    try {
      await emailjs.send(
        'service_hmedeif',
        'template_uk20ewn',
        {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          service_type: formData.service,
          message: formData.message,
        },
        'user_3TDjSAtSwwjQiWplcCN3R'
      );
      setSubmitStatus('success');
      setFormData({ name: '', email: '', phone: '', service: '', message: '' });
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <Layout>
      <div className={`${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'} min-h-screen py-8 transition-colors duration-200`}>
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className={`text-3xl font-bold mb-8 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
            Contact Us
          </h1>

          <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md p-6`}>
            <p className={`mb-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Have questions or need assistance? We&apos;re here to help! Fill out the form below and we&apos;ll get back to you as soon as possible.
            </p>

            {submitStatus === 'success' ? (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
                Thank you for your message! We&apos;ll get back to you soon.
              </div>
            ) : submitStatus === 'error' ? (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
                There was an error sending your message. Please try again later.
              </div>
            ) : null}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className={`w-full px-4 py-2 rounded-lg border ${
                    isDarkMode 
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  placeholder="Your name"
                />
              </div>

              <div>
                <label htmlFor="email" className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className={`w-full px-4 py-2 rounded-lg border ${
                    isDarkMode 
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label htmlFor="phone" className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Phone (optional)
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 rounded-lg border ${
                    isDarkMode 
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  placeholder="Your phone number"
                />
              </div>

              <div>
                <label htmlFor="service" className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Service Type
                </label>
                <select
                  id="service"
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  required
                  className={`w-full px-4 py-2 rounded-lg border ${
                    isDarkMode 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-white border-gray-300 text-gray-900'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                >
                  <option value="">Select a service</option>
                  {services.map(service => (
                    <option key={service.id} value={service.id}>
                      {service.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="message" className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className={`w-full px-4 py-2 rounded-lg border ${
                    isDarkMode 
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  placeholder="Your message"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-3 px-4 rounded-lg text-white font-medium ${
                  isLoading 
                    ? 'bg-blue-400 cursor-not-allowed' 
                    : 'bg-blue-600 hover:bg-blue-700'
                } transition-colors duration-200`}
              >
                {isLoading ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ContactPage; 