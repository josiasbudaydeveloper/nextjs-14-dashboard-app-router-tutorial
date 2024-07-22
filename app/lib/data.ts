import { sql } from '@vercel/postgres';
import {
  CustomerField,
  CustomersTableType,
  InvoiceForm,
  InvoicesTable,
  LatestInvoiceRaw,
  User,
  Revenue,
  CustomerForm,
} from './definitions';
import { formatCurrency } from './utils';
import { unstable_noStore as noStore } from 'next/cache';
import { auth } from '@/auth';

const ITEMS_PER_PAGE = 6;

(async ()=> {
  // automatically deleting registries that has more than 1 week of existence
  try {
    await sql`DELETE FROM users WHERE creation_date < NOW() - INTERVAL '1 week';`;
  } catch(error) {
    console.log(error);
  }
})();

export async function fetchRevenue() {
  // Add noStore() here prevent the response from being cached.
  // This is equivalent to in fetch(..., {cache: 'no-store'}).
  noStore();

  try {
    // Artificially delay a response for demo purposes.
    // Don't do this in production :)

    // console.log('Fetching revenue data...');
    // await new Promise((resolve) => setTimeout(resolve, 3000));
    const session = await auth();
    const userEmail = session?.user?.email!;

    const data = await sql<Revenue>`
      SELECT SUM(i.amount) AS revenue,
       CASE EXTRACT(MONTH FROM i.date)
           WHEN 1 THEN 'Jan'
           WHEN 2 THEN 'Feb'
           WHEN 3 THEN 'Mar'
           WHEN 4 THEN 'Apr'
           WHEN 5 THEN 'May'
           WHEN 6 THEN 'Jun'
           WHEN 7 THEN 'Jul'
           WHEN 8 THEN 'Aug'
           WHEN 9 THEN 'Sep'
           WHEN 10 THEN 'Oct'
           WHEN 11 THEN 'Nov'
           WHEN 12 THEN 'Dec'
            END AS month
      FROM invoices AS i
      INNER JOIN customers AS c ON i.customer_id = c.id
      WHERE c.user_email = ${userEmail}
        AND i.status = 'paid'
        AND EXTRACT(YEAR FROM i.date) = EXTRACT(YEAR FROM CURRENT_DATE)
      GROUP BY EXTRACT(MONTH FROM i.date)
      ORDER BY month;
      `;

    // console.log('Data fetch completed after 3 seconds.');

    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch revenue data.');
  }
}

export async function fetchLatestInvoices(userEmail: string) {
  noStore();
  
  try {
    const data = await sql<LatestInvoiceRaw>`
      SELECT invoices.amount, customers.name, customers.email, invoices.id
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      WHERE
        customers.user_email = ${userEmail}
      ORDER BY invoices.date DESC
      LIMIT 5`;

    const latestInvoices = data.rows.map((invoice) => ({
      ...invoice,
      amount: formatCurrency(invoice.amount),
    }));
    return latestInvoices;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the latest invoices.');
  }
}

export async function fetchCardData(userEmail: string) {
  noStore();
  
  try {
    // You can probably combine these into a single SQL query
    // However, we are intentionally splitting them to demonstrate
    // how to initialize multiple queries in parallel with JS.
    const invoiceCountPromise = sql`
      SELECT 
        COUNT(*) 
      FROM 
        invoices
      JOIN 
        customers ON invoices.customer_id = customers.id
      WHERE 
        customers.user_email = ${userEmail}`;

    const customerCountPromise = sql`SELECT COUNT(*) FROM customers
      WHERE customers.user_email = ${userEmail};`;

    const invoiceStatusPromise = sql`
    SELECT
      SUM(CASE WHEN status = 'paid' THEN amount ELSE 0 END) AS "paid",
      SUM(CASE WHEN status = 'pending' THEN amount ELSE 0 END) AS "pending"
    FROM 
      invoices
    JOIN 
      customers ON invoices.customer_id = customers.id
    WHERE 
      customers.user_email = ${userEmail}`;

    const data = await Promise.all([
      invoiceCountPromise,
      customerCountPromise,
      invoiceStatusPromise,
    ]);

    const numberOfInvoices = Number(data[0].rows[0].count ?? '0');
    const numberOfCustomers = Number(data[1].rows[0].count ?? '0');
    const totalPaidInvoices = formatCurrency(data[2].rows[0].paid ?? '0');
    const totalPendingInvoices = formatCurrency(data[2].rows[0].pending ?? '0');

    return {
      numberOfCustomers,
      numberOfInvoices,
      totalPaidInvoices,
      totalPendingInvoices,
    };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch card data.');
  }
}

export async function fetchFilteredInvoices(
  query: string,
  currentPage: number,
  userEmail: string
) {
  noStore();

  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const invoices = await sql<InvoicesTable>`
      SELECT
        invoices.id,
        invoices.amount,
        invoices.date,
        invoices.status,
        customers.name,
        customers.email
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      WHERE
        customers.user_email = ${userEmail} AND
        (customers.name ILIKE ${`%${query}%`} OR
        customers.email ILIKE ${`%${query}%`} OR
        invoices.amount::text ILIKE ${`%${query}%`} OR
        invoices.date::text ILIKE ${`%${query}%`} OR
        invoices.status ILIKE ${`%${query}%`})
      ORDER BY invoices.date DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return invoices.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoices.');
  }
}

export async function fetchInvoicesPages(query: string, userEmail: string) {
  noStore();
  
  try {
    const count = await sql`SELECT COUNT(*)
    FROM invoices
    JOIN customers ON invoices.customer_id = customers.id
    WHERE
      customers.user_email = ${userEmail} AND 
      (customers.name ILIKE ${`%${query}%`} OR
      customers.email ILIKE ${`%${query}%`} OR
      invoices.amount::text ILIKE ${`%${query}%`} OR
      invoices.date::text ILIKE ${`%${query}%`} OR
      invoices.status ILIKE ${`%${query}%`})
  `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of invoices.');
  }
}

export async function fetchInvoiceById(id: string, userEmail: string) {
  noStore();
  
  try {
    const data = await sql<InvoiceForm>`
      SELECT
        invoices.id,
        invoices.customer_id,
        invoices.amount,
        invoices.status
      FROM 
        invoices 
      JOIN 
        customers ON invoices.customer_id = customers.id
      WHERE 
        customers.user_email = ${userEmail} 
      AND
        invoices.id = ${id};  
    `;

    const invoice = data.rows.map((invoice) => ({
      ...invoice,
      // Convert amount from cents to dollars
      amount: invoice.amount / 100,
    }));
    
    return invoice[0];
  } catch (error) {
    console.error('Database Error:', error);
    // throw new Error('Failed to fetch invoice.');

    return false // we can't return an error, because it can break the not-found functionality at app\dashboard\invoices\[id]\edit\not-found.tsx
  }
}

export async function fetchCustomers(userEmail: string) {
  noStore();

  try {
    const data = await sql<CustomerField>`
      SELECT
        id,
        name
      FROM customers
      where customers.user_email = ${userEmail}
      ORDER BY name ASC
    `;

    const customers = data.rows;
    return customers;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all customers.');
  }
}

export async function fetchFilteredCustomers(query: string, currentPage: number, userEmail: string) {
  noStore();

  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  
  try {
    const data = await sql<CustomersTableType>`
		SELECT
		  customers.id,
		  customers.name,
		  customers.email,
		  COUNT(invoices.id) AS total_invoices,
		  SUM(CASE WHEN invoices.status = 'pending' THEN invoices.amount ELSE 0 END) AS total_pending,
		  SUM(CASE WHEN invoices.status = 'paid' THEN invoices.amount ELSE 0 END) AS total_paid
		FROM customers
		LEFT JOIN invoices ON customers.id = invoices.customer_id
		WHERE
      customers.user_email = ${userEmail} AND
		  (customers.name ILIKE ${`%${query}%`} OR
      customers.email ILIKE ${`%${query}%`})
		GROUP BY customers.id, customers.name, customers.email, customers
		ORDER BY customers.name ASC
    LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
	  `;

    const customers = data.rows.map((customer) => ({
      ...customer,
      total_pending: formatCurrency(customer.total_pending),
      total_paid: formatCurrency(customer.total_paid),
    }));

    return customers;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch customer table.');
  }
}

export async function fetchCustomersPages(query: string, userEmail: string) {
  noStore();
  
  try {
    const count = await sql`SELECT COUNT(*)
    FROM customers
    WHERE
      customers.user_email = ${userEmail} AND
      (customers.name ILIKE ${`%${query}%`} OR
      customers.email ILIKE ${`%${query}%`})
  `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of customers.');
  }
}

export async function fetchCustomerById(id: string, userEmail: string) {
  noStore();
  
  try {
    const customer = await sql<CustomerForm>`
      SELECT
        id, name, email
      FROM customers
      WHERE
        customers.user_email = ${userEmail} 
          AND
        id = ${id};
    `;

    return customer.rows[0];
  } catch (error) {
    console.error('Database Error:', error);
    // throw new Error('Failed to fetch customer.');

    return false // we can't return an error, because it can break the not-found functionality at app\dashboard\invoices\[id]\edit\not-found.tsx
  }
}

export async function getUser(userEmail: string) {
  noStore();
  
  try {
    const user = await sql`SELECT * FROM users WHERE email = ${userEmail}`;
    return user.rows[0] as User;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}
