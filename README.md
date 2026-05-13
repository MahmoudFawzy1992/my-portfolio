# Mahmoud Fawzy — Professional Portfolio

A high-performance, responsive portfolio built with **React**, **Vite**, and **Framer Motion**. Optimized for SEO, performance (LCP), and accessibility.

## 🚀 Key Features
- **Modern UI/UX:** Neumorphic design language with smooth Framer Motion animations.
- **Project Grid:** Dynamic filtering with automatic top-to-bottom image scrolling on hover.
- **Responsive:** 100% mobile-friendly with fluid layouts.
- **SEO Optimized:** Full meta tag support, Schema.org JSON-LD, and preloaded assets.
- **Contact Form:** Integrated with EmailJS and protected by bot-detection (Honeypot).

---

## 🛠️ Deployment Instructions (Hostinger)

Since this is a Vite/React application, you need to build it into static files before uploading.

### 1. Build the Project
Open your terminal in the project folder and run:
```bash
npm run build
```
This will create a `dist/` folder. This folder contains the production-ready version of your site.

### 2. Upload to Hostinger
1. Log in to your **Hostinger hPanel**.
2. Go to **File Manager** for your domain.
3. Open the `public_html` folder.
4. Upload all the contents **inside** the `dist/` folder (not the folder itself) directly into `public_html`.

### 3. Environment Variables
Hostinger's standard shared hosting is for static files. Your `.env` variables are baked into the code during the `npm run build` process. **Ensure your `.env` file is present locally before running the build command.**

---

## 📦 Git & GitHub Setup

Follow these steps to push your code to a new GitHub repository:

### 1. Initialize Git
```bash
git init
```

### 2. Add Files
```bash
git add .
```

### 3. Commit Changes
```bash
git commit -m "Initial commit: Professional portfolio ready for launch"
```

### 4. Link to GitHub
Go to GitHub, create a new empty repository (e.g., `my-portfolio`), and then run:
```bash
git remote add origin https://github.com/MahmoudFawzy1992/my-portfolio.git
git branch -M main
git push -u origin main
```

---

## 🛡️ Security & Performance Audit
- **Forms:** Honeypot anti-spam protection is active on the Contact form.
- **Security:** `.gitignore` prevents sensitive `.env` files and `node_modules` from being leaked to GitHub.
- **Performance:** Images are in WebP format, and the hero image is preloaded for a perfect Largest Contentful Paint (LCP) score.
- **Assets:** All assets reside in `public/assets/` for clean routing.

---

## 👨‍💻 Tech Stack
- **Frontend:** React 18, Vite
- **Animations:** Framer Motion
- **Icons:** React Icons (Fi)
- **Email Service:** EmailJS
- **Styling:** Vanilla CSS (Custom tokens)

---
© 2024 Mahmoud Fawzy. All Rights Reserved.
