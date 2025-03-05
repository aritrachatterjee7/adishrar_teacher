"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Sparkles, CloudLightning, Cloud, Award, Save, Send } from 'lucide-react';

interface Question {
  id: number;
  text: string;
  options: string[];
  correct: number | null;
}

const QuizCreator = () => {
  const [questions, setQuestions] = useState<Question[]>([{ id: 1, text: '', options: [''], correct: null }]);
  const [quizTitle, setQuizTitle] = useState('');
  const [showCelebration, setShowCelebration] = useState(false);

  const addQuestion = () => {
    const newId = questions.length + 1;
    setQuestions([...questions, { id: newId, text: '', options: [''], correct: null }]);

    // Show celebration animation briefly
    setShowCelebration(true);
    setTimeout(() => setShowCelebration(false), 1500);
  };

  const removeQuestion = (id: number) => {
    setQuestions(questions.filter(question => question.id !== id));
  };

  const addOption = (id: number) => {
    setQuestions(
      questions.map(question =>
        question.id === id ? { ...question, options: [...question.options, ''] } : question
      )
    );
  };

  const setCorrectOption = (questionId: number, optionIndex: number) => {
    setQuestions(
      questions.map(question =>
        question.id === questionId ? { ...question, correct: optionIndex } : question
      )
    );
  };

  const updateQuestionText = (id: number, text: string) => {
    setQuestions(
      questions.map(question =>
        question.id === id ? { ...question, text } : question
      )
    );
  };

  const updateOptionText = (questionId: number, optionIndex: number, text: string) => {
    setQuestions(
      questions.map(question =>
        question.id === questionId
          ? {
              ...question,
              options: question.options.map((option, index) =>
                index === optionIndex ? text : option
              ),
            }
          : question
      )
    );
  };

  const handlePublish = () => {
    setShowCelebration(true);
    setTimeout(() => setShowCelebration(false), 3000);
  };

  const backgroundGradient = 'bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100';
  const textColor = 'text-indigo-900';
  const cardBg = 'bg-white/80';
  const inputBg = 'bg-white';
  const inputText = 'text-indigo-950';
  const buttonPrimary = 'bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white';

  const floatingClouds = [
    { id: 1, size: 'h-16 w-24', position: 'top-10 left-10', delay: 0 },
    { id: 2, size: 'h-10 w-16', position: 'top-24 right-16', delay: 2 },
    { id: 3, size: 'h-12 w-20', position: 'bottom-16 left-20', delay: 4 },
    { id: 4, size: 'h-14 w-28', position: 'bottom-20 right-24', delay: 1 },
  ];

  return (
    <div className={`min-h-screen p-8 ${backgroundGradient} relative overflow-hidden transition-colors duration-1000`}>
      {/* Floating clouds */}
      {floatingClouds.map(cloud => (
        <motion.div
          key={cloud.id}
          className={`absolute ${cloud.position} ${cloud.size} opacity-30`}
          animate={{
            x: [0, 20, 0],
            y: [0, 10, 0],
          }}
          transition={{
            duration: 15,
            delay: cloud.delay,
            repeat: Infinity,
          }}
        >
          <Cloud className="w-full h-full text-white" />
        </motion.div>
      ))}

      {/* Logo */}
      <motion.div
        className="flex items-center justify-center mb-8"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, type: "spring" }}
      >
        <div className="relative">
          <CloudLightning className="h-16 w-16 text-indigo-600" />
          <motion.div
            className="absolute top-0 left-0 w-full h-full"
            animate={{
              opacity: [0, 1, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          >
            <Sparkles className="h-16 w-16 text-purple-400" />
          </motion.div>
        </div>
        <h1 className="ml-4 text-4xl font-extrabold text-indigo-900">Assessment Quiz</h1>
      </motion.div>

      {/* Celebration particles */}
      <AnimatePresence>
        {showCelebration && (
          <>
            {Array.from({ length: 30 }).map((_, i) => {
              const size = Math.random() * 8 + 4;
              const xDir = Math.random() > 0.5 ? 1 : -1;
              const yDir = Math.random() > 0.5 ? 1 : -1;
              const color = [
                'bg-pink-500', 'bg-purple-500', 'bg-indigo-500',
                'bg-blue-500', 'bg-yellow-400', 'bg-green-400'
              ][Math.floor(Math.random() * 6)];

              return (
                <motion.div
                  key={i}
                  className={`absolute rounded-full ${color} top-1/2 left-1/2`}
                  style={{
                    width: `${size}px`,
                    height: `${size}px`,
                  }}
                  initial={{ x: 0, y: 0, opacity: 1 }}
                  animate={{
                    x: xDir * (Math.random() * 300 + 100),
                    y: yDir * (Math.random() * 300 + 100),
                    opacity: 0,
                  }}
                  transition={{
                    duration: 1.5,
                    ease: "easeOut",
                  }}
                  exit={{ opacity: 0 }}
                />
              );
            })}
          </>
        )}
      </AnimatePresence>

      <div className={`max-w-4xl mx-auto rounded-3xl shadow-2xl ${cardBg} backdrop-blur-lg p-10 border border-white/20`}>
        <motion.div
          className="space-y-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <label className={`block text-xl font-medium ${textColor}`}>
              <span className="flex items-center">
                <Award className="mr-2 h-5 w-5" />
                Quiz Title
              </span>
            </label>
            <motion.input
              type="text"
              value={quizTitle}
              onChange={(e) => setQuizTitle(e.target.value)}
              className={`mt-2 block w-full rounded-lg border-none shadow-lg focus:ring-2 focus:ring-purple-500 p-4 ${inputBg} ${inputText}`}
              placeholder="Enter a quiz title"
              whileFocus={{ scale: 1.01 }}
              transition={{ duration: 0.2 }}
            />
          </div>

          <div className="space-y-8">
            <AnimatePresence>
              {questions.map((question, index) => (
                <motion.div
                  key={question.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className={`p-8 rounded-2xl shadow-lg ${cardBg} border border-white/30`}
                >
                  <div className="flex justify-between items-center mb-6">
                    <motion.h3
                      className={`text-xl font-bold ${textColor} flex items-center`}
                      whileHover={{ scale: 1.02 }}
                    >
                      <Sparkles className="mr-2 h-5 w-5" />
                      Question {index + 1}
                    </motion.h3>
                    <motion.button
                      onClick={() => removeQuestion(question.id)}
                      className={`flex items-center px-3 py-1 rounded-full bg-red-100 text-red-600 hover:bg-red-200`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Trash2 size={16} className="mr-1" />
                      Remove
                    </motion.button>
                  </div>

                  <div className="space-y-5">
                    <motion.input
                      type="text"
                      value={question.text}
                      onChange={(e) => updateQuestionText(question.id, e.target.value)}
                      className={`block w-full rounded-xl border-none shadow-md focus:ring-2 focus:ring-purple-500 p-4 ${inputBg} ${inputText}`}
                      placeholder="Enter your question"
                      whileFocus={{ scale: 1.01 }}
                    />

                    <div className="space-y-4 mt-6">
                      <h4 className={`font-medium ${textColor} mb-3`}>Answer Options</h4>
                      <AnimatePresence>
                        {question.options.map((option, optionIndex) => (
                          <motion.div
                            key={optionIndex}
                            className="flex items-center space-x-4"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            transition={{ duration: 0.3 }}
                          >
                            <div className="flex-1 relative">
                              <motion.input
                                type="text"
                                value={option}
                                onChange={(e) => updateOptionText(question.id, optionIndex, e.target.value)}
                                className={`w-full rounded-xl border-none shadow-md focus:ring-2 focus:ring-purple-500 p-3 pl-12 ${inputBg} ${inputText}`}
                                placeholder={`Option ${optionIndex + 1}`}
                                whileFocus={{ scale: 1.01 }}
                              />
                              <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-500 font-bold">
                                {String.fromCharCode(65 + optionIndex)}
                              </span>
                            </div>
                            <motion.div
                              className={`h-6 w-6 rounded-full flex items-center justify-center cursor-pointer ${
                                question.correct === optionIndex
                                  ? 'bg-purple-600'
                                  : 'bg-gray-200'
                              }`}
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => setCorrectOption(question.id, optionIndex)}
                            >
                              {question.correct === optionIndex && (
                                <motion.div
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  className="h-3 w-3 rounded-full bg-white"
                                />
                              )}
                            </motion.div>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                      <motion.button
                        onClick={() => addOption(question.id)}
                        className={`text-sm flex items-center px-4 py-2 rounded-full mt-4 bg-indigo-100 text-indigo-600 hover:bg-indigo-200`}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                      >
                        <Plus size={16} className="mr-2" />
                        Add Option
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <motion.button
            onClick={addQuestion}
            className={`flex items-center space-x-2 px-5 py-3 rounded-full shadow-md ${buttonPrimary}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            <Plus size={20} />
            <span>Add Question</span>
          </motion.button>

          <motion.div
            className="flex justify-end space-x-4 mt-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <motion.button
              className={`px-6 py-3 rounded-xl shadow-md flex items-center bg-white text-indigo-700 hover:bg-gray-50`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              <Save className="mr-2 h-5 w-5" />
              Save Draft
            </motion.button>
            <motion.button
              className={`px-6 py-3 rounded-xl shadow-md flex items-center ${buttonPrimary}`}
              onClick={handlePublish}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              <Send className="mr-2 h-5 w-5" />
              Publish it
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default QuizCreator;
