'use client';
import { useRef, useEffect, useCallback, useMemo, useState } from 'react';
import { gsap } from 'gsap';

// Nota: InertiaPlugin es un plugin premium de GSAP. 
// Si no tienes Club GSAP, el código funcionará con animaciones simples,
// pero para la física de "rebote" profesional se suele usar este archivo.

const throttle = (func, limit) => {
    let lastCall = 0;
    return function (...args) {
        const now = performance.now();
        if (now - lastCall >= limit) {
            lastCall = now;
            func.apply(this, args);
        }
    };
};

function hexToRgb(hex) {
    const m = hex.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
    if (!m) return { r: 0, g: 0, b: 0 };
    return {
        r: parseInt(m[1], 16),
        g: parseInt(m[2], 16),
        b: parseInt(m[3], 16)
    };
}

const DotGrid = ({
    dotSize = 5,
    gap = 15,
    baseColor = '#271E37',
    activeColor = '#5227FF',
    proximity = 120,
    speedTrigger = 100,
    shockRadius = 250,
    shockStrength = 5,
    maxSpeed = 5000,
    resistance = 750,
    returnDuration = 1.5,
    className = '',
    style
}) => {
    const wrapperRef = useRef(null);
    const canvasRef = useRef(null);
    const dotsRef = useRef([]);
    const pointerRef = useRef({
        x: 0, y: 0, vx: 0, vy: 0, speed: 0, lastTime: 0, lastX: 0, lastY: 0
    });

    const baseRgb = useMemo(() => hexToRgb(baseColor), [baseColor]);
    const activeRgb = useMemo(() => hexToRgb(activeColor), [activeColor]);

    const circlePath = useMemo(() => {
        if (typeof window === 'undefined' || !window.Path2D) return null;
        const p = new Path2D();
        p.arc(0, 0, dotSize / 2, 0, Math.PI * 2);
        return p;
    }, [dotSize]);

    const buildGrid = useCallback(() => {
        const wrap = wrapperRef.current;
        const canvas = canvasRef.current;
        if (!wrap || !canvas) return;

        const { width, height } = wrap.getBoundingClientRect();
        const dpr = window.devicePixelRatio || 1;

        canvas.width = width * dpr;
        canvas.height = height * dpr;
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
        const ctx = canvas.getContext('2d');
        if (ctx) ctx.scale(dpr, dpr);

        const cols = Math.floor((width + gap) / (dotSize + gap));
        const rows = Math.floor((height + gap) / (dotSize + gap));
        const cell = dotSize + gap;
        const startX = (width - (cell * cols - gap)) / 2 + dotSize / 2;
        const startY = (height - (cell * rows - gap)) / 2 + dotSize / 2;

        const dots = [];
        for (let y = 0; y < rows; y++) {
            for (let x = 0; x < cols; x++) {
                dots.push({ cx: startX + x * cell, cy: startY + y * cell, xOffset: 0, yOffset: 0, _inertiaApplied: false });
            }
        }
        dotsRef.current = dots;
    }, [dotSize, gap]);

    useEffect(() => {
        if (!circlePath) return;
        let rafId;
        const draw = () => {
            const canvas = canvasRef.current;
            if (!canvas) return;
            const ctx = canvas.getContext('2d');
            if (!ctx) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const { x: px, y: py } = pointerRef.current;

            for (const dot of dotsRef.current) {
                const ox = dot.cx + dot.xOffset;
                const oy = dot.cy + dot.yOffset;
                const dx = dot.cx - px;
                const dy = dot.cy - py;
                const dsq = dx * dx + dy * dy;
                const proxSq = proximity * proximity;

                let style = baseColor;
                if (dsq <= proxSq) {
                    const dist = Math.sqrt(dsq);
                    const t = 1 - dist / proximity;
                    const r = Math.round(baseRgb.r + (activeRgb.r - baseRgb.r) * t);
                    const g = Math.round(baseRgb.g + (activeRgb.g - baseRgb.g) * t);
                    const b = Math.round(baseRgb.b + (activeRgb.b - baseRgb.b) * t);
                    style = `rgb(${r},${g},${b})`;
                }
                ctx.save();
                ctx.translate(ox, oy);
                ctx.fillStyle = style;
                ctx.fill(circlePath);
                ctx.restore();
            }
            rafId = requestAnimationFrame(draw);
        };
        draw();
        return () => cancelAnimationFrame(rafId);
    }, [proximity, baseColor, activeRgb, baseRgb, circlePath]);

    useEffect(() => {
        buildGrid();
        window.addEventListener('resize', buildGrid);
        return () => window.removeEventListener('resize', buildGrid);
    }, [buildGrid]);

    useEffect(() => {
        const onMove = e => {
            const pr = pointerRef.current;
            const rect = canvasRef.current.getBoundingClientRect();
            pr.x = e.clientX - rect.left;
            pr.y = e.clientY - rect.top;

            dotsRef.current.forEach(dot => {
                const dx = dot.cx - pr.x;
                const dy = dot.cy - pr.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < proximity) {
                    const force = (proximity - dist) / proximity;
                    const pushX = (dx / dist) * force * shockStrength * 1.5;
                    const pushY = (dy / dist) * force * shockStrength * 1.5;

                    gsap.to(dot, {
                        xOffset: pushX,
                        yOffset: pushY,
                        duration: 0.15,
                        overwrite: true,
                        onComplete: () => {
                            gsap.to(dot, {
                                xOffset: 0,
                                yOffset: 0,
                                duration: returnDuration,
                                ease: "elastic.out(1, 0.4)"
                            });
                        }
                    });
                }
            });
        };
        window.addEventListener('mousemove', onMove);
        return () => window.removeEventListener('mousemove', onMove);
    }, [maxSpeed, speedTrigger, proximity, resistance, returnDuration, shockRadius, shockStrength]);

    return (
        <div ref={wrapperRef} className={`w-full h-full relative ${className}`} style={style}>
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />
        </div>
    );
};

export default DotGrid;