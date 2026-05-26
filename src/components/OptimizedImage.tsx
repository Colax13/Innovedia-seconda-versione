import React, { useState } from 'react';

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  maxWidth?: number;
}

const optimizeCloudinaryUrl = (url: string, maxWidth?: number) => {
  if (!url || typeof url !== 'string' || !url.includes('res.cloudinary.com')) {
    return url;
  }
  
  // If the URL already has custom quality or format configurations, preserve them
  if (url.includes('f_auto') || url.includes('q_auto')) {
    return url;
  }
  
  const uploadIndex = url.indexOf('/image/upload');
  if (uploadIndex === -1) return url;
  
  const insertIndex = uploadIndex + '/image/upload'.length;
  
  // Custom clamp if maxWidth is provided, otherwise default to a high-perf 1400px limit
  const limitWidth = maxWidth || 1400;
  const transform = `/f_auto,q_auto,w_${limitWidth},c_limit`;
  
  return url.slice(0, insertIndex) + transform + url.slice(insertIndex);
};

const OptimizedImage: React.FC<OptimizedImageProps> = ({ src, alt, className = '', style, maxWidth, ...props }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const optimizedSrc = optimizeCloudinaryUrl(src, maxWidth);

  return (
    <img
      src={optimizedSrc}
      alt={alt}
      loading="lazy"
      decoding="async"
      referrerPolicy="no-referrer"
      onLoad={() => setIsLoaded(true)}
      className={`${className} transition-opacity duration-700 ease-in-out ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
      style={{
        ...style,
      }}
      {...props}
    />
  );
};

export default OptimizedImage;
