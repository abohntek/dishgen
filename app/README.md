# Next.js Application

A modern Next.js application built with TypeScript, Prisma, and a comprehensive UI component library.

## 🚀 Features

- **Next.js 14** with App Router
- **TypeScript** for type safety
- **Prisma** for database management (PostgreSQL)
- **NextAuth.js** for authentication
- **Tailwind CSS** for styling
- **Radix UI** components for accessible UI
- **Vitest** for testing
- **React Query** for data fetching
- **Zustand** for state management

## 📋 Prerequisites

Before running this project, make sure you have the following installed:

- **Node.js** (version 18 or higher)
- **npm** or **yarn** package manager
- **PostgreSQL** database

## 🛠️ Installation

1. **Clone the repository** (if not already done):
   ```bash
   git clone <repository-url>
   cd <project-directory>
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   - Copy the `.env` file or create one with the required variables
   - Make sure to configure the following environment variables:
     ```env
     DATABASE_URL="postgresql://username:password@localhost:5432/database_name"
     NEXTAUTH_URL="http://localhost:3000"
     NEXTAUTH_SECRET="your-secret-key"
     ```

4. **Set up the database**:
   ```bash
   # Generate Prisma client
   npx prisma generate
   
   # Run database migrations
   npx prisma db push
   
   # (Optional) Seed the database if seed script exists
   npm run db:seed
   ```

## 🏃‍♂️ Running the Application

### Development Mode

Start the development server:

```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

### Production Mode

1. **Build the application**:
   ```bash
   npm run build
   ```

2. **Start the production server**:
   ```bash
   npm run start
   ```

## 🧪 Testing

This project uses **Vitest** for testing with separate configurations for Node.js and DOM environments.

### Run All Tests

```bash
npm run test
```

### Run Tests with UI

```bash
npm run test:ui
```

This will open the Vitest UI in your browser for an interactive testing experience.

### Test Structure

- **Node.js tests**: Located in `__tests__/**/*.test.ts`
- **DOM tests**: Located in `__tests__/**/*.dom.test.ts`
- **Setup files**: `__tests__/setup.dom.ts` for DOM test configuration

### Available Test Files

- `__tests__/utils.test.ts` - Utility function tests
- `__tests__/storage.dom.test.ts` - DOM storage tests

## 🔧 Development Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run test` | Run all tests |
| `npm run test:ui` | Run tests with UI |

## 📁 Project Structure

```
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # Reusable UI components
├── contexts/              # React contexts
├── hooks/                 # Custom React hooks
├── lib/                   # Utility libraries
├── prisma/                # Database schema and migrations
│   └── schema.prisma      # Prisma schema
├── __tests__/             # Test files
├── package.json           # Dependencies and scripts
├── next.config.js         # Next.js configuration
├── tailwind.config.ts     # Tailwind CSS configuration
├── tsconfig.json          # TypeScript configuration
└── vitest.config.ts       # Vitest configuration
```

## 🗄️ Database

This project uses **PostgreSQL** with **Prisma** as the ORM.

### Database Commands

```bash
# Generate Prisma client
npx prisma generate

# Push schema changes to database
npx prisma db push

# Open Prisma Studio (database GUI)
npx prisma studio

# Reset database
npx prisma db reset
```

## 🎨 Styling

The project uses:
- **Tailwind CSS** for utility-first styling
- **Radix UI** for accessible component primitives
- **Framer Motion** for animations
- **Lucide React** for icons

## 🔐 Authentication

Authentication is handled by **NextAuth.js** with Prisma adapter for database sessions.

## 📊 State Management

- **Zustand** for global state management
- **React Query** for server state management
- **Jotai** for atomic state management

## 🚨 Troubleshooting

### Common Issues

1. **Database connection errors**:
   - Ensure PostgreSQL is running
   - Check your `DATABASE_URL` in the `.env` file
   - Run `npx prisma db push` to sync the schema

2. **Build errors**:
   - Clear the `.next` directory: `rm -rf .next`
   - Reinstall dependencies: `rm -rf node_modules && npm install`

3. **TypeScript errors**:
   - Regenerate Prisma client: `npx prisma generate`
   - Check your `tsconfig.json` configuration

### Getting Help

If you encounter any issues:
1. Check the console for error messages
2. Ensure all environment variables are properly set
3. Verify that the database is running and accessible
4. Check that all dependencies are installed correctly

## 📝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests to ensure everything works
5. Submit a pull request

## 📄 License

[Add your license information here]