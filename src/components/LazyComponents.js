import { lazy } from 'react';

// Lazy load heavy components for code splitting
export const Projects = lazy(() => import('./Projects'));
export const Education = lazy(() => import('./Education'));
export const GalleryModal = lazy(() => import('./GalleryModal'));