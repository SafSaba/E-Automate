# **App Name**: E-Automate

## Core Features:

- User Authentication: Provide user authentication and role management to access different functionalities.
- Product Catalog: Showcase products with detailed information including images, description, and pricing, fetched directly from Firestore.
- Shopping Cart: Allow users to add, view, modify, and manage products in a shopping cart persisted across sessions.
- Checkout & Payment: Guide users through a multi-step checkout process, integrating with Stripe for payment processing. Uses Firebase functions to orchestrate the requests with Stripe, for Visa, Paypal and Klarna.
- Order History: Enable users to view past order details with order status.
- AI Suggested Items: Suggest related products using the Gemini API based on product description using a tool, to determine which suggested items may be appropriate for the particular user.
- Admin Functionality: Offer a simple admin panel to manage products for setting up test data.

## Style Guidelines:

- Primary color: HSL(45, 100%, 50%) - A vibrant gold (#FFDA63) to convey value and trust, crucial for e-commerce platforms.
- Background color: HSL(45, 20%, 95%) - Very light cream (#F8F7F4) provides a soft backdrop that emphasizes content.
- Accent color: HSL(15, 100%, 45%) - A warm orange (#FF7800) highlights important calls to action and elements, complementing the gold and enhancing user interaction.
- Body and headline font: 'Inter' (sans-serif) for clear and accessible readability throughout the application, ensuring smooth content consumption.
- Consistent use of modern line icons from Lucide React to ensure clarity and easy recognition of various functions. The weight should be kept consistent.
- A clean, grid-based layout with clear visual hierarchy, utilizing Tailwind CSS to create a responsive design adaptable to various screen sizes, ensuring an optimal and consistent user experience across devices.
- Subtle, functional animations for transitions and feedback (e.g., cart updates, loading states) to enhance the user experience without being intrusive. Aim to reduce the user’s cognitive load.