import {
  BanknotesIcon,
  ClockIcon,
  UserGroupIcon,
  InboxIcon,
} from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';
import { fetchCardData } from '@/app/lib/data';
import darkTheme from '@/app/lib/dark-theme';
import { auth } from '@/auth';

const iconMap = {
  collected: BanknotesIcon,
  customers: UserGroupIcon,
  pending: ClockIcon,
  invoices: InboxIcon,
};

export default async function CardWrapper() {
  const session = await auth();
  const userEmail = session?.user?.email!;

  const {
    numberOfInvoices,
    numberOfCustomers,
    totalPaidInvoices,
    totalPendingInvoices,
  } = await fetchCardData(userEmail);

  return (
    <>
      {/* NOTE: comment in this code when you get to this point in the course */}

      <Card title="Collected" value={totalPaidInvoices} type="collected" />
      <Card title="Pending" value={totalPendingInvoices} type="pending" />
      <Card title="Total Invoices" value={numberOfInvoices} type="invoices" />
      <Card
        title="Total Customers"
        value={numberOfCustomers}
        type="customers"
      />
    </>
  );
}

export function Card({
  title,
  value,
  type,
}: {
  title: string;
  value: number | string;
  type: 'invoices' | 'customers' | 'pending' | 'collected';
}) {
  const Icon = iconMap[type];

  return (
    <div className={`rounded-xl bg-gray-50 ${darkTheme.container} p-2 shadow-sm`}>
      <div className="flex p-4">
        {Icon ? <Icon className={`h-5 w-5 text-gray-700 ${darkTheme.text}`} /> : null}
        <h3 className={`ml-2 text-sm font-medium ${darkTheme.title}`}>{title}</h3>
      </div>
      <p className={`${lusitana.className} truncate rounded-xl
      bg-white ${darkTheme.bg} ${darkTheme.title} px-4 py-8 text-center text-2xl`}
      >
        {value}
      </p>
    </div>
  );
}
