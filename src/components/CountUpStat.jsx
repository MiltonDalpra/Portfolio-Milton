import React, { useEffect, useState, useRef } from 'react';

const CountUpStat = ({ endValue, prefix = '', suffix = '', decimals = 0, duration = 2000 }) => {
    const [count, setCount] = useState(0);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    let startTime = null;
                    const animate = (timestamp) => {
                        if (!startTime) startTime = timestamp;
                        const progress = timestamp - startTime;
                        const percentage = Math.min(progress / duration, 1);
                        
                        // Función de easing para suavizar el final (easeOutQuart)
                        const easeOut = 1 - Math.pow(1 - percentage, 4);
                        
                        setCount(endValue * easeOut);

                        if (percentage < 1) {
                            requestAnimationFrame(animate);
                        } else {
                            setCount(endValue);
                        }
                    };
                    requestAnimationFrame(animate);
                    // Solo animar la primera vez que se ve
                    observer.disconnect(); 
                }
            },
            { threshold: 0.1 }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    }, [endValue, duration]);

    return (
        <span ref={ref}>
            {prefix}{count.toFixed(decimals)}{suffix}
        </span>
    );
};

export default CountUpStat;
