"use client";

import { Maximize, Minimize, Pause, Play, Volume2, VolumeX } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const VIDEO_SRC = "/videos/dsdrl-introduction.mp4";
const POSTER_SRC = "/videos/dsdrl-introduction-poster.jpg";

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds)) return "0:00";
  const minutes = Math.floor(seconds / 60);
  return `${minutes}:${String(Math.floor(seconds % 60)).padStart(2, "0")}`;
}

export default function HomeIntroPlayer() {
  const playerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [error, setError] = useState(false);

  useEffect(() => {
    const updateFullscreen = () => setIsFullscreen(document.fullscreenElement === playerRef.current);
    document.addEventListener("fullscreenchange", updateFullscreen);
    return () => document.removeEventListener("fullscreenchange", updateFullscreen);
  }, []);

  async function togglePlayback() {
    const video = videoRef.current;
    if (!video) return;
    if (!video.paused) {
      video.pause();
      return;
    }
    try {
      setError(false);
      await video.play();
    } catch {
      setError(true);
    }
  }

  function seekTo(value: number) {
    const video = videoRef.current;
    if (!video || !duration) return;
    video.currentTime = value;
    setCurrentTime(value);
  }

  function toggleMute() {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
  }

  async function toggleFullscreen() {
    if (document.fullscreenElement) {
      await document.exitFullscreen();
    } else if (playerRef.current?.requestFullscreen) {
      await playerRef.current.requestFullscreen();
    } else {
      // iOS Safari supports fullscreen on the media element itself.
      const video = videoRef.current as (HTMLVideoElement & { webkitEnterFullscreen?: () => void }) | null;
      video?.webkitEnterFullscreen?.();
    }
  }

  return (
    <div className="homeFilmPlayer" ref={playerRef}>
      <video
        ref={videoRef}
        className="homeFilmVideo"
        aria-label="Introduction to DS Dance Research Lab"
        poster={POSTER_SRC}
        preload="none"
        playsInline
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => setIsPlaying(false)}
        onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime)}
        onLoadedMetadata={(event) => setDuration(event.currentTarget.duration)}
        onDurationChange={(event) => setDuration(event.currentTarget.duration)}
        onVolumeChange={(event) => setIsMuted(event.currentTarget.muted)}
        onError={() => setError(true)}
      >
        <source src={VIDEO_SRC} type="video/mp4" />
        Your browser does not support this video.
      </video>

      {!isPlaying && !error && (
        <button type="button" className="homeFilmPlay" onClick={togglePlayback} aria-label="Play introduction video">
          <Play size={28} fill="currentColor" aria-hidden="true" />
        </button>
      )}

      <div className="homeFilmTopline" aria-hidden="true"><span>DSDRL / Film</span><span>01:48</span></div>

      {error && (
        <p className="homeFilmError" role="alert">
          The video could not be played. <a href={VIDEO_SRC}>Open the video file</a> instead.
        </p>
      )}

      <div className="homeFilmControls" role="group" aria-label="Video controls">
        <button type="button" onClick={togglePlayback} aria-label={isPlaying ? "Pause video" : "Play video"}>
          {isPlaying ? <Pause size={19} fill="currentColor" aria-hidden="true" /> : <Play size={19} fill="currentColor" aria-hidden="true" />}
        </button>
        <span className="homeFilmTime" aria-live="off">{formatTime(currentTime)}</span>
        <input
          className="homeFilmSeek"
          type="range"
          min={0}
          max={duration || 1}
          step={0.1}
          value={Math.min(currentTime, duration || 1)}
          onChange={(event) => seekTo(Number(event.target.value))}
          aria-label="Seek through video"
          aria-valuetext={`${formatTime(currentTime)} of ${formatTime(duration)}`}
          disabled={!duration}
          style={{ "--video-progress": `${duration ? (currentTime / duration) * 100 : 0}%` } as React.CSSProperties}
        />
        <span className="homeFilmTime" aria-live="off">{formatTime(duration)}</span>
        <button type="button" onClick={toggleMute} aria-label={isMuted ? "Unmute video" : "Mute video"}>
          {isMuted ? <VolumeX size={19} aria-hidden="true" /> : <Volume2 size={19} aria-hidden="true" />}
        </button>
        <button type="button" onClick={toggleFullscreen} aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}>
          {isFullscreen ? <Minimize size={19} aria-hidden="true" /> : <Maximize size={19} aria-hidden="true" />}
        </button>
      </div>
    </div>
  );
}
