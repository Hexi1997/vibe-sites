import { useState, useRef, useEffect, useCallback, type CSSProperties } from "react";

interface Track {
  id: number;
  title: string;
  artist: string;
  duration: string;
  genre: string;
  color: string;
}

const TRACKS: Track[] = [
  { id: 1, title: "Midnight Drive", artist: "Echo Collective", duration: "3:42", genre: "Electronic", color: "#1ed760" },
  { id: 2, title: "Neon Rainfall", artist: "Synthwave Dreams", duration: "4:17", genre: "Synthwave", color: "#539df5" },
  { id: 3, title: "Urban Pulse", artist: "City Beats", duration: "2:58", genre: "Lo-fi Hip Hop", color: "#ffa42b" },
  { id: 4, title: "Deep Signal", artist: "Bass Culture", duration: "5:03", genre: "Ambient", color: "#f3727f" },
];

function WaveformVisualizer({ isPlaying }: { isPlaying: boolean }) {
  const bars = 64;
  return (
    <div className="flex items-end justify-center gap-[2px] h-24 w-full">
      {Array.from({ length: bars }).map((_, i) => {
        const height = 20 + Math.abs(Math.sin(i * 0.4)) * 60 + Math.random() * 20;
        const duration = 0.6 + Math.random() * 0.8;
        const delay = (i / bars) * 0.5;
        return (
          <div
            key={i}
            className="bar flex-1 rounded-full bg-[#1ed760]"
            style={
              {
                height: `${height}%`,
                "--duration": `${duration}s`,
                "--delay": `${delay}s`,
                opacity: isPlaying ? 1 : 0.3,
                animationPlayState: isPlaying ? "running" : "paused",
                minWidth: "2px",
                maxWidth: "6px",
              } as CSSProperties
            }
          />
        );
      })}
    </div>
  );
}

function VinylRecord({ isPlaying, track }: { isPlaying: boolean; track: Track }) {
  return (
    <div className="relative flex items-center justify-center">
      <div
        className="absolute rounded-full"
        style={{
          width: 220,
          height: 220,
          background: `radial-gradient(circle, ${track.color}20 0%, transparent 70%)`,
          animation: isPlaying ? "ping-slow 2s ease-out infinite" : "none",
        }}
      />
      <div className={`vinyl-record ${isPlaying ? "" : "paused"} relative`} style={{ width: 180, height: 180 }}>
        <svg viewBox="0 0 180 180" width="180" height="180">
          <circle cx="90" cy="90" r="88" fill="#1a1a1a" />
          {[75, 65, 55, 45, 35, 25].map((r) => (
            <circle key={r} cx="90" cy="90" r={r} fill="none" stroke="#2a2a2a" strokeWidth="1.5" />
          ))}
          <circle cx="90" cy="90" r="22" fill={track.color} opacity="0.9" />
          <circle cx="90" cy="90" r="4" fill="#121212" />
          <circle cx="90" cy="90" r="88" fill="none" stroke="#333" strokeWidth="0.5" strokeDasharray="4 8" />
          <ellipse cx="70" cy="60" rx="30" ry="15" fill="white" opacity="0.03" transform="rotate(-30 70 60)" />
        </svg>
      </div>
    </div>
  );
}

export function PlayerSection() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [progress, setProgress] = useState(23);
  const [volume, setVolume] = useState(80);
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const track = TRACKS[currentTrack];

  const togglePlay = useCallback(() => {
    setIsPlaying((p) => {
      const next = !p;
      if (next) {
        progressRef.current = setInterval(() => {
          setProgress((prev) => (prev >= 100 ? 0 : prev + 0.15));
        }, 150);
      } else if (progressRef.current) {
        clearInterval(progressRef.current);
      }
      return next;
    });
  }, []);

  const skipTrack = (dir: 1 | -1) => {
    setCurrentTrack((c) => (c + dir + TRACKS.length) % TRACKS.length);
    setProgress(0);
  };

  useEffect(() => {
    return () => {
      if (progressRef.current) clearInterval(progressRef.current);
    };
  }, []);

  return (
    <section id="player" className="py-24 bg-[#181818]">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-xs font-bold uppercase tracking-[2px] text-[#1ed760] mb-4">试听体验</p>
          <h2 className="text-4xl font-bold text-white">沉浸式播放体验</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="flex flex-col items-center gap-8">
            <VinylRecord isPlaying={isPlaying} track={track} />
            <div className="w-full max-w-xs">
              <WaveformVisualizer isPlaying={isPlaying} />
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span
                  className="text-xs font-bold uppercase tracking-[1.5px] px-2 py-0.5 rounded-full"
                  style={{ background: `${track.color}20`, color: track.color }}
                >
                  {track.genre}
                </span>
              </div>
              <h3 className="text-3xl font-bold text-white">{track.title}</h3>
              <p className="text-[#b3b3b3] mt-1">{track.artist}</p>
            </div>

            <div className="space-y-2">
              <div
                className="relative h-1 bg-[#4d4d4d] rounded-full cursor-pointer group"
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  setProgress(((e.clientX - rect.left) / rect.width) * 100);
                }}
              >
                <div
                  className="h-full rounded-full transition-all duration-150"
                  style={{ width: `${progress}%`, background: "#1ed760" }}
                />
                <div
                  className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ left: `calc(${progress}% - 6px)` }}
                />
              </div>
              <div className="flex justify-between text-xs text-[#b3b3b3]">
                <span>
                  {Math.floor((progress / 100) * 3.7)
                    .toString()
                    .padStart(1, "0")}
                  :
                  {Math.floor((((progress / 100) * 3.7) % 1) * 60)
                    .toString()
                    .padStart(2, "0")}
                </span>
                <span>{track.duration}</span>
              </div>
            </div>

            <div className="flex items-center justify-center gap-6">
              <button
                type="button"
                onClick={() => skipTrack(-1)}
                className="text-[#b3b3b3] hover:text-white transition-colors text-lg"
                aria-label="Previous"
              >
                ⏮
              </button>
              <button
                type="button"
                onClick={togglePlay}
                className="w-14 h-14 rounded-full flex items-center justify-center text-black text-xl font-bold transition-transform hover:scale-105 active:scale-95"
                style={{ background: "#1ed760" }}
                aria-label={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? "⏸" : "▶"}
              </button>
              <button
                type="button"
                onClick={() => skipTrack(1)}
                className="text-[#b3b3b3] hover:text-white transition-colors text-lg"
                aria-label="Next"
              >
                ⏭
              </button>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-[#b3b3b3] text-sm">🔈</span>
              <input
                type="range"
                min={0}
                max={100}
                value={volume}
                onChange={(e) => setVolume(Number(e.target.value))}
                className="flex-1 h-1 rounded-full appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #1ed760 ${volume}%, #4d4d4d ${volume}%)`,
                }}
              />
              <span className="text-[#b3b3b3] text-sm">🔊</span>
            </div>

            <div className="border-t border-[#2a2a2a] pt-4 space-y-1">
              {TRACKS.map((t, i) => (
                <button
                  type="button"
                  key={t.id}
                  onClick={() => {
                    setCurrentTrack(i);
                    setProgress(0);
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                    i === currentTrack
                      ? "bg-[#1ed76015] text-white"
                      : "text-[#b3b3b3] hover:text-white hover:bg-[#ffffff08]"
                  }`}
                >
                  <div
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{ background: i === currentTrack ? t.color : "#4d4d4d" }}
                  />
                  <span className="flex-1 text-sm font-medium truncate">{t.title}</span>
                  <span className="text-xs text-[#b3b3b3] shrink-0">{t.duration}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
