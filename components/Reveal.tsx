"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { usePathname } from "next/navigation";
import { PropsWithChildren } from "react";

type Direction = "up" | "down" | "left" | "right" | "scale" | "fade";

type RevealProps = PropsWithChildren<{
  className?: string;
  delay?: number;
  duration?: number;
  amount?: number;
  direction?: Direction;
  onLoad?: boolean;
  as?: "div" | "section" | "article" | "li" | "ul" | "header" | "footer";
}>;

const offsetFor = (dir: Direction) => {
  switch (dir) {
    case "up":
      return { y: 32, x: 0, scale: 1 };
    case "down":
      return { y: -32, x: 0, scale: 1 };
    case "left":
      return { y: 0, x: 40, scale: 1 };
    case "right":
      return { y: 0, x: -40, scale: 1 };
    case "scale":
      return { y: 0, x: 0, scale: 0.92 };
    case "fade":
    default:
      return { y: 0, x: 0, scale: 1 };
  }
};

export function Reveal({
  children,
  className,
  delay = 0,
  duration = 0.6,
  amount = 0.18,
  direction = "up",
  onLoad = false,
  as = "div",
}: RevealProps) {
  const pathname = usePathname();
  const prefersReduced = useReducedMotion();

  const off = offsetFor(direction);
  const variants: Variants = {
    hidden: prefersReduced
      ? { opacity: 0 }
      : { opacity: 0, x: off.x, y: off.y, scale: off.scale },
    visible: { opacity: 1, x: 0, y: 0, scale: 1 },
  };

  const MotionTag = motion[as] as typeof motion.div;

  const motionKey = `${pathname}-${delay}-${direction}`;
  const common = {
    className,
    variants,
    initial: "hidden" as const,
    transition: { duration, delay, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  };

  if (onLoad) {
    return (
      <MotionTag key={motionKey} {...common} animate="visible">
        {children}
      </MotionTag>
    );
  }

  return (
    <MotionTag
      key={motionKey}
      {...common}
      whileInView="visible"
      viewport={{ once: true, amount, margin: "0px 0px -8% 0px" }}
    >
      {children}
    </MotionTag>
  );
}

export function StaggerGroup({
  children,
  className,
  delayChildren = 0.05,
  staggerChildren = 0.08,
}: PropsWithChildren<{
  className?: string;
  delayChildren?: number;
  staggerChildren?: number;
}>) {
  const pathname = usePathname();
  return (
    <motion.div
      key={pathname}
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15, margin: "0px 0px -8% 0px" }}
      variants={{
        hidden: {},
        visible: { transition: { delayChildren, staggerChildren } },
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
  direction = "up",
}: PropsWithChildren<{ className?: string; direction?: Direction }>) {
  const off = offsetFor(direction);
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, x: off.x, y: off.y, scale: off.scale },
        visible: {
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
          transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
        },
      }}
    >
      {children}
    </motion.div>
  );
}
