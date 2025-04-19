# 🐂 Bullx – Options Scanner & Paper Trading Platform

**Bullx** is an elegant, user-friendly platform designed to help retail investors navigate the stock options market with confidence. Featuring an options scanner, market trends, watchlist management, and paper trading functionality — Bullx combines powerful tools with simplicity and clarity.

---

## 🚀 Features

- 🔐 **Authentication**
  - Auth0 integration using Authorization Code Flow with PKCE
  - Federated logout via Auth0 `/v2/logout`
  - Protected dashboard with session-based conditional rendering

- 📊 **Dashboard**
  - Personalized layout after login
  - Sidebar navigation (Scanner, Trends, Watchlist, Paper Trading, Settings)
  - Responsive layout with future subheaders and user profile menu

- 📈 **Options Scanner** *(In Progress)*
  - Will allow users to scan options contracts by probability metrics

- 📋 **Watchlist** *(Coming Soon)*
  - Manage and track your favorite stocks and contracts

- 📉 **Market Trends** *(Coming Soon)*
  - Visualize trending stocks and predictive indicators

- 💸 **Paper Trading** *(Coming Soon)*
  - Simulated trading environment with virtual capital

---

## 🛠️ Tech Stack

- **Next.js** (App Router)
- **React** with Client Components
- **Auth0** for authentication
- **TypeScript**
- **SCSS** for styling
- **Tailwind CSS** (planned for component layouts)
- **Node.js + Express/NestJS** backend (API integration in progress)

---

## 📦 Setup Instructions

1. **Clone the repo**
   ```bash
   git clone https://github.com/your-username/bullx.git
   cd bullx
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env.local` file in the root of the project:

   ```env
   AUTH0_SECRET=your-secret
   AUTH0_BASE_URL=http://localhost:3000
   AUTH0_ISSUER_BASE_URL=https://your-tenant.auth0.com
   AUTH0_CLIENT_ID=your-client-id
   AUTH0_CLIENT_SECRET=your-client-secret
   AUTH0_POST_LOGOUT_REDIRECT_URI=http://localhost:3000
   ```

4. **Run the dev server**
   ```bash
   npm run dev
   ```

---

## 🔐 Security Notes

- `.env.local` is gitignored and should **never** be committed.
- Auth0 session handling is managed server-side; logout fully clears sessions and cookies.

---

## 📌 Roadmap

- [ ] Options Scanner UI & Filters
- [ ] Backend integration for real-time data
- [ ] Subheaders & profile dropdowns on each dashboard section
- [ ] Paper trading engine
- [ ] Mobile responsiveness
- [ ] Public marketing landing page

---

## 📄 License

This project is licensed under the MIT License.

---

## 🙌 Credits

Made with 💡 by [Girum Hagos]  
Powered by [Auth0](https://auth0.com) and Next.js
