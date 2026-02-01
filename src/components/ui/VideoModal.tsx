"use client";

import { useState, useRef, useEffect } from "react";
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
  const previewRef = useRef<HTMLVideoElement>(null);
  const modalRef = useRef<HTMLVideoElement>(null);

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
  };

  const closeModal = () => {
    setIsOpen(false);
    document.body.style.overflow = "auto";
    // Resume preview when modal closes
    if (previewRef.current) {
      previewRef.current.play();
    }
  };

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        closeModal();
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen]);

  // Sync modal video state
  useEffect(() => {
    if (isOpen && modalRef.current) {
      modalRef.current.muted = isMuted;
      if (isPlaying) {
        modalRef.current.play();
      }
    }
  }, [isOpen, isMuted, isPlaying]);

  return (
    <>
      {/* Preview Card */}
      <div
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
              Click to expand
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

              {/* Custom Controls */}
              <div className="absolute bottom-4 right-4 flex gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsMuted(!isMuted);
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
