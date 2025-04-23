### Portfolio with ChatBot
Open [https://donnwilliams-portfolio.vercel.app/] to see my live Portfolio.

### Prerequisites

- Node.js (v18 or later)
- npm or yarn
- A PostgreSQL database
- OpenAI API key

### Setup Instructions

1. Clone this repository
2. Copy `.env.example` to `.env.local` and fill in your database credentials and OpenAI API key
3. Install dependencies:
   ```bash
   npm install
   # or
   yarn
   ```
4. Run the database migrations:
   ```bash
   npx prisma migrate dev
   ```
5. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```
6. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result

## Project Structure

- `/app` - Next.js app router structure
- `/components` - React components
- `/lib` - Utility functions and database client
- `/prisma` - Prisma schema and migrations

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [OpenAI API Documentation](https://platform.openai.com/docs/api-reference)
- [Supabase Documentation](https://supabase.com/docs)
