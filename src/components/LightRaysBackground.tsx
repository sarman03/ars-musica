"use client"

import { useId } from "react"
import type { CSSProperties } from "react"

interface LightRaysBackgroundProps {
  intensity?: number
  speed?: number
  className?: string
  style?: CSSProperties
}

// Updated Geometry:
// 1. Increased the gap between baseLX and baseRX to make rays thicker.
// 2. Pushed the extreme left/right values far into the negatives (-950) 
//    and well past the 1000 width (1950) to cover ultrawide screens edge-to-edge.
//
// [baseLX, baseRX, baseY, peakOpacity, animDurSec, rotDeg, delaySec]
const RAYS: [number, number, number, number, number, number, number][] = [
  // Center (Thickened dramatically)
  [  230,  770, 760, 0.40,  6.0,  1.2,  0.0 ],
  // Inner Left & Right
  [   30,  590, 740, 0.34,  7.5, -1.6, -1.5 ],
  [  410,  970, 740, 0.34,  8.0,  1.6, -0.8 ],
  // Mid Left & Right
  [ -190,  410, 710, 0.28,  9.0, -2.0, -3.0 ],
  [  590, 1190, 710, 0.28,  9.5,  2.0, -2.2 ],
  // Outer Left & Right
  [ -450,  190, 670, 0.22, 11.0, -1.8, -4.5 ],
  [  810, 1450, 670, 0.22, 10.5,  1.8, -3.8 ],
  // Extreme Left & Right 
  [ -750,  -50, 620, 0.17, 12.5, -1.4, -6.5 ],
  [ 1050, 1750, 620, 0.17, 13.0,  1.4, -5.8 ],
  // Deep Edges (Ensures full coverage on ultrawide)
  [-1100, -300, 560, 0.12, 15.0, -1.2, -8.5 ],
  [ 1300, 2100, 560, 0.12, 14.5,  1.2, -7.8 ],
]

export default function LightRaysBackground({
  intensity = 1,
  speed = 1,
  className = "",
  style,
}: LightRaysBackgroundProps) {
  const uid = useId().replace(/:/g, "")

  const filterId  = `${uid}-f`
  const grainId   = `${uid}-gr`
  const gradId    = `${uid}-grad`

  const dur = (s: number) => `${(s / speed).toFixed(1)}s`
  const op  = (v: number) => (v * intensity).toFixed(3)

  // Origin point hidden well above the viewport
  const OX = 500, OY = -180

  return (
    <div
      aria-hidden="true"
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
      style={{ ...style, willChange: "transform", contain: "strict", transform: "translateZ(0)" }}
    >
      <svg
        viewBox="0 0 1000 760"
        preserveAspectRatio="xMidYTop slice"
        className="absolute top-0 left-0 w-full h-[60%] md:h-full"
      >
        <defs>
          <filter id={filterId} x="-8%" y="-5%" width="116%" height="115%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.03 0.07"
              numOctaves="1"
              seed="7"
              result="turb"
            />
            <feDisplacementMap
              in="SourceGraphic" in2="turb"
              scale="8"
              xChannelSelector="R" yChannelSelector="G"
              result="disp"
            />
            <feGaussianBlur in="disp" stdDeviation="6" />
          </filter>

          <filter id={grainId} x="0" y="0" width="100%" height="100%">
            <feTurbulence type="fractalNoise" baseFrequency="0.72" numOctaves="2" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
          </filter>

          <linearGradient
            id={gradId}
            x1="0" y1="0" x2="0" y2="1"
          >
            <stop offset="0%"   stopColor="white" stopOpacity={op(0.80)} />
            <stop offset="40%"  stopColor="white" stopOpacity={op(0.35)} />
            <stop offset="75%"  stopColor="white" stopOpacity={op(0.08)} />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>
        </defs>

        {RAYS.map(([bl, br, by, peakOp, animDur, rotDeg, delay], i) => (
          <polygon
            key={i}
            points={`${OX},${OY} ${bl},${by} ${br},${by}`}
            fill={`url(#${gradId})`}
            filter={`url(#${filterId})`}
            opacity={op(peakOp)}
          >
            <animateTransform
              attributeName="transform"
              type="rotate"
              values={`${-rotDeg} ${OX} ${OY};${rotDeg} ${OX} ${OY};${-rotDeg} ${OX} ${OY}`}
              keyTimes="0;0.5;1"
              dur={dur(animDur)}
              begin={`${delay}s`}
              repeatCount="indefinite"
              calcMode="spline"
              keySplines="0.45 0 0.55 1;0.45 0 0.55 1"
            />
            <animate
              attributeName="opacity"
              values={`${op(peakOp)};${op(peakOp * 0.5)};${op(peakOp * 1.3 > 1 ? 1 : peakOp * 1.3)};${op(peakOp)}`}
              dur={dur(animDur * 0.8)}
              begin={`${delay * 0.6}s`}
              repeatCount="indefinite"
            />
          </polygon>
        ))}

        <rect width="100%" height="100%" fill="white" opacity="0.022" filter={`url(#${grainId})`} />
      </svg>
    </div>
  )
}