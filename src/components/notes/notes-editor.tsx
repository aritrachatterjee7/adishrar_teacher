"use client";

import React, { useState } from "react";
import { Save, Send, Edit, Sparkles } from "lucide-react";

interface NotesEditorProps {
  aiNotes: string;
}

const NotesEditor: React.FC<NotesEditorProps> = ({ aiNotes }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState(aiNotes || "");
  const [isSaving, setIsSaving] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
    }, 1000);
  };

  const handlePublish = () => {
    setIsPublishing(true);
    setTimeout(() => {
      setIsPublishing(false);
    }, 1000);
  };

  return (
    <div className="bg-gradient-to-br from-white via-purple-50 to-pink-50 rounded-3xl shadow-xl p-8 text-gray-800 max-w-3xl mx-auto transform transition-all duration-300 hover:shadow-2xl">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold flex items-center space-x-3">
          <Edit className="h-8 w-8 text-purple-500" />
          <span className="text-gray-800 ml-2">Notes Editor</span>
        </h2>
        <div className="bg-purple-100 rounded-full px-3 py-1 flex items-center">
          <Sparkles className="h-4 w-4 text-purple-500 mr-1" />
          <span className="text-xs font-medium text-purple-700">AI Enhanced</span>
        </div>
      </div>
      
      <div className="space-y-6">
        <div className="transition-all duration-300 hover:translate-y-px">
          <label className="block text-sm font-medium text-gray-600 mb-2">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter a catchy title..."
            className="mt-1 block w-full rounded-xl border border-gray-200 shadow-inner p-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-transparent transition-all duration-200"
          />
        </div>
        
        <div className="transition-all duration-300 hover:translate-y-px">
          <label className="block text-sm font-medium text-gray-600 mb-2">Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Start typing your amazing thoughts..."
            className="w-full p-4 min-h-64 border border-gray-200 rounded-xl shadow-inner focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-transparent text-gray-700 transition-all duration-200"
          />
        </div>
        
        <div className="flex justify-end space-x-4 pt-4">
          <button
            onClick={handleSave}
            className={`flex items-center px-5 py-3 bg-white text-purple-600 font-medium rounded-full shadow-md hover:shadow-lg hover:bg-gray-50 transition-all duration-300 ${isSaving ? 'bg-purple-100' : ''}`}
          >
            <Save className="h-5 w-5 mr-2" />
            {isSaving ? 'Saving...' : 'Save Draft'}
          </button>
          
          <button
            onClick={handlePublish}
            className={`flex items-center px-5 py-3 bg-purple-600 text-white font-medium rounded-full shadow-md hover:shadow-lg hover:bg-purple-700 transition-all duration-300 ${isPublishing ? 'bg-purple-700' : ''}`}
          >
            <Send className="h-5 w-5 mr-2" />
            {isPublishing ? 'Publishing...' : 'Publish'}
          </button>
        </div>
      </div>
      
      <div className="mt-6 pt-4 border-t border-gray-100">
        <div className="flex justify-between text-xs text-gray-500">
          <span>{content.length} characters</span>
          <span>Last edited: Just now</span>
        </div>
      </div>
    </div>
  );
};

export default NotesEditor;