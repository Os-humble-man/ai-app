# RAGify — Enterprise Documentation Chatbot

> **An intelligent RAG-based chatbot for internal documentation**  
> Ask questions in natural language across your company’s knowledge base (Google Docs, Confluence, PDFs, Markdown).  
> Get precise, **sourced answers** with deep links to relevant procedures, forms, or policies.

---

## 📋 Table of Contents

1. [Overview](#-overview)
2. [Business Use Cases](#-business-use-cases)
3. [Core Features (AI & RAG)](#-core-features-ai--rag)
4. [Technologies Used](#-technologies-used)
5. [Architecture](#-architecture)
6. [Installation & Configuration](#-installation--configuration)
7. [Usage](#-usage)
8. [Available Scripts](#-available-scripts)
9. [Project Structure](#-project-structure)
10.   [Skills Demonstrated](#-skills-demonstrated)
11.   [Roadmap & Future Improvements](#-roadmap--future-improvements)
12.   [Author](#-author)

---

## 🎯 Overview

**RAGify** is a full-stack Retrieval-Augmented Generation (RAG) application designed for enterprise use.  
It allows employees to query internal documentation in natural language — returning **accurate, context-rich, and sourced answers**.

### Example Workflow

> 🧑‍💼 _“How do I request leave?”_  
> The chatbot retrieves the HR policy, cites the official document, and provides the link to the correct form.

---

## 💼 Business Use Cases

RAGify streamlines access to internal knowledge across departments:

- 🧾 **HR** — Leave requests, onboarding, company policies
- 💻 **IT** — Account setup, device policies, troubleshooting
- ⚖️ **Compliance** — Regulations, audit procedures, GDPR documentation
- 📈 **Operations** — Workflows, templates, forms, and SOPs

RAGify ensures every employee gets **instant, reliable answers** without searching through folders or outdated docs.

---

## ✨ Core Features (AI & RAG)

| Category                       | Features                                                                                         |
| ------------------------------ | ------------------------------------------------------------------------------------------------ |
| 💬 **Chat Experience**         | Real-time streaming responses with Server-Sent Events (SSE)                                      |
| 📚 **RAG Engine**              | Semantic search using pgvector + contextual prompt enrichment                                    |
| 🔀 **Dual Mode**               | Toggle between standard AI chat and RAG-enhanced mode with document context                      |
| 🔗 **Sourced Answers**         | RAG mode provides context from internal documents (HR, IT, Security, Stock procedures)           |
| 🗂 **Conversation Management** | Create, organize, favorite, and move conversations into folders                                  |
| 🔐 **Authentication**          | Email/password + OAuth 2.0 (Google & GitHub)                                                     |
| ⚙️ **Configurable AI Stack**   | OpenAI and OpenRouter support with model selection                                               |
| 🧩 **Document Indexing**       | PDF parsing and automatic embedding generation with chunk-based storage                          |
| � **Analytics & Monitoring**   | Token usage tracking, conversation analytics, and system logging                                 |
| 🎨 **Modern UI**               | Responsive design with dark/light mode, Tailwind CSS 4, and Radix UI components                  |
| 📁 **Folder Organization**     | Organize conversations by topics or projects                                                     |
| 🔒 **Security**                | Helmet, CORS, rate limiting, JWT tokens, bcrypt password hashing                                 |
| 📄 **API Documentation**       | Complete Swagger/OpenAPI documentation                                                           |
| 🎯 **Business Ready**          | User settings, templates, plugins architecture, notifications, exports, and sharing capabilities |

---

## 🏢 Technologies Used

### Frontend

- **React 19**, **TypeScript**, **Vite**
- **TailwindCSS 4**, **Radix UI** (Dialog, Avatar, Dropdown, Switch, Tooltip, Separator, Collapsible)
- **Lucide React** for icons
- **TanStack Query (React Query)** for state management
- **Zustand** for global state
- **Axios** for API communication

### Backend

- **Bun Runtime**, **Express 5**, **TypeScript**
- **Prisma ORM + PostgreSQL + pgvector**
- **InversifyJS** for dependency injection
- **Passport.js** with OAuth 2.0 (Google & GitHub authentication)
- **Zod** for schema validation
- **JWT** for session management
- **Winston** for logging
- **Swagger** for API documentation
- **Helmet**, **CORS**, **Rate Limiting** for security

### RAG Engine

- Embedding generation via **OpenAI API** (`text-embedding-3-small`)
- Vector search with **pgvector** extension
- **Tiktoken** for token counting
- Automatic context injection in LLM prompts
- Support for **OpenRouter** and **OpenAI** models
- Document processing: **PDF.js** for PDF parsing

### Dev Tools & Infrastructure

- **Monorepo structure** with workspaces
- **ESLint**, **Prettier** for code quality
- **Husky**, **lint-staged** for pre-commit hooks
- **Concurrently** for parallel dev server orchestration
- **Nodemailer** for email notifications
- **bcrypt** for password hashing

---

## 🏗 Architecture

### 🔄 Technical Workflow

1. The user submits a question through the **React UI**.
2. The **server (Express/Bun)** handles the query:
   - Generates embeddings for the input.
   - Performs a **semantic vector search** in `pgvector`.
   - Constructs a **context-enriched prompt**.
3. The AI model (OpenAI/OpenRouter) produces a **streamed response**.
4. The frontend **displays the answer in real time**, including **citations and document links**.

### 🧩 Structural Overview

```
RAGify/
├── packages/
│   ├── client/                    # React + Vite frontend
│   │   ├── src/
│   │   │   ├── api/              # API client layer
│   │   │   ├── components/       # React components (UI + shared)
│   │   │   ├── contexts/         # React contexts (RagMode, Auth)
│   │   │   ├── hooks/            # Custom hooks (queries, mutations)
│   │   │   ├── pages/            # Route pages
│   │   │   ├── store/            # Zustand stores
│   │   │   └── types/            # TypeScript types
│   │   └── package.json
│   │
│   └── server/                    # Express/Bun backend
│       ├── assets/
│       │   └── documents/        # Internal company docs (PDF, TXT)
│       ├── controllers/          # Route controllers
│       ├── services/             # Business logic (Chat, RAG, Auth, User)
│       ├── repositories/         # Database access layer
│       ├── routes/               # API routes
│       ├── middleware/           # Express middleware
│       ├── strategies/           # Passport OAuth strategies
│       ├── utils/                # Helper utilities (JWT, Embedding, Tokens)
│       ├── prisma/
│       │   ├── schema.prisma     # Database schema
│       │   └── migrations/       # Database migrations
│       ├── scripts/              # Setup & RAG indexing scripts
│       ├── docs/                 # Swagger API documentation
│       └── package.json
│
├── index.ts                       # Root dev orchestrator (concurrently)
├── package.json                   # Root workspace config
├── .husky/                        # Git hooks
├── DOCUMENT_RAG_QUICKSTART.md     # RAG setup guide
├── RAG_INTEGRATION_GUIDE.md       # RAG implementation docs
├── RAG_MODE_USAGE.md              # RAG mode usage guide
└── README.md
```

---

## ⚙️ Installation & Configuration

### Prerequisites

- **Node.js 20+** or **Bun**
- **PostgreSQL** (with `pgvector` extension)
- **OpenAI** or **OpenRouter API Key**

### Setup

```bash
# Clone the repository
git clone https://github.com/Os-humble-man/ai-app
cd ai-app

# Install dependencies (using Bun)
bun install

# Setup server environment
cd packages/server
cp .env.example .env
# Edit .env and add:
# - DATABASE_URL (PostgreSQL with pgvector)
# - OPENAI_API_KEY or OPENROUTER_API_KEY
# - JWT_SECRET
# - OAuth credentials (GOOGLE_CLIENT_ID, GITHUB_CLIENT_ID, etc.)

# Generate Prisma client
bun run prisma:generate

# Run database migrations
bun run prisma:dev

# (Optional) Prepare documents for RAG
bun run prepare-docs

# Go back to root
cd ../..

# Start both client and server in development mode
bun run dev
```

### Environment Variables

Create a `.env` file in `packages/server/` with the following:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/ai_app?schema=public"

# OpenAI / OpenRouter
OPENAI_API_KEY="sk-..."
OPENROUTER_API_KEY="sk-or-..."
OPENROUTER_BASE_URL="https://openrouter.ai/api/v1"

# JWT
JWT_SECRET="your-secret-key"

# OAuth (Google)
GOOGLE_CLIENT_ID="..."
GOOGLE_CLIENT_SECRET="..."
GOOGLE_CALLBACK_URL="http://localhost:3000/api/auth/google/callback"

# OAuth (GitHub)
GITHUB_CLIENT_ID="..."
GITHUB_CLIENT_SECRET="..."
GITHUB_CALLBACK_URL="http://localhost:3000/api/auth/github/callback"

# Server
PORT=3000
CLIENT_URL="http://localhost:5173"

# Email (optional)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT=587
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-app-password"
```

For more details, see:

- **DOCUMENT_RAG_QUICKSTART.md** - Quick start guide for RAG setup
- **RAG_INTEGRATION_GUIDE.md** - Complete RAG integration documentation
- **RAG_MODE_USAGE.md** - Guide on using RAG mode
- **DATABASE_SETUP.md** - Database configuration guide

## 🚀 Usage

### Starting the Application

```bash
# Start both client (port 5173) and server (port 3000)
bun run dev
```

### Accessing the Application

1. **Frontend**: Visit http://localhost:5173
2. **Backend API**: http://localhost:3000
3. **API Documentation**: http://localhost:3000/api-docs (Swagger UI)
4. **Prisma Studio**: `cd packages/server && bun run prisma:studio`

### Using the Chat

1. **Sign up** or **Log in** (Email/Password, Google, or GitHub)
2. **Toggle RAG Mode** in the header to switch between:
   - 💡 **Standard AI mode** → General-purpose chatbot responses
   - 📘 **RAG mode** → Context-aware responses using internal documents
3. **Ask questions** like:
   - "Comment demander un congé?" (How do I request leave?)
   - "Quelle est la procédure de gestion des stocks?" (What is the stock management procedure?)
4. **Organize conversations** into folders
5. **View conversation history** in the sidebar

### Available Scripts

#### Root Level

```bash
bun run dev        # Start both client and server
bun run format     # Format code with Prettier
```

#### Server (`packages/server/`)

```bash
bun run dev                # Start server in watch mode
bun run start              # Start server (production)
bun run prisma:dev         # Run database migrations
bun run prisma:studio      # Open Prisma Studio
bun run prisma:generate    # Generate Prisma Client
bun run prepare-docs       # Process and index documents for RAG
bun run test-rag           # Test RAG functionality
bun run fix-pgvector       # Fix pgvector extension issues
```

#### Client (`packages/client/`)

```bash
bun run dev        # Start Vite dev server
bun run build      # Build for production
bun run preview    # Preview production build
bun run lint       # Run ESLint
```

## 📊 Project Structure

### Key Directories

- **`/packages/client/`** — React 19 application with Vite
   - `src/api/` — API client layer (Axios)
   - `src/components/` — Reusable UI components
   - `src/contexts/` — React Context providers (RagMode, Auth)
   - `src/hooks/` — React Query hooks for data fetching
   - `src/store/` — Zustand global state management
- **`/packages/server/`** — Express/Bun backend API
   - `controllers/` — Request handlers
   - `services/` — Business logic (ChatService, RagService, AuthService)
   - `repositories/` — Database access layer
   - `routes/` — API route definitions
   - `middleware/` — Error handling, validation, logging
   - `strategies/` — Passport OAuth strategies
   - `utils/` — Helper functions (JWT, Embeddings, Tokens)
   - `prisma/` — Database schema and migrations
   - `assets/documents/` — Internal company documents (PDF, TXT)
   - `scripts/` — Document processing and RAG indexing utilities

- **Root configuration files**
   - `index.ts` — Concurrently orchestrator for dev mode
   - `package.json` — Monorepo workspace configuration
   - `.husky/` — Git hooks for code quality

## 🎓 Skills Demonstrated

| Area                             | Capabilities                                                                         |
| -------------------------------- | ------------------------------------------------------------------------------------ |
| 🧠 **RAG & AI Integration**      | Semantic search, embeddings (OpenAI), pgvector, context injection, dual-mode chatbot |
| 🌐 **Full-Stack Architecture**   | React 19 + Express 5 monorepo with Bun runtime, TypeScript throughout                |
| 🧩 **Backend Engineering**       | RESTful API design, Prisma ORM, PostgreSQL, InversifyJS DI, layered architecture     |
| 🔐 **Authentication & Security** | JWT, OAuth 2.0 (Passport.js), bcrypt, Helmet, CORS, rate limiting                    |
| 🚀 **Performance**               | Real-time SSE streaming, React Query for caching, async/await optimization           |
| 🧰 **DevOps & Code Quality**     | Husky, lint-staged, ESLint, Prettier, Git hooks, workspace management                |
| 🎨 **Professional UX/UI**        | Tailwind CSS 4, Radix UI primitives, responsive design, dark mode support            |
| � **Data Management**            | Vector databases, document chunking, embedding generation, token counting            |
| 🧾 **Documentation**             | Swagger/OpenAPI, comprehensive guides, inline documentation                          |
| 🏗️ **Design Patterns**           | Repository pattern, service layer, dependency injection, context providers           |

## 🧭 Roadmap & Future Improvements

### In Progress

- ✅ RAG mode with document context
- ✅ OAuth authentication (Google & GitHub)
- ✅ Folder organization system
- ✅ Real-time streaming responses
- ✅ Swagger API documentation

### Planned Features

- 📑 **Source Citations** - Display document sources with download links in RAG responses
- 📊 **Enhanced Analytics** - Dashboard for token usage, conversation metrics, popular queries
- 🔍 **Document Versioning** - Track document updates and maintain version history
- ⚙️ **Performance Optimization** - Embedding cache & HNSW index for faster vector search
- 🌍 **Multi-language Support** - i18n integration for international teams
- 🔒 **RBAC** - Role-based access control for document permissions
- 💬 **Feedback System** - User ratings for AI responses to improve quality
- 📤 **Export & Share** - Export conversations to PDF/Markdown, share with team members
- 🔔 **Real-time Notifications** - WebSocket integration for live updates
- 🎨 **Custom Themes** - Brand customization and white-labeling
- 🔌 **Plugin System** - Extensible architecture for custom integrations
- 📱 **Mobile Optimization** - Progressive Web App (PWA) capabilities
- 🧪 **Testing Suite** - Comprehensive unit and integration tests

## 👤 Author

**Oscar Kanangila**  
🚀 Web Developer

**Expertise:**

- 🧠 Retrieval-Augmented Generation (RAG) & LLM Integration
- ⚛️ React, TypeScript, Modern Frontend Architecture
- 🔧 Node.js, Express, Bun Runtime
- 🗄️ PostgreSQL, Prisma ORM, Vector Databases
- 🔐 OAuth, JWT, Enterprise Security
- 🏗️ Monorepo Architecture, Dependency Injection
- 📊 API Design, Swagger Documentation

**Connect:**

- GitHub: [@Os-humble-man](https://github.com/Os-humble-man)
- Project: [RAGify](https://github.com/Os-humble-man/RAGify)

---

## 📚 Additional Documentation

This project includes comprehensive documentation:

- **[DOCUMENT_RAG_QUICKSTART.md](./DOCUMENT_RAG_QUICKSTART.md)** - Quick start guide for RAG implementation
- **[RAG_INTEGRATION_GUIDE.md](./RAG_INTEGRATION_GUIDE.md)** - Detailed RAG integration documentation
- **[RAG_MODE_USAGE.md](./RAG_MODE_USAGE.md)** - How to use and implement RAG mode
- **[DATABASE_SETUP.md](./DATABASE_SETUP.md)** - Database configuration and migrations
- **[CONVERSATION_FILTERING.md](./CONVERSATION_FILTERING.md)** - Conversation management features
- **[FOLDER_FEATURES.md](./FOLDER_FEATURES.md)** - Folder organization system
- **[FEATURES_ROADMAP.md](./FEATURES_ROADMAP.md)** - Detailed feature roadmap

---

## ⭐️ Contribute

Contributions, feedback, and ideas are welcome!

### How to Contribute

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow the existing code style (ESLint + Prettier)
- Write meaningful commit messages
- Update documentation when adding features
- Test your changes before submitting

---

## 🧩 License

This project is distributed under the **MIT License**.

---

## 🙏 Acknowledgments

- **OpenAI** for GPT models and embeddings API
- **OpenRouter** for multi-model LLM routing
- **Prisma** for excellent ORM tooling
- **Radix UI** for accessible component primitives
- **SHADCN UI** for accessible component primitives
- **TailwindCSS** for utility-first styling
- **Bun** for blazing fast JavaScript runtime
