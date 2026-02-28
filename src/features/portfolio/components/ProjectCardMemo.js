'use client';

import React, { memo, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Calendar, Tag, Image, Play, Info, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import LazyImageOptimized from '../../../shared/components/media/LazyImageOptimized';

const ProjectCard = memo(({ project, onImageClick, onProjectDetails }) => {
  const { i18n } = useTranslation();
  const [imageError, setImageError] = useState(false);

  const handleImageClick = useCallback(() => {
    if (project.images && project.images.length > 0) {
      onImageClick(project.images);
    }
  }, [project.images, onImageClick]);

  const handleDetailsClick = useCallback(() => {
    onProjectDetails(project);
  }, [project, onProjectDetails]);

  const handleImageError = useCallback(() => {
    setImageError(true);
  }, []);

  const getYouTubeThumbnail = useCallback((url) => {
    if (!url) return null;
    
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/,
      /youtube\.com\/embed\/([^&\n?#]+)/
    ];
    
    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match) {
        return `https://img.youtube.com/vi/${match[1]}/maxresdefault.jpg`;
      }
    }
    return null;
  }, []);

  const thumbnailUrl = project.thumbnail || getYouTubeThumbnail(project.videoUrl);
  const title = i18n.language === 'th' && project.titleTh ? project.titleTh : project.title;
  const description = i18n.language === 'th' && project.descriptionTh ? project.descriptionTh : project.description;
  const category = i18n.language === 'th' && project.categoryTh ? project.categoryTh : project.category;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group min-h-[400px] flex flex-col"
    >
      {/* Thumbnail */}
      <div className="relative h-48 bg-gray-100 overflow-hidden flex-shrink-0">
        {thumbnailUrl && !imageError ? (
          <LazyImageOptimized
            src={thumbnailUrl}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={handleImageError}
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
            <Tag className="w-12 h-12 text-gray-400" />
          </div>
        )}
        
        {/* Overlay Icons */}
        <div className="absolute top-3 right-3 flex space-x-2">
          {project.type === 'video' && (
            <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
              <Play className="w-4 h-4 text-white fill-current" />
            </div>
          )}
          {project.images && project.images.length > 0 && (
            <button
              onClick={handleImageClick}
              className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"
              aria-label="View images"
            >
              <Image className="w-4 h-4 text-white" />
            </button>
          )}
        </div>

        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <span className="px-2 py-1 bg-black bg-opacity-70 text-white text-xs rounded-full font-medium">
            {category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-6 flex-1 flex flex-col">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 leading-tight group-hover:text-bangkok-600 transition-colors">
            {title}
          </h3>
          {project.year && (
            <div className="flex items-center text-sm text-gray-500 ml-2 flex-shrink-0">
              <Calendar className="w-4 h-4 mr-1" />
              {project.year}
            </div>
          )}
        </div>

        <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-4 flex-1 line-clamp-3">
          {description}
        </p>

        {/* Action Buttons */}
        <div className="flex items-center space-x-3 mt-auto pt-4 border-t border-gray-100">
          <button
            onClick={handleDetailsClick}
            className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-bangkok-600 hover:text-bangkok-700 hover:bg-bangkok-50 rounded-lg transition-all duration-200"
          >
            <Info className="w-4 h-4" />
            <span>{i18n.language === 'th' ? 'ดูรายละเอียด' : 'Details'}</span>
          </button>
          
          {project.videoUrl && (
            <a
              href={project.videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-lg transition-all duration-200"
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink className="w-4 h-4" />
              <span>{i18n.language === 'th' ? 'ดูวิดีโอ' : 'Watch'}</span>
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
});

ProjectCard.displayName = 'ProjectCard';

export default ProjectCard;
