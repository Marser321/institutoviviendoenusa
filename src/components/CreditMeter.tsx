"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";

const SCORE_RANGES = [
  { label: "Pobre", min: 300, max: 579, color: "oklch(60% 0.20 25)" },
  { label: "Regular", min: 580, max: 669, color: "oklch(75% 0.18 80)" },
  { label: "Bueno", min: 670, max: 739, color: "oklch(72% 0.18 145)" },
  { label: "Muy Bueno", min: 740, max: 799, color: "oklch(72% 0.18 200)" },
  { label: "Excelente", min: 800, max: 850, color: "oklch(80% 0.15 170)" },
];

function getScoreRange(score: number) {
  return SCORE_RANGES.find((r) => score >= r.min && score <= r.max) ?? SCORE_RANGES[0];
}

function scoreToAngle(score: number): number {
  const minScore = 300;
  const maxScore = 850;
  const clamped = Math.max(minScore, Math.min(maxScore, score));
  return ((clamped - minScore) / (maxScore - minScore)) * 240 - 120;
}

function polarToCartesian(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

function describeArc(cx: number, cy: number, r: number, startAngle: number, endAngle: number) {
  const start = polarToCartesian(cx, cy, r, endAngle);
  const end = polarToCartesian(cx, cy, r, startAngle);
  const largeArc = endAngle - startAngle > 180 ? 1 : 0;
  return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArc} 0 ${end.x} ${end.y}`;
}

interface CreditMeterProps {
  targetScore?: number;
  size?: number;
}

export const CreditMeter = ({ targetScore = 720, size = 320 }: CreditMeterProps) => {
  const [displayScore, setDisplayScore] = useState(300);
  const motionScore = useMotionValue(300);
  const hasAnimated = useRef(false);

  const cx = size / 2;
  const cy = size / 2;
  const radius = size * 0.38;
  const strokeWidth = size * 0.06;

  /* Animate score on mount */
  useEffect(() => {
    if (hasAnimated.current) return;
    hasAnimated.current = true;

    const timeout = setTimeout(() => {
      const controls = animate(motionScore, targetScore, {
        duration: 2.2,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
        onUpdate: (v) => setDisplayScore(Math.round(v)),
      });
      return () => controls.stop();
    }, 800);

    return () => clearTimeout(timeout);
  }, [targetScore, motionScore]);

  const currentRange = getScoreRange(displayScore);
  const needleAngle = scoreToAngle(displayScore);

  /* Needle endpoint */
  const needleTip = polarToCartesian(cx, cy, radius - strokeWidth * 1.8, needleAngle + 150);
  const needleBase1 = polarToCartesian(cx, cy, 6, needleAngle + 150 + 90);
  const needleBase2 = polarToCartesian(cx, cy, 6, needleAngle + 150 - 90);

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg
        viewBox={`0 0 ${size} ${size}`}
        width={size}
        height={size}
        className="drop-shadow-2xl"
        role="img"
        aria-label={`Medidor de puntaje de crédito mostrando ${displayScore} puntos — ${currentRange.label}`}
      >
        {/* Background track */}
        <path
          d={describeArc(cx, cy, radius, 150, 390)}
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />

        {/* Colored segments */}
        {SCORE_RANGES.map((range, i) => {
          const startAngle = 150 + ((range.min - 300) / (850 - 300)) * 240;
          const endAngle = 150 + ((range.max - 300) / (850 - 300)) * 240;
          return (
            <path
              key={i}
              d={describeArc(cx, cy, radius, startAngle, endAngle)}
              fill="none"
              stroke={range.color}
              strokeWidth={strokeWidth}
              strokeLinecap="butt"
              opacity={0.25}
            />
          );
        })}

        {/* Active arc (animated fill) */}
        <motion.path
          d={describeArc(cx, cy, radius, 150, 150 + ((displayScore - 300) / (850 - 300)) * 240)}
          fill="none"
          stroke={currentRange.color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          filter="url(#glow)"
        />

        {/* Glow filter */}
        <defs>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Needle */}
        <motion.polygon
          points={`${needleTip.x},${needleTip.y} ${needleBase1.x},${needleBase1.y} ${needleBase2.x},${needleBase2.y}`}
          fill="white"
          opacity={0.9}
        />

        {/* Center dot */}
        <circle cx={cx} cy={cy} r={8} fill="white" opacity={0.15} />
        <circle cx={cx} cy={cy} r={4} fill="white" />

        {/* Score labels */}
        {SCORE_RANGES.map((range, i) => {
          const midAngle = 150 + (((range.min + range.max) / 2 - 300) / (850 - 300)) * 240;
          const labelPos = polarToCartesian(cx, cy, radius + strokeWidth + 14, midAngle);
          return (
            <text
              key={i}
              x={labelPos.x}
              y={labelPos.y}
              textAnchor="middle"
              dominantBaseline="middle"
              fill="rgba(255,255,255,0.3)"
              fontSize={size * 0.028}
              fontWeight={500}
            >
              {range.label}
            </text>
          );
        })}
      </svg>

      {/* Center display */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span
          className="font-display font-black tabular-nums leading-none"
          style={{ fontSize: size * 0.22, color: currentRange.color }}
        >
          {displayScore}
        </span>
        <span className="text-white/40 text-xs font-bold uppercase tracking-[0.3em] mt-1">
          Credit Score
        </span>
        <span
          className="text-xs font-semibold mt-2 px-3 py-1 rounded-full"
          style={{ backgroundColor: `color-mix(in oklch, ${currentRange.color} 20%, transparent)`, color: currentRange.color }}
        >
          {currentRange.label}
        </span>
      </div>
    </div>
  );
};
