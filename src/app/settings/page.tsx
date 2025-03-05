"use client";

import React, { useState } from 'react';
import { User, ArrowLeft, Settings, Save } from 'lucide-react';

const TeacherSettingsPage: React.FC = () => {
  const [darkMode] = useState<boolean>(false);
  const [profileImage, setProfileImage] = useState<string>('/api/placeholder/100/100');

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gradient-to-br from-blue-50 via-white to-purple-50 text-gray-800'}`}>
      {/* Top Navigation Bar */}
      <nav className={`px-6 py-4 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md flex justify-between items-center`}>
        <div className="flex items-center gap-2">
          <button className="p-2 rounded-full hover:bg-blue-100 transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-xl font-semibold flex items-center gap-2">
            <Settings className="w-5 h-5 text-blue-600" /> Profile Settings
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <img
              src="/api/placeholder/40/40"
              alt="Teacher profile"
              className="w-10 h-10 rounded-full border-2 border-blue-500 object-cover"
            />
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
          </div>
          <div>
            <p className="text-sm font-medium">Ms. Sarah Johnson</p>
            <p className="text-xs text-gray-500">Science Department</p>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8 flex gap-8">
        {/* Main Content Area */}
        <div className="flex-1">
          {/* Profile Settings */}
          <div className={`rounded-xl shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} p-6`}>
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
              <User className="w-6 h-6 text-blue-600" /> Profile Settings
            </h2>

            <div className="mb-8 flex items-center">
              <div className="relative">
                <img
                  src={profileImage}
                  alt="Profile"
                  className="w-24 h-24 rounded-full object-cover border-4 border-blue-100"
                />
                <button className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full shadow-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
                </button>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
              </div>
              <div className="ml-6">
                <h3 className="text-xl font-semibold">Sarah Johnson</h3>
                <p className="text-gray-500">High School Science Teacher</p>
                <button className="mt-2 text-sm text-blue-600 font-medium">Change Profile Picture</button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">First Name</label>
                <input
                  type="text"
                  defaultValue="Sarah"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Last Name</label>
                <input
                  type="text"
                  defaultValue="Johnson"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Email Address</label>
                <input
                  type="email"
                  defaultValue="sarah.johnson@eduschool.org"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Phone Number</label>
                <input
                  type="tel"
                  defaultValue="(555) 123-4567"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Department</label>
                <select className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none">
                  <option>Science</option>
                  <option>Mathematics</option>
                  <option>English</option>
                  <option>History</option>
                  <option>Arts</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Teacher ID</label>
                <input
                  type="text"
                  defaultValue="T-2025-0042"
                  className="w-full p-2 bg-gray-100 border border-gray-300 rounded-lg"
                  disabled
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-600 mb-1">Bio</label>
                <textarea
                  rows={4}
                  defaultValue="Science teacher with 8+ years of experience. Specializing in Physics and Environmental Science. Passionate about making science accessible and engaging for all students."
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="mt-8 flex justify-end gap-3">
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                Cancel
              </button>
              <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-lg flex items-center">
                <Save className="w-5 h-5 mr-2" /> Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherSettingsPage;
