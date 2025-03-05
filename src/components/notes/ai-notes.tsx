"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, Copy, CheckCircle, Sparkles, BookOpen, RefreshCw, FileText } from "lucide-react";

const AINotes = ({ onGenerate }: { onGenerate: (notes: string) => void }) => {
  const [notes, setNotes] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [generationHistory, setGenerationHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const generatePlaceholders = [
    "Generating personalized lecture notes...",
    "Summarizing key concepts...",
    "Crafting detailed explanations...",
    "Organizing important information..."
  ];
  const [placeholderIndex, setPlaceholderIndex] = useState(0);

  const handleGenerateNotes = () => {
    setIsLoading(true);
    setIsCopied(false);
    
    // Simulate loading with changing placeholders
    const interval = setInterval(() => {
      setPlaceholderIndex(prev => (prev + 1) % generatePlaceholders.length);
    }, 1200);
    
    // Mock AI generation with delay
    setTimeout(() => {
      clearInterval(interval);
      const aiGeneratedNotes = 
        "# Quantum Computing Fundamentals\n\n" +
        "## 1. Quantum Bits (Qubits)\n" +
        "- Unlike classical bits (0 or 1), qubits can exist in a superposition of states\n" +
        "- Represented mathematically as |ψ⟩ = α|0⟩ + β|1⟩, where |α|² + |β|² = 1\n" +
        "- Measurement collapses superposition to either 0 or 1 with probabilities |α|² and |β|²\n\n" +
        "## 2. Quantum Gates\n" +
        "- Hadamard (H): Creates superposition from |0⟩ or |1⟩\n" +
        "- Pauli-X, Y, Z: Single-qubit rotation gates\n" +
        "- CNOT: Two-qubit gate that flips target qubit if control qubit is |1⟩\n\n" +
        "## 3. Quantum Algorithms\n" +
        "- Shor's Algorithm: Exponential speedup for integer factorization\n" +
        "- Grover's Algorithm: Quadratic speedup for unstructured search\n" +
        "- Quantum Fourier Transform: Building block for many quantum algorithms";
      
      setNotes(aiGeneratedNotes);
      setGenerationHistory(prev => [...prev, aiGeneratedNotes]);
      setHistoryIndex(prev => prev + 1);
      onGenerate(aiGeneratedNotes);
      setIsLoading(false);
    }, 3000);
  };

  const handleCopyNotes = () => {
    navigator.clipboard.writeText(notes);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const navigateHistory = (direction: 'prev' | 'next') => {
    if (direction === 'prev' && historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setNotes(generationHistory[historyIndex - 1]);
    } else if (direction === 'next' && historyIndex < generationHistory.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setNotes(generationHistory[historyIndex + 1]);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="bg-gradient-to-br from-white to-indigo-50 rounded-3xl shadow-2xl p-8 border border-indigo-100"
      >
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold flex items-center gap-3 text-indigo-900">
            <div className="bg-indigo-600 text-white p-2 rounded-lg">
              <BookOpen className="h-7 w-7" />
            </div>
            <span>Intelligent Notes</span>
          </h2>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex items-center gap-2 text-indigo-600 bg-indigo-50 py-1.5 px-3 rounded-full text-sm font-medium"
          >
            <Sparkles className="h-4 w-4" />
            <span>AI-powered</span>
          </motion.div>
        </div>
        
        <motion.div 
          className="relative bg-white rounded-2xl p-6 shadow-lg border border-indigo-100 mb-6"
          whileHover={{ boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
          transition={{ duration: 0.2 }}
        >
          <div className="absolute top-3 right-3 flex gap-2">
            {generationHistory.length > 1 && (
              <div className="flex gap-1">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={historyIndex <= 0}
                  onClick={() => navigateHistory('prev')}
                  className={`p-1.5 rounded-full ${historyIndex <= 0 ? 'text-gray-300' : 'text-indigo-400 hover:bg-indigo-50'}`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={historyIndex >= generationHistory.length - 1}
                  onClick={() => navigateHistory('next')}
                  className={`p-1.5 rounded-full ${historyIndex >= generationHistory.length - 1 ? 'text-gray-300' : 'text-indigo-400 hover:bg-indigo-50'}`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                </motion.button>
              </div>
            )}
          </div>
          
          <textarea
            ref={textareaRef}
            value={isLoading ? generatePlaceholders[placeholderIndex] : notes}
            readOnly
            placeholder="Your AI-generated notes will appear here..."
            className="w-full h-64 p-4 bg-transparent border-none focus:ring-0 text-gray-700 resize-none font-mono text-sm leading-relaxed"
          />
          
          <AnimatePresence>
            {!isLoading && (
              <motion.div
                className="flex justify-between items-center mt-2 border-t border-gray-100 pt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="text-xs text-gray-500 flex items-center">
                  <FileText className="h-3 w-3 mr-1" />
                  {notes ? notes.split('\n').length : 0} lines
                </div>
                <div className="text-xs text-gray-500">
                  {generationHistory.length > 0 && (
                    <span>{historyIndex + 1} of {generationHistory.length}</span>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleGenerateNotes}
            disabled={isLoading}
            className={`
              flex items-center justify-center py-3.5 px-6 rounded-xl text-white font-medium shadow-lg
              ${isLoading 
                ? 'bg-indigo-400 cursor-not-allowed' 
                : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700'}
              transition duration-300 ease-in-out
            `}
          >
            {isLoading ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <RefreshCw className="h-5 w-5 mr-2" />
              </motion.div>
            ) : (
              <Bot className="h-5 w-5 mr-2" />
            )}
            <span>{isLoading ? "Generating..." : "Generate Notes"}</span>
          </motion.button>
          
          <AnimatePresence>
            {notes && (
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleCopyNotes}
                className={`
                  flex items-center justify-center py-3.5 px-6 rounded-xl font-medium shadow-lg
                  ${isCopied 
                    ? 'bg-green-50 text-green-600 border border-green-200' 
                    : 'bg-white text-indigo-600 border border-indigo-200 hover:bg-indigo-50'}
                  transition duration-300 ease-in-out
                `}
              >
                {isCopied ? (
                  <>
                    <CheckCircle className="h-5 w-5 mr-2" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-5 w-5 mr-2" />
                    <span>Copy to Clipboard</span>
                  </>
                )}
              </motion.button>
            )}
          </AnimatePresence>
        </div>
        
        {generationHistory.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-6 text-center"
          >
            <div className="text-xs text-gray-500">
              Use AI to create comprehensive lecture notes, summaries, and study guides in seconds
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default AINotes;