"use client";

import React, { useState, useRef, ChangeEvent, DragEvent } from 'react';
import { X, Upload, File, FileText, Image, Video, PenTool, Paperclip, Clock, LayoutGrid, Copy, ChevronDown, Settings, Save } from 'lucide-react';

interface FileType {
  name: string;
  size: number;
  type: string;
  id: string;
}

const ContentEditor = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [files, setFiles] = useState<FileType[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const [saving, setSaving] = useState(false);
  const [showToolbar, setShowToolbar] = useState(false);
  const [selectedTag, setSelectedTag] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const tags = ['Important', 'Draft', 'Review', 'Final'];

  // File upload handlers
  const handleDrag = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = (fileList: FileList) => {
    const newFiles: FileType[] = Array.from(fileList).map(file => ({
      name: file.name,
      size: file.size,
      type: file.type,
      id: Math.random().toString(36).substring(2, 9)
    }));

    setFiles([...files, ...newFiles]);
  };

  const removeFile = (id: string) => {
    setFiles(files.filter(file => file.id !== id));
  };

  const onUploadClick = () => {
    fileInputRef.current?.click();
  };

  const getFileIcon = (fileType: string) => {
    if (fileType.includes('image')) return <Image className="text-purple-500" size={16} />;
    if (fileType.includes('video')) return <Video className="text-red-500" size={16} />;
    if (fileType.includes('pdf')) return <FileText className="text-orange-500" size={16} />;
    if (fileType.includes('document') || fileType.includes('word')) return <File className="text-blue-500" size={16} />;
    return <Paperclip className="text-gray-500" size={16} />;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    else return (bytes / 1048576).toFixed(1) + ' MB';
  };

  const handleSave = () => {
    setSaving(true);
    // Simulate API call
    setTimeout(() => {
      setSaving(false);
    }, 1500);
  };

  return (
    <div className="relative w-full max-w-6xl mx-auto p-8">
      {/* Editor container with depth effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl transform scale-[1.02] opacity-70"></div>

      <div className="relative bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
        {/* Top navigation bar */}
        <div className="flex justify-between items-center px-8 py-6 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
          <div className="flex items-center space-x-3">
            <div className="h-4 w-4 rounded-full bg-red-400"></div>
            <div className="h-4 w-4 rounded-full bg-amber-400"></div>
            <div className="h-4 w-4 rounded-full bg-green-400"></div>
          </div>
          <div className="flex items-center space-x-6">
            <button className="text-gray-500 hover:text-gray-700">
              <Clock size={20} />
            </button>
            <button className="text-gray-500 hover:text-gray-700">
              <LayoutGrid size={20} />
            </button>
            <button className="text-gray-500 hover:text-gray-700">
              <Copy size={20} />
            </button>
            <button className="text-gray-500 hover:text-gray-700">
              <Settings size={20} />
            </button>
          </div>
        </div>

        <div className="p-8 space-y-8">
          {/* Title with animation */}
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 to-blue-500 opacity-10 rounded-lg blur"></div>
            <div className="relative">
              <label className="block text-lg font-medium text-gray-700 mb-2">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter a compelling title..."
                className="block w-full px-5 py-4 rounded-lg border-gray-200 bg-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>
          </div>

          {/* Tag selector */}
          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium text-gray-500">Tags:</span>
            <div className="flex flex-wrap gap-3">
              {tags.map(tag => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(selectedTag === tag ? '' : tag)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedTag === tag
                      ? 'bg-blue-100 text-blue-700 border border-blue-300'
                      : 'bg-gray-100 text-gray-600 border border-transparent hover:bg-gray-200'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Description with toolbar */}
          <div className="space-y-2">
            <label className="block text-lg font-medium text-gray-700">Description</label>

            {/* Formatting toolbar */}
            <div className={`flex items-center space-x-2 p-2 bg-gray-50 border border-gray-200 rounded-t-lg transition-opacity duration-300 ${showToolbar ? 'opacity-100' : 'opacity-0'}`}>
              <button className="p-2 rounded hover:bg-gray-200">
                <PenTool size={18} className="text-gray-700" />
              </button>
              <div className="h-4 w-px bg-gray-300"></div>
              <button className="p-2 rounded hover:bg-gray-200 font-bold text-lg">B</button>
              <button className="p-2 rounded hover:bg-gray-200 italic text-lg">I</button>
              <button className="p-2 rounded hover:bg-gray-200 underline text-lg">U</button>
              <div className="h-4 w-px bg-gray-300"></div>
              <button className="p-2 rounded hover:bg-gray-200">
                <ChevronDown size={18} className="text-gray-700" />
              </button>
            </div>

            <textarea
              className={`block w-full px-5 py-4 rounded-lg ${showToolbar ? 'rounded-t-none' : ''} border-gray-200 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200`}
              rows={6}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your content here..."
              onFocus={() => setShowToolbar(true)}
              onBlur={() => setShowToolbar(false)}
            />
          </div>

          {/* File upload area */}
          <div className="space-y-4">
            <label className="block text-lg font-medium text-gray-700">Upload Files</label>
            <div
              className={`relative border-2 ${dragActive ? 'border-blue-400 bg-blue-50' : 'border-gray-200 bg-gray-50'} border-dashed rounded-lg transition-all duration-200 p-8`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <input
                ref={fileInputRef}
                type="file"
                multiple
                onChange={handleFileChange}
                className="sr-only"
              />

              <div className="flex flex-col items-center justify-center text-center">
                <div className={`p-4 rounded-full bg-blue-50 mb-4 ${dragActive ? 'animate-pulse' : ''}`}>
                  <Upload className="h-10 w-10 text-blue-500" />
                </div>
                <p className="text-lg font-medium text-gray-900">
                  Drop your files here, or{' '}
                  <button
                    type="button"
                    className="text-blue-600 hover:text-blue-700 font-semibold"
                    onClick={onUploadClick}
                  >
                    browse
                  </button>
                </p>
                <p className="mt-2 text-sm text-gray-500">
                  Support for PPT, PDF, DOC, images and videos up to 10MB
                </p>
              </div>

              {/* Drag overlay animation */}
              {dragActive && (
                <div className="absolute inset-0 bg-blue-500 bg-opacity-5 rounded-lg flex items-center justify-center">
                  <div className="text-blue-600 font-medium animate-bounce">
                    Drop to upload
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* File list with animations */}
          {files.length > 0 && (
            <div className="space-y-4">
              <p className="text-lg font-medium text-gray-700">Uploaded Files ({files.length})</p>
              <div className="bg-gray-50 rounded-lg border border-gray-200 overflow-hidden">
                <ul className="divide-y divide-gray-200">
                  {files.map((file) => (
                    <li
                      key={file.id}
                      className="flex items-center justify-between py-4 px-5 hover:bg-gray-100 transition-all duration-200"
                    >
                      <div className="flex items-center space-x-4">
                        {getFileIcon(file.type)}
                        <span className="text-lg font-medium text-gray-800">{file.name}</span>
                        <span className="text-sm text-gray-500">{formatFileSize(file.size)}</span>
                      </div>
                      <button
                        onClick={() => removeFile(file.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <X size={18} />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Save button with loading state */}
          <button
            onClick={handleSave}
            disabled={saving}
            className={`w-full flex items-center justify-center py-4 px-6 rounded-lg text-lg font-medium transition-all duration-300 ${
              saving
                ? 'bg-indigo-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-md hover:shadow-lg'
            }`}
          >
            {saving ? (
              <>
                <div className="animate-spin h-6 w-6 mr-3 border-2 border-white border-t-transparent rounded-full"></div>
                Saving...
              </>
            ) : (
              <>
                <Save size={20} className="mr-3" />
                Save Content
              </>
            )}
          </button>
        </div>

        {/* Status bar */}
        <div className="px-8 py-4 bg-gray-50 border-t border-gray-100 flex justify-between items-center text-sm text-gray-500">
          <div className="flex items-center space-x-6">
            <div className="flex items-center">
              <Clock size={16} className="mr-2" />
              <span>Auto-saved 2 minutes ago</span>
            </div>
            <div>{description.length} characters</div>
          </div>
          <div className="flex items-center">
            {files.length > 0 && <span className="mr-3">{files.length} files attached</span>}
            {selectedTag && (
              <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                {selectedTag}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentEditor;
