'use client';

import { useState } from 'react';
import { ytEmbed } from '@/lib/site';

/**
 * ehroo.com hero mockup: blue offset layer + rounded frame + press-style play button.
 * Clicking swaps the poster for the YouTube embed in place, exactly as ehroo.com does.
 */
export default function HeroVideo({ videoId, poster, alt }: { videoId: string; poster: string; alt: string }) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="relative w-full aspect-video mb-3.5">
      {/* Blue BG shadow layer */}
      <div className="absolute left-1 top-1 -right-1 -bottom-1 md:left-3.5 md:top-3.5 md:-right-3.5 md:-bottom-3.5 bg-[#005AE2] rounded-[24px] md:rounded-[42px] lg:rounded-[60px]" />
      {/* Image container layer */}
      <div className="absolute inset-0 rounded-[20px] md:rounded-[35px] lg:rounded-[50px] md:border-0 border border-[#F0F6FE] overflow-hidden flex items-center justify-center">
        {playing ? (
          <iframe
            src={ytEmbed(videoId)}
            title={alt}
            className="w-full h-full absolute inset-0 border-0 rounded-[20px] md:rounded-[35px] lg:rounded-[50px]"
            allow="autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        ) : (
          <div className="w-full h-full relative overflow-hidden group">
            <img src={poster} alt={alt} width={1920} height={1080} className="w-full h-full object-cover transition-opacity" />
            <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
              <button
                type="button"
                onClick={() => setPlaying(true)}
                className="hero-play-btn flex items-center justify-center text-[#011324] cursor-pointer focus:outline-none pointer-events-auto"
                aria-label="Play video"
              >
                <svg className="press-svg" viewBox="6 6 88 88" xmlns="http://www.w3.org/2000/svg" width="72" height="72">
                  <circle className="press-shadow" cx="54" cy="54" r="40" fill="#0a0a0a" />
                  <circle className="press-main" cx="46" cy="46" r="40" fill="#d4e800" />
                  <g className="press-icon" transform="translate(37, 34)">
                    <path
                      d="M16.5194 8.95044C18.3283 10.2933 18.3283 13.0012 16.5194 14.344L5.36127 22.6268C3.14512 24.2718 0.000831604 22.69 0.000831604 19.93V3.3645C0.000831604 0.604513 3.14512 -0.977353 5.36127 0.667709L16.5194 8.95044Z"
                      fill="#0a0a0a"
                    />
                  </g>
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
