'use client';

import React, { useState, useRef, useCallback } from 'react';

const LazyImageOptimized = ({ 
  src, 
  alt, 
  className = '', 
  width, 
  height,
  priority = false,
  sizes = '100vw',
  quality = 75,
  placeholder = 'blur',
  ...props 
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isInView, setIsInView] = useState(priority);
  const [error, setError] = useState(false);
  const imgRef = useRef();

  // Generate responsive image sources
  const generateSrcSet = useCallback((originalSrc) => {
    if (!originalSrc || originalSrc.startsWith('http')) {
      return { src: originalSrc }; // External images
    }

    const baseName = originalSrc.replace(/\.[^/.]+$/, '');
    const extension = originalSrc.split('.').pop();
    
    // For now, return original src - can be enhanced with actual responsive images
    return {
      src: originalSrc,
      srcSet: originalSrc,
      sizes: sizes
    };
  }, [sizes]);

  // Intersection Observer for lazy loading
  const observerRef = useCallback((node) => {
    if (priority) return; // Skip observer for priority images
    
    if (imgRef.current) {
      if (imgRef.current.observer) {
        imgRef.current.observer.disconnect();
      }
    }

    if (node) {
      const observer = new IntersectionObserver(
        (entries) => {
          const [entry] = entries;
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        },
        { 
          threshold: 0.1,
          rootMargin: '200px' // Load images 200px before they come into view
        }
      );
      
      observer.observe(node);
      imgRef.current = { ...imgRef.current, observer };
    }
  }, [priority]);

  const handleLoad = useCallback(() => {
    setIsLoading(false);
  }, []);

  const handleError = useCallback(() => {
    setIsLoading(false);
    setError(true);
  }, []);

  const { src: optimizedSrc, srcSet, sizes: imageSizes } = generateSrcSet(src);

  // Don't render img until in view (unless priority)
  if (!isInView && !priority) {
    return (
      <div
        ref={observerRef}
        className={`${className} bg-gray-200 animate-pulse flex items-center justify-center`}
        style={{ width, height, aspectRatio: width && height ? `${width}/${height}` : undefined }}
        {...props}
      >
        <div className="loading-spinner" />
      </div>
    );
  }

  if (error) {
    return (
      <div 
        className={`${className} bg-gray-200 flex items-center justify-center text-gray-400`}
        style={{ width, height, aspectRatio: width && height ? `${width}/${height}` : undefined }}
      >
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
        </svg>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden">
      {/* Blur placeholder */}
      {isLoading && placeholder === 'blur' && (
        <div 
          className={`absolute inset-0 ${className} bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse flex items-center justify-center`}
        >
          <div className="loading-spinner" />
        </div>
      )}
      
      {/* Actual image */}
      <img
        ref={priority ? undefined : observerRef}
        src={optimizedSrc}
        srcSet={srcSet}
        sizes={imageSizes}
        alt={alt}
        className={`${className} transition-opacity duration-300 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
        width={width}
        height={height}
        onLoad={handleLoad}
        onError={handleError}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        {...props}
      />
    </div>
  );
};

export default LazyImageOptimized;
