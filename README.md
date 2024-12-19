# Battleship Frontend

This repository contains the frontend for the Battleship game, a strategic multiplayer game where users can challenge friends or play against AI. The frontend is built using **React**, **TypeScript**, and **Tailwind CSS**, with state management handled by **Redux Toolkit**.

### Battleship Game Rules

- **Objective**: Sink all of your opponent's ships before they sink yours.
- **Setup**: Players place ships on their grid, hidden from their opponent. Ships can be placed horizontally or vertically.
- **Gameplay**:
  1. Players take turns selecting a grid coordinate to attack.
  2. The opponent indicates if the attack is a "hit" or "miss."
  3. Ships are sunk when all their coordinates are hit.
- **Winning**: The first player to sink all of the opponent's ships wins.
- **Grid Size**: Standard grid size is 10x10.


## Features

### Game Features

- **Game Board**: Interactive grid-based game board for battleship gameplay.
- **Game Requests**: Send and respond to game requests seamlessly.

### User Management

- **Authentication**: Login and register users with JWT token-based authentication.
- **Friend Management**: Add and remove friends easily from the user interface.

### Notifications

- **Notification System**: View real-time notifications such as friend requests and game invitations.
- **Mark as Read**: Mark notifications as read directly from the notifications menu.

### Search

- **User Search**: Search for users by name or email with pagination, excluding existing friends.

## Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (>= 16.x)
- A running instance of the Battleship Backend (see backend repository for setup instructions).

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/battleship-frontend.git
   cd battleship-frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add the following:

   ```env
   VITE_API_URL=http://localhost:8000
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

The application should now be running at `http://localhost:5173`.

## Scripts

- `npm run dev`: Start the development server.
- `npm run build`: Build the project for production.
- `npm run preview`: Preview the production build locally.

## Development Notes

### State Management

The frontend uses **Redux Toolkit** for managing global state.&#x20;

### API Integration

RTK Query is used for seamless integration with the backend API, including user authentication, game requests, and notifications.

### Tailwind CSS

Tailwind CSS is used for styling, ensuring a modern and consistent design across the application.

### Notifications

- The notifications menu is implemented with  updates for new notifications.
- The user can mark notifications as read.

