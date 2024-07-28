import { themeType } from '@/app/lib/theme';
import { CheckIcon, ClockIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

export default function InvoiceStatus({ 
  status,
  theme
}: 
{ 
  status: string;
  theme: themeType;
 }) {
  return (
    <span
      className={clsx(
        `inline-flex items-center rounded-full px-2 py-1 text-xs
          ${status === 'pending' && `${theme.container}`}
        `,
        {
          'text-gray-500': status === 'pending',
          'bg-green-500 text-white': status === 'paid',
        },
      )}
    >
      {status === 'pending' ? (
        <>
          Pending
          <ClockIcon className="ml-1 w-4 text-gray-500" />
        </>
      ) : null}
      {status === 'paid' ? (
        <>
          Paid
          <CheckIcon className="ml-1 w-4 text-white" />
        </>
      ) : null}
    </span>
  );
}
