import React, { CSSProperties, ReactNode, useState } from 'react';

interface SlideButtonProps {
  children: ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  baseBg?: string;
  hoverBg?: string;
  textColor?: string;
  hoverTextColor?: string;
  animationSpeed?: number;
  className?: string;
  style?: CSSProperties;
  [key: string]: unknown;
}

const SlideButton = ({
  children,
  onClick,
  type = 'button',
  disabled = false,
  baseBg = '#2c3e50',
  hoverBg = '#3498db',
  textColor = 'white',
  hoverTextColor = 'white',
  animationSpeed = 0.4,
  className = '',
  style = {},
  ...props
}: SlideButtonProps) => {
  const [isHovered, setIsHovered] = useState(false);

  // Inline styles for dynamic customization
  const buttonStyle = {
    '--base-bg': baseBg,
    '--hover-bg': hoverBg,
    '--text-color': textColor,
    '--hover-text-color': hoverTextColor,
    '--slide-speed': `${animationSpeed}s`,
    ...style,
  };

  return (
    <button
      type={type}
      className={`slide-btn ${className}`}
      style={buttonStyle}
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-disabled={disabled}
      {...props}
    >
      <span className="slide-btn__content">{children}</span>
    </button>
  );
};

export default SlideButton;