import React from 'react';
import { Button } from '@heroui/react';

interface PaginationComponentProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  itemsPerPage: number;
  totalItems: number;
}

export const PaginationComponent: React.FC<PaginationComponentProps> = ({
  totalPages,
  currentPage,
  onPageChange,
  itemsPerPage,
  totalItems
}) => {
  // Only show pagination if there are more items than items per page
  if (totalItems <= itemsPerPage) {
    return null;
  }

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex justify-center items-center gap-2 py-4">
      <Button
        size="sm"
        color="default"
        onPress={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`text-gray-900 hover:text-primary transition-all duration-200 text-2xl border-2 border-transparent hover:border-blue-500 rounded-lg ${
          currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        ‹
      </Button>

      {pages.map((page) => (
        <Button
          key={page}
          size="sm"
          color={page === currentPage ? "primary" : "default"}
          onPress={() => onPageChange(page)}
          className={`${
            page === currentPage
              ? "bg-primary text-white font-semibold underline decoration-2 underline-offset-1 decoration-[#535bf2] text-[#535bf2] border-2 border-transparent hover:border-blue-300 rounded-lg"
              : "text-gray-900 hover:text-primary transition-all duration-200 border-2 border-transparent hover:border-blue-500 rounded-lg"
          }`}
        >
          {page}
        </Button>
      ))}

      <Button
        size="sm"
        color="default"
        onPress={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`text-gray-900 hover:text-primary transition-all duration-200 text-2xl border-2 border-transparent hover:border-blue-500 rounded-lg ${
          currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        ›
      </Button>
    </div>
  );
};
