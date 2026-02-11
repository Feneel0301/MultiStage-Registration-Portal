📋 Multi-Stage Registration System (React)

This project is a role-based multi-stage registration system built using React, React Router, and Context API.
The main purpose of this project is to demonstrate routing control, shared state management, validation handling, and navigation locking in a real-world registration flow.

🔍 Project Features

Multi-stage registration (Stage 1 → Stage 3)

Role-based forms (Student / Teacher / Professor)

Centralized state management using Context

Navigation locking to prevent skipping stages

Visual progress bar with dynamic colors

Final success screen after completion

🗂️ Folder Structure Overview
src/
│
├── components/
│   ├── forms/              # Role-specific forms
│   ├── Header.jsx
│   └── Progressbar.jsx
│
├── context/
│   └── StateContext.jsx    # Global registration state
│
├── hooks/
│   └── useNavigationLock.js # Custom Hook For stage locking
│
├── layout/
│   └── DashboardLayout.jsx  #container
│
├── pages/
│   ├── Home.jsx
│   ├── Stage1.jsx           # Stage based components
│   ├── Stage2.jsx
│   ├── Stage3.jsx
│   └── Success.jsx
│
├── routes/
│   ├── AppRoutes.jsx
│   ├── IndexRoute.jsx       #routing
│   └── RegisterRoutes.jsx
│
└── config/
    └── progressColors.js   # seprate colorconfig object for dynamic progressbar

🧭 Routing Structure

Routing is implemented using React Router with nested routes.

Main Routes

/ → Home page

/register → Parent registration route

Registration Stages

/register/stage1 → Role selection

/register/stage2 → Role-specific form

/register/stage3 → Review & confirmation

/success → Final success page

Why Nested Routing?

Keeps layout and progress bar consistent

Allows stage-based access control

Makes route protection easier

🔄 State Flow (Context API)

Global state is handled using StateContext.

Stored Data Includes:

Selected role

Current stage

Completed stages

Form data per role

Progress percentage

Flow:

Stage 1 sets the user role

Stage 2 stores form data (Student / Teacher / Professor)

Stage 3 confirms and finalizes submission

Completion updates global state and unlocks next stages

This avoids prop drilling and keeps data consistent across pages.

✅ Validation Strategy

Validation is handled inside individual form components.

All inputs are controlled

Each form calculates its own isValid state

useEffect is used to notify parent components

Navigation is blocked if validation fails

This approach keeps:

Validation logic close to inputs

Forms reusable and readable

Errors easy to debug

🪝 Custom Hook: useNavigationLock

A custom hook is used to prevent users from skipping stages.

What it does:

Checks if the previous stage is completed

Redirects user back if access is invalid

Runs automatically when a stage loads

Why a Custom Hook?

Keeps locking logic reusable

Avoids repeating checks in every page

Separates business logic from UI
🔒 Stage Locking Logic

Stage access is controlled using:

completedStages stored in context

Route checks on each stage

useNavigationLock hook

Example Logic:

Stage 2 cannot open unless Stage 1 is completed

Stage 3 cannot open unless Stage 2 is completed

Manual URL access is blocked

This ensures:

No skipped steps

Valid registration data

Clean user flow

📊 Progress Bar Logic

The progress bar:

Updates based on the current stage

Uses dynamic colors from progressColors.js

Reflects completion visually

Progress updates when:

A stage is successfully completed

Validation passes

Context state changes

🚀 Final Submission Flow

User completes all stages

Data is validated

Registration state is finalized

User is redirected to the Success page

🎯 Learning Outcomes

Through this project, the following concepts were implemented:

Nested routing in React

Context-based global state

Controlled forms & validation

Custom hooks for navigation control

Stage-based UI locking

Clean component architecture
