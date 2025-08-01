# Safwan Saba - Portfolio

This is a Next.js application that serves as a personal portfolio and includes a sample e-commerce platform called E-Automate. It uses Firebase for the backend and Genkit for AI-powered features.

## Core Features:

- **Portfolio Showcase**: A dedicated "About Me" section highlighting skills, experience, and projects.
- **User Authentication**: Provides user authentication and role management to access different functionalities within the e-commerce section.
- **Product Catalog**: Showcases products with detailed information including images, description, and pricing, fetched directly from Firestore.
- **Shopping Cart**: Allows users to add, view, modify, and manage products in a shopping cart persisted across sessions.
- **Checkout & Payment**: Guides users through a multi-step checkout process, integrating with Stripe for payment processing. Uses Firebase functions to orchestrate the requests with Stripe for various payment methods.
- **Order History**: Enables users to view past order details with order status.
- **AI Suggested Items**: Suggests related products using the Gemini API based on product descriptions.
- **Admin Functionality**: Offers a simple admin panel to manage products for setting up test data.

## Getting Started

First, install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:9002](http://localhost:9002) with your browser to see the result.

## Project Structure

*   **`src/app/`**: This is the main directory for the Next.js application, using the App Router. Each subdirectory in here represents a route in the application.
*   **`src/components/`**: This directory contains the reusable React components used throughout the application.
*   **`src/hooks/`**: This directory contains custom React hooks.
*   **`src/lib/`**: This directory contains the application's business logic.
*   **`src/ai/`**: This directory contains the AI-related code.
*   **`docs/`**: This directory contains the project documentation.
*   **`public/`**: This directory contains the static assets for the application.
*   **`next.config.ts`**: The configuration file for Next.js.
*   **`package.json`**: The project's dependencies and scripts.
*   **`tailwind.config.ts`**: The configuration file for Tailwind CSS.
*   **`tsconfig.json`**: The configuration file for TypeScript.
