# Social Media Application

This is a basic social media application developed as part of the Full Stack Developer Assessment for MD TECH. The application demonstrates core functionalities such as user authentication, post creation, and displaying a feed of posts. It is built with a clean architecture and follows best practices to ensure maintainability and scalability.

## 🚀 Live Demo

The project is deployed on **Vercel**. You can access the live application here:

### 🌟 **[LIVE DEMO](https://socialproject-omega.vercel.app/)** 🌟

---

## Features

### 1. Authentication
- User login and signup functionality using **Supabase Auth**.
- Password-based authentication with proper validation and error handling.
- Usernames are stored in a separate `profiles` table linked to the default `auth.users` table.

### 2. Frontend Development
- Built with **Next.js** and **TypeScript** for a modern, scalable frontend.
- Responsive design with a user-friendly and visually intuitive interface.

### 3. Core Features
#### Login/Signup Page
- Allows users to register and log in using their email and password.
- Enables users to set a username during signup, stored in the `profiles` table.
- Provides validation and error messages for form inputs.

#### Post Creation Page
- A simple page where logged-in users can create a post with text content.
- Metadata such as timestamp and user details is included.

#### Feed Page
- Displays all posts from the database in reverse chronological order (latest first).
- Each post shows the user's username, post content, and timestamp.

### 4. Database Design
- **Supabase PostgreSQL** is used to create and manage the database.
- Tables include `users` (via `auth.users`), `profiles`, `posts`, and `likes` with proper relationships.

### 5. Technology Stack
- **Frontend**: Next.js (with TypeScript)
- **Backend**: Supabase (Auth and PostgreSQL)
- **Styling**: Tailwind CSS

---

## Project Setup

### Prerequisites
- Node.js (v16 or later)
- NPM or Yarn package manager
- Supabase account and project

### Steps to Run Locally

1. **Clone the Repository**
   ```bash
   git clone https://github.com/GautamRakholiya-1302/social_media_application.git
   cd social_media_application
   ```

2. **Install Dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Configure Environment Variables**
   - Create a `.env.local` file in the root of the project.
   - Add the following environment variables:
     ```env
     NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
     NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
     ```
   - Replace `your_supabase_url` and `your_supabase_anon_key` with your Supabase project credentials.

4. **Run the Development Server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```
   - The app will be available at `http://localhost:3000/`.

5. **Set Up Supabase**
   - Create tables for `profiles`, `posts`, and `likes` in your Supabase project.
   - Define relationships between `auth.users` and `profiles`, and between users, posts, and likes.

6. **Build for Production**
   ```bash
   npm run build
   npm start
   ```

---

## Database Schema

### Tables:
1. **auth.users** (default table provided by Supabase Auth)
   - `id`: UUID (Primary Key)
   - `email`: String
   - `password`: String (managed by Supabase Auth)

2. **Profiles**
   - `id`: UUID (Primary Key, references `auth.users.id`)
   - `username`: Text (unique)

3. **Posts**
   - `id`: UUID (Primary Key)
   - `user_id`: UUID (Foreign Key referencing `auth.users.id`)
   - `content`: Text
   - `created_at`: Timestamp

4. **Likes**
   - `id`: UUID (Primary Key)
   - `post_id`: UUID (Foreign Key referencing `posts.id`)
   - `user_id`: UUID (Foreign Key referencing `auth.users.id`)
   - `created_at`: Timestamp

---

## Code Quality
- Clean and modular code structure.
- Comments are included to explain complex logic.
- Written in TypeScript to ensure type safety.

---

## Deployment

The application is deployed on **Vercel** for ease of access and demonstration:

**[Live Demo](https://socialproject-omega.vercel.app/)**

---

## How to Test

1. Open the live demo link or run the project locally.
2. Create a new account using the signup page.
3. Log in with your credentials.
4. Create a post on the post creation page.
5. View the post in the feed page.

---

## Additional Notes

- This project showcases a basic implementation of the requested features. Additional improvements and features can be added as needed.

