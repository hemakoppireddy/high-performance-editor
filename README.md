#  High-Performance Code Editor with Advanced Keyboard Handling

A browser-based code editor built with React that mimics VS Code-style keyboard behavior.  
The project focuses on deep keyboard event handling, undo/redo state management, chord shortcuts, performance optimization, and full Docker containerization.

---

##  Objective

To build a high-performance, keyboard-driven code editor that:

- Handles complex keyboard shortcuts
- Implements a robust undo/redo system
- Supports multi-key chord shortcuts
- Differentiates between `keydown`, `input`, and composition events
- Implements debounced expensive operations
- Is fully containerized using Docker

---

##  Features

###  Advanced Keyboard Handling
- **Save Shortcut** → `Ctrl+S` / `Cmd+S`
- **Undo** → `Ctrl+Z` / `Cmd+Z`
- **Redo** → `Ctrl+Shift+Z` / `Cmd+Shift+Z`
- **Toggle Comment** → `Ctrl+/`
- **Indent** → `Tab`
- **Outdent** → `Shift+Tab`
- **Smart Indentation on Enter**
- **Chord Shortcut** → `Ctrl+K` then `Ctrl+C`

---

###  State Management
- Custom **Undo Stack**
- Custom **Redo Stack**
- Every text modification stored as history state
- History exposed for automated verification

---

###  Performance Optimization
- Debounced syntax highlighting simulation
- Debounce delay: **200ms**
- Prevents repeated expensive function execution during rapid typing
- Verified via `window.getHighlightCallCount()`

---

###  Event Debugging Dashboard
Real-time logging of:
- `keydown`
- `keyup`
- `input`
- `compositionstart`
- `compositionupdate`
- `compositionend`

This allows visualizing event firing order.

---

###  Cross-Platform Support
All shortcuts work for:
- Windows/Linux (`Ctrl`)
- macOS (`Cmd` / `Meta`)

---

###  Fully Dockerized
- Multi-stage production build
- Node 20 Alpine
- Static production serving
- Healthcheck enabled
- Accessible on port `3000`

---

## Architecture Overview

```

src/
│
├── components/
│   ├── Editor.jsx
│   └── Dashboard.jsx
│
├── hooks/
│   ├── useHistory.js
│   └── useDebounce.js
│
├── App.jsx
├── main.jsx
└── index.css

```

---

##  Core Design Decisions

### 1️ Using `<textarea>` Instead of `contenteditable`
- Easier cursor control
- Simplified selection management
- Predictable text manipulation
- Better compatibility with undo/redo stack

---

### 2️ Undo/Redo Implementation
Two-stack model:

- `undoStack`
- `redoStack`

Logic:
- On input → push to undo stack
- On undo → pop from undo, push to redo
- On redo → pop from redo, push to undo

---

### 3️ Chord Shortcut Implementation
State machine using:
- `useRef` for chord state
- 2-second timeout
- Reset on failure

Flow:
```

Ctrl+K → activate chord state
Within 2 seconds → Ctrl+C → Success
Else → reset

```

---

### 4️ Debounced Expensive Task
Implemented using a custom `useDebounce` hook.

- Delay: 200ms
- Only last keystroke triggers highlight
- Prevents performance degradation

---

### 5️ Global Verification Exposure

For automated evaluation:

```js
window.getEditorState()
window.getHighlightCallCount()
```

These are safely exposed using stable refs.

---

##  Event Handling Strategy

| Event Type   | Purpose                    |
| ------------ | -------------------------- |
| keydown      | Shortcut detection         |
| input        | Text modification tracking |
| composition* | IME support                |
| keyup        | Debug logging              |

`keypress` is not used (deprecated).

---

##  Running The Application

###  Run Locally

```bash
npm install
npm run dev
```

Visit:

```
http://localhost:5173
```

---

###  Run With Docker

Build and start:

```bash
docker-compose up --build -d
```

Visit:

```
http://localhost:3000
```

Check container status:

```bash
docker ps
```

It should show:

```
Up (healthy)
```

---

##  Manual Testing Guide

### 1️ Test Save

Press `Ctrl+S`

* Browser save dialog should NOT open
* Dashboard logs: `Action: Save`

---

### 2️ Test Undo/Redo

Type text → Ctrl+Z → Ctrl+Shift+Z

---

### 3️ Test Toggle Comment

```
const x = 1;
```

Press `Ctrl+/`

---

### 4️ Test Chord

Press:

```
Ctrl+K → Ctrl+C (within 2 seconds)
```

Logs:

```
Action: Chord Success
```

---

### 5 Test Debounce

Type rapidly 10 characters.

Wait 300ms.

Run:

```js
window.getHighlightCallCount()
```

Should increase by **1 only**.

---

##  Required Files

* `Dockerfile`
* `docker-compose.yml`
* `.env.example`
* `README.md`
* `src/`
* `package.json`

---

##  Environment Variables

`.env.example`

```
APP_PORT=3000
NODE_ENV=production
```

No secrets included.

---

##  Accessibility

* `role="textbox"`
* `aria-multiline="true"`
* Tab key overridden for indentation
* Focus remains within editor

---

##  Performance Considerations

* Debounced expensive tasks
* Avoided unnecessary re-renders
* Stable refs for evaluator functions
* Efficient string slicing for text manipulation

---

##  Tech Stack

* React (Vite)
* JavaScript (ES6+)
* Docker & Docker Compose
* Node 20 Alpine
* Custom Hooks

---

##  Final Notes

This project demonstrates:

* Deep understanding of browser keyboard event models
* Advanced state management
* Cross-platform shortcut handling
* Performance optimization via debouncing
* Containerized frontend deployment
* Professional engineering practices
