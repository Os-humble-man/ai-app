# 🚀 RAGify - Enterprise Documentation RAG Chatbot

<div align="center">

**An intelligent RAG-powered chatbot that enables natural language querying of enterprise documentation with precise, source-cited responses.**

[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19-61dafb.svg)](https://reactjs.org/)
[![Express](https://img.shields.io/badge/Express-5.0-green.svg)](https://expressjs.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16+-blue.svg)](https://www.postgresql.org/)
[![License](https://img.shields.io/badge/License-Portfolio-orange.svg)](LICENSE)

[Features](#-features) • [Architecture](#-architecture) • [Installation](#-installation) • [Usage](#-usage) • [Tech Stack](#-tech-stack)

</div>

---

## 📖 Overview

**RAGify** is a production-ready Retrieval-Augmented Generation (RAG) chatbot designed for enterprise environments. It allows employees to query internal documentation (Google Docs, Confluence, PDFs, etc.) using natural language and receive accurate answers with source citations.

### 🎯 Real-World Use Case

> *A new employee wonders how to request time off. Instead of searching through dozens of Confluence pages, they simply ask the chatbot: "How do I request vacation time?" The chatbot responds precisely, citing the official procedure and providing a link to the appropriate form.*

This project demonstrates advanced full-stack development skills, AI integration, and enterprise-grade architecture - perfect for showcasing technical capabilities to recruiters and potential employers.

---

## ✨ Features

### 🤖 RAG-Powered Intelligence
- **Semantic Search**: Vector-based document retrieval using OpenAI embeddings
- **Context-Aware Responses**: LLM-generated answers grounded in company documentation
- **Source Citations**: Every response includes references to source documents
- **Multi-Document Support**: Handles PDFs, text files, and structured documents

### 👥 User Management
- **Multi-Auth Support**: OAuth (Google, GitHub) and traditional email/password authentication
- **Email Verification**: Secure account activation with verification tokens
- **User Settings**: Customizable preferences (theme, language, default model)
- **Session Management**: Secure JWT-based authentication with refresh tokens

### 💬 Conversation Management
- **Real-Time Streaming**: Progressive response rendering for better UX
- **Conversation History**: Persistent chat storage with full-text search
- **Folder Organization**: Hierarchical conversation categorization
- **Favorites & Sharing**: Mark important conversations and share with team members
- **Templates**: Pre-built prompts for common queries

### 📊 Analytics & Monitoring
- **Token Usage Tracking**: Monitor API consumption per user/conversation
- **Conversation Analytics**: Insights into user interactions and query patterns
- **Export Functionality**: Download conversations in multiple formats

### 🔒 Security & Performance
- **Rate Limiting**: Prevent API abuse with configurable limits
- **Helmet.js Security**: Protection against common web vulnerabilities
- **CORS Configuration**: Controlled cross-origin resource sharing
- **Compression**: Response compression for faster load times
- **Production-Ready**: Environment-based configuration and error handling

---

## 🏗 Architecture

### System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         CLIENT (React SPA)                       │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │ Auth Pages   │  │ Chat UI      │  │ Settings     │          │
│  │ (Login/      │  │ (Real-time   │  │ (User Prefs) │          │
│  │  Register)   │  │  Streaming)  │  │              │          │
│  └──────────────┘  └──────────────┘  └──────────────┘          │
│                    Zustand State + TanStack Query               │
└───────────────────────────────┬─────────────────────────────────┘
                                │ HTTPS/REST API
┌───────────────────────────────▼─────────────────────────────────┐
│                    API SERVER (Express.js)                       │
│  ┌────────────────────────────────────────────────────────┐     │
│  │              Middleware Layer                          │     │
│  │  • Authentication (Passport.js + JWT)                  │     │
│  │  • Rate Limiting • CORS • Helmet Security              │     │
│  └────────────────────────────────────────────────────────┘     │
│  ┌────────────────────────────────────────────────────────┐     │
│  │              Controllers (Route Handlers)               │     │
│  │  Auth │ Chat │ Documents │ Users │ Folders │ Analytics │     │
│  └────────────────────────────────────────────────────────┘     │
│  ┌────────────────────────────────────────────────────────┐     │
│  │              Services (Business Logic)                  │     │
│  │  • RAG Service (Context Retrieval)                     │     │
│  │  • Document Service (Processing & Indexing)            │     │
│  │  • Chat Service (LLM Integration)                      │     │
│  └────────────────────────────────────────────────────────┘     │
│  ┌────────────────────────────────────────────────────────┐     │
│  │              Repositories (Data Access)                 │     │
│  │  • Prisma ORM for type-safe database queries          │     │
│  └────────────────────────────────────────────────────────┘     │
└───────────────────────┬───────────────────┬────────────────────┘
                        │                   │
          ┌─────────────▼─────────┐  ┌─────▼──────────┐
          │  PostgreSQL + pgvector│  │  OpenAI API    │
          │  • User Data          │  │  • Embeddings  │
          │  • Conversations      │  │  • Chat        │
          │  • Vector Embeddings  │  │    Completion  │
          └───────────────────────┘  └────────────────┘
```

### RAG Pipeline

```
User Query → Embedding Generation → Vector Search → Context Retrieval → 
LLM Prompt Construction → OpenAI API Call → Streaming Response → 
Citation Tracking → Client Display
```

### Key Design Patterns

- **Dependency Injection**: InversifyJS for loose coupling and testability
- **Repository Pattern**: Clean separation of data access logic
- **Service Layer**: Business logic isolated from HTTP concerns
- **Monorepo Structure**: Shared types and utilities between client/server

---

## 🛠 Tech Stack

### Frontend
- **React 19** - Latest React with concurrent features
- **TypeScript** - Type-safe development
- **Vite** - Lightning-fast build tool
- **TailwindCSS 4** - Utility-first styling
- **Radix UI** - Accessible component primitives
- **TanStack Query** - Powerful async state management
- **Zustand** - Lightweight state management
- **React Router 7** - Client-side routing
- **Axios** - HTTP client
- **React Markdown** - Markdown rendering with citations

### Backend
- **Express.js 5** - Fast, unopinionated web framework
- **TypeScript** - Full-stack type safety
- **Prisma** - Next-generation ORM with migrations
- **PostgreSQL** - Robust relational database
- **pgvector** - Vector similarity search extension
- **Passport.js** - Authentication middleware (Google, GitHub OAuth)
- **JWT** - Secure token-based authentication
- **bcrypt** - Password hashing
- **OpenAI SDK** - LLM and embedding API integration
- **Winston** - Production-grade logging
- **Helmet** - Security headers
- **CORS** - Cross-origin configuration
- **Express Rate Limit** - API protection

### AI & ML
- **OpenAI GPT-4o-mini** - Language model for responses
- **text-embedding-3-small** - Efficient vector embeddings
- **tiktoken** - Token counting and management
- **pdfjs-dist** - PDF document parsing

### DevOps & Tools
- **Bun** - Ultra-fast JavaScript runtime (10x faster than Node.js)
- **Concurrently** - Run multiple processes simultaneously
- **Husky** - Git hooks for code quality
- **lint-staged** - Pre-commit linting
- **Prettier** - Code formatting
- **ESLint** - Code quality linting
- **Swagger** - API documentation
- **nodemailer** - Email service integration

---

## 📦 Installation

### Prerequisites

- **Bun** >= 1.3.0 (or Node.js >= 18)
- **PostgreSQL** >= 16 with **pgvector** extension
- **OpenAI API Key** (for embeddings and chat completions)
- **Optional**: Google OAuth & GitHub OAuth credentials

### Step 1: Install Bun (if needed)

```bash
curl -fsSL https://bun.sh/install | bash
```

### Step 2: Clone & Install Dependencies

```bash
git clone https://github.com/Os-humble-man/ai-app.git
cd ai-app
bun install
```

### Step 3: Database Setup

```bash
# Install PostgreSQL with pgvector
# Ubuntu/Debian:
sudo apt install postgresql postgresql-contrib
sudo apt install postgresql-16-pgvector

# macOS (Homebrew):
brew install postgresql@16
brew install pgvector

# Create database
createdb ragify_db

# Enable pgvector extension
psql ragify_db -c "CREATE EXTENSION IF NOT EXISTS vector;"
```

### Step 4: Environment Configuration

Create `.env` file in `packages/server/`:

```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/ragify_db

# JWT Authentication
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production-min-32-chars

# OpenAI
OPENAI_API_KEY=sk-your-openai-api-key-here

# Server
PORT=3000
NODE_ENV=development

# Client URL (CORS)
CLIENT_URL=http://localhost:5173
ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3000
FRONTEND_URL=http://localhost:5173

# OAuth (Optional - remove if not using)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret

# Email (Optional - for verification)
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USER=your-email@gmail.com
MAIL_PASSWORD=your-app-password
MAIL_FROM=noreply@ragify.com
```

Create `.env` file in `packages/client/`:

```env
VITE_API_URL=http://localhost:3000
```

### Step 5: Database Migration

```bash
cd packages/server
bun run prisma:generate
bun run prisma:dev
```

### Step 6: (Optional) Prepare Sample Documents

```bash
# Add your documents to packages/server/documents/
# Then run the document preparation script
cd packages/server
bun run prepare-docs
```

---

## 🚀 Usage

### Development Mode

```bash
# From project root - starts both client and server
bun run dev
```

This launches:
- 🖥️ **Frontend**: http://localhost:5173
- 🔧 **Backend API**: http://localhost:3000
- 📚 **API Documentation**: http://localhost:3000/api-docs

### Production Build

```bash
# Build client
cd packages/client
bun run build

# Build output will be in packages/client/dist/
# Serve with your preferred static file server

# Run production server
cd packages/server
bun run start
```

### Available Scripts

#### Root Scripts
```bash
bun run dev          # Start full development environment
bun run format       # Format all code with Prettier
```

#### Client Scripts (`packages/client`)
```bash
bun run dev          # Start Vite dev server (port 5173)
bun run build        # Production build
bun run preview      # Preview production build
bun run lint         # Run ESLint
```

#### Server Scripts (`packages/server`)
```bash
bun run dev              # Start with hot-reload
bun run start            # Production start
bun run prisma:dev       # Run database migrations
bun run prisma:studio    # Open Prisma Studio (DB GUI)
bun run prisma:generate  # Generate Prisma Client
bun run prepare-docs     # Process and index documents
bun run test-rag         # Test RAG retrieval
```

### First-Time Setup Flow

1. **Start the application**: `bun run dev`
2. **Register an account**: Navigate to http://localhost:5173/register
3. **Verify email** (if email service configured)
4. **Login**: http://localhost:5173/login
5. **Upload documents**: Add PDFs/text files to `packages/server/documents/`
6. **Index documents**: Run `bun run prepare-docs` in server directory
7. **Start chatting**: Ask questions about your documentation!

---

## 📂 Project Structure

```
ai-app/
├── packages/
│   ├── client/                      # React Frontend
│   │   ├── src/
│   │   │   ├── api/                # API client & endpoints
│   │   │   ├── components/         # React components
│   │   │   │   ├── ui/            # Radix UI components
│   │   │   │   ├── chat-box.tsx   # Main chat interface
│   │   │   │   ├── message-list.tsx
│   │   │   │   └── ...
│   │   │   ├── pages/             # Route pages
│   │   │   ├── hooks/             # Custom React hooks
│   │   │   ├── stores/            # Zustand stores
│   │   │   ├── types/             # TypeScript types
│   │   │   └── lib/               # Utilities
│   │   ├── public/                # Static assets
│   │   └── package.json
│   │
│   └── server/                     # Express Backend
│       ├── controllers/           # HTTP request handlers
│       ├── services/              # Business logic
│       │   ├── rag.service.ts    # RAG implementation
│       │   ├── document.service.ts
│       │   └── ...
│       ├── repositories/          # Data access layer
│       ├── middleware/            # Express middleware
│       ├── routes/               # API routes
│       ├── strategies/           # Passport auth strategies
│       ├── utils/                # Helper functions
│       ├── prisma/               # Database schema & migrations
│       │   └── schema.prisma
│       ├── scripts/              # Utility scripts
│       ├── docs/                 # Swagger documentation
│       ├── documents/            # Document storage (for RAG)
│       └── package.json
│
├── .husky/                        # Git hooks
├── index.ts                       # Concurrently launcher
├── package.json                   # Workspace configuration
├── tsconfig.json                  # TypeScript config
└── README.md
```

---

## 💡 Key Features Implementation

### RAG (Retrieval-Augmented Generation)

The RAG system is the core innovation of this project:

1. **Document Processing**: PDFs and text files are chunked into semantic segments
2. **Vectorization**: Each chunk is converted to embeddings using OpenAI's `text-embedding-3-small`
3. **Storage**: Embeddings stored in PostgreSQL with pgvector for efficient similarity search
4. **Retrieval**: User queries are embedded and matched against document vectors
5. **Augmentation**: Top-K relevant chunks are injected into LLM context
6. **Response**: GPT-4o-mini generates grounded answers with source citations

### Authentication Flow

- **OAuth**: Seamless Google/GitHub login with Passport.js
- **Credentials**: Email/password with bcrypt hashing
- **JWT Tokens**: Stateless authentication with refresh capability
- **Email Verification**: Secure account activation

### Real-Time Streaming

- **Server-Sent Events**: Progressive response rendering
- **Chunked Transfer**: Tokens streamed as generated by OpenAI
- **Optimized UX**: Users see responses as they're generated

---

## 💼 Skills Demonstrated

This project showcases production-ready development skills across multiple domains:

### 🎨 Frontend Development
- ✅ Modern React 19 with hooks, context, and custom hooks
- ✅ Advanced TypeScript with generics and utility types
- ✅ State management (Zustand + TanStack Query)
- ✅ Responsive UI/UX with TailwindCSS and Radix UI
- ✅ Real-time streaming with progressive rendering
- ✅ Optimistic updates and error boundary handling

### 🔧 Backend Development
- ✅ RESTful API design with Express.js
- ✅ Layered architecture (Controllers → Services → Repositories)
- ✅ Dependency injection with InversifyJS
- ✅ Multi-strategy authentication (OAuth + JWT + Credentials)
- ✅ Database design with Prisma ORM
- ✅ Vector database integration (pgvector)
- ✅ Production-grade security (Helmet, CORS, Rate Limiting)
- ✅ Structured logging with Winston

### 🤖 AI/ML Integration
- ✅ OpenAI API integration (Chat Completions + Embeddings)
- ✅ Retrieval-Augmented Generation (RAG) implementation
- ✅ Vector similarity search
- ✅ Token management and optimization
- ✅ Streaming response handling

### 🗄️ Database & DevOps
- ✅ PostgreSQL with vector extension
- ✅ Schema design and migrations
- ✅ Monorepo architecture with workspaces
- ✅ Git hooks for code quality (Husky)
- ✅ Environment-based configuration
- ✅ API documentation with Swagger

### 📐 Software Engineering
- ✅ Clean code principles (SOLID, DRY, KISS)
- ✅ Separation of concerns
- ✅ Type-safe development (full-stack TypeScript)
- ✅ Error handling and validation
- ✅ Scalable and maintainable architecture
- ✅ Production-ready patterns

---

## 🚧 Development Roadmap

### ✅ Completed Features
- [x] User authentication (OAuth + Credentials)
- [x] RAG-powered Q&A system
- [x] Document vectorization and indexing
- [x] Real-time response streaming
- [x] Conversation management
- [x] Folder organization
- [x] Source citation tracking
- [x] User settings and preferences
- [x] Analytics and token tracking

### 🔜 Upcoming Features
- [ ] **Multi-source Integration**
  - [ ] Google Drive connector
  - [ ] Confluence API integration
  - [ ] SharePoint support
- [ ] **Enhanced RAG**
  - [ ] Hybrid search (semantic + keyword)
  - [ ] Re-ranking for better relevance
  - [ ] Multi-hop reasoning
- [ ] **Collaboration**
  - [ ] Team workspaces
  - [ ] Shared conversation threads
  - [ ] Role-based access control (RBAC)
- [ ] **Advanced Features**
  - [ ] Conversation export (PDF, Markdown)
  - [ ] Multi-language support (i18n)
  - [ ] Voice input/output
  - [ ] Mobile app (React Native)
- [ ] **Infrastructure**
  - [ ] Unit and E2E tests (Vitest, Playwright)
  - [ ] CI/CD pipeline (GitHub Actions)
  - [ ] Docker containerization
  - [ ] Kubernetes deployment
- [ ] **AI Enhancements**
  - [ ] Model selection (GPT-4, Claude, Llama)
  - [ ] Fine-tuned embeddings
  - [ ] Custom LLM hosting option

---

## 🧪 Testing the RAG System

Test the RAG retrieval independently:

```bash
cd packages/server
bun run test-rag
```

This script allows you to query the vector database directly and see:
- Retrieved document chunks
- Similarity scores
- Source citations

---

## 📚 API Documentation

Interactive API documentation is available via Swagger UI:

**URL**: http://localhost:3000/api-docs

Key endpoints:
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/chat/message` - Send chat message (streaming)
- `GET /api/conversations` - List user conversations
- `POST /api/documents/process` - Process new documents
- `GET /api/users/me` - Get current user profile

---

## 🤝 Contributing

This is a portfolio project, but suggestions and improvements are welcome!

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is developed as a portfolio demonstration. Feel free to use it as inspiration for your own projects.

---

## 👤 About the Author

**Oscar Kanangila** - Full-Stack Developer specializing in AI-powered applications

This project demonstrates:
- **Frontend Expertise**: React, TypeScript, Modern UI/UX
- **Backend Proficiency**: Node.js, Express, Database Design
- **AI/ML Integration**: RAG, Vector Databases, LLM APIs
- **System Design**: Scalable architecture, Security, Performance
- **Modern DevOps**: Monorepo, Git Workflows, Production Practices

**Looking for opportunities** to contribute to innovative AI-powered products!

---

## 🙏 Acknowledgments

- OpenAI for GPT-4 and embedding models
- Vercel for the excellent shadcn/ui inspiration
- The open-source community for amazing tools

---

<div align="center">

**⭐ Star this repo if you find it useful! ⭐**

Made with ❤️ and lots of ☕

</div>
