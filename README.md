# Bamazon

**E-commerce Demo** built with **React**, **Redux**, and **TailwindCSS**

---

## Table of Contents

- [Overview](#overview)  
- [Features](#features)  
- [Tech Stack](#tech-stack)  
- [Getting Started](#getting-started)  
  - [Prerequisites](#prerequisites)  
  - [Installation](#installation)  
  - [Running the App](#running-the-app)  
- [Current Status & Roadmap](#current-status--roadmap)  
- [Future Plans (TODOs)](#future-plans-todos)  
- [About & Background](#about--background)  
- [License](#license)  

---

## Overview

Bamazon is a demo e-commerce application designed as a learning project for building commerce functionality using React and Redux. It provides a frontend interface allowing users to browse, filter, and select products. Its primary focus is learning core functionality—you’ll notice that layout and styling are basic, with improvements planned once all features are implemented.

---

## Features

- Browse a product catalog with filters  
- Product detail views  
- State management using Redux  
- Responsive layout styled with TailwindCSS  
- (Potential) Account page functionality  

---

## Tech Stack

- **React** – Core component library  
- **Redux** – State management system  
- **TailwindCSS** – Utility-first styling framework  
- **Vite** – Fast development and build tooling  
- **SCSS** + `@apply` support for Tailwind refactoring  
- ESLint, Prettier, PostCSS configuration  

---

## Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js (v14 or higher recommended)  
- npm or yarn  

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/jarrodwhitley/bamazon.git
   cd bamazon
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

### Running the App

Launch it locally:
```bash
npm start
# or
yarn start
```

This will spin up a local development server (commonly at `localhost:3000` or `localhost:5173` depending on Vite configuration).

---

## Current Status & Roadmap

Currently, the app features core product browsing and filtering functionality.  
Planned improvements include account management and a refined frontend user experience.

---

## Future Plans (TODOs)

- Update URL hash to reflect filter and product selections  
- Refactor component structure for better modularity  
- Move inline Tailwind classes to SCSS with `@apply` for readability  
- Finalize color scheme and layout — current design is provisional  
- Implement account page with user-specific features  

---

## About & Background

This project began as a learning opportunity to transition from Vue to React/Redux development.  
It emphasizes understanding React and Redux principles, with future improvements aimed at polishing UI and expanding functionality.

---

## Live Demo

If hosted, you can try the app here:  

👉 [https://bamazon.jarrodwhitley.com](https://bamazon.jarrodwhitley.com)
