# Login-UI
This login UI project features a modern, premium authentication interface with smooth 3D card flips, dark theme aesthetics, and classy animations. It features secure sign-in and sign-up flows, including custom country code selection, profile visuals, and a confirmation screen with realistic stamp-based confirmation for better user experience.

A premium, animated login / signup UI built with React + Vite + Tailwind CSS.
Features a 3D flipping card, centered profile in sign-in, searchable floating country-code selector, and a realistic stamped confirmation animation after signup.

<h3># 1. Clone or copy the project folder to your machine:<h3>
git clone <repo-or-copy-path> login-ui-vite
cd login-ui-vite

<h3># 2. Install dependencies:</h3>

npm install

<h3># 4. Start the dev server:</h3>
npm run dev


# Project overview

This project is a single-page React UI that demonstrates a polished authentication card with front (info + Sign In / Sign Up buttons), back (Sign In and Sign Up forms), and a confirmation face that shows a realistic stamped REGISTERED animation.                                                Key behaviors:

📌 Clicking Sign In flips the card to the Sign In face (profile centered at the top). The Sign In form includes username/password, a show/hide      password control, and "Forgot password?" link.

📌 Clicking Sign Up flips to the Sign Up form (profile left-aligned). The phone field includes a small compact country selector button — click      it to open a floating, searchable list with flags and country codes.

📌 When the user fills required sign-up fields and clicks Sign Up, the UI validates locally, then flips to a confirmation face and, after 1         second, plays a "stamp hit" animation that visually confirms registration (not placed on the details card).

📌 Smooth 3D flip animation, glassmorphism/dark theme, premium gradients and shadows.


## 📁 File Structure
```
login-ui-vite/
│
├── index.html
├── package.json
├── vite.config.mjs
├── tailwind.config.js
├── postcss.config.cjs
│
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── index.css
    └── LoginCard.jsx
``` 

# ✨ Key Features

🔷 3D flip animation between card faces

🔷 Sign In UI with centered profile image

🔷 Sign Up UI with username, email, phone, password

🔷 Floating searchable country-code selector with flags

🔷 Password show/hide toggle

🔷 Animated stamp confirmation after successful signup

🔷 Glassmorphism aesthetic with gradients and shadows

🔷 Mobile-friendly responsive design

🔷 Smooth transitions using GPU transforms

# 🖼️ Screenshots
![Front Card](images/front.png)

![Sign In](images/signin.png)

![Sign Up](images/signup.png)

![Confirmation Stamp](images/confirmation.png)

# 📜 License
You are free to use, modify, and distribute this project.



# Contact

If you want help extending the UI (theme change, backend wiring, animations, or accessibility improvements), tell me what you need and I’ll provide code changes or a patch.

Enjoy building! 🔐✨
