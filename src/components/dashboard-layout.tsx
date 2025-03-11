"use client";
import React, { useState } from 'react';
import { Menu, Bell, Settings } from 'lucide-react';
import ScheduleView from './dashboard/schedule-view';
import QuickRecord from './dashboard/quick-record';
import OverviewStats from './dashboard/overview-stats';
import ScheduleCalendar from './dashboard/schedule-calendar';

const DashboardLayout = () => {
  const teacher = {
    name: "Mr. John Doe",
    subject: "Mathematics",
    imageUrl: "/api/placeholder/48/48"
  };

  const [isRecordingScreenOpen, setIsRecordingScreenOpen] = useState(false);

  return (
    <div className="h-screen bg-gray-50">
      <div className="h-full overflow-y-auto">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="flex items-center justify-between px-4 py-2">
            <div className="flex items-center space-x-3">
              <Menu className="w-5 h-5 text-gray-500 cursor-pointer" />
              <div className="flex items-center space-x-2">
                <img 
                  src={teacher.imageUrl} 
                  alt={teacher.name} 
                  className="w-8 h-8 rounded-full border-2 border-blue-200"
                />
                <div>
                  <h2 className="font-semibold text-sm text-gray-800">{teacher.name}</h2>
                  <p className="text-xs text-gray-500">{teacher.subject} Teacher</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Bell className="w-5 h-5 text-gray-500 cursor-pointer" />
              <Settings className="w-5 h-5 text-gray-500 cursor-pointer" />
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="p-4">
          {/* Schedule Calendar */}
          <div className="mb-4">
            <ScheduleCalendar />
          </div>

          {/* Other Components */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <QuickRecord onOpenRecordingScreen={() => setIsRecordingScreenOpen(true)} />
            <ScheduleView />
            <OverviewStats />
          </div>
        </main>
      </div>

      {/* Full-Screen Recording Screen */}
      {isRecordingScreenOpen && (
        <div className="fixed inset-0 z-50">
          <QuickRecord onCloseRecordingScreen={() => setIsRecordingScreenOpen(false)} />
        </div>
      )}
    </div>
  );
};

export default DashboardLayout;