"use client"

import {
    useEffect,
    useRef,
    useCallback,
    useState,
    type CSSProperties,
} from "react"

interface WaveBarsProps {
    color?: string
    bars?: number
    gap?: number
    minHeightPct?: number
    maxHeightPct?: number
    speed?: number
    stagger?: number
    opacity?: number
    style?: CSSProperties
}

export default function WaveBars({
    color = "#FFFFFF",
    bars = 10,
    gap = 16,
    minHeightPct = 0.2,
    maxHeightPct = 0.9,
    speed = 0.9,
    stagger = 0.55,
    opacity = 0.9,
    style,
}: WaveBarsProps) {
    const containerRef = useRef<HTMLDivElement>(null)
    const svgRef = useRef<SVGSVGElement>(null)
    const lineRefs = useRef<SVGLineElement[]>([])
    const rafRef = useRef<number | null>(null)
    const visibleRef = useRef(true)

    const [count, setCount] = useState<number>(Math.max(2, Math.floor(bars)))
    const [size, setSize] = useState({ width: 0, height: 0 })

    useEffect(() => setCount(Math.max(2, Math.floor(bars))), [bars])

    useEffect(() => {
        const el = containerRef.current
        if (!el) return
        const ro = new ResizeObserver((entries) => {
            const r = entries[0]?.contentRect
            if (r) setSize({ width: r.width, height: r.height })
        })
        ro.observe(el)
        return () => ro.disconnect()
    }, [])

    const clamp = (v: number, min: number, max: number) =>
        Math.max(min, Math.min(max, v))
    const clamp01 = (v: number) => clamp(v, 0, 1)

    const valueToHeightPx = useCallback(
        (t: number) => {
            const min = clamp01(minHeightPct)
            const max = clamp01(maxHeightPct)
            const norm = min + (max - min) * clamp01(t)
            return norm * size.height
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [minHeightPct, maxHeightPct, size.height]
    )

    const barWidthPx = (() => {
        if (size.width <= 0 || count <= 0) return 0
        const totalGaps = (count - 1) * gap
        return Math.max(1, (size.width - totalGaps) / count)
    })()

    const animate = useCallback(
        (startTs: number) => {
            const twoPI = Math.PI * 2
            const prefersReduced =
                typeof window !== "undefined" &&
                window.matchMedia?.("(prefers-reduced-motion: reduce)").matches

            const omega = twoPI * (prefersReduced ? speed * 0.35 : speed)
            const omega2 = omega * 1.7
            const phaseStep = twoPI * stagger

            const tick = (now: number) => {
                if (!visibleRef.current) {
                    rafRef.current = requestAnimationFrame(tick)
                    return
                }
                const t = (now - startTs) / 1000
                const n = lineRefs.current.length
                const h = size.height
                const w = barWidthPx

                if (h > 0 && w > 0) {
                    const centerY = h / 2
                    const maxDrawable = Math.max(0, h - w)
                    for (let i = 0; i < n; i++) {
                        const line = lineRefs.current[i]
                        if (!line) continue

                        const v1 = Math.sin(t * omega + i * phaseStep)
                        const v2 = Math.sin(t * omega2 - i * phaseStep * 0.6)
                        const mix = 0.7 * v1 + 0.3 * v2
                        const norm = 0.5 + 0.5 * mix

                        const desired = valueToHeightPx(norm)
                        const barH = Math.min(desired, maxDrawable)

                        let y1 = centerY - barH / 2
                        let y2 = centerY + barH / 2
                        const pad = w / 2
                        y1 = clamp(y1, pad, h - pad)
                        y2 = clamp(y2, pad, h - pad)

                        const x = i * (w + gap) + w / 2
                        line.setAttribute("x1", x.toFixed(2))
                        line.setAttribute("x2", x.toFixed(2))
                        line.setAttribute("y1", y1.toFixed(2))
                        line.setAttribute("y2", y2.toFixed(2))
                        line.setAttribute("stroke-width", w.toFixed(2))
                    }
                }

                rafRef.current = requestAnimationFrame(tick)
            }

            rafRef.current = requestAnimationFrame(tick)
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [barWidthPx, gap, size.height, stagger, valueToHeightPx, speed]
    )

    useEffect(() => {
        const io = new IntersectionObserver(
            (entries) => {
                visibleRef.current = !!entries[0]?.isIntersecting
            },
            { root: null, threshold: 0 }
        )
        if (containerRef.current) io.observe(containerRef.current)

        const start = performance.now()
        animate(start)

        return () => {
            io.disconnect()
            if (rafRef.current) cancelAnimationFrame(rafRef.current)
        }
    }, [animate])

    const lines = []
    lineRefs.current = []
    for (let i = 0; i < count; i++) {
        lines.push(
            <line
                key={i}
                ref={(el) => {
                    if (el) lineRefs.current[i] = el
                }}
                x1="0"
                y1="0"
                x2="0"
                y2="0"
                stroke={color}
                opacity={opacity}
                strokeLinecap="round"
                shapeRendering="geometricPrecision"
            />
        )
    }

    return (
        <div
            ref={containerRef}
            style={{
                width: "100%",
                height: "100%",
                overflow: "hidden",
                ...style,
            }}
        >
            <svg
                ref={svgRef}
                width="100%"
                height="100%"
                style={{ display: "block" }}
            >
                {lines}
            </svg>
        </div>
    )
}
