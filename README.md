# Planner App

## Overview

Welcome to the Planner App! This application is designed to help you efficiently manage your plans and tasks. You can easily sign up, log in, add plans, set deadlines, track progress, and update the status of your tasks. Built with React for the front end, Node.js for the back end, and MongoDB for the database, this app ensures a seamless experience for organizing your tasks.

## Features

- **User Authentication**: Secure sign-up and log-in functionality.
- **Plan Management**: Add, view, and manage plans.
- **Task Management**: Add tasks to each plan, set deadlines, and update task status.
- **Progress Tracking**: View progress reports to track completed and pending tasks.
- **Task Filtering**: Filter tasks to see completed and pending tasks separately.

## Technologies Used

- **Frontend**: React
- **Backend**: Node.js (Express)
- **Database**: MongoDB

## Installation

### Prerequisites

Ensure you have the following installed on your machine:

- Node.js
- npm (Node package manager)
- MongoDB

### Steps

1. **Clone the repository**:
    ```bash
    git clone https://github.com/yourusername/planner-app.git
    cd planner-app
    ```

2. **Install backend dependencies**:
    ```bash
    cd backend
    npm install
    ```

3. **Install frontend dependencies**:
    ```bash
    cd ../frontend
    npm install
    ```

4. **Start MongoDB**:
    Make sure your MongoDB server is running. You can start MongoDB using:
    ```bash
    mongod
    ```

5. **Set environment variables**:
    Create a `.env` file in the `backend` directory and add the following:
    ```env
    PORT=5000
    MONGODB_URI=your_mongodb_uri
    JWT_SECRET=your_jwt_secret
    ```

6. **Start the backend server**:
    ```bash
    cd ../backend
    npm start
    ```

7. **Start the frontend server**:
    ```bash
    cd ../frontend
    npm start
    ```

Your application should now be running on `http://localhost:3000`.

## Usage

1. **Sign Up / Log In**:
   - Create a new account or log in with existing credentials.
   
2. **Add a Plan**:
   - Navigate to the "Add Plan" section.
   - Enter the plan details and save.

3. **Add Tasks**:
   - Select a plan and add tasks to it.
   - Set deadlines for each task.

4. **Update Task Status**:
   - Mark tasks as completed or pending as you progress.

5. **View Progress Report**:
   - Navigate to the "Progress Report" section to view completed and pending tasks.

6. **Filter Tasks**:
   - Use the filtering options to view only completed or pending tasks.