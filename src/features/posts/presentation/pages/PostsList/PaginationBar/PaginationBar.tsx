import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from '@/components/ui/pagination';
import { CardFooter } from '@/components/ui/card';

import {
  ChevronLeft,
  ChevronsLeft,
  ChevronRight,
  ChevronsRight,
} from 'lucide-react';

type PaginationBarProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  showEllipsis?: boolean;
  maxVisiblePages?: number;
};

export const PaginationBar = ({
  currentPage,
  totalPages,
  onPageChange,
  showEllipsis = true,
  maxVisiblePages = 6,
}: PaginationBarProps) => {
  const generatePageNumbers = () => {
    const pages: (number | 'ellipsis')[] = [];

    if (totalPages <= maxVisiblePages) {
      // Show all pages if total is less than max visible
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      if (currentPage <= 3) {
        // Show first few pages
        for (let i = 2; i <= Math.min(4, totalPages - 1); i++) {
          pages.push(i);
        }
        if (showEllipsis && totalPages > 5) {
          pages.push('ellipsis');
        }
      } else if (currentPage >= totalPages - 2) {
        // Show last few pages
        if (showEllipsis && totalPages > 5) {
          pages.push('ellipsis');
        }
        for (let i = Math.max(totalPages - 3, 2); i <= totalPages - 1; i++) {
          pages.push(i);
        }
      } else {
        // Show current page with context
        if (showEllipsis) {
          pages.push('ellipsis');
        }
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        if (showEllipsis) {
          pages.push('ellipsis');
        }
      }

      // Always show last page (if more than 1 page)
      if (totalPages > 1) {
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const pageNumbers = generatePageNumbers();

  const handlePageClick = (page: number) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange(page);
    }
  };

  const handleFirst = () => {
    if (currentPage > 1) {
      onPageChange(1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handleLast = () => {
    if (currentPage < totalPages) {
      onPageChange(totalPages);
    }
  };

  if (totalPages <= 1) {
    return null;
  }

  return (
    <CardFooter className="px-2.5 py-6 bg-white">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationLink
              onClick={handleFirst}
              aria-label="Go to first page"
              className={`border border-[#F1F1F1] rounded-full ${
                currentPage <= 1
                  ? 'pointer-events-none text-black/50'
                  : 'cursor-pointer'
              }`}
            >
              <ChevronsLeft />
            </PaginationLink>
          </PaginationItem>

          <PaginationItem>
            <PaginationLink
              onClick={handlePrevious}
              aria-label="Go to previous page"
              className={`rounded-full border border-[#F1F1F1] w-9 ${
                currentPage <= 1
                  ? 'pointer-events-none text-black/50'
                  : 'cursor-pointer'
              }`}
            >
              <ChevronLeft />
            </PaginationLink>
          </PaginationItem>

          {pageNumbers.map((page, index) => (
            <PaginationItem key={index}>
              {page === 'ellipsis' ? (
                <PaginationEllipsis />
              ) : (
                <PaginationLink
                  onClick={() => {
                    handlePageClick(page);
                  }}
                  isActive={page === currentPage}
                  className={`rounded-full cursor-pointer ${page === currentPage ? 'bg-[#2F80ED] text-white hover:bg-[#2F80ED]/90 hover:text-white' : 'border border-[#F1F1F1'}`}
                >
                  {page}
                </PaginationLink>
              )}
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationLink
              onClick={handleNext}
              aria-label="Go to next page"
              className={`w-9 rounded-full border border-[#F1F1F1] ${
                currentPage >= totalPages
                  ? 'pointer-events-none text-black/50'
                  : 'cursor-pointer rounded-full'
              }`}
            >
              <ChevronRight />
            </PaginationLink>
          </PaginationItem>

          <PaginationItem>
            <PaginationLink
              onClick={handleLast}
              aria-label="Go to last page"
              className={`w-9 rounded-full border border-[#F1F1F1] ${
                currentPage >= totalPages
                  ? 'pointer-events-none text-black/50'
                  : 'cursor-pointer'
              }`}
            >
              <ChevronsRight />
            </PaginationLink>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </CardFooter>
  );
};
