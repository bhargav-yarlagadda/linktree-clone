# Connectly - Link Tree Clone

Connectly is a link tree clone built with Next.js, MongoDB, Motion, and Accentri UI. The app allows users to create a personalized landing page to showcase links to their social profiles, websites, or other resources.

## Features

- **User Profiles**: Create and manage personalized profiles.
- **Customizable Links**: Add, update, and remove links to your profile.
- **Mobile Responsive**: The design adapts to various screen sizes.
- **Interactive Animations**: Smooth animations powered by Framer Motion.
- **User Authentication**: Sign up, login, and manage accounts.
- **Data Persistence**: MongoDB to store user profiles and links.

## Tech Stack

- **Frontend**: Next.js, Accentri UI, Framer Motion
- **Backend**: Node.js, MongoDB
- **Authentication**: clerk auth and  JWT-based user authentication

## Routes
- **/** : Landing Page
- **/profile**: Editing user profile
- **/profile/new-user**: create a new profile
- **/sign-in, /sign-up**:  Auth routes
- **/user/${username}** Public url to display profile
  ### API end points
  - api/users
  - api/profile
  - api/user
## Installation

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/connectly.git
cd connectly
```
### 2. Install the dependencies
```bash
npm install
```
### 3 add your key to env
```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY= ""
CLERK_SECRET_KEY=""
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up



MONGO_URI = ""
```

### run the app
```bash
npm run dev

```


### ToDo's
integrate AWS S3 to store and manage user images
