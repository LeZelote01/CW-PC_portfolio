import React from 'react';
import { Loader2 } from 'lucide-react';

export const LoadingSpinner = ({ size = 'default', className = '' }) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    default: 'h-8 w-8',
    lg: 'h-12 w-12'
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <Loader2 className={`animate-spin text-green-600 dark:text-green-400 ${sizeClasses[size]}`} />
    </div>
  );
};

export const LoadingCard = ({ className = '' }) => (
  <div className={`animate-pulse ${className}`}>
    <div className="bg-gray-200 dark:bg-gray-700 rounded-lg p-6 space-y-4">
      <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4"></div>
      <div className="space-y-2">
        <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded"></div>
        <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-5/6"></div>
      </div>
    </div>
  </div>
);

export const LoadingGrid = ({ items = 3, className = '' }) => (
  <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}>
    {Array.from({ length: items }).map((_, index) => (
      <LoadingCard key={index} />
    ))}
  </div>
);

export const LoadingSection = ({ title, items = 3 }) => (
  <div className="space-y-6">
    {title && (
      <div className="animate-pulse">
        <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded w-1/3 mb-4"></div>
      </div>
    )}
    <LoadingGrid items={items} />
  </div>
);

export const ErrorMessage = ({ error, className = '' }) => (
  <div className={`text-center py-8 ${className}`}>
    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 max-w-md mx-auto">
      <div className="flex items-center justify-center mb-3">
        <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
          <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
      </div>
      <h3 className="text-lg font-medium text-red-800 dark:text-red-200 mb-2">
        Erreur de chargement
      </h3>
      <p className="text-sm text-red-700 dark:text-red-300">
        {typeof error === 'string' ? error : error?.message || 'Une erreur s\'est produite lors du chargement des données.'}
      </p>
      <button 
        onClick={() => window.location.reload()} 
        className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-200 text-sm font-medium"
      >
        Réessayer
      </button>
    </div>
  </div>
);

export default LoadingSpinner;// Force recompile
