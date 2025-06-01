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
    } catch (error) {
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
      <div className={`${isDarkMode ? 'bg-gray-900' : 'bg-white'} transition-colors duration-200 py-12`}>
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <h1 className={`text-4xl md:text-5xl font-bold text-center mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Contact Us
            </h1>
            <p className={`text-center max-w-2xl mx-auto mb-12 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Have a question or want to get in touch? Send us a message and we'll get back to you as soon as possible.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className={`block mb-2 text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Your name"
                  className={`w-full rounded-md ${
                    isDarkMode 
                      ? 'bg-gray-800 text-white border-gray-700 focus:border-blue-500' 
                      : 'bg-white text-gray-900 border-gray-300 focus:border-blue-500'
                  } border px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500`}
                />
              </div>

              <div>
                <label htmlFor="email" className={`block mb-2 text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="your.email@example.com"
                  className={`w-full rounded-md ${
                    isDarkMode 
                      ? 'bg-gray-800 text-white border-gray-700 focus:border-blue-500' 
                      : 'bg-white text-gray-900 border-gray-300 focus:border-blue-500'
                  } border px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500`}
                />
              </div>

              <div>
                <label htmlFor="phone" className={`block mb-2 text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+1 (555) 000-0000"
                  className={`w-full rounded-md ${
                    isDarkMode 
                      ? 'bg-gray-800 text-white border-gray-700 focus:border-blue-500' 
                      : 'bg-white text-gray-900 border-gray-300 focus:border-blue-500'
                  } border px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500`}
                />
              </div>

              <div>
                <label htmlFor="service" className={`block mb-2 text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Service
                </label>
                <select
                  id="service"
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  required
                  className={`w-full rounded-md ${
                    isDarkMode 
                      ? 'bg-gray-800 text-white border-gray-700 focus:border-blue-500' 
                      : 'bg-white text-gray-900 border-gray-300 focus:border-blue-500'
                  } border px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500`}
                >
                  <option value="">Select a service</option>
                  {services.map((service) => (
                    <option key={service.id} value={service.id}>
                      {service.label}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label htmlFor="message" className={`block mb-2 text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  placeholder="Your message..."
                  className={`w-full rounded-md ${
                    isDarkMode 
                      ? 'bg-gray-800 text-white border-gray-700 focus:border-blue-500' 
                      : 'bg-white text-gray-900 border-gray-300 focus:border-blue-500'
                  } border px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500`}
                ></textarea>
              </div>

              {submitStatus === 'success' && (
                <div className="p-4 bg-green-100 text-green-700 rounded-md">
                  Message sent successfully! We'll get back to you soon.
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="p-4 bg-red-100 text-red-700 rounded-md">
                  Failed to send message. Please try again later.
                </div>
              )}
              
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-3 px-4 text-white font-medium rounded-md ${
                  isDarkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-600 hover:bg-blue-700'
                } transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed`}
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