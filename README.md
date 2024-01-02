# Dashboard App
This project is based on the Next Learn Course, the official Next.js 14 tutorial and created by Vercel.
[Click here to visit the tutorial](https://nextjs.org/learn)

> You can access the current live version of the live project and see what I'm capable of on:
> 
> https://josiasbudaydeveloper-next-14-dashboard-app.vercel.app/dashboard

## How does the course work?

By building a full web application. Step by step.

![Course explainer](https://nextjs.org/_next/image?url=%2Flearn%2Fcourse-explainer.png&w=1920&q=75&dpl=dpl_DiW2ecigo2JKHD1ioFP2oTFMkZS8)

- I'll set up your local environment and initializing the "ACME" Next.js project template.

- I'll use pre-styled components as part of each chapter that leverage Next.js conventions and patterns.

- I'll hook up real application logic and data to bring a fully-fledged demo website to life.

- At the end I'll have a website that’s ready to ship and the knowledge to build and deploy my own.

## What do I did until now?

Here’s everything I did in the version 1.0

This project is a Dashboard App that is a single page application (SPA) with client-side navigation and three main pages:
- Dashboard - A summary of all invoices.
- Invoices - A list of all invoices and the possibility of searching, creating, editing or deleting any invoice. It also has pagination at the bottom of the page.
- Customers - A list of all customers with a search bar for searching for specific customers. There's no pagination here in this version, so all customers are displayed at the same time.
- Dark Theme - Based on Tailwind.css and that only works based on the browser theme.

This is the primary version of this project, which only accepts one single user and only has the credentials provider for authentication.

## What do I intend to implement?

Here’s everything I did in the version 2.0:
- Multiuser system
- OAuth Authentication
- Pagination for the customers, as they're going to be flexible at this version
- Dark Theme feature based on the user's choice and stored on the Database:
  - On
  - Off
  - System Default
- API for making its Back-End possible to fit the information of a possible mobile app in the future versions.
