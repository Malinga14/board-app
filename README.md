# Board App - Kanban Dashboard

A professional kanban board application built with **Next.js 15**, **TypeScript**, **Tailwind CSS**, and **Zustand** for state management. This project demonstrates modern React development practices, clean architecture, and professional UI/UX design.

## 🚀 Features

### Core Functionality
- **Kanban Board**: Visual task management with swimlanes (To Do, In Progress, Approved, Rejected)
- **Drag & Drop**: Seamless task movement between columns using `react-beautiful-dnd`
- **Real-time Search**: Dynamic task filtering with debounced search
- **State Management**: Robust state handling with Zustand and localStorage persistence
- **Responsive Design**: Mobile-first approach with responsive layouts

### Technical Features
- **TypeScript**: Full type safety with comprehensive interfaces
- **Clean Architecture**: Separation of concerns with organized folder structure
- **Professional UI**: Pixel-perfect design matching the provided mockups
- **Error Handling**: Comprehensive error boundaries and loading states
- **Performance**: Optimized with React best practices and efficient re-renders

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Drag & Drop**: react-beautiful-dnd
- **Icons**: Lucide React
- **Package Manager**: npm

## 📦 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd board-app
```

2. Install dependencies:
```bash
npm install --legacy-peer-deps
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🏗️ Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── board/            # Board-specific components
│   │   ├── Board.tsx     # Main kanban board
│   │   ├── Column.tsx    # Swimlane columns
│   │   └── TaskCard.tsx  # Individual task cards
│   ├── layout/           # Layout components
│   │   ├── Header.tsx    # Navigation header
│   │   ├── Layout.tsx    # Main layout wrapper
│   │   └── Sidebar.tsx   # Navigation sidebar
│   └── ui/               # Reusable UI components
│       ├── SearchBar.tsx # Search functionality
│       └── UserAvatar.tsx # User avatar display
├── data/                 # Mock data
│   └── tasks.json        # Sample tasks and users
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions
│   └── utils.ts          # Helper functions
├── store/                # State management
│   └── taskStore.ts      # Zustand store
└── types/                # TypeScript definitions
    └── index.ts          # Type definitions
```

## 🎨 Design Implementation

### UI Components
- **Header**: Blue header with logo, search bar, and user profile
- **Sidebar**: Navigation with project information and menu items
- **Task Cards**: Detailed cards with assignees, due dates, and status indicators
- **Swimlanes**: Color-coded columns for different task statuses

### Responsive Design
- Mobile-first approach
- Responsive breakpoints at 768px and above
- Collapsible sidebar for mobile devices
- Optimized touch interactions

## 📊 State Management

### Zustand Store Features
- **Task Management**: CRUD operations for tasks
- **Search & Filtering**: Real-time task filtering
- **Drag & Drop**: Task movement between columns
- **Persistence**: localStorage integration for data persistence
- **Loading States**: Proper loading and error handling

### Store Structure
```typescript
interface TaskStore {
  tasks: Task[];
  columns: Column[];
  users: User[];
  searchFilters: SearchFilters;
  isLoading: boolean;
  error: string | null;
  // ... actions
}
```

## 🔧 Key Features Explained

### 1. Drag & Drop Functionality
- Uses `react-beautiful-dnd` for smooth drag interactions
- Visual feedback during drag operations
- Proper state updates when tasks are moved
- Handles edge cases and error states

### 2. Search Implementation
- Debounced search for performance
- Searches across task titles, descriptions, and tags
- Real-time filtering without page reloads
- Proper state management for search queries

### 3. Data Persistence
- localStorage integration for data persistence
- Automatic save/load functionality
- Error handling for storage operations
- SSR-safe implementation

### 4. TypeScript Integration
- Comprehensive type definitions
- Proper interface design
- Type-safe state management
- IntelliSense support throughout

## 🎯 Code Quality

### Best Practices Implemented
- **Clean Code**: Readable, maintainable code structure
- **Error Handling**: Comprehensive error boundaries
- **Performance**: Optimized re-renders and efficient state updates
- **Accessibility**: Proper ARIA labels and keyboard navigation
- **Documentation**: Extensive code comments and documentation

### Code Organization
- Separation of concerns
- Reusable components
- Consistent naming conventions
- Professional file structure

## 🧪 Testing Considerations

While tests aren't included in this implementation, the code is structured to be easily testable:
- Pure functions for utilities
- Isolated components
- Proper separation of concerns
- Mock data for testing

## 📱 Browser Compatibility

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Responsive design for all screen sizes

## 🚀 Deployment

Build the application for production:
```bash
npm run build
npm start
```

The application is ready for deployment to platforms like:
- Vercel (recommended for Next.js)
- Netlify
- AWS
- Docker containers

## 🔮 Future Enhancements

Potential improvements and features:
- Real-time collaboration
- Task assignments and notifications
- Advanced filtering and sorting
- Calendar integration
- File attachments
- Comments and mentions
- Dark mode support
- PWA capabilities

## 👨‍💻 Developer Notes

This project was built as a technical assessment to demonstrate:
- Modern React development skills
- Clean architecture principles
- Professional UI/UX implementation
- TypeScript proficiency
- State management expertise

The codebase is production-ready and follows industry best practices for maintainability and scalability.

## 📄 License

This project is for demonstration purposes as part of a technical assessment.
