"use client";

interface FlowerDecorationProps {
  className?: string;
  variant?: "pink" | "blue" | "petal" | "light-blue";
  size?: "sm" | "md" | "lg";
}

export function FlowerDecoration({
  className = "",
  variant = "pink",
  size = "md",
}: FlowerDecorationProps) {
  const colors = {
    pink: "#FF6B9D",
    blue: "#4FACFE",
    petal: "#FFB8D0",
    "light-blue": "#A8D8FF",
  };

  const sizes = {
    sm: 40,
    md: 60,
    lg: 80,
  };

  const color = colors[variant];
  const sizeValue = sizes[size];

  return (
    <svg
      width={sizeValue}
      height={sizeValue}
      viewBox="0 0 60 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`flower-decoration ${className}`}
    >
      {/* Flower petals */}
      <ellipse
        cx="30"
        cy="15"
        rx="8"
        ry="14"
        fill={color}
        fillOpacity="0.3"
        transform="rotate(0 30 30)"
      />
      <ellipse
        cx="30"
        cy="15"
        rx="8"
        ry="14"
        fill={color}
        fillOpacity="0.3"
        transform="rotate(60 30 30)"
      />
      <ellipse
        cx="30"
        cy="15"
        rx="8"
        ry="14"
        fill={color}
        fillOpacity="0.3"
        transform="rotate(120 30 30)"
      />
      <ellipse
        cx="30"
        cy="15"
        rx="8"
        ry="14"
        fill={color}
        fillOpacity="0.3"
        transform="rotate(180 30 30)"
      />
      <ellipse
        cx="30"
        cy="15"
        rx="8"
        ry="14"
        fill={color}
        fillOpacity="0.3"
        transform="rotate(240 30 30)"
      />
      <ellipse
        cx="30"
        cy="15"
        rx="8"
        ry="14"
        fill={color}
        fillOpacity="0.3"
        transform="rotate(300 30 30)"
      />
      {/* Center */}
      <circle cx="30" cy="30" r="6" fill={color} fillOpacity="0.5" />
    </svg>
  );
}

export function FloatingFlowers() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Top Left */}
      <div className="absolute top-20 left-10 animate-float opacity-40">
        <FlowerDecoration variant="pink" size="lg" />
      </div>
      
      {/* Top Right */}
      <div className="absolute top-40 right-20 animate-float-delay-1 opacity-30">
        <FlowerDecoration variant="blue" size="md" />
      </div>
      
      {/* Middle Left */}
      <div className="absolute top-1/3 left-5 animate-float-delay-2 opacity-25">
        <FlowerDecoration variant="petal" size="sm" />
      </div>
      
      {/* Middle Right */}
      <div className="absolute top-1/2 right-10 animate-float-slow opacity-35">
        <FlowerDecoration variant="light-blue" size="lg" />
      </div>
      
      {/* Bottom Left */}
      <div className="absolute bottom-40 left-20 animate-float-delay-3 opacity-30">
        <FlowerDecoration variant="blue" size="sm" />
      </div>
      
      {/* Bottom Right */}
      <div className="absolute bottom-20 right-5 animate-float opacity-25">
        <FlowerDecoration variant="pink" size="md" />
      </div>
    </div>
  );
}
