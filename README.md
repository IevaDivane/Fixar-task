# Logs Management App

A React-based web application for managing log entries with a Node.js backend.

## Features

- Create, edit, and delete log entries
- Responsive design with mobile support
- Real-time updates
- Toast notifications for success/error feedback
- Loading indicators for all operations

## Demo Images

### Main Application Interface
![Main Application](./public/images/demo/main-app.png)
*Main logs management interface showing the table view*

### Mobile Responsive Design
![Mobile View](./public/images/demo/mobile-view.png)
*Mobile-optimized layout with card-based design*

### Create/Edit Log Modal
![Create Log](./public/images/demo/create-log.png)
*Modal for creating and editing log entries*

### Delete Confirmation
![Delete Confirmation](./public/images/demo/delete-confirmation.png)
*Confirmation modal for deleting log entries*

### Toast Notifications
![Toast Notifications](./public/images/demo/toast-notifications.png)
*Success and error notifications*

### Loading States
![Loading States](./public/images/demo/loading-states.png)
*Loading indicators during API operations*

## Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS, HeroUI
- **Backend**: Node.js, Express
- **Build**: Vite

## Quick Start

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the backend server:
   ```bash
   npm run server
   ```

3. Start the frontend (in another terminal):
   ```bash
   npm run dev
   ```

4. Open `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start frontend development server
- `npm run build` - Build for production
- `npm run server` - Start backend server
- `npm run server:dev` - Start backend with auto-reload

## API Endpoints

- `GET /logs` - Fetch all logs
- `POST /logs` - Create new log
- `PUT /logs/:id` - Update log
- `DELETE /logs/:id` - Delete log
- `GET /health` - Health check

## Project Structure

```
src/
├── main.tsx                    # App entry point
├── LogsTable.tsx              # Main logs component
├── api.ts                     # API client
├── components/                # Reusable components
│   ├── DeleteConfirmationModal.tsx
│   ├── ErrorModal.tsx
│   ├── LoadingSpinner.tsx
│   ├── MobileLogCard.tsx
│   ├── PaginationComponent.tsx
│   ├── Toast.tsx
│   └── ToastProvider.tsx
└── style.css                  # Global styles
```
