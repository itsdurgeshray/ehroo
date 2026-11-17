'use client';

import { useState } from 'react';
import { ytEmbed } from '@/lib/site';
import { YtPlayIcon, YtBadge } from '@/components/ui/YtPlay';

/**
 * ehroo.com hero mockup: blue offset layer + rounded frame + press-style play button.
 * The play control is YouTube's own button. Clicking swaps the poster for the YouTube embed in place, exactly as ehroo.com does.
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
            <button
              type="button"
              onClick={() => setPlaying(true)}
              className="absolute inset-0 z-20 flex items-center justify-center cursor-pointer bg-black/0 hover:bg-black/10 transition-colors focus-visible:outline-none group/play"
              aria-label="Play video on YouTube"
            >
              <YtPlayIcon className="w-16 md:w-22 transition-transform duration-200 group-hover/play:scale-110 group-focus-visible/play:scale-110" />
            </button>
            <YtBadge className="absolute left-3 top-3 md:left-5 md:top-5 z-20 pointer-events-none md:text-xs md:px-2 md:py-1" />
          </div>
        )}
      </div>
    </div>
  );
}
