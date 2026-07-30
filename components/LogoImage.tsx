'use client'; // 👈 ESTA LÍNEA VA PRIMERO, SIN ESPACIOS ANTES

import { FC } from 'react';

interface LogoImageProps {
  src: string;
  alt: string;
  style?: React.CSSProperties;
}

export const LogoImage: FC<LogoImageProps> = ({ src, alt, style }) => {
  return (
    <img
      src={src}
      alt={alt} style={style}      onError={(e) => {        (e.target as HTMLImageElement).style.display = 'none';
      }}
    /> );
};