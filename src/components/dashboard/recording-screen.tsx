"use client";
import React, { useState, useRef } from "react";
import { Mic, MicOff, Pause, Play, StopCircle, Video, X } from "lucide-react";
import recordAudio from "../utils/recordAudio";

interface RecordingScreenProps {
  onClose: () => void;
}

const RecordingScreen: React.FC<RecordingScreenProps> = ({ onClose }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const recorderRef = useRef<{
    start: () => void;
    pause: () => void;
    resume: () => void;
    stop: () => Promise<Blob>;
    toggleMute: () => void;
  } | null>(null);

  const handleStartRecording = async () => {
    const recorder = await recordAudio();
    recorderRef.current = recorder;
    recorder.start();
    setIsRecording(true);
  };

  const handlePauseRecording = () => {
    if (!recorderRef.current) return;
    if (isPaused) {
      recorderRef.current.resume();
    } else {
      recorderRef.current.pause();
    }
    setIsPaused(!isPaused);
  };

  const handleStopRecording = async () => {
    if (!recorderRef.current) return;
    const audioBlob = await recorderRef.current.stop();
    setIsRecording(false);

    // Simulate uploading the file to a dummy URL
    await uploadFile(audioBlob);
  };

  const handleToggleMute = () => {
    if (!recorderRef.current) return;
    recorderRef.current.toggleMute();
    setIsMuted(!isMuted);
  };

  const uploadFile = async (blob: Blob) => {
    // Simulate uploading the file to a dummy URL
    const dummyUrl = "https://example.com/upload"; // Replace with your server endpoint later
    const formData = new FormData();
    formData.append("file", blob, `recording_${Date.now()}.webm`);

    try {
      const response = await fetch(dummyUrl, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("File uploaded successfully!");
      } else {
        alert("Failed to upload file.");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("An error occurred while uploading the file.");
    }
  };

  const handleEnd = () => {
    if (isRecording) {
      // Show a warning message if recording is active
      const confirmEnd = window.confirm(
        "Are you sure you want to end? Click on Stop Recording to save the audio file."
      );
      if (!confirmEnd) return; // Do not end if the user cancels
    }
    onClose(); // Close the recording screen
  };

  return (
    <div className="fixed inset-0 bg-gray-900 text-white flex flex-col items-center justify-center z-50">
      {/* Header */}
      <div className="absolute top-4 right-4">
        <button
          onClick={handleEnd}
          className="p-2 bg-gray-800 rounded-full hover:bg-gray-700"
        >
          <X size={24} />
        </button>
      </div>

      {/* Recording Controls */}
      <div className="flex space-x-4">
        {!isRecording ? (
          // Start Recording Button
          <button
            onClick={handleStartRecording}
            className="p-4 bg-blue-600 rounded-full hover:bg-blue-700"
          >
            <Video size={32} />
          </button>
        ) : (
          <>
            {/* Mute/Unmute Button */}
            <button
              onClick={handleToggleMute}
              className="p-4 bg-gray-700 rounded-full hover:bg-gray-600"
            >
              {isMuted ? <MicOff size={32} /> : <Mic size={32} />}
            </button>

            {/* Pause/Resume Button */}
            <button
              onClick={handlePauseRecording}
              className="p-4 bg-yellow-500 rounded-full hover:bg-yellow-600"
            >
              {isPaused ? <Play size={32} /> : <Pause size={32} />}
            </button>

            {/* Stop Recording Button */}
            <button
              onClick={handleStopRecording}
              className="p-4 bg-red-600 rounded-full hover:bg-red-700"
            >
              <StopCircle size={32} />
            </button>
          </>
        )}
      </div>

      {/* End Button */}
      <button
        onClick={handleEnd}
        className={`mt-8 px-6 py-2 rounded-lg ${
          isRecording && !isPaused
            ? "bg-gray-600 cursor-not-allowed"
            : "bg-gray-800 hover:bg-gray-700"
        }`}
      >
        End
      </button>
    </div>
  );
};

export default RecordingScreen;