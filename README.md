
---

# Pixy - Modern News & Magazine Portal

**Pixy** is a high-end, responsive news and magazine landing page built with React. It features a dark-themed, sleek UI/UX designed for modern content consumption, including categorized news sections, trending sidebars, and breaking news tickers.

## 🚀 Features

* **Dynamic Hero Section:** Featured article with high-impact visuals and spatial computing focus.
* **Breaking News Ticker:** A scrolling marquee for real-time headlines.
* **Categorized Grid:** Dedicated sections for Technology, Food, Health, Business, Finance, Entertainment, and Lifestyle.
* **Trending Sidebar:** A ranked list of the most popular articles with thumbnails and metadata.
* **Newsletter Subscription:** Integrated call-to-action for user engagement.
* **Dark Mode UI:** Optimized for readability and a premium aesthetic.
* **Fully Responsive:** Designed to look great on desktops, tablets, and mobile devices.

## 🛠️ Tech Stack

* **Frontend:** React.js
* **Styling:** Tailwind CSS (or CSS Modules)
* **Icons:** Lucide React / Heroicons
* **Animations:** Framer Motion (recommended for the news ticker and card hover effects)
* **Deployment:** Vercel / Netlify

## 📁 Project Structure

```text
src/
├── components/
│   ├── Navbar/            # Logo, Navigation links, Search, and Auth
│   ├── BreakingNews/      # The scrolling news ticker
│   ├── HeroSection/       # Main feature card (VR Office setup)
│   ├── Sidebar/           # Trending News 01-05
│   ├── ArticleCard/       # Reusable card component for grid items
│   ├── Newsletter/        # Email signup section
│   └── Footer/            # Brand info and legal links
├── assets/                # Images and brand icons
├── data/                  # Mock JSON data for articles
├── App.js                 # Main layout assembly
└── index.css              # Global styles and Tailwind imports

```

## ⚙️ Installation & Setup

1. **Clone the repository:**
```bash
git clone https://github.com/your-username/Pixy-news.git
cd Pixy-news

```


2. **Install dependencies:**
```bash
npm install

```


3. **Start the development server:**
```bash
npm start

```


4. **Build for production:**
```bash
npm run build

```



## 📝 Components Guide

### Navbar

Includes a theme toggle (light/dark mode), search functionality, and authentication buttons (Sign in / Sign up).

### Hero Section

Displays the primary story. Based on the design, it utilizes a large image background with a glassmorphism overlay for the article details.

### Trending News Sidebar

Maps through an array of "trending" objects. Each item includes a rank number, thumbnail, category, title, and "time to read" metadata.

### Article Grid

A flexible CSS Grid layout that displays cards with specific category tags (e.g., `BUSINESS`, `FINANCE`).

## 🎨 Design Specifications

* **Primary Background:** `#121926` (Deep Navy/Dark Gray)
* **Accent Color (Buttons/Tags):** Cyan/Teal (`#00C2CB`)
* **Typography:** Modern Sans-serif (Inter, Montserrat, or Roboto)
* **Card Radius:** `12px` - `16px` for a soft, modern feel.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](https://www.google.com/search?q=LICENSE) file for details.

---

*Developed with ❤️ by Pixy .*