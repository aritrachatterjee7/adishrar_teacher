"use client"
import React from 'react';
import { Users, BookOpen, ClipboardCheck } from 'lucide-react';

const OverviewStats = () => {
  return (
    <div 
      className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-gray-100"
    >
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Quick Stats</h2>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between p-3 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors duration-200">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg mr-3">
              <BookOpen className="h-5 w-5 text-blue-600" />
            </div>
            <span className="text-gray-700">Total Classes</span>
          </div>
          <span className="font-bold text-lg text-blue-600">12</span>
        </div>
        
        <div className="flex items-center justify-between p-3 rounded-lg bg-green-50 hover:bg-green-100 transition-colors duration-200">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg mr-3">
              <Users className="h-5 w-5 text-green-600" />
            </div>
            <span className="text-gray-700">Active Students</span>
          </div>
          <span className="font-bold text-lg text-green-600">156</span>
        </div>
        
        <div className="flex items-center justify-between p-3 rounded-lg bg-amber-50 hover:bg-amber-100 transition-colors duration-200">
          <div className="flex items-center">
            <div className="p-2 bg-amber-100 rounded-lg mr-3">
              <ClipboardCheck className="h-5 w-5 text-amber-600" />
            </div>
            <span className="text-gray-700">Pending Assessments</span>
          </div>
          <span className="font-bold text-lg text-amber-600">3</span>
        </div>
      </div>
    </div>
  );
};

export default OverviewStats;