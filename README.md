# Islamic Games Houston 2025 - Registration App

This is a Next.js web application built to handle participant registrations for the "Islamic Games Houston 2025" event. It provides a user-friendly sign-up form and a password-protected administrative dashboard to manage submissions.

## Features

- **Participant Registration**: A comprehensive form for users to sign up for various sports.
- **Dynamic Age Validation**: The form conditionally requires a parent's email address for participants under the age of 18.
- **Team or Individual**: Supports registration for both individuals and teams.
- **Admin Dashboard**: A secure, password-protected area for administrators to view, edit, and delete registration data.
- **Persistent Storage**: Registration data is saved to a local JSON file, ensuring data persists between sessions.

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [ShadCN UI](https://ui.shadcn.com/)
- **Form Management**: [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/) for validation

---

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You will need to have [Node.js](https://nodejs.org/) (version 18 or later) and npm installed on your computer.

### Installation

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd <repository-directory>
    ```

2.  **Install dependencies:**
    This project uses npm for package management. The `package.json` file lists all the necessary libraries. Run the following command to install them:
    ```bash
    npm install
    ```

### Running the Application

1.  **Set up environment variables:**
    Create a new file named `.env.local` in the root of your project directory. This file will hold your admin password.
    ```
    NEXT_PUBLIC_ADMIN_PASSWORD=your_super_secret_password
    ```
    Replace `your_super_secret_password` with a password of your choice.

2.  **Start the development server:**
    Run the following command to start the Next.js development server:
    ```bash
    npm run dev
    ```

3.  **Open the application:**
    Open your browser and navigate to [http://localhost:9002](http://localhost:9002) to see the application.

    - The registration form is available at the home page.
    - The admin dashboard is at `/admin`. Use the password you set in the `.env.local` file to log in.
