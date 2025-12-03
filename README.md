# Secure Access Dashboard

A modern web application for managing guest access, authentication,
one-time codes, and user information display.\
Built using **Next.js**, **React**, **TailwindCSS**, **ShadCN UI**,
**Formik**, and **Yup**.

## Features

- Login with one-time code
- Protected routes with automatic redirect
- Modern UI (Tailwind + ShadCN)
- Responsive layout
- Guest creation and management
- Form validation using Yup
- Loading states for buttons and modals

## Tech Stack

- Next.js 14 (App Router)
- React
- TypeScript
- TailwindCSS
- ShadCN/UI
- Formik + Yup

## Installation

    git clone https://github.com/nikolinaasarac/AccessControl.git
    cd AccessControl/frontend
    npm install
    npm run dev
    cd AccessControl/backend
    npm install
    npm run start:dev

The app will be available at: http://localhost:3000

## Environment Variables

Create a .env.local file inside the frontend folder and add:

    NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api

Create a .env file inside the backend folder and configure your environment variables:

    TYPE=
    PROJECT_ID=
    PRIVATE_KEY_ID=
    PRIVATE_KEY=""
    CLIENT_EMAIL=
    CLIENT_ID=
    UTH_URI=
    TOKEN_URI=
    AUTH_CERT_URL=
    CLIENT_CERT_URL=
    UNIVERSAL_DOMAIN=
    FIREBASE_API_KEY=
    CLIENT_URL=http://localhost:3000

## Project Structure

    src/
        backend/
            src/
            auth/
            base/
            firebase/
            guests/
            otc/
            shared/
            test/
        frontend/
            app/
              guests/
              login/
            components/
            context/
            dto/
            lib/
            models/
            schemas/
            shared/
        

## Author

Nikolina Sarac\
Email: nikolinasarac28@gmail.com\
GitHub: https://github.com/nikolinaasarac
