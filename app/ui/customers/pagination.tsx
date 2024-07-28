'use client';

import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import Link from 'next/link';
import { generatePagination } from '@/app/lib/utils';
import { usePathname, useSearchParams } from 'next/navigation';
import { themeType } from '@/app/lib/theme';

export default function Pagination({ 
  totalPages, 
  theme
}: 
{ 
  totalPages: number;
  theme: themeType;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  // NOTE: comment in this code when you get to this point in the course

  const allPages = generatePagination(currentPage, totalPages);

  return (
    <>
      {/* NOTE: comment in this code when you get to this point in the course */}

      <div className="inline-flex">
        <PaginationArrow
          direction="left"
          href={createPageURL(currentPage - 1)}
          isDisabled={currentPage <= 1}
          theme={theme}
        />

        <div className="flex -space-x-px">
          {allPages.map((page, index) => {
            let position: 'first' | 'last' | 'single' | 'middle' | undefined;

            if (index === 0) position = 'first';
            if (index === allPages.length - 1) position = 'last';
            if (allPages.length === 1) position = 'single';
            if (page === '...') position = 'middle';

            return (
              <PaginationNumber
                key={page}
                href={createPageURL(page)}
                page={page}
                position={position}
                isActive={currentPage === page}
                theme={theme}
              />
            );
          })}
        </div>

        <PaginationArrow
          direction="right"
          href={createPageURL(currentPage + 1)}
          isDisabled={currentPage >= totalPages}
          theme={theme}
        />
      </div>
    </>
  );
}

function PaginationNumber({
  page,
  href,
  isActive,
  position,
  theme
}: {
  page: number | string;
  href: string;
  position?: 'first' | 'last' | 'middle' | 'single';
  isActive: boolean;
  theme: themeType;
}) {
  const className = clsx(
    `flex h-10 w-10 items-center justify-center text-sm border
      ${theme.border} ${theme.text}
      ${(!isActive && position !== 'middle') && 
        `${theme.hoverBorder} ${theme.hoverBg} ${theme.hoverText}`
      }
    `,
    {
      'rounded-l-md': position === 'first' || position === 'single',
      'rounded-r-md': position === 'last' || position === 'single',
      'z-10 bg-blue-600 border-blue-600 text-white': isActive,
      'text-gray-300': position === 'middle',
    },
  );

  return isActive || position === 'middle' ? (
    <div className={className}>{page}</div>
  ) : (
    <Link href={href} className={className}>
      {page}
    </Link>
  );
}

function PaginationArrow({
  href,
  direction,
  isDisabled,
  theme
}: {
  href: string;
  direction: 'left' | 'right';
  isDisabled?: boolean;
  theme: themeType;
}) {
  const className = clsx(
    `flex h-10 w-10 items-center justify-center rounded-md border
      ${theme.border} ${theme.text}
      ${isDisabled && `${theme.border} ${theme.notActiveText}`}
      ${!isDisabled && `${theme.hoverBorder} ${theme.hoverBg} ${theme.hoverText}`}
    `,
    {
      'pointer-events-none text-gray-300': isDisabled,
      'mr-2 md:mr-4': direction === 'left',
      'ml-2 md:ml-4': direction === 'right',
    },
  );

  const icon =
    direction === 'left' ? (
      <ArrowLeftIcon className="w-4" />
    ) : (
      <ArrowRightIcon className="w-4" />
    );

  return isDisabled ? (
    <div className={className}>{icon}</div>
  ) : (
    <Link className={className} href={href}>
      {icon}
    </Link>
  );
}
