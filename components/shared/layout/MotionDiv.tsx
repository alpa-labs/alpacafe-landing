'use client';

import { forwardRef } from 'react';
import { motion } from 'framer-motion';

type MotionDivProps = React.ComponentPropsWithoutRef<typeof motion.div>;

export const MotionDiv = forwardRef<HTMLDivElement, MotionDivProps>(
  function MotionDiv({ children, ...props }, ref) {
    return (
      <motion.div
        ref={ref}
        {...props}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.42, 0, 0.58, 1] }}
        viewport={{
          once: false,
          amount: 0.15,
        }}
      >
        {children}
      </motion.div>
    );
  },
);
