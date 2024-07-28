'use client'

import { themeType } from "../lib/theme";

// Loading animation
const shimmer =
  'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent';

export function CardSkeleton({ theme }:{ theme: themeType }) {
  return (
    <div
      className={`${shimmer} relative overflow-hidden rounded-xl p-2 shadow-sm
        ${theme.container}
      `}
    >
      <div className="flex p-4">
        <div className="h-5 w-5 rounded-md bg-gray-200" />
        <div className="ml-2 h-6 w-16 rounded-md bg-gray-200 text-sm font-medium" />
      </div>
      <div className={`flex items-center justify-center truncate rounded-xl px-4 py-8
        ${theme.bg}
      `}>
        <div className="h-7 w-20 rounded-md bg-gray-200" />
      </div>
    </div>
  );
}

export function CardsSkeleton({ theme }:{ theme: themeType }) {
  return (
    <>
      <CardSkeleton theme={theme} />
      <CardSkeleton theme={theme} />
      <CardSkeleton theme={theme} />
      <CardSkeleton theme={theme} />
    </>
  );
}

export function RevenueChartSkeleton({ theme }:{ theme: themeType }) {
  return (
    <div className={`${shimmer} relative w-full overflow-hidden md:col-span-4`}>
      <div className="mb-4 h-8 w-36 rounded-md bg-gray-100" />
        <div className={`rounded-xl p-4 ${theme.container}`}>
        <div className={`mt-0 grid h-[410px] grid-cols-12 items-end gap-2 rounded-md 
          p-4 sm:grid-cols-13 md:gap-4 ${theme.bg}
        `}/>
        <div className="flex items-center pb-2 pt-6">
          <div className="h-5 w-5 rounded-full bg-gray-200" />
          <div className="ml-2 h-4 w-20 rounded-md bg-gray-200" />
        </div>
      </div>
    </div>
  );
}

export function InvoiceSkeleton({ theme }:{ theme: themeType }) {
  return (
    <div className={`flex flex-row items-center justify-between border-b py-4
      ${theme.border}
    `}>
      <div className="flex items-center">
        <div className="min-w-0">
          <div className="h-5 w-40 rounded-md bg-gray-200" />
          <div className="mt-2 h-4 w-12 rounded-md bg-gray-200" />
        </div>
      </div>
      <div className="mt-2 h-4 w-12 rounded-md bg-gray-200" />
    </div>
  );
}

export function LatestInvoicesSkeleton({ theme }:{ theme: themeType }) {
  return (
    <div
      className={`${shimmer} relative flex w-full flex-col overflow-hidden md:col-span-4`}
    >
      <div className={`mb-4 h-8 w-36 rounded-md bg-gray-100`}/>
      <div className={`flex grow flex-col justify-between rounded-xl 
        ${theme.container} p-4
      `}>
        <div className={`${theme.bg} px-6`}>
          <InvoiceSkeleton theme={theme} />
          <InvoiceSkeleton theme={theme} />
          <InvoiceSkeleton theme={theme} />
          <InvoiceSkeleton theme={theme} />
          <InvoiceSkeleton theme={theme} />
          <div className="flex items-center pb-2 pt-6">
            <div className="h-5 w-5 rounded-full bg-gray-200" />
            <div className="ml-2 h-4 w-20 rounded-md bg-gray-200" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DashboardSkeleton({ theme }:{ theme: themeType }) {
  return (
    <>
      <div
        className={`${shimmer} relative mb-4 h-8 w-36 overflow-hidden rounded-md bg-gray-100`}
      />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <CardSkeleton theme={theme} />
        <CardSkeleton theme={theme} />
        <CardSkeleton theme={theme} />
        <CardSkeleton theme={theme} />
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <RevenueChartSkeleton theme={theme} />
        <LatestInvoicesSkeleton theme={theme} />
      </div>
    </>
  );
}

export function TableRowSkeleton({ theme }:{ theme: themeType }) {
  return (
    <tr className={`w-full border-b last-of-type:border-none 
      [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg 
      [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg
      ${theme.bg} ${theme.border}
    `}>
      {/* Customer Name and Image */}
      <td className="relative overflow-hidden whitespace-nowrap py-3 pl-6 pr-3">
        <div className="flex items-center gap-3">
          <div className="h-6 w-24 rounded bg-gray-100"></div>
        </div>
      </td>
      {/* Email */}
      <td className="whitespace-nowrap px-3 py-3">
        <div className="h-6 w-32 rounded bg-gray-100"></div>
      </td>
      {/* Amount */}
      <td className="whitespace-nowrap px-3 py-3">
        <div className="h-6 w-16 rounded bg-gray-100"></div>
      </td>
      {/* Date */}
      <td className="whitespace-nowrap px-3 py-3">
        <div className="h-6 w-16 rounded bg-gray-100"></div>
      </td>
      {/* Status */}
      <td className="whitespace-nowrap px-3 py-3">
        <div className="h-6 w-16 rounded bg-gray-100"></div>
      </td>
      {/* Actions */}
      <td className="whitespace-nowrap py-3 pl-6 pr-3">
        <div className="flex justify-end gap-3">
          <div className="h-[38px] w-[38px] rounded bg-gray-100"></div>
          <div className="h-[38px] w-[38px] rounded bg-gray-100"></div>
        </div>
      </td>
    </tr>
  );
}

export function InvoicesMobileSkeleton({ theme }:{ theme: themeType }) {
  return (
    <div className={`mb-2 w-full rounded-md bg-white p-4 ${theme.bg}`}>
      <div className={`
        flex items-center justify-between border-b pb-8 
        ${theme.border}
      `}>
        <div className="flex items-center">
          <div className="h-6 w-16 rounded bg-gray-100"></div>
        </div>
        <div className="h-6 w-16 rounded bg-gray-100"></div>
      </div>
      <div className="flex w-full items-center justify-between pt-4">
        <div>
          <div className="h-6 w-16 rounded bg-gray-100"></div>
          <div className="mt-2 h-6 w-24 rounded bg-gray-100"></div>
        </div>
        <div className="flex justify-end gap-2">
          <div className="h-10 w-10 rounded bg-gray-100"></div>
          <div className="h-10 w-10 rounded bg-gray-100"></div>
        </div>
      </div>
    </div>
  );
}

export function InvoicesTableSkeleton({ theme }:{ theme: themeType }) {
  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className={`rounded-lg ${theme.container} p-2 md:pt-0`}>
          <div className="md:hidden">
            <InvoicesMobileSkeleton theme={theme} />
            <InvoicesMobileSkeleton theme={theme} />
            <InvoicesMobileSkeleton theme={theme} />
            <InvoicesMobileSkeleton theme={theme} />
            <InvoicesMobileSkeleton theme={theme} />
            <InvoicesMobileSkeleton theme={theme} />
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className={`px-4 py-5 font-medium sm:pl-6 ${theme.text}`}>
                  Customer
                </th>
                <th scope="col" className={`px-3 py-5 font-medium ${theme.text}`}>
                  Email
                </th>
                <th scope="col" className={`px-3 py-5 font-medium ${theme.text}`}>
                  Amount
                </th>
                <th scope="col" className={`px-3 py-5 font-medium ${theme.text}`}>
                  Date
                </th>
                <th scope="col" className={`px-3 py-5 font-medium ${theme.text}`}>
                  Status
                </th>
                <th
                  scope="col"
                  className="relative pb-4 pl-3 pr-6 pt-2 sm:pr-6"
                >
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              <TableRowSkeleton theme={theme} />
              <TableRowSkeleton theme={theme} />
              <TableRowSkeleton theme={theme} />
              <TableRowSkeleton theme={theme} />
              <TableRowSkeleton theme={theme} />
              <TableRowSkeleton theme={theme} />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
