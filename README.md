# Board App - Kanban Dashboard

A professional kanban board application built with **Next.js 15**, **TypeScript**, **Tailwind CSS**, and **Zustand** for state management. This project demonstrates modern React development practices, clean architecture, and professional UI/UX design.

## 🚀 Features

### Core Functionality
- **Kanban Board**: Visual task management with 4 columns (To Do, In Progress, Approved, Rejected)
- **Task Management**: Full CRUD operations - Create, Read, Update, Delete tasks
- **Real-time Search**: Dynamic task filtering as you type across task titles and types
- **State Management**: Zustand store with localStorage persistence for data retention
- **Responsive Design**: Industry-standard mobile-first design with separate mobile/desktop layouts
- **Board Management**: Create and manage multiple project boards

### Technical Features
- **TypeScript**: Full type safety with comprehensive interfaces
- **Clean Architecture**: Organized component structure with separation of concerns
- **Professional UI**: Clean, modern design with responsive navigation
- **Mobile Optimization**: Separate mobile navbar with hamburger menu and overlay sidebar
- **Performance**: Efficient state management and optimized re-renders

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
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
npm install
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
│   ├── main_content_area/ # Main content wrapper
│   │   └── MainContentArea.tsx
│   ├── navbar/           # Navigation components
│   │   ├── Navbar.tsx    # Responsive navbar
│   │   ├── Logo.tsx      # Application logo
│   │   ├── SearchBar.tsx # Search functionality
│   │   ├── UserProfile.tsx # User profile display
│   │   └── CreateBoardButton.tsx # Board creation
│   ├── sidebar/          # Navigation sidebar
│   │   └── Sidebar.tsx   # Project navigation
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
- **Navbar**: Responsive navigation with separate mobile/desktop designs
- **Mobile Navbar**: Two-row layout with hamburger menu and full-width search
- **Desktop Navbar**: Single-row layout with integrated search and user profile
- **Sidebar**: Collapsible navigation with project information and menu items
- **Task Cards**: Detailed cards with assignees, due dates, and priority indicators
- **Columns**: Color-coded swimlanes for different task statuses

### Responsive Design
- **Mobile-First**: Optimized for screens below 768px
- **Breakpoint Strategy**: Uses md: breakpoint (768px) for desktop layouts
- **Adaptive Components**: Different layouts for mobile and desktop views
- **Touch-Friendly**: Optimized interactions for mobile devices
- **Overlay System**: Mobile sidebar with proper z-index management

## 📊 State Management

### Zustand Store Features
- **Task Management**: Complete CRUD operations for tasks
- **Board Management**: Create and switch between multiple boards
- **Search & Filtering**: Real-time task filtering by title and type
- **User Management**: Handle user assignments and profiles
- **Persistence**: localStorage integration for data retention across sessions
- **State Synchronization**: Automatic save/load functionality

### Store Structure
```typescript
interface TaskStore {
  tasks: Task[];
  boards: Board[];
  currentBoard: string;
  users: User[];
  searchQuery: string;
  isLoading: boolean;
  error: string | null;
  // Actions
  addTask: (task: Omit<Task, 'id'>) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  setSearchQuery: (query: string) => void;
  createBoard: (board: Omit<Board, 'id'>) => void;
  setCurrentBoard: (boardId: string) => void;
}
```

## 🔧 Key Features Explained

### 1. Responsive Navigation System
- **Mobile Design**: Dedicated mobile navbar with hamburger menu
- **Desktop Design**: Full-featured navbar with integrated search
- **Smooth Transitions**: Proper sidebar overlay with z-index management
- **Touch Optimization**: Mobile-friendly interaction patterns

### 2. Search Implementation
- **Real-time Filtering**: Instant task filtering as you type
- **Multi-field Search**: Searches across task titles and types
- **State Integration**: Connected to Zustand store for global access
- **Performance**: Efficient filtering without unnecessary re-renders

### 3. Task Management System
- **CRUD Operations**: Complete Create, Read, Update, Delete functionality
- **Board Organization**: Multiple boards with easy switching
- **User Assignment**: Assign tasks to team members
- **Status Tracking**: Visual status indicators and column organization

### 4. Data Persistence
- **localStorage Integration**: Automatic data saving and loading
- **Session Persistence**: Data retained across browser sessions
- **Error Handling**: Graceful handling of storage operations
- **SSR-Safe**: Compatible with Next.js server-side rendering

## 🎯 Code Quality

### Best Practices Implemented
- **Clean Code**: Readable, maintainable component structure
- **Responsive Design**: Industry-standard mobile-first approach
- **Performance**: Optimized re-renders and efficient state updates
- **TypeScript**: Comprehensive type safety throughout the application
- **Component Organization**: Logical separation of concerns and reusability

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
- **Drag & Drop**: Task movement between columns with react-beautiful-dnd
- **Real-time Collaboration**: Multi-user editing and updates
- **Advanced Filtering**: Filter by assignee, due date, priority
- **Task Dependencies**: Link related tasks and prerequisites
- **File Attachments**: Add documents and images to tasks
- **Comments System**: Task discussions and mentions
- **Calendar Integration**: Due date management and scheduling
- **Dark Mode**: Theme customization options
- **PWA Support**: Offline functionality and app installation
- **Email Notifications**: Task assignments and deadline reminders

## 👨‍💻 Developer Notes

This project demonstrates modern React development with a focus on:
- **Clean Architecture**: Well-organized component structure and separation of concerns
- **Responsive Design**: Industry-standard mobile-first approach with simple, effective solutions
- **State Management**: Modern Zustand implementation replacing traditional Context API
- **TypeScript Proficiency**: Comprehensive type safety and developer experience
- **Performance**: Efficient rendering and state updates

### Key Achievements
- ✅ **Fully Responsive**: Separate mobile/desktop designs with proper breakpoints
- ✅ **Search Functionality**: Real-time filtering integrated with global state
- ✅ **Task Management**: Complete CRUD operations with data persistence
- ✅ **Modern Architecture**: Clean, maintainable codebase following best practices
- ✅ **Production Ready**: Optimized build with proper error handling

The codebase prioritizes simplicity and maintainability while delivering professional-grade functionality suitable for production deployment.

## 📄 License

This project is for demonstration purposes as part of a technical assessment.
