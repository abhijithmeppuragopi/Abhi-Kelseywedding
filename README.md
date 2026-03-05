# 💍 Abhijith & Kelsey — Wedding Website

A beautiful, full-stack wedding website with RSVP functionality, built with React, Tailwind CSS, Node.js, and MongoDB.

---

## 📁 Project Structure

```
wedding/
├── frontend/          # React app (Create React App + Tailwind CSS)
│   ├── src/
│   │   ├── pages/
│   │   │   ├── WeddingPage.jsx   # Main wedding page
│   │   │   └── AdminPage.jsx     # Admin dashboard
│   │   ├── App.js
│   │   ├── index.js
│   │   └── index.css
│   ├── public/index.html
│   ├── tailwind.config.js
│   └── package.json
│
└── backend/           # Express + MongoDB API
    ├── server.js
    ├── .env.example
    └── package.json
```

---

## 🚀 Local Development

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)

### Backend Setup

```bash
cd backend
npm install

# Copy and fill in environment variables
cp .env.example .env
# Edit .env with your MongoDB URI and admin key

npm run dev
# Runs on http://localhost:5000
```

### Frontend Setup

```bash
cd frontend
npm install

# Create .env.local (for local dev, proxy handles /api automatically)
# For production, set REACT_APP_API_URL=https://your-backend-url.com

npm start
# Runs on http://localhost:3000
```

---

## 🔐 Admin Panel

Visit `/admin` on your site.

Default admin key: `abhijith-kelsey-2025`

Change it by setting `ADMIN_KEY` in your backend `.env` file.

Features:
- View all RSVPs with stats
- Filter by attendance status
- Delete individual RSVPs
- Export all RSVPs as CSV

---

## 🌍 Deployment

### Option 1: Railway (Recommended — Full Stack)

1. Push your project to GitHub
2. Go to [railway.app](https://railway.app) and create a new project
3. **Add MongoDB**: Click "+ New" → "Database" → "MongoDB"
4. **Deploy Backend**:
   - Click "+ New" → "GitHub Repo" → select your repo
   - Set root directory to `/backend`
   - Add environment variables:
     ```
     MONGODB_URI=${{MongoDB.MONGO_URL}}
     ADMIN_KEY=your-secret-key
     PORT=5000
     ```
5. **Deploy Frontend**:
   - Click "+ New" → "GitHub Repo" → select same repo
   - Set root directory to `/frontend`
   - Add environment variable:
     ```
     REACT_APP_API_URL=https://your-backend.railway.app
     ```
   - Build command: `npm run build`
   - Start command: `npx serve -s build`

### Option 2: Render (Backend) + Netlify/Vercel (Frontend)

**Backend on Render:**
1. Go to [render.com](https://render.com) → New Web Service
2. Connect your GitHub repo, set root to `/backend`
3. Build command: `npm install`
4. Start command: `node server.js`
5. Add environment variables (MONGODB_URI from MongoDB Atlas, ADMIN_KEY)

**Frontend on Netlify:**
1. Go to [netlify.com](https://netlify.com) → New site from Git
2. Set base directory to `frontend`
3. Build command: `npm run build`
4. Publish directory: `frontend/build`
5. Add environment variable: `REACT_APP_API_URL=https://your-render-backend.onrender.com`

**MongoDB Atlas (Free Tier):**
1. Go to [mongodb.com/atlas](https://mongodb.com/atlas)
2. Create free cluster → Get connection string
3. Add to backend `.env` as `MONGODB_URI`

### Option 3: Heroku (Backend) + Vercel (Frontend)

**Backend on Heroku:**
```bash
cd backend
heroku create your-wedding-api
heroku addons:create mongolab:sandbox  # or use Atlas URI
heroku config:set ADMIN_KEY=your-secret-key
git subtree push --prefix backend heroku main
```

**Frontend on Vercel:**
1. `vercel` CLI or connect GitHub
2. Set `REACT_APP_API_URL` to your Heroku app URL

---

## 🎨 Customization

### Adding Real Photos
Replace the Unsplash URLs in `WeddingPage.jsx`:
- Hero section: background image URL
- Love Story cards: `story.image` in the `stories` array
- Venue cards: `venue.image` in the `venues` array

### Changing Wedding Details
In `WeddingPage.jsx`, update:
- Date: search for `September 20, 2025`
- Names in `Nav`, `Hero`, `Footer` components
- Venue addresses and descriptions in `Venue` component
- Timeline times in `Timeline` component
- Attire notes in `Attire` component

### Changing Admin Key
Set `ADMIN_KEY` in your backend `.env` file.

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, React Router v6 |
| Styling | Tailwind CSS, Google Fonts (Cormorant Garamond, Great Vibes, Jost) |
| Backend | Node.js, Express 4 |
| Database | MongoDB + Mongoose |
| Icons | Lucide React |

---

Made with 💛 for Abhijith & Kelsey
