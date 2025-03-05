"use client"
import React from 'react';
import { Clock, BookOpen, Calendar } from 'lucide-react';

const ScheduleView = () => {
  return (
    <div 
      className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-gray-100"
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800 flex items-center">
          <Calendar className="h-5 w-5 mr-2 text-purple-500" />
          Today's Schedule
        </h2>
        <span className="text-xs font-medium bg-purple-100 text-purple-600 px-2 py-1 rounded-full">
          2 Classes
        </span>
      </div>
      
      <div className="space-y-4">
        <div className="p-3 rounded-lg border border-gray-100 hover:bg-purple-50 transition-colors duration-200">
          <div className="flex items-center justify-between mb-1">
            <span className="font-medium text-gray-800">Class A - Subject X</span>
            <div className="flex items-center text-purple-600 font-medium text-sm">
              <Clock className="h-4 w-4 mr-1" />
              <span>10:00 AM</span>
            </div>
          </div>
          <div className="flex items-center text-gray-500 text-sm">
            <BookOpen className="h-4 w-4 mr-1 text-gray-400" />
            <span>Prof Susovan Mandal</span>
          </div>
        </div>
        
        <div className="p-3 rounded-lg border border-gray-100 hover:bg-purple-50 transition-colors duration-200">
          <div className="flex items-center justify-between mb-1">
            <span className="font-medium text-gray-800">Class B - Subject Y</span>
            <div className="flex items-center text-purple-600 font-medium text-sm">
              <Clock className="h-4 w-4 mr-1" />
              <span>11:30 AM</span>
            </div>
          </div>
          <div className="flex items-center text-gray-500 text-sm">
            <BookOpen className="h-4 w-4 mr-1 text-gray-400" />
            <span>Prof Susovan Mandal</span>
          </div>
        </div>
      </div>
      
      <div className="mt-4 pt-3 border-t border-gray-100 flex justify-end">
        <button className="text-sm text-purple-600 font-medium hover:text-purple-800 transition-colors duration-200 flex items-center">
          View full schedule
          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ScheduleView;