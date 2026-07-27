'use client';

import React from 'react';

interface NineStarLogoProps {
  className?: string;
  size?: number;
  color?: string;
}

export default function NineStarLogo({
  className = '',
  size = 40,
  color = 'currentColor'
}: NineStarLogoProps) {
  // Helper to construct 4-pointed diamond star SVG path centered at (cx, cy) with radius r
  const starPath = (cx: number, cy: number, r: number) => {
    return `M ${cx} ${cy - r} Q ${cx} ${cy} ${cx + r} ${cy} Q ${cx} ${cy} ${cx} ${cy + r} Q ${cx} ${cy} ${cx - r} ${cy} Q ${cx} ${cy} ${cx} ${cy - r} Z`;
  };

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g fill={color}>
        {/* Center Star */}
        <path d={starPath(50, 50, 9)} />

        {/* 4 Large Cardinal Stars (Top, Right, Bottom, Left) */}
        <path d={starPath(50, 24, 15)} />
        <path d={starPath(76, 50, 15)} />
        <path d={starPath(50, 76, 15)} />
        <path d={starPath(24, 50, 15)} />

        {/* 4 Diagonal Corner Stars (Top-Left, Top-Right, Bottom-Right, Bottom-Left) */}
        <path d={starPath(31, 31, 10)} />
        <path d={starPath(69, 31, 10)} />
        <path d={starPath(69, 69, 10)} />
        <path d={starPath(31, 69, 10)} />
      </g>
    </svg>
  );
}
