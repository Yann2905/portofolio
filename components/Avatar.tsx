"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";

interface AvatarProps {
  size?: number;
  src?: string;
  alt?: string;
}

export default function Avatar({
  size = 96,
  src = "/yann.jpg",
  alt = "Yann Aristide Telessie",
}: AvatarProps) {
  const [errored, setErrored] = useState(false);

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      className="relative"
      style={{ width: size, height: size }}
    >
      {/* Glow ring */}
      <div className="absolute inset-0 animate-pulse-soft rounded-full bg-gradient-to-tr from-brand via-brand-soft to-accent blur-md" />
      <div className="absolute inset-[3px] rounded-full bg-bg" />

      <div className="absolute inset-[5px] overflow-hidden rounded-full border border-white/10">
        {!errored ? (
          <Image
            src={src}
            alt={alt}
            fill
            sizes="120px"
            className="object-cover"
            onError={() => setErrored(true)}
            priority
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-brand/30 to-accent/20 text-xl font-bold text-white">
            YT
          </div>
        )}
      </div>

      {/* Status dot */}
      <div className="absolute bottom-0 right-0 flex h-5 w-5 items-center justify-center rounded-full border-[3px] border-bg bg-accent">
        <span className="block h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
      </div>
    </motion.div>
  );
}
