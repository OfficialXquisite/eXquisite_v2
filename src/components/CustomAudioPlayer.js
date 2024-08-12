import React, { useEffect, useRef, useState } from 'react';
import { IconButton } from '@mui/material';
import { PlayArrow, Pause, SkipNext, SkipPrevious, FastForward, FastRewind } from '@mui/icons-material';
import './CustomAudioPlayer.css';

const CustomAudioPlayer = ({ currentSong, songInfo }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (currentSong) {
      audioRef.current.src = currentSong;
      audioRef.current.play();
      setIsPlaying(true);
    }
  }, [currentSong]);

  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSkipNext = () => {
    // Implement skip next functionality
  };

  const handleSkipPrevious = () => {
    // Implement skip previous functionality
  };

  const handleFastForward = () => {
    audioRef.current.currentTime += 10;
  };

  const handleRewind = () => {
    audioRef.current.currentTime -= 10;
  };

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
    setDuration(audioRef.current.duration);
  };

  return (
    <div className="custom-audio-player">
      <img src={songInfo?.albumArt} alt="Album Art" className="album-art" />
      <div className="controls">
        <IconButton onClick={handleSkipPrevious}>
          <SkipPrevious />
        </IconButton>
        <IconButton onClick={handleRewind}>
          <FastRewind />
        </IconButton>
        <IconButton onClick={togglePlayPause}>
          {isPlaying ? <Pause /> : <PlayArrow />}
        </IconButton>
        <IconButton onClick={handleFastForward}>
          <FastForward />
        </IconButton>
        <IconButton onClick={handleSkipNext}>
          <SkipNext />
        </IconButton>
      </div>
      <div className="progress-container">
        <span>{Math.floor(currentTime)}</span>
        <input
          type="range"
          min="0"
          max={duration}
          value={currentTime}
          onChange={(e) => audioRef.current.currentTime = e.target.value}
          className="progress-bar"
        />
        <span>{Math.floor(duration)}</span>
      </div>
      <audio ref={audioRef} onTimeUpdate={handleTimeUpdate} style={{ display: 'none' }}>
        <source src={currentSong} type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};

export default CustomAudioPlayer;
