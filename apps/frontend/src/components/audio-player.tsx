import React, { useEffect, useState } from "react";

export const AudioPlayerComponent = ({
  src = "./lovely-days-with-you-167702.mp3",
}) => {
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const audioObj = new Audio(src);
    setAudio(audioObj);

    return () => {
      if (audioObj) {
        audioObj.pause();
      }
    };
  }, [src]);

  useEffect(() => {
    if (audio) {
      const handlePlaying = () => setIsPlaying(true);
      const handlePause = () => setIsPlaying(false);
      audio.addEventListener("playing", handlePlaying);
      audio.addEventListener("pause", handlePause);

      return () => {
        audio.removeEventListener("playing", handlePlaying);
        audio.removeEventListener("pause", handlePause);
      };
    }
  }, [audio]);

  const handlePlayPauseClick = () => {
    if (audio) {
      if (isPlaying) {
        audio.pause();
      } else {
        audio.play().catch((error) => console.error(error));
      }
    }
  };

  return (
    <button className="default-button transparent" onClick={handlePlayPauseClick}>
      <i className={`fas fa-${isPlaying ? "pause" : "play"}`} />
    </button>
  );
};
