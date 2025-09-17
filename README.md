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
![Main Application] <img width="1893" height="871" alt="image" src="https://github.com/user-attachments/assets/cf9a68c4-fad6-420a-b954-a188afa93b4a" />

### Mobile Responsive Design
![Mobile View]<img width="385" height="781" alt="image" src="https://github.com/user-attachments/assets/42b93523-1769-468f-a191-ce6c4a9f553e" />

### Create/Edit Log 
![Create Log] <img width="1699" height="536" alt="image" src="https://github.com/user-attachments/assets/d2ca6833-f389-4100-8372-25309f0d1533" />

*Modal for creating and editing log entries*

### Delete Confirmation
![Delete Confirmation] <img width="1691" height="822" alt="image" src="https://github.com/user-attachments/assets/be91a7b8-8983-4c96-ace6-4ec53ff16994" />

### Toast Notifications
![Toast Notifications] <img width="1756" height="536" alt="image" src="https://github.com/user-attachments/assets/95f35b3e-4e30-4bb1-ab1b-e097d75c118d" />
<img width="1790" height="541" alt="image" src="https://github.com/user-attachments/assets/2ed99cc2-7ed5-44fe-bcb9-7a491163a779" />
<img width="1741" height="512" alt="image" src="https://github.com/user-attachments/assets/51cfe9f6-f0a0-4bb0-9fb6-a7a3aeae9069" />

### Loading States
![Loading States] <img width="1585" height="668" alt="image" src="https://github.com/user-attachments/assets/e9017a9c-6589-4d93-a66c-8a0764932792" />

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
