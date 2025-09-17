import React, { useEffect } from 'react';
import { Button } from '@heroui/react';

export interface ToastProps {
  id: string;
  type: 'success' | 'error';
  message: string;
  duration?: number;
  onClose: (id: string) => void;
}

export const Toast: React.FC<ToastProps> = ({
  id,
  type,
  message,
  duration = 5000,
  onClose
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(id);
    }, duration);

    return () => clearTimeout(timer);
  }, [id, duration, onClose]);

  const getToastStyles = () => {
    switch (type) {
      case 'success':
        return {
          bgColor: 'bg-green-500',
          borderColor: 'border-green-600',
          icon: '✓',
          textColor: 'text-white'
        };
      case 'error':
        return {
          bgColor: 'bg-red-500',
          borderColor: 'border-red-600',
          icon: '✕',
          textColor: 'text-white'
        };
      default:
        return {
          bgColor: 'bg-gray-500',
          borderColor: 'border-gray-600',
          icon: 'ℹ',
          textColor: 'text-white'
        };
    }
  };

  const styles = getToastStyles();

  return (
    <div
      className={`
        ${styles.bgColor} ${styles.borderColor} ${styles.textColor}
        border-2 rounded-lg shadow-lg p-4 mb-3 min-w-[300px] max-w-[500px]
        transform transition-all duration-300 ease-in-out
        animate-in slide-in-from-right-full
        flex items-center justify-between gap-3
      `}
      role="alert"
      aria-live="polite"
    >
      <div className="flex items-center gap-3">
        <span className="text-lg font-bold">{styles.icon}</span>
        <span className="font-medium">{message}</span>
      </div>
      <Button
        isIconOnly
        size="sm"
        variant="light"
        className="text-white hover:bg-white/20 min-w-6 w-6 h-6"
        onPress={() => onClose(id)}
        aria-label="Close notification"
      >
        ×
      </Button>
    </div>
  );
};
