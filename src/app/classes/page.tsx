"use client";
import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  GraduationCap,
  Calculator,
  PlayCircle,
  ChevronDown,
  Plus,
  Save,
  FileText,
  Edit,
  Upload,
} from "lucide-react";

// Define types
type Lecture = {
  id: number;
  title: string;
  duration: string;
  notes?: string;
  mediaFile?: string;
};

type Chapter = {
  id: number;
  name: string;
  lectures: Lecture[];
};

type Subject = {
  id: number;
  name: string;
  icon: React.ElementType;
  color: {
    background: string;
    gradient: string;
  };
  chapters: Chapter[];
};

type ClassData = {
  id: number;
  name: string;
  subjects: Subject[];
};

// Sample Data (unchanged)
const classesData: ClassData[] = [
  {
    id: 1,
    name: "Class 8",
    subjects: [
      {
        id: 1,
        name: "Mathematics",
        icon: Calculator,
        color: {
          background: "bg-blue-500",
          gradient: "from-blue-500 to-blue-600",
        },
        chapters: [
          {
            id: 1,
            name: "Algebra",
            lectures: [
              { id: 1, title: "Introduction to Algebra", duration: "45 mins" },
              { id: 2, title: "Linear Equations", duration: "60 mins" },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 2,
    name: "Class 9",
    subjects: [
      {
        id: 1,
        name: "Mathematics",
        icon: Calculator,
        color: {
          background: "bg-blue-500",
          gradient: "from-blue-500 to-blue-600",
        },
        chapters: [
          {
            id: 1,
            name: "Calculus",
            lectures: [
              { id: 1, title: "Integrals", duration: "45 mins" },
              { id: 2, title: "Derivatives", duration: "90 mins" },
            ],
          },
        ],
      },
    ],
  },
];

// SubjectDetailModal Component
const SubjectDetailModal: React.FC<{
  subject: Subject;
  onClose: () => void;
}> = ({ subject, onClose }) => {
  const [selectedChapter, setSelectedChapter] = useState(subject.chapters[0]);
  const [selectedLecture, setSelectedLecture] = useState(selectedChapter.lectures[0]);
  const [isAddingLecture, setIsAddingLecture] = useState(false);
  const [lectureTitle, setLectureTitle] = useState("");
  const [lectureDuration, setLectureDuration] = useState("");
  const [lectureNotes, setLectureNotes] = useState("");
  const [editingNotes, setEditingNotes] = useState(false);
  const [mediaFile, setMediaFile] = useState<File | null>(null);
  const [mediaPreviewUrl, setMediaPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleMediaUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setMediaFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setMediaPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddLecture = () => {
    if (lectureTitle && lectureDuration) {
      const newLecture = {
        id: selectedChapter.lectures.length + 1,
        title: lectureTitle,
        duration: lectureDuration,
        notes: lectureNotes,
        mediaFile: mediaPreviewUrl || undefined,
      };

      // Update the chapter's lectures
      selectedChapter.lectures.push(newLecture);

      // Reset form and close add lecture mode
      setLectureTitle("");
      setLectureDuration("");
      setLectureNotes("");
      setMediaFile(null);
      setMediaPreviewUrl(null);
      setIsAddingLecture(false);

      // Select the newly added lecture
      setSelectedLecture(newLecture);
    }
  };

  const handleSaveNotes = () => {
    // Update the selected lecture's notes
    selectedLecture.notes = lectureNotes;
    setEditingNotes(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4 overflow-y-auto"
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.9 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="bg-white w-full max-w-6xl rounded-3xl shadow-2xl overflow-hidden grid grid-cols-12 my-8"
      >
        {/* Sidebar */}
        <div
          className={`col-span-4 lg:col-span-3 ${subject.color.background} 
          bg-gradient-to-br ${subject.color.gradient} text-white p-6 relative`}
        >
          <div className="sticky top-0">
            <div className="flex items-center mb-8">
              <subject.icon className="w-12 h-12 mr-4" />
              <h2 className="text-3xl font-bold">{subject.name}</h2>
            </div>

            {subject.chapters.map((chapter) => (
              <motion.div
                key={chapter.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * chapter.id }}
                onClick={() => {
                  setSelectedChapter(chapter);
                  setSelectedLecture(chapter.lectures[0]);
                }}
                className={`p-4 rounded-lg mb-4 cursor-pointer transition transform 
                  ${selectedChapter.id === chapter.id
                    ? "bg-white/20 scale-105"
                    : "hover:bg-white/10 hover:scale-100"
                  }`}
              >
                <h3 className="font-semibold text-lg">{chapter.name}</h3>
                <p className="text-sm opacity-70">{chapter.lectures.length} Lectures</p>
              </motion.div>
            ))}

            <button
              onClick={onClose}
              className="mt-4 w-full bg-white/20 hover:bg-white/30 py-3 rounded-lg transition"
            >
              Close
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="col-span-8 lg:col-span-9 p-8 bg-gray-50">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-4xl font-bold text-gray-800">{selectedChapter.name}</h2>
            <button
              onClick={() => setIsAddingLecture(true)}
              className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
            >
              <Plus className="mr-2" /> Add Lecture
            </button>
          </div>

          {/* Add Lecture Form */}
          {isAddingLecture && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-white rounded-2xl p-6 mb-6 shadow-md"
            >
              <h3 className="text-2xl font-bold mb-4">Add New Lecture</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Lecture Title"
                  value={lectureTitle}
                  onChange={(e) => setLectureTitle(e.target.value)}
                  className="w-full p-3 border rounded-lg"
                />
                <input
                  type="text"
                  placeholder="Duration (e.g., 45 mins)"
                  value={lectureDuration}
                  onChange={(e) => setLectureDuration(e.target.value)}
                  className="w-full p-3 border rounded-lg"
                />
              </div>
              <textarea
                placeholder="Lecture Notes (Optional)"
                value={lectureNotes}
                onChange={(e) => setLectureNotes(e.target.value)}
                className="w-full p-3 border rounded-lg mt-4"
                rows={4}
              />
              
              {/* Media Upload Section */}
              <div className="mt-4">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleMediaUpload}
                  accept="image/,video/"
                  className="hidden"
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
                >
                  <Upload className="mr-2" /> Upload Media
                </button>
                
                {mediaPreviewUrl && (
                  <div className="mt-4">
                    {mediaFile?.type.startsWith('image/') ? (
                      <img 
                        src={mediaPreviewUrl} 
                        alt="Media Preview" 
                        className="max-w-full h-48 object-cover rounded-lg"
                      />
                    ) : (
                      <video 
                        src={mediaPreviewUrl} 
                        controls 
                        className="max-w-full h-48 rounded-lg"
                      />
                    )}
                  </div>
                )}
              </div>

              <div className="flex justify-end space-x-4 mt-4">
                <button
                  onClick={() => {
                    setIsAddingLecture(false);
                    setMediaFile(null);
                    setMediaPreviewUrl(null);
                  }}
                  className="px-4 py-2 border rounded-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddLecture}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  Save Lecture
                </button>
              </div>
            </motion.div>
          )}

          <div className="grid md:grid-cols-2 gap-8">
            {/* Lecture List */}
            <div className="space-y-4">
              {selectedChapter.lectures.map((lecture) => (
                <motion.div
                  key={lecture.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * lecture.id }}
                  onClick={() => setSelectedLecture(lecture)}
                  className={`p-5 rounded-xl cursor-pointer transition transform 
                    ${selectedLecture.id === lecture.id
                      ? "bg-blue-100 scale-105 shadow-md"
                      : "hover:bg-gray-100 hover:scale-105"
                    }`}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold text-lg">{lecture.title}</h3>
                      <p className="text-sm text-gray-500">{lecture.duration}</p>
                    </div>
                    <PlayCircle className="text-blue-500 w-8 h-8" />
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Lecture Details and Notes */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-3xl p-6 shadow-xl"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-800">{selectedLecture.title}</h3>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => {
                      setEditingNotes(true);
                      setLectureNotes(selectedLecture.notes || "");
                    }}
                    className="text-gray-500 hover:text-blue-500"
                  >
                    <Edit size={20} />
                  </button>
                </div>
              </div>

              {/* Media Preview */}
              <div className="bg-gradient-to-br from-gray-100 to-gray-200 h-72 rounded-2xl flex items-center justify-center mb-6">
                {selectedLecture.mediaFile ? (
                  selectedLecture.mediaFile.startsWith('data:image/') ? (
                    <img 
                      src={selectedLecture.mediaFile} 
                      alt="Lecture Media" 
                      className="max-w-full max-h-full object-contain"
                    />
                  ) : (
                    <video 
                      src={selectedLecture.mediaFile} 
                      controls 
                      className="max-w-full max-h-full"
                    />
                  )
                ) : (
                  <div className="text-center">
                    <PlayCircle className="mx-auto mb-4 text-gray-400 w-16 h-16" />
                    <p className="text-gray-500 text-lg">No Media Uploaded</p>
                  </div>
                )}
              </div>

              {/* Notes Section */}
              {editingNotes ? (
                <div>
                  <textarea
                    value={lectureNotes}
                    onChange={(e) => setLectureNotes(e.target.value)}
                    className="w-full p-3 border rounded-lg mb-4"
                    rows={6}
                    placeholder="Add your lecture notes here..."
                  />
                  <div className="flex justify-end space-x-2">
                    <button
                      onClick={() => setEditingNotes(false)}
                      className="px-4 py-2 border rounded-lg"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSaveNotes}
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center"
                    >
                      <Save className="mr-2" /> Save Notes
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <h4 className="text-lg font-semibold mb-2 flex items-center">
                    <FileText className="mr-2 text-gray-500" /> Lecture Notes
                  </h4>
                  <div className="bg-gray-50 p-4 rounded-lg min-h-[150px]">
                    {selectedLecture.notes ? (
                      <p>{selectedLecture.notes}</p>
                    ) : (
                      <p className="text-gray-400">No notes added. Click edit to add notes.</p>
                    )}
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Main Component
export default function Home() {
  const [openClassId, setOpenClassId] = useState<number | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-8">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row items-center mb-8 space-y-4 md:space-y-0 md:space-x-4">
          <GraduationCap className="text-blue-600" size={48} />
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Classes</h1>
        </div>

        <div className="space-y-6">
          {classesData.map((classData) => (
            <motion.div
              key={classData.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-3xl shadow-xl overflow-hidden"
            >
              <div
                onClick={() => setOpenClassId(openClassId === classData.id ? null : classData.id)}
                className="p-6 flex justify-between items-center cursor-pointer hover:bg-gray-50 transition"
              >
                <h2 className="text-2xl font-bold text-gray-800">{classData.name}</h2>
                <ChevronDown
                  className={`transition-transform ${
                    openClassId === classData.id ? "rotate-180" : ""
                  }`}
                />
              </div>

              <AnimatePresence>
                {openClassId === classData.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 p-6"
                  >
                    {classData.subjects.map((subject) => (
                      <motion.div
                        key={subject.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{ duration: 0.3 }}
                        onClick={() => setSelectedSubject(subject)}
                        className={`${subject.color.background} 
                          bg-gradient-to-br ${subject.color.gradient} 
                          text-white rounded-2xl p-6 cursor-pointer 
                          hover:scale-105 transition-transform group relative overflow-hidden`}
                      >
                        <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <div className="relative z-10">
                          <div className="flex items-center justify-between mb-4">
                            <subject.icon className="w-12 h-12" />
                            <h3 className="text-xl font-bold">{subject.name}</h3>
                          </div>
                          <div className="space-y-2">
                            {subject.chapters.map((chapter) => (
                              <div
                                key={chapter.id}
                                className="flex justify-between text-sm opacity-80 group-hover:opacity-100"
                              >
                                <span>{chapter.name}</span>
                                <span>{chapter.lectures.length} Lectures</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedSubject && (
          <SubjectDetailModal
            subject={selectedSubject}
            onClose={() => setSelectedSubject(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}