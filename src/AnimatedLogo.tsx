// src/components/SplashLoader.tsx
import React, { useEffect, useState } from "react";
import { motion, type Variants } from "framer-motion";

const SplashLoader: React.FC<{ onFinish?: () => void }> = ({ onFinish }) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
      onFinish && onFinish();
    }, 3000); // duration of splash in ms
    return () => clearTimeout(timer);
  }, [onFinish]);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const letterVariants: Variants = {
    hidden: { opacity: 0, y: 20, rotate: -15 },
    visible: {
      opacity: 1,
      y: 0,
      rotate: 0,
      transition: { duration: 0.6, ease: [0.42, 0, 0.58, 1] },
    },
  };

  if (!show) return null;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.5, delay: 2.5 }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "#fff",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
      }}
    >
      <motion.div
        style={{ display: "flex", fontSize: "4rem", fontWeight: "bold", color: "#6a0dad" }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {["A", "F", "R", "I", "C", "E", "L", "L"].map((letter, index) => (
          <motion.span key={index} variants={letterVariants} style={{ margin: "0 0.1rem" }}>
            {letter}
          </motion.span>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default SplashLoader;
