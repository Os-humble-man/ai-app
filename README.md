# 🤖 AI Chat Application

A modern and performant AI chat application with real-time interface and response streaming.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Architecture](#architecture)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Available Scripts](#available-scripts)
- [Project Structure](#project-structure)
- [Skills Demonstrated](#skills-demonstrated)

## 🎯 Overview

Full-stack AI chat application demonstrating advanced skills in modern web development. The application allows users to converse with an AI (GPT-4o-mini) through an intuitive interface with real-time response streaming.

### Technical Highlights

- **Monorepo Architecture** with workspace management
- **Real-time Streaming** of AI responses
- **Sophisticated State Management** on client-side
- **RESTful API** with Express.js
- **Modern User Interface** with React and TailwindCSS
- **TypeScript** for type safety
- **Performance Optimizations** with Vite

## ✨ Features

- 💬 **Real-time Chat** with response streaming
- 🔄 **Conversation History** maintained per session
- 🎨 **Responsive Interface** and modern design
- ⚡ **Optimized Performance** with progressive loading
- 🎯 **Robust Error Handling**
- 🔒 **Environment Variables** for security
- 📱 **Adaptive Design** for mobile and desktop

## 🛠 Technologies Used

### Frontend

- **React 19** - UI library with latest features
- **TypeScript** - Static typing for code robustness
- **Vite** - Ultra-fast build tool
- **TailwindCSS 4** - Modern utility-first CSS framework
- **Radix UI** - Accessible and customizable components
- **Lucide React** - Modern icons

### Backend

- **Node.js** with **Express 5** - High-performance web server
- **OpenAI SDK** - Integration with OpenRouter API
- **TypeScript** - Server-side type safety
- **Zod** - Schema validation
- **Dotenv** - Environment variable management

### Development Tools

- **Bun** - Fast JavaScript runtime and package manager
- **Prettier** - Automatic code formatting
- **ESLint** - Code quality linting
- **Husky** - Git hooks for automation
- **lint-staged** - Linting of staged files
- **Concurrently** - Parallel execution of client and server

## 🏗 Architecture

### Monorepo Structure

```
ai-app/
├── packages/
│   ├── client/          # React Application
│   │   ├── src/
│   │   │   ├── components/
│   │   │   │   ├── chat-box.tsx      # Main chat component
│   │   │   │   ├── message-list.tsx  # Message display
│   │   │   │   ├── ui/               # Reusable UI components
│   │   │   │   ├── layout/           # Layout components
│   │   │   │   └── shared/           # Shared components
│   │   │   ├── hooks/                # Custom React hooks
│   │   │   ├── lib/                  # Utilities
│   │   │   └── App.tsx               # Root component
│   │   └── package.json
│   │
│   └── server/          # Express API
│       ├── controllers/
│       │   └── chat.controller.ts    # Chat controller
│       ├── services/
│       │   └── chat.service.ts       # Business logic
│       ├── repositories/
│       │   └── conversation.repository.ts  # Data management
│       ├── routes/
│       │   └── routes.ts             # Route definitions
│       ├── index.ts                  # Server entry point
│       └── package.json
│
├── index.ts             # Concurrent startup script
└── package.json         # Root workspace configuration
```

### Data Flow

1. **Client** → Send user message via fetch API
2. **Server** → Receive and process request
3. **OpenRouter API** → Call to GPT-4o-mini with streaming
4. **Server** → Stream response chunks via Server-Sent Events
5. **Client** → Receive and progressively display response

## 📦 Installation

### Prerequisites

- **Bun** >= 1.3.0 (or Node.js >= 18)
- OpenRouter API key (or OpenAI)

### Installing Bun (if necessary)

```bash
curl -fsSL https://bun.sh/install | bash
```

### Installing Dependencies

```bash
# Clone the repository
git clone <repository-url>
cd ai-app

# Install all dependencies (workspaces)
bun install
```

## ⚙️ Configuration

Create a `.env` file at the root of the project:

```env
# API Configuration
OPENROUTER_API_KEY=your_api_key_here

# Server Configuration
PORT=3000
```

### Getting an API Key

1. Create an account on [OpenRouter](https://openrouter.ai/)
2. Generate an API key in settings
3. Copy the key into the `.env` file

## 🚀 Usage

### Starting in Development Mode

```bash
# Start client and server simultaneously
bun run dev
```

This command launches:
- **Express Server** on `http://localhost:3000`
- **Vite Client** on `http://localhost:5173`

### Accessing the Application

Open your browser and navigate to `http://localhost:5173`

### Production Build

```bash
# Build the client
cd packages/client
bun run build

# Production files will be in packages/client/dist/
```

## 📜 Available Scripts

### Project Root

```bash
bun run dev      # Start client and server in dev mode
bun run format   # Format code with Prettier
```

### Client (`packages/client`)

```bash
bun run dev      # Start Vite dev server
bun run build    # Production build
bun run lint     # Lint with ESLint
bun run preview  # Preview the build
```

### Server (`packages/server`)

```bash
bun run dev      # Start with hot-reload
bun run start    # Start the server
```

## 📂 Project Structure

```
ai-app/
├── .husky/                 # Git hooks
├── packages/
│   ├── client/
│   │   ├── public/         # Static assets
│   │   ├── src/
│   │   │   ├── assets/     # Images, SVG
│   │   │   ├── components/ # React components
│   │   │   ├── hooks/      # Custom hooks
│   │   │   ├── lib/        # Utilities
│   │   │   ├── App.tsx
│   │   │   ├── App.css
│   │   │   └── main.tsx
│   │   ├── index.html
│   │   ├── vite.config.ts
│   │   ├── tsconfig.json
│   │   └── package.json
│   │
│   └── server/
│       ├── controllers/    # Express controllers
│       ├── services/       # Business logic
│       ├── repositories/   # Data layer
│       ├── routes/         # API route definitions
│       ├── index.ts
│       ├── tsconfig.json
│       └── package.json
│
├── .gitignore
├── .prettierrc             # Prettier configuration
├── .lintstagedrc           # lint-staged configuration
├── bun.lock
├── index.ts                # Main entry point
├── package.json            # Workspace configuration
├── tsconfig.json           # Root TypeScript configuration
└── README.md
```

## 💼 Skills Demonstrated

### Frontend Development

- ✅ **Modern React** with hooks and complex state management
- ✅ **Advanced TypeScript** with custom types and generics
- ✅ **Component Architecture** modular and reusable
- ✅ **UI/UX Design** with TailwindCSS and Radix UI components
- ✅ **Performance** with React and Vite optimizations
- ✅ **Real-time Streaming** with ReadableStream API

### Backend Development

- ✅ **RESTful API** with Express.js
- ✅ **Layered Architecture** (Controllers, Services, Repositories)
- ✅ **External API Integration** (OpenAI/OpenRouter)
- ✅ **Server-Sent Events** for streaming
- ✅ **Robust Error Handling**
- ✅ **Secure Environment Configuration**

### DevOps and Tools

- ✅ **Monorepo** with workspaces
- ✅ **Git Hooks** with Husky
- ✅ **Code Quality** with ESLint and Prettier
- ✅ **Full-stack TypeScript**
- ✅ **Modern Tools** (Bun, Vite, Concurrently)
- ✅ **Complete and Professional Documentation**

### Best Practices

- ✅ Separation of Concerns (SoC)
- ✅ Maintainable and scalable code
- ✅ Strong typing with TypeScript
- ✅ Appropriate error handling
- ✅ Clear project structure
- ✅ Automatically formatted and linted code

---

## 📝 Development Notes

### Technical Choices

- **Bun** chosen for its exceptional performance
- **Monorepo** to facilitate type sharing between client/server
- **Streaming** for better user experience
- **TailwindCSS** for fast and consistent UI development
- **Radix UI** for accessibility and customization

### Possible Future Improvements

- [ ] User authentication
- [ ] Conversation persistence in database
- [ ] Support for multiple AI models
- [ ] Dark mode
- [ ] Conversation export
- [ ] Unit and E2E tests
- [ ] CI/CD deployment
- [ ] File/image handling
- [ ] Multi-language support (i18n)

---

## 📄 License

This project is a skill demonstration portfolio.

## 👤 Author

Created as part of a technical skills demonstration for recruiters.

**Key Skills**: React, TypeScript, Node.js, Express, API Integration, Monorepo, Modern Web Development
