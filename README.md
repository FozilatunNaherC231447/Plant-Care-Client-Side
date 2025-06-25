# Plant Care Tracker 🌿

A full-stack, mobile-responsive web application designed to help users manage and monitor the care of their indoor and outdoor plants. This digital assistant allows plant enthusiasts to track daily care tasks like watering, fertilizing, and monitoring plant health, all in one convenient platform.

---

## Live Demo
[https://plant-care-cd837.web.app/](https://plant-care-cd837.web.app/)

---

## Features

- **User Authentication:** Secure registration and login with email/password and Google OAuth integration.
- **Personalized Dashboard:** Users can add, update, and delete their own plants with detailed information.
- **Mobile-Responsive UI:** Designed to work seamlessly across mobile, tablet, and desktop devices.
- **Plant Management:** Add plants with fields like category, care level, watering frequency, health status, and next watering date.
- **Sorting & Filtering:** Sort plant listings by next watering date or care level for better organization.
- **Private Routes:** Secure pages like "Add Plant", "My Plants", and "View Details" are accessible only after login.
- **Creative Theming:** Unique plant category theme with a beautiful, intuitive interface including banner sliders and sections for tips.
- **Meaningful Feedback:** Styled success and error messages (using toast notifications) replace default alerts.
- **Dark/Light Mode:** Toggle between dark and light themes for comfortable viewing preferences.
- **Enhanced UX:** Includes loading spinners, confirmation modals for deletions, and tooltips for helpful hints.
- **Third-Party Packages:** Integrates libraries like Lottie React for animations and Date-fns for date handling.

---

## Tech Stack

- **Frontend:** React, React Router, Tailwind CSS, React Toastify, Lottie React, Date-fns
- **Backend:** Node.js, Express, MongoDB (Atlas)
- **Authentication:** Firebase Authentication (Email/Password & Google OAuth)
- **Deployment:** Vercel (Frontend), Backend API on Vercel/Node.js server

---

## Project Structure

- `/client` — React frontend with all UI components, routing, and state management
- `/server` — Express backend API with MongoDB integration and secure route handling
- `/api` — API routes for plants management with CRUD operations
