"use client";

import React, { useState, useEffect, useRef } from "react";
import { Camera, FileText, Edit, X, Video, Award, Users, Clock,  Upload, Check } from "lucide-react";
import { motion } from "framer-motion";

// Define an interface for classData
interface ClassData {
  id: number;
  name: string;
  lectureCount: number;
  notesCount: number;
  color?: string;
  progress?: number;
  lastUpdated?: string;
  students?: number;
}

interface ClassCardProps {
  classData: ClassData;
}

const ClassCard: React.FC<ClassCardProps> = ({ classData }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [animatedCount, setAnimatedCount] = useState(0);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');

  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

  // Generate a gradient based on class name or use provided color
  const generateGradient = () => {
    const colors = [
      "from-blue-500 to-indigo-600",
      "from-emerald-400 to-teal-600",
      "from-orange-400 to-pink-600",
      "from-purple-500 to-indigo-500",
      "from-rose-400 to-red-600"
    ];

    // Use the first character of class name to determine a consistent color
    const index = classData.name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  const gradient = generateGradient();

  // Animate lecture count on hover
  useEffect(() => {
    if (isHovered) {
      let start = 0;
      const end = classData.lectureCount;
      const duration = 1000;
      const increment = Math.ceil(end / (duration / 50));

      const timer = setInterval(() => {
        start += increment;
        if (start > end) {
          clearInterval(timer);
          setAnimatedCount(end);
        } else {
          setAnimatedCount(start);
        }
      }, 50);

      return () => clearInterval(timer);
    } else {
      setAnimatedCount(0);
    }
  }, [isHovered, classData.lectureCount]);

  // Handlers for file inputs
  const handleFileButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleVideoButtonClick = () => {
    videoInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      simulateUpload();
    }
  };

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedVideo(e.target.files[0]);
      simulateUpload();
    }
  };

  // Simulate an upload process
  const simulateUpload = () => {
    setUploadStatus('uploading');
    setTimeout(() => {
      setUploadStatus('success');
      // Reset after 2 seconds
      setTimeout(() => {
        setUploadStatus('idle');
      }, 2000);
    }, 1500);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative overflow-hidden rounded-xl"
    >
      {isExpanded && (
        <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-20 rounded-xl`} />
      )}

      {classData.progress && (
        <div className="absolute bottom-0 left-0 h-1 bg-gray-200 w-full">
          <div
            className={`h-1 bg-gradient-to-r ${gradient}`}
            style={{ width: `${classData.progress}%` }}
          />
        </div>
      )}

      <div
        className={`relative bg-white border overflow-hidden rounded-xl shadow-lg transition-all duration-300 ${
          isExpanded ? "shadow-xl" : ""
        }`}
      >
        <div className={`absolute top-0 left-0 w-1 h-full bg-gradient-to-b ${gradient}`} />

        <div className="p-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className={`flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br ${gradient} text-white`}>
                {isHovered ? (
                  <Camera className="animate-pulse" size={20} />
                ) : (
                  <Award size={20} />
                )}
              </div>
              <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-700 to-gray-900">
                {classData.name}
              </h3>
            </div>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsExpanded(!isExpanded)}
              className={`rounded-full p-2 transition-all duration-300 ${
                isExpanded
                  ? "bg-red-100 text-red-600 hover:bg-red-200"
                  : "bg-blue-100 text-blue-600 hover:bg-blue-200"
              }`}
            >
              {isExpanded ? (
                <X size={20} className="animate-spin-once" />
              ) : (
                <Edit size={20} className={isHovered ? "animate-bounce" : ""} />
              )}
            </motion.button>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4">
            <div className={`flex items-center p-3 rounded-lg transition-all duration-300 ${
              isHovered ? "bg-blue-50" : "bg-gray-50"
            }`}>
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 mr-3">
                <Video size={16} className={isHovered ? "animate-pulse" : ""} />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium">Lectures</p>
                <p className="text-lg font-bold text-blue-700">
                  {isHovered ? animatedCount : classData.lectureCount}
                </p>
              </div>
            </div>

            <div className={`flex items-center p-3 rounded-lg transition-all duration-300 ${
              isHovered ? "bg-emerald-50" : "bg-gray-50"
            }`}>
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 mr-3">
                <FileText size={16} className={isHovered ? "animate-pulse" : ""} />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium">Notes</p>
                <p className="text-lg font-bold text-emerald-700">{classData.notesCount}</p>
              </div>
            </div>
          </div>

          {classData.students && classData.lastUpdated && (
            <div className="mt-4 flex justify-between items-center text-xs text-gray-500">
              <div className="flex items-center">
                <Users size={14} className="mr-1" />
                <span>{classData.students} Students</span>
              </div>
              <div className="flex items-center">
                <Clock size={14} className="mr-1" />
                <span>Updated {classData.lastUpdated}</span>
              </div>
            </div>
          )}

          {isExpanded && (
            <div className="mt-6 space-y-3 overflow-hidden">
              {/* Hidden file inputs */}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                accept=".pdf,.doc,.docx,.txt"
              />
              <input
                type="file"
                ref={videoInputRef}
                onChange={handleVideoChange}
                className="hidden"
                accept="video/*"
              />

              <div className="border-t border-gray-100 pt-4">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</p>

                  {uploadStatus === 'uploading' && (
                    <div className="flex items-center text-amber-600 text-xs font-medium">
                      <div className="w-3 h-3 rounded-full bg-amber-500 mr-2 animate-pulse"></div>
                      Uploading...
                    </div>
                  )}

                  {uploadStatus === 'success' && (
                    <div className="flex items-center text-green-600 text-xs font-medium">
                      <Check size={14} className="mr-1" />
                      Upload successful
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 gap-2">
                  <button
                    onClick={handleVideoButtonClick}
                    className="group w-full p-3 text-left bg-white hover:bg-blue-50 border border-gray-200 hover:border-blue-200 rounded-lg flex items-center transition-all"
                  >
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 mr-3 group-hover:bg-blue-200">
                      <Video size={16} className="group-hover:animate-bounce" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">Upload Lecture</p>
                      <p className="text-xs text-gray-500">
                        {selectedVideo ? selectedVideo.name : 'Add video content to your class'}
                      </p>
                    </div>
                    <div className="flex items-center justify-center ml-2">
                      <Upload size={14} className="text-gray-400 group-hover:text-blue-500" />
                    </div>
                  </button>

                  <button
                    onClick={handleFileButtonClick}
                    className="group w-full p-3 text-left bg-white hover:bg-emerald-50 border border-gray-200 hover:border-emerald-200 rounded-lg flex items-center transition-all"
                  >
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 mr-3 group-hover:bg-emerald-200">
                      <FileText size={16} className="group-hover:animate-bounce" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">Add Notes</p>
                      <p className="text-xs text-gray-500">
                        {selectedFile ? selectedFile.name : 'Upload study materials (.pdf, .doc, .txt)'}
                      </p>
                    </div>
                    <div className="flex items-center justify-center ml-2">
                      <Upload size={14} className="text-gray-400 group-hover:text-emerald-500" />
                    </div>
                  </button>
                </div>
              </div>

              {(selectedFile || selectedVideo) && (
                <div className="mt-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <p className="text-xs font-medium text-gray-700 mb-2">Selected files:</p>
                  {selectedVideo && (
                    <div className="flex items-center text-sm text-gray-600 mb-1">
                      <Video size={14} className="mr-2 text-blue-500" />
                      {selectedVideo.name} ({(selectedVideo.size / (1024 * 1024)).toFixed(2)} MB)
                    </div>
                  )}
                  {selectedFile && (
                    <div className="flex items-center text-sm text-gray-600">
                      <FileText size={14} className="mr-2 text-emerald-500" />
                      {selectedFile.name} ({(selectedFile.size / 1024).toFixed(0)} KB)
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ClassCard;
