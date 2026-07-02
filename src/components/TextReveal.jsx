import React from 'react';
import { motion } from 'framer-motion';

const TextReveal = ({ text, className }) => {
  return (
    <motion.h2
      className={className}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10px" }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      {text}
    </motion.h2>
  );
};

export default TextReveal;
