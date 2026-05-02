import React from 'react';

/**
 * Componente BorderGlow (React Bits / Shadcn Style)
 * Milton - Estética de alta fidelidad
 */
const BorderGlow = ({
    children,
    className = "",
    containerClassName = "",
    glowColor = "#6366f1", // Color Índigo
    duration = 3
}) => {
    return (
        <div className={`relative p-[1px] overflow-hidden rounded-[3rem] ${containerClassName}`}>
            {/* El efecto de brillo animado de fondo */}
            <div
                className="absolute inset-0 z-0 animate-spin-slow"
                style={{
                    background: `conic-gradient(from 0deg, transparent 0%, ${glowColor} 50%, transparent 100%)`,
                    animationDuration: `${duration}s`,
                    width: '200%',
                    height: '200%',
                    top: '-50%',
                    left: '-50%',
                }}
            />
            {/* El contenido sobre el brillo */}
            <div className={`relative z-10 bg-[#0f1115] rounded-[3rem] h-full w-full ${className}`}>
                {children}
            </div>
        </div>
    );
};

export default BorderGlow;