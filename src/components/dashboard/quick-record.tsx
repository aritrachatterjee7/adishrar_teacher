"use client"
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Video, X } from "lucide-react";

const QuickRecord = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");

  const classes = ["Class 9", "Class 10", "Class 11", "Class 12"];
  const subjects = ["Physics", "Chemistry", "Biology", "Mathematics"];

  return (
    <>
      {/* Floating Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700"
      >
        <Video size={24} />
      </motion.button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="bg-white p-6 rounded-lg shadow-lg w-96"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Start Recording</h2>
              <button onClick={() => setIsOpen(false)}>
                <X size={20} className="text-gray-600 hover:text-gray-800" />
              </button>
            </div>
            <div className="space-y-4">
              <select
                className="w-full p-2 border rounded-lg"
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
              >
                <option value="">Select Class</option>
                {classes.map((cls) => (
                  <option key={cls} value={cls}>{cls}</option>
                ))}
              </select>

              <select
                className="w-full p-2 border rounded-lg"
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
              >
                <option value="">Select Subject</option>
                {subjects.map((sub) => (
                  <option key={sub} value={sub}>{sub}</option>
                ))}
              </select>

              <button
                className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700"
                disabled={!selectedClass || !selectedSubject}
              >
                Start Recording
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default QuickRecord;
