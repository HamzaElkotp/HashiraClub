'use client';
import { useEffect, useRef, useState } from 'react';
import '../app/Style/HeroVideo.css'; // Import the styles below

type HeroVideoProps = {
  videoSrc: string;
  endDate: string; // ISO string or Date string
};

export default function HeroVideo({ videoSrc, endDate }: HeroVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [timeLeft, setTimeLeft] = useState<number>(0);

  useEffect(() => {
    const target = new Date(endDate).getTime();
    const update = () => {
      const diff = Math.max(target - Date.now(), 0);
      setTimeLeft(diff);
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [endDate]);

  const toggleMute = () => {
    setMuted((m) => {
      const next = !m;
      if (videoRef.current) videoRef.current.muted = next;
      return next;
    });
  };

  const pad = (n: number) => n.toString().padStart(2, '0');
  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((timeLeft / (1000 * 60)) % 60);
  const seconds = Math.floor((timeLeft / 1000) % 60);

  return (
    <div className="hero-video-wrapper">
      <video
        ref={videoRef}
        src={videoSrc}
        muted
        autoPlay
        loop
        playsInline
        className="hero-video"
      ></video>
      <div className="shadow"></div>

      <button onClick={toggleMute} className="mute-toggle">
        {muted ? '🔇 Mute' : '🔊 Unmute'}
      </button>

      <div className="timer-glitch">
        <span data-text={`${days}`}>{pad(days)}</span>:
        <span data-text={`${hours}`}>{pad(hours)}</span>:
        <span data-text={`${minutes}`}>{pad(minutes)}</span>:
        <span data-text={`${seconds}`}>{pad(seconds)}</span>
      </div>
    </div>
  );
}
