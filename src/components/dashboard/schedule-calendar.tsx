"use client"
import React from 'react';
import { motion } from 'framer-motion';

const ScheduleCalendar = () => {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const timeSlots = [
    '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', 
    '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM'
  ];

  const classes = [
    { day: 0, startTime: '8:25 AM', endTime: '9:45 AM', class: '4A', subject: 'Physics', color: 'bg-blue-50' },
    { day: 0, startTime: '9:55 AM', endTime: '10:45 AM', class: '3B', subject: 'Physics', color: 'bg-yellow-50' },
    { day: 1, startTime: '8:00 AM', endTime: '9:45 AM', class: '1A', subject: 'Chemistry', color: 'bg-green-50' },
    { day: 1, startTime: '10:00 AM', endTime: '10:45 AM', class: '3A', subject: 'Physics', color: 'bg-purple-50' },
    { day: 2, startTime: '2:00 PM', endTime: '3:45 PM', class: '4A', subject: 'Chemistry', color: 'bg-pink-50' },
  ];

  return (
    <div className="w-full">
      <div className="bg-white rounded-xl shadow-sm p-4">
        <div className="flex justify-between mb-2">
          <h2 className="text-lg font-semibold">Schedule</h2>
          <div className="text-sm text-gray-500">August 19 - 23</div>
        </div>
        
        <div className="grid grid-cols-[80px_repeat(5,1fr)] gap-1">
          {/* Time column */}
          <div className="font-medium text-gray-500 text-sm">Time</div>
          
          {/* Day headers */}
          {days.map((day) => (
            <div key={day} className="font-medium text-center pb-2 text-sm">
              {day}
            </div>
          ))}
          
          {/* Time slots and classes */}
          {timeSlots.map((time, timeIndex) => (
            <React.Fragment key={time}>
              {/* Time label */}
              <div className="text-xs text-gray-500 pr-2 py-1">
                {time}
              </div>
              
              {/* Day columns */}
              {days.map((_, dayIndex) => (
                <div key={`${timeIndex}-${dayIndex}`} className="relative h-12 border border-gray-100">
                  {classes
                    .filter(cls => 
                      cls.day === dayIndex && 
                      timeSlots[timeIndex].includes(cls.startTime.split(':')[0])
                    )
                    .map((cls, index) => (
                      <motion.div
                        key={index}
                        whileHover={{ scale: 1.02 }}
                        className={`absolute inset-x-1 top-1 p-1 rounded ${cls.color} border border-gray-200 cursor-pointer`}
                      >
                        <div className="text-xs font-medium">
                          {cls.class} - {cls.subject}
                        </div>
                        <div className="text-xs text-gray-500">
                          {cls.startTime}
                        </div>
                      </motion.div>
                    ))}
                </div>
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScheduleCalendar;