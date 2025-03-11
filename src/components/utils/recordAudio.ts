interface AudioRecorder {
    start: () => void;
    pause: () => void;
    resume: () => void;
    stop: () => Promise<Blob>;
    toggleMute: () => void;
  }
  
  const recordAudio = (): Promise<AudioRecorder> => {
    return new Promise(async (resolve) => {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      const audioChunks: Blob[] = [];
  
      mediaRecorder.addEventListener("dataavailable", (event) => {
        audioChunks.push(event.data);
      });
  
      const start = () => {
        mediaRecorder.start();
      };
  
      const pause = () => {
        mediaRecorder.pause();
      };
  
      const resume = () => {
        mediaRecorder.resume();
      };
  
      const stop = () => {
        return new Promise<Blob>((resolve) => {
          mediaRecorder.addEventListener("stop", () => {
            const audioBlob = new Blob(audioChunks, { type: "audio/webm" });
            resolve(audioBlob);
            stream.getTracks().forEach((track) => track.stop());
          });
  
          mediaRecorder.stop();
        });
      };
  
      const toggleMute = () => {
        const audioTracks = stream.getAudioTracks();
        audioTracks.forEach((track) => {
          track.enabled = !track.enabled;
        });
      };
  
      resolve({ start, pause, resume, stop, toggleMute });
    });
  };
  
  export default recordAudio;