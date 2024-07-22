import { auth } from "@/auth";
import { sql } from '@vercel/postgres';

type AccountUser = {
  name: string,
  email: string
}

const BASE_URL = process.env.BASE_URL;

export async function GET(req: any) {
  const session = await auth();

  if (session) {
    const { name, email } = session.user as AccountUser;
    const user = await sql`SELECT * FROM users where email = ${email}`;

    const date = new Date().toISOString().split('T')[0];
    if (!user.rowCount) {
      try {
        await sql`
          INSERT INTO users (name, email, isoauth, creation_date) 
          VALUES (${name}, ${email}, ${true}, ${date})
        `
      } catch(error) {
        console.log(error);
      }
    }

    return Response.redirect(`${BASE_URL}/dashboard`);
  }

  return Response.redirect(`${BASE_URL}/login`);
}