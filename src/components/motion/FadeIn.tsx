"use client";



import { motion, HTMLMotionProps } from "framer-motion";



interface FadeInProps extends HTMLMotionProps<"div"> {

  delay?: number;

  direction?: "up" | "down" | "left" | "right" | "none";

}



export function FadeIn({

  children,

  className,

  delay = 0,

  direction = "up",

  ...props

}: FadeInProps) {

  const directions = {

    up: { y: 24, x: 0 },

    down: { y: -24, x: 0 },

    left: { x: 24, y: 0 },

    right: { x: -24, y: 0 },

    none: { x: 0, y: 0 },

  };



  return (

    <motion.div

      initial={{ opacity: 0, ...directions[direction] }}

      whileInView={{ opacity: 1, x: 0, y: 0 }}

      viewport={{ once: true, margin: "-50px" }}

      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}

      className={className}

      {...props}

    >

      {children}

    </motion.div>

  );

}

