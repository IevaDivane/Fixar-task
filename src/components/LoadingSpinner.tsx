import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
  text?: string;
  className?: string;
  inline?: boolean;
}

// Custom CSS spinner that definitely works
const CustomSpinner: React.FC<{ size: string; color: string }> = ({ size, color }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6', 
    lg: 'w-8 h-8'
  };

  const colorClasses = {
    default: 'border-gray-500',
    primary: 'border-blue-500',
    secondary: 'border-gray-400',
    success: 'border-green-500',
    warning: 'border-yellow-500',
    danger: 'border-red-500'
  };

  return (
    <div 
      className={`
        ${sizeClasses[size as keyof typeof sizeClasses]} 
        ${colorClasses[color as keyof typeof colorClasses]}
        border-2 border-solid border-t-transparent rounded-full animate-spin
        flex-shrink-0
      `}
      style={{
        animation: 'spin 1s linear infinite',
        borderWidth: '2px'
      }}
      role="status"
      aria-label="Loading"
    />
  );
};

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  color = 'primary',
  text,
  className = '',
  inline = false
}) => {
  const containerClasses = inline 
    ? `flex items-center gap-2 ${className}`
    : `flex flex-col items-center justify-center gap-2 ${className}`;

  return (
    <div className={containerClasses}>
      <CustomSpinner size={size} color={color} />
      {text && (
        <span className="text-sm text-gray-600 dark:text-gray-400">
          {text}
        </span>
      )}
    </div>
  );
};

// Predefined loading states for common operations
export const LoadingStates = {
  // Full page loading - make it very prominent
  PageLoading: () => (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-4"></div>
      <span className="text-lg font-medium text-gray-700">Loading logs...</span>
    </div>
  ),
  
  // Button loading
  ButtonLoading: () => (
    <LoadingSpinner 
      size="sm" 
      color="primary" 
      inline 
    />
  ),
  
  // Save operation loading
  SaveLoading: () => (
    <LoadingSpinner 
      size="sm" 
      color="primary" 
      text="Saving..." 
      inline 
    />
  ),
  
  // Delete operation loading
  DeleteLoading: () => (
    <LoadingSpinner 
      size="sm" 
      color="danger" 
      text="Deleting..." 
      inline 
    />
  ),
  
  // Create operation loading
  CreateLoading: () => (
    <LoadingSpinner 
      size="sm" 
      color="success" 
      text="Creating..." 
      inline 
    />
  )
};
