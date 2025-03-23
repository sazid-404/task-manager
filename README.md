# LWS Task Manager

A single-page application (SPA) for managing tasks, built with React, Redux Toolkit (RTK Query), Tailwind CSS, and Vite. This project implements the following features:

Projects & Team Members fetched from a JSON Server (running on port 9000).

Task List display with filtering by selected projects.

Create (Add New), Edit, and Delete tasks.

Optimistic Updates for deleting tasks and Pessimistic Updates for adding/editing tasks.

Search functionality to filter tasks by title/name.

Tailwind CSS styling, matching the design guidelines.

# Features

## Projects Sidebar

Displays a list of available projects with checkboxes.

Checking/unchecking a project filters the visible tasks accordingly.

## Team Members Sidebar

Shows a list of team members with their avatars.

## Task List

Shows tasks in the main area with date, title, assigned team member, project badge, and status.

Status can be changed (Pending, In Progress, Completed).

Deleting a task (or editing) updates the UI and the server.

## Add New Task

A separate page for creating a new task with form inputs: Task Name, Assign To, Project, and Deadline.

## Edit Task

Edit page to update an existing task’s details.

A Delete button is also provided in Edit page (optional) or in the task card itself.

## Search

A search bar (visible on the Home page) to filter tasks by name/title.

# Tech Stack

Frontend: React, Redux Toolkit (RTK Query), React Router, Tailwind CSS

Build Tool: Vite

Backend: JSON Server (for mock API)

# Project Structure

lws-task-manager/
├── db.json
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── index.html
├── src/
│ ├── main.jsx
│ ├── App.jsx
│ ├── store/
│ │ └── store.js
│ ├── api/
│ │ └── apiSlice.js
│ ├── pages/
│ │ ├── Home.jsx
│ │ ├── AddTask.jsx
│ │ └── EditTask.jsx
│ ├── components/
│ │ ├── Navbar.jsx
│ │ ├── Sidebar.jsx
│ │ ├── TaskList.jsx
│ │ └── TaskCard.jsx
│ └── styles/
│ └── main.css
└── ...

# License

This project is provided as part of the LWS Job Finder assignment. License details can be added here if necessary, such as MIT or another open-source license.

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript and enable type-aware lint rules. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
