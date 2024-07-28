import {
  BanknotesIcon,
  ClockIcon,
  UserGroupIcon,
  InboxIcon,
} from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';
import { fetchCardData } from '@/app/lib/data';
import { auth } from '@/auth';
import { themeType } from '@/app/lib/theme';

const iconMap = {
  collected: BanknotesIcon,
  customers: UserGroupIcon,
  pending: ClockIcon,
  invoices: InboxIcon,
};

export default async function CardWrapper({theme}:{theme: themeType}) {
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

      <Card title="Collected" value={totalPaidInvoices} type="collected" theme={theme} />
      <Card title="Pending" value={totalPendingInvoices} type="pending" theme={theme} />
      <Card title="Total Invoices" value={numberOfInvoices} type="invoices" theme={theme} />
      <Card
        title="Total Customers"
        value={numberOfCustomers}
        type="customers"
        theme={theme}
      />
    </>
  );
}

export function Card({
  title,
  value,
  type,
  theme
}: {
  title: string;
  value: number | string;
  type: 'invoices' | 'customers' | 'pending' | 'collected';
  theme: themeType
}) {
  const Icon = iconMap[type];

  return (
    <div className={`rounded-xl ${theme.container} p-2 shadow-sm`}>
      <div className="flex p-4">
        {Icon ? <Icon className={`h-5 w-5 ${theme.text}`} /> : null}
        <h3 className={`ml-2 text-sm font-medium ${theme.title}`}>{title}</h3>
      </div>
      <p className={`${lusitana.className} truncate rounded-xl
        ${theme.bg} ${theme.title} px-4 py-8 text-center text-2xl`}
      >
        {value}
      </p>
    </div>
  );
}
