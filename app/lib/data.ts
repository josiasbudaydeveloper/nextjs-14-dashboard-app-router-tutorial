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

const ITEMS_PER_PAGE = 6;

export async function fetchRevenue() {
  // Add noStore() here prevent the response from being cached.
  // This is equivalent to in fetch(..., {cache: 'no-store'}).
  noStore();

  try {
    // Artificially delay a response for demo purposes.
    // Don't do this in production :)

    // console.log('Fetching revenue data...');
    // await new Promise((resolve) => setTimeout(resolve, 3000));

    const data = await sql<Revenue>`SELECT * FROM revenue`;

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
      SELECT invoices2.amount, customers2.name, customers2.email, invoices2.id
      FROM invoices2
      JOIN customers2 ON invoices2.customer_id = customers2.id
      WHERE
        customers2.user_email = ${userEmail}
      ORDER BY invoices2.date DESC
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
        invoices2
      JOIN 
        customers2 ON invoices2.customer_id = customers2.id
      WHERE 
        customers2.user_email = ${userEmail}`;

    const customerCountPromise = sql`SELECT COUNT(*) FROM customers2
      WHERE customers2.user_email = ${userEmail};`;

    const invoiceStatusPromise = sql`
    SELECT
      SUM(CASE WHEN status = 'paid' THEN amount ELSE 0 END) AS "paid",
      SUM(CASE WHEN status = 'pending' THEN amount ELSE 0 END) AS "pending"
    FROM 
      invoices2
    JOIN 
      customers2 ON invoices2.customer_id = customers2.id
    WHERE 
      customers2.user_email = ${userEmail}`;

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
        invoices2.id,
        invoices2.amount,
        invoices2.date,
        invoices2.status,
        customers2.name,
        customers2.email
      FROM invoices2
      JOIN customers2 ON invoices2.customer_id = customers2.id
      WHERE
        customers2.user_email = ${userEmail} AND
        (customers2.name ILIKE ${`%${query}%`} OR
        customers2.email ILIKE ${`%${query}%`} OR
        invoices2.amount::text ILIKE ${`%${query}%`} OR
        invoices2.date::text ILIKE ${`%${query}%`} OR
        invoices2.status ILIKE ${`%${query}%`})
      ORDER BY invoices2.date DESC
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
    FROM invoices2
    JOIN customers2 ON invoices2.customer_id = customers2.id
    WHERE
      customers2.user_email = ${userEmail} AND 
      (customers2.name ILIKE ${`%${query}%`} OR
      customers2.email ILIKE ${`%${query}%`} OR
      invoices2.amount::text ILIKE ${`%${query}%`} OR
      invoices2.date::text ILIKE ${`%${query}%`} OR
      invoices2.status ILIKE ${`%${query}%`})
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
        invoices2.id,
        invoices2.customer_id,
        invoices2.amount,
        invoices2.status
      FROM 
        invoices2 
      JOIN 
        customers2 ON invoices2.customer_id = customers2.id
      WHERE 
        customers2.user_email = ${userEmail} 
      AND
        invoices2.id = ${id};  
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
      FROM customers2
      where customers2.user_email = ${userEmail}
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
		  customers2.id,
		  customers2.name,
		  customers2.email,
		  COUNT(invoices2.id) AS total_invoices,
		  SUM(CASE WHEN invoices2.status = 'pending' THEN invoices2.amount ELSE 0 END) AS total_pending,
		  SUM(CASE WHEN invoices2.status = 'paid' THEN invoices2.amount ELSE 0 END) AS total_paid
		FROM customers2
		LEFT JOIN invoices2 ON customers2.id = invoices2.customer_id
		WHERE
      customers2.user_email = ${userEmail} AND
		  (customers2.name ILIKE ${`%${query}%`} OR
      customers2.email ILIKE ${`%${query}%`})
		GROUP BY customers2.id, customers2.name, customers2.email, customers2
		ORDER BY customers2.name ASC
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
    FROM customers2
    WHERE
      customers2.user_email = ${userEmail} AND
      (customers2.name ILIKE ${`%${query}%`} OR
      customers2.email ILIKE ${`%${query}%`})
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
      FROM customers2
      WHERE
        customers2.user_email = ${userEmail} 
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
    const user = await sql`SELECT * FROM users2 WHERE email = ${userEmail}`;
    return user.rows[0] as User;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}
