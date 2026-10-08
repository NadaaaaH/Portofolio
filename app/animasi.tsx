"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

export default function AnimateWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const path = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={path}
        initial={{ opacity: 0, y: -200 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0.5, y: 200}}
        transition={{ duration: 1}}
        className="relative z-10 w-full h-full"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
