"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Play, Volume2, VolumeX } from "lucide-react";

interface VideoModalProps {
  src: string;
  poster?: string;
  title?: string;
  description?: string;
  className?: string;
  aspectRatio?: "video" | "vertical" | "square";
}

export default function VideoModal({
  src,
  poster,
  title,
  description,
  className = "",
  aspectRatio = "video",
}: VideoModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [showAudioHint, setShowAudioHint] = useState(true);
  const previewRef = useRef<HTMLVideoElement>(null);
  const modalRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const aspectClasses = {
    video: "aspect-video",
    vertical: "aspect-[9/16]",
    square: "aspect-square",
  };

  const openModal = () => {
    setIsOpen(true);
    document.body.style.overflow = "hidden";
    // Pause preview when modal opens
    if (previewRef.current) {
      previewRef.current.pause();
    }
    // Dispatch event for context-aware mobile CTA
    window.dispatchEvent(new Event("kds_video_watched"));
  };

  const closeModal = useCallback(() => {
    setIsOpen(false);
    document.body.style.overflow = "auto";
    // Resume preview when modal closes
    if (previewRef.current) {
      previewRef.current.play();
    }
  }, []);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        closeModal();
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen, closeModal]);

  // Sync modal video state
  useEffect(() => {
    if (isOpen && modalRef.current) {
      modalRef.current.muted = isMuted;
      if (isPlaying) {
        modalRef.current.play();
      }
    }
  }, [isOpen, isMuted, isPlaying]);

  // IntersectionObserver to pause preview when out of viewport
  useEffect(() => {
    const video = previewRef.current;
    const container = containerRef.current;
    
    if (!video || !container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().catch(() => {
              // Autoplay may be blocked, that's okay
            });
          } else {
            video.pause();
          }
        });
      },
      {
        threshold: 0.3, // Pause when less than 30% visible
      }
    );

    observer.observe(container);

    return () => {
      observer.disconnect();
    };
  }, []);

  // Hide audio hint after user interaction
  const handleUnmute = () => {
    setIsMuted(false);
    setShowAudioHint(false);
  };

  return (
    <>
      {/* Preview Card */}
      <div
        ref={containerRef}
        className={`relative rounded-2xl overflow-hidden shadow-lg cursor-pointer group ${className}`}
        onClick={openModal}
      >
        <video
          ref={previewRef}
          className={`w-full ${aspectClasses[aspectRatio]} object-cover`}
          poster={poster}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        >
          <source src={src} type="video/mp4" />
        </video>

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-brown/0 group-hover:bg-brown/40 transition-colors duration-300 flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center gap-2">
            <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
              <Play className="w-8 h-8 text-brown ml-1" fill="currentColor" />
            </div>
            <span className="text-white font-montserrat font-medium text-sm">
              Tap for audio
            </span>
          </div>
        </div>

        {/* Title Overlay */}
        {(title || description) && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-brown/90 to-transparent p-4 pointer-events-none">
            {title && (
              <h3 className="text-white font-playfair font-semibold text-lg">
                {title}
              </h3>
            )}
            {description && (
              <p className="text-white/70 text-sm font-montserrat">
                {description}
              </p>
            )}
          </div>
        )}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
            onClick={closeModal}
            role="dialog"
            aria-modal="true"
            aria-label={title || "Video player"}
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 p-2 text-white/70 hover:text-white transition-colors z-10"
              aria-label="Close modal"
            >
              <X className="w-8 h-8" />
            </button>

            {/* Video Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className={`relative max-w-4xl w-full ${
                aspectRatio === "vertical" ? "max-w-md" : ""
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              <video
                ref={modalRef}
                className={`w-full ${aspectClasses[aspectRatio]} object-contain rounded-lg`}
                poster={poster}
                autoPlay
                loop
                playsInline
                controls
                muted={isMuted}
              >
                <source src={src} type="video/mp4" />
              </video>

              {/* "Tap for audio" microcopy hint - shown initially */}
              {showAudioHint && isMuted && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="absolute top-4 left-1/2 -translate-x-1/2 bg-black/70 backdrop-blur-sm px-4 py-2 rounded-full flex items-center gap-2"
                >
                  <VolumeX className="w-4 h-4 text-white/70" />
                  <span className="text-white/90 text-sm font-montserrat">
                    Tap for audio
                  </span>
                </motion.div>
              )}

              {/* Custom Controls */}
              <div className="absolute bottom-4 right-4 flex gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (isMuted) {
                      handleUnmute();
                    } else {
                      setIsMuted(true);
                    }
                  }}
                  className="p-3 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-colors"
                  aria-label={isMuted ? "Unmute" : "Mute"}
                >
                  {isMuted ? (
                    <VolumeX className="w-5 h-5 text-white" />
                  ) : (
                    <Volume2 className="w-5 h-5 text-white" />
                  )}
                </button>
              </div>

              {/* Title Below Video */}
              {title && (
                <div className="text-center mt-4">
                  <h3 className="text-white font-playfair font-semibold text-xl">
                    {title}
                  </h3>
                  {description && (
                    <p className="text-white/70 font-montserrat mt-1">
                      {description}
                    </p>
                  )}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
