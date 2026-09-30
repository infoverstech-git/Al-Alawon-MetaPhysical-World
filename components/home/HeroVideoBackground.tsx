"use client";

import { useEffect, useRef } from "react";

/**
 * Full-bleed looping video behind the hero content. Always running, decorative only.
 *
 * - Muted + playsInline so browsers (incl. mobile) allow autoplay.
 * - Some browsers (battery saver, data saver, in-app browsers) refuse to autoplay or
 *   pause the video on their own. To keep it running we retry when the video becomes
 *   ready, when the tab becomes visible again, and on any touch / scroll / key press.
 */
const RETRY_EVENTS = ["touchstart", "touchend", "pointerup", "click", "keydown", "scroll"] as const;

export function HeroVideoBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // React does not always reflect the `muted` attribute in SSR markup,
    // and autoplay is blocked unless the element is actually muted.
    video.muted = true;
    video.defaultMuted = true;

    const ensurePlaying = () => {
      if (document.hidden || !video.paused) return;
      video.play().catch(() => {
        /* Blocked for now — the next event below will try again. */
      });
    };

    ensurePlaying();

    video.addEventListener("loadeddata", ensurePlaying);
    video.addEventListener("canplay", ensurePlaying);
    document.addEventListener("visibilitychange", ensurePlaying);
    window.addEventListener("pageshow", ensurePlaying);
    RETRY_EVENTS.forEach((name) => window.addEventListener(name, ensurePlaying, { passive: true }));

    return () => {
      video.removeEventListener("loadeddata", ensurePlaying);
      video.removeEventListener("canplay", ensurePlaying);
      document.removeEventListener("visibilitychange", ensurePlaying);
      window.removeEventListener("pageshow", ensurePlaying);
      RETRY_EVENTS.forEach((name) => window.removeEventListener(name, ensurePlaying));
    };
  }, []);

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        poster="/videos/hero-poster.jpg"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        disablePictureInPicture
        disableRemotePlayback
        tabIndex={-1}
      >
        {/* H.264 first: hardware-decoded on virtually every phone. WebM is the fallback. */}
        <source src="/videos/hero-bg.mp4" type="video/mp4" />
        <source src="/videos/hero-bg.webm" type="video/webm" />
      </video>

      {/* Readability overlay: midnight tint + fade into the page background */}
      <div className="absolute inset-0 bg-[var(--color-void)]/35" />
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-void)]/40 via-transparent to-[var(--color-void)]" />
    </div>
  );
}
