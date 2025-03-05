"use client";

import React, { useState } from 'react';
import { User, ArrowLeft, Settings, Save } from 'lucide-react';

const TeacherSettingsPage: React.FC = () => {
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 text-gray-800">
      {/* Top Navigation Bar */}
      <nav className="px-6 py-4 bg-white shadow-md flex justify-between items-center">
        <div className="flex items-center gap-2">
          <button className="p-2 rounded-full hover:bg-blue-100 transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-xl font-semibold flex items-center gap-2">
            <Settings className="w-5 h-5 text-blue-600" /> Profile Settings
          </h1>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8 flex gap-8">
        <div className="flex-1">
          <div className="rounded-xl shadow-lg bg-white p-6">
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