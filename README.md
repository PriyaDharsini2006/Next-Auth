

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev

.env.example
DATABASE_URL="your_database_url_here"
SMTP_USER="your_smtp_user_here"
SMTP_PASSWORD="your_smtp_password_here"
GOOGLE_CLIENT_ID="your_google_client_id_here"
GOOGLE_CLIENT_SECRET="your_google_client_secret_here"
NEXTAUTH_SECRET="your_nextauth_secret_here"

```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.



## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
