# Blog Task Project

#### Demo site is here: [Demo](https://elevate-post-blog.web.app/)

## What is the project about

This is a modern React blog application built with Redux Toolkit Query (RTK Query) for data fetching and management. The project features:

- **Posts Management**: View, create, and browse blog posts with pagination
- **Author Filtering**: Filter posts by different authors
- **Search Functionality**: Search through posts by keywords
- **Post Details**: Detailed views for individual posts with author information
- **Responsive UI**: Built with Tailwind CSS and shadcn/ui components
- **Form Handling**: Complete form management with React Hook Form and Zod validation

## How to install dependencies

```bash
# Clone the repository
git clone <repository-url>
cd Blog-Task

# Install all dependencies
npm install
```

## How to run the project locally

```bash
# Start the development server
npm start
# or
npm run dev

# The application will be available at http://localhost:3240
```

### Additional Scripts

```bash
# Build for production
npm run build

# Preview production build locally
npm run preview

# Run tests
npm test
```

## Technology Stack

- **React 18** with TypeScript
- **Vite** for fast development and building
- **Redux Toolkit Query** for efficient data fetching
- **React Router** for navigation
- **React Hook Form** with **Zod** for form validation
- **Tailwind CSS** for styling
- **shadcn/ui** for consistent UI components
- **Lucide React** for icons
- **Dayjs** for date formatting
- **Firebase** for hosting

## Project Architecture

This project follows **Clean Architecture** principles, organizing code into distinct layers for better maintainability, testability, and separation of concerns.

### Folder Structure

```
src/
├── app/                     # Redux configuration
│   ├── api.ts               # RTK Query API setup
│   ├── store.ts             # Redux store configuration
│   └── hooks.ts             # Global Redux hooks
├── components/              # Shared UI components
│   ├── ui/                  # shadcn/ui components
│   ├── DataDisplay/
│   ├── DataEntry/
│   └── Layout/
├── core/                    # Core application logic
│   ├── AppLayout/
│   ├── AppRoutes/
│   └── AppRoutesProvider/
├── features/                # Feature modules (Clean Architecture)
│   └── posts/               # Posts feature module
|       ├── domain/          # Domain layer (Business entities & types)
│       │   └── types/       # Business entities & type
│       ├── data/            # Data layer
│       │   ├── local/       # Local data sources (Redux Store + Local Storage)
│       │   └── remote/      # Remote API calls (RTK Query)
│       └── presentation/    # Presentation layer
│           ├── components/  # Feature-specific components
│           └── pages/       # Page components
```

### Clean Architecture Layers

Each feature module (like `posts`) is organized into three main layers:

#### 1. **Domain Layer** (`domain/`)

- Contains business logic and entities
- Defines core types and interfaces
- Independent of external frameworks
- Examples: `Post.ts`, `Author.ts`

#### 2. **Data Layer** (`data/`)

- Handles data sources and external API calls
- Implements data access patterns
- Contains API interfaces and implementations
- Examples: `PostsApis.ts`, `PostApis.interfaces.ts`

#### 3. **Presentation Layer** (`presentation/`)

- Contains UI components and pages
- Handles user interactions and state management
- Depends on domain and data layers
- Examples: `PostsList.tsx`, `AddPost.tsx`, `PostDetails.tsx`

### Benefits of This Architecture

- **Separation of Concerns**: Each layer has a specific responsibility
- **Testability**: Easy to unit test each layer independently
- **Maintainability**: Changes in one layer don't affect others
- **Scalability**: Easy to add new features following the same pattern
- **Reusability**: Domain logic can be reused across different presentations

## Key Features Implemented

- ✅ Dynamic pagination with smart page number display
- ✅ Real-time search and filtering
- ✅ Author selection dropdown
- ✅ Responsive design with modern UI
- ✅ Type-safe form handling

## Additional Notes or Improvements

### Future Improvements

- Improve loading experience
- Add user authentication system
- Implement comment system for posts
- Add rich text editor for post creation
- Add image upload functionality
