# 🚀 RAGify: AI-Powered Documentation Chatbot

## RAG for Enterprise Knowledge

<div align="center">

**A smart chatbot that enables employees to query company documentation (Google Docs, Confluence, PDFs) in natural language and receive precise answers with cited sources.**

[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19-61dafb.svg)](https://reactjs.org/)
[![Express](https://img.shields.io/badge/Express-5.0-green.svg)](https://expressjs.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16+-blue.svg)](https://www.postgresql.org/)
[![License](https://img.shields.io/badge/License-Portfolio-orange.svg)](LICENSE)

[Overview](#-overview) • [Features](#-key-features) • [Installation](#-installation) • [Usage](#-usage) • [Skills](#-showcase--skills-demonstrated)

</div>

---

## 📖 Overview

**RAGify** is an AI-powered documentation chatbot that enables employees to query company documentation (Google Docs, Confluence, PDFs) in natural language and receive precise answers with cited sources. This project demonstrates advanced retrieval-augmented generation (RAG) systems in a full-stack TypeScript application, focusing on enterprise documentation access.

It connects internal knowledge bases to an intuitive chat interface built with React, enabling contextual, source-linked answers for real business scenarios—such as onboarding or HR queries.

### 🎯 Real-World Use Case

> **Example**: A new employee asks, *"How do I request leave?"* The chatbot immediately provides the official procedure and a direct link to the leave request form—without browsing dozens of Confluence pages.

This project showcases advanced full-stack development skills, AI/RAG integration, and enterprise-grade architecture - perfect for demonstrating technical capabilities to recruiters and potential employers.

---

## ✨ Key Features

- **Natural language question answering** over internal documents (Google Docs, Confluence, PDFs)
- **Precise, cited responses** with deep-linking to source procedures and forms
- **Real-time AI response streaming** in chat UI with progressive rendering
- **Conversation history**, session management, and document-based context retrieval
- **RAG system** for embedding-based semantic search and prompt enrichment
- **Clean, responsive UI** (TailwindCSS, Radix UI) with modern design
- **Multi-auth support**: Email/password, OAuth (Google, GitHub)
- **Folder organization** for conversation categorization and management
- **Modular, maintainable architecture** (React, Express, TypeScript, Vite, Bun)

---

## 🚀 Current Functionality

- ✅ **Real-time chat** over GPT-4o-mini (OpenAI) with session context
- ✅ **Sidebar navigation** with conversation search, recents, favorites, and folders
- ✅ **RAG endpoints and logic** for enriched answer generation (document/embedding search, prompt construction)
- ✅ **Authentication system**: Email/password, OAuth (Google, GitHub)
- ✅ **User settings**: Theme preferences, default model selection, language options
- ✅ **Conversation export**: Download chats in multiple formats (planned: txt, markdown, PDF, JSON)
- ✅ **Modular database schema**: Users, conversations, messages, documents, templates, plugins, analytics
- ✅ **Token usage tracking**: Monitor API consumption per user and conversation
- ✅ **Security features**: Rate limiting, Helmet.js protection, CORS configuration, JWT authentication

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

- **Node.js** >= 18 or **Bun** >= 1.3.0
- **PostgreSQL** >= 16 with **pgvector** extension
- **OpenAI API Key** (for embeddings and chat completions)
- **Optional**: Google OAuth & GitHub OAuth credentials for social login

### Quick Start

```bash
# 1. Clone the repository
git clone https://github.com/Os-humble-man/ai-app.git
cd ai-app

# 2. Install dependencies
bun install

# 3. Configure environment (copy and edit .env files)
cd packages/server && cp .env.example .env
# Edit .env with your OpenAI API key, database URL, and JWT secret

# 4. Set up database and run migrations
bun run prisma:generate
bun run prisma:dev

# 5. (Optional) Index sample documents
bun run prepare-docs

# 6. Start development servers (from project root)
cd ../..
bun run dev
```

The app will be available at:
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3000
- **API Docs**: http://localhost:3000/api-docs

### Detailed Setup Instructions

<details>
<summary><strong>📥 Step 1: Install Bun (if needed)</strong></summary>

```bash
curl -fsSL https://bun.sh/install | bash
```

Alternatively, use Node.js 18+ with npm/pnpm/yarn.
</details>

<details>
<summary><strong>🗄️ Step 2: PostgreSQL + pgvector Setup</strong></summary>

```bash
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
</details>

<details>
<summary><strong>⚙️ Step 3: Environment Configuration</strong></summary>

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

# OAuth (Optional)
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

**Note**: See `DATABASE_SETUP.md` and `IMPLEMENTATION_GUIDE.md` for detailed schema, migration, and environment setup guides.
</details>

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

## 💼 Showcase & Skills Demonstrated

This project demonstrates production-ready development skills across multiple domains:

| **Skill Area** | **Demonstrated By** |
|----------------|---------------------|
| **Full-stack TypeScript** | Backend (Express, Prisma), Frontend (React 19) with complete type safety |
| **Modern DevOps & Tooling** | Monorepo architecture, Bun runtime, ESLint, Prettier, Husky git hooks |
| **AI/ML Integration** | RAG endpoints, embedding search (text-embedding-3-small), OpenAI API, pgvector |
| **Enterprise Data Retrieval** | Vector similarity search, semantic search, contextual Q&A with source citations |
| **Secure/Scalable Architecture** | JWT auth, OAuth (Google/GitHub), session management, environment config |
| **UI/UX Best Practices** | TailwindCSS 4, Radix UI, responsive design, real-time streaming |
| **Backend Engineering** | Layered architecture (Controllers → Services → Repositories), Dependency Injection (InversifyJS) |
| **Database Design** | PostgreSQL with pgvector, Prisma ORM, schema migrations, complex relations |
| **API Development** | RESTful API, Server-Sent Events (SSE), streaming responses, Swagger documentation |
| **Security & Performance** | Helmet.js, CORS, rate limiting, compression, bcrypt password hashing |
| **State Management** | Zustand, TanStack Query, optimistic updates, error boundary handling |
| **Documentation & Testing** | Comprehensive README, API docs, quickstart guides, modular test structure |

### 🎯 Technical Highlights

- **Advanced RAG Pipeline**: Document chunking → Vector embeddings → Similarity search → Context injection → LLM response
- **Real-time Streaming**: Progressive UI updates with Server-Sent Events for better UX
- **Multi-Auth Strategy**: Passport.js with multiple providers + JWT token management
- **Type-Safe Full Stack**: Shared types between client/server via monorepo structure
- **Production-Ready Patterns**: Error handling, logging (Winston), validation (Zod), environment-based config

---

## 🚧 Implementation Roadmap

### ✅ Completed Features
- [x] Real-time chat with GPT-4o-mini and session context
- [x] RAG-powered Q&A system with document embeddings
- [x] User authentication (Email/password, OAuth Google, OAuth GitHub)
- [x] Document vectorization and indexing (pgvector)
- [x] Real-time response streaming (Server-Sent Events)
- [x] Conversation management with search and favorites
- [x] Folder organization for conversation categorization
- [x] Source citation tracking in conversations
- [x] User settings and preferences (theme, language, model)
- [x] Analytics and token usage tracking
- [x] Modular database schema with Prisma

### 🔜 Upcoming Features & Enhancements

- [ ] **Multi-source Integration**
  - [ ] Google Drive connector for direct document sync
  - [ ] Confluence API integration for wiki content
  - [ ] SharePoint support for enterprise document management
  
- [ ] **Enhanced RAG Capabilities**
  - [ ] Hybrid search combining semantic + keyword matching
  - [ ] Re-ranking algorithms for better relevance
  - [ ] Multi-hop reasoning for complex queries
  - [ ] Streaming and non-streaming RAG endpoints
  - [ ] Document linking directly in chat responses
  
- [ ] **Collaboration Features**
  - [ ] Team workspaces and shared folders
  - [ ] Shared conversation threads
  - [ ] Role-based access control (RBAC)
  
- [ ] **Advanced Features**
  - [ ] Multi-model support (GPT-4, Claude, Llama)
  - [ ] Dark mode and theme customization
  - [ ] Conversation export (TXT, Markdown, PDF, JSON)
  - [ ] Enhanced import/export functionality
  - [ ] Plugin system for extensibility
  - [ ] Multi-language support (i18n)
  - [ ] Voice input/output capabilities
  
- [ ] **Analytics & Optimization**
  - [ ] Document analytics dashboard
  - [ ] Usage statistics and insights
  - [ ] Batch processing for enterprise-scale document collections
  - [ ] Performance optimization for large knowledge bases
  
- [ ] **Infrastructure & DevOps**
  - [ ] Unit and E2E tests (Vitest, Playwright)
  - [ ] CI/CD pipeline (GitHub Actions)
  - [ ] Docker containerization
  - [ ] Kubernetes deployment configurations

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
