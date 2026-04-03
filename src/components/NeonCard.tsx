import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface NeonCardProps {
  project: any;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onClick?: (e: React.MouseEvent) => void;
  isActive?: boolean;
}

export function NeonCard({ project, onMouseEnter, onMouseLeave, onClick, isActive }: NeonCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (onMouseEnter) onMouseEnter();
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (onMouseLeave) onMouseLeave();
  };

  return (
    <motion.div
      className="relative w-full h-full rounded-2xl overflow-hidden cursor-pointer bg-neutral-900"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      initial={false}
    >
      {/* Image Layer */}
      <motion.div
        className="absolute inset-0 w-full h-full"
        animate={{
          scale: isHovered ? 1.1 : 1,
          filter: isHovered ? "grayscale(0%)" : "grayscale(100%)",
        }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <img
          src={project.img}
          alt={project.title}
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
      </motion.div>

      {/* Overlay Gradient */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.4 }}
      />

      {/* Content Layer */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            className="absolute inset-0 p-8 flex flex-col justify-end z-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <motion.span 
              className="text-[10px] font-bold tracking-[0.2em] uppercase mb-2"
              style={{ color: project.color || "#06b6d4" }}
            >
              {project.category}
            </motion.span>
            <h3 className="font-display text-3xl text-white uppercase leading-none mb-3">
              {project.title}
            </h3>
            <p className="font-sans text-xs text-white/60 line-clamp-2 mb-6">
              {project.subtitle}
            </p>
            
            <div className="flex gap-2">
              {project.tags?.slice(0, 2).map((tag: string) => (
                <span 
                  key={tag}
                  className="px-3 py-1 rounded-full bg-white/10 border border-white/10 text-[9px] font-bold text-white/70 uppercase tracking-wider"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
