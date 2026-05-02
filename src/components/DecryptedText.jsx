import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

/**
 * Componente DecryptedText extraído de React Bits
 * Milton - Modularización para Software Engineering
 */
const DecryptedText = ({
    text,
    speed = 50,
    maxIterations = 10,
    className = '',
    parentClassName = '',
    animateOn = 'view',
    ...props
}) => {
    const [displayText, setDisplayText] = useState(text);
    const [isHovering, setIsHovering] = useState(false);
    const [isScrambling, setIsScrambling] = useState(false);
    const [revealedIndices, setRevealedIndices] = useState(new Set());
    const containerRef = useRef(null);
    const isInView = useInView(containerRef, { once: true, amount: 0.5 });

    const chars = "-_~`!@#$%^&*()+=[]{}|;:,.<>?";

    useEffect(() => {
        let interval;
        const trigger = animateOn === 'view' ? isInView : isHovering;

        if (trigger && !isScrambling) {
            setIsScrambling(true);
            setRevealedIndices(new Set());
            let iteration = 0;

            interval = setInterval(() => {
                setDisplayText((prev) =>
                    text.split('').map((char, i) => {
                        if (char === ' ') return ' ';
                        if (revealedIndices.has(i)) return text[i];
                        if (iteration >= maxIterations) {
                            setRevealedIndices((prev) => new Set(prev).add(i));
                            return text[i];
                        }
                        return chars[Math.floor(Math.random() * chars.length)];
                    }).join('')
                );

                iteration++;
                if (iteration > maxIterations + text.length) {
                    clearInterval(interval);
                    setIsScrambling(false);
                }
            }, speed);
        }
        return () => clearInterval(interval);
    }, [isHovering, isInView, text, speed, maxIterations, animateOn]);

    return (
        <span
            ref={containerRef}
            onMouseEnter={() => animateOn === 'hover' && setIsHovering(true)}
            onMouseLeave={() => animateOn === 'hover' && setIsHovering(false)}
            className={parentClassName}
            {...props}
        >
            <span className={className}>{displayText}</span>
        </span>
    );
};

export default DecryptedText;