import { Variants } from "framer-motion";

export const fadeIn = (direction: 'up' | 'down' | 'left' | 'right', delay: number): Variants => {
    return {
      hidden: {
        y: direction === 'up' ? 40 : direction === 'down' ? -40 : 0,
        x: direction === 'left' ? 40 : direction === 'right' ? -40 : 0,
        opacity: 0
      },
      show: {
        y: 0,
        x: 0,
        opacity: 1,
        transition: {
          type: "spring" as const,
          duration: 1.25,
          delay: delay,
          ease: [0.25, 0.25, 0.25, 0.75] as const,
        }
      }
    };
  };

  export const staggerContainer = (staggerChildren: number, delayChildren: number): Variants => {
    return {
      hidden: {},
      show: {
        transition: {
          staggerChildren,
          delayChildren,
        }
      }
    };
  };
  
  export const slideIn = (direction: 'left' | 'right' | 'up' | 'down', type: "spring" | "tween" | "inertia", delay: number, duration: number): Variants => {
    return {
      hidden: {
        x: direction === 'left' ? '-100%' : direction === 'right' ? '100%' : 0,
        y: direction === 'up' ? '100%' : direction === 'down' ? '100%' : 0,
      },
      show: {
        x: 0,
        y: 0,
        transition: {
          type,
          delay,
          duration,
          ease: 'easeOut' as const,
        }
      }
    };
  };

  export const textVariant = (delay: number): Variants => {
    return {
      hidden: {
        y: 50,
        opacity: 0,
      },
      show: {
        y: 0,
        opacity: 1,
        transition: {
          type: "spring" as const,
          duration: 1.25,
          delay,
        }
      }
    };
  };

  export const scale = (delay : number): Variants => {
    return {
      hidden: {
        scale: 0,
        opacity: 0,
      },
      show: {
        scale: 1,
        opacity: 1,
        transition: {
          type: "spring" as const,
          duration: 1.25,
          delay,
        }
      }
    };
  }; 