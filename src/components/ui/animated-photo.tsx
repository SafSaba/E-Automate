"use client";

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const AnimatedPhoto = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative w-64 h-64 rounded-full overflow-hidden border-4 border-primary shadow-lg mx-auto"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="absolute inset-0 bg-primary"
        animate={{ opacity: isHovered ? 0.2 : 0 }}
        transition={{ duration: 0.3 }}
      />
      <Image
        src="/image/safwan-profile.jpg"
        alt="Safwan Saba"
        layout="fill"
        objectFit="cover"
        className="rounded-full"
      />
    </motion.div>
  );
};

export default AnimatedPhoto;
