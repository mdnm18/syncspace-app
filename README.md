# SyncSpace 🧘‍♂️ - A Mindful Dashboard

SyncSpace is a responsive single-page web application designed to help users find a moment of balance between inner peace and the digital world. It provides a suite of mindfulness tools—including a guided breathing exercise, a mood tracker, and a mindfulness journal—alongside a feed of the latest tech news and motivational quotes.

This project was developed as a submission for the Team Envision club at SRMIST. The initial task was to create a simple single-page website with animations. However, I saw an opportunity to go beyond the basic requirements and build a product with a real purpose: to create a tool that I and others could use to stay centered while staying connected.

## ✨ Live Demo & Screenshots

**Live Site:** [https://syncspace-app.vercel.app/](https://syncspace-app.vercel.app/)

### Light Mode

<img width="1413" height="853" alt="Screenshot 2025-08-31 at 5 09 18 PM" src="https://github.com/user-attachments/assets/4cd3882d-bdc4-4c70-be70-eb9e9d2adbff" />
<img width="1495" height="907" alt="Screenshot 2025-08-31 at 5 09 34 PM" src="https://github.com/user-attachments/assets/14fc18ea-4a62-4b93-97d7-c798fd5236b3" />
<img width="1496" height="902" alt="Screenshot 2025-08-31 at 5 10 05 PM" src="https://github.com/user-attachments/assets/f00683c1-e3c3-4bad-a058-ee7516bf32fd" />
<img width="1486" height="904" alt="Screenshot 2025-08-31 at 5 11 56 PM" src="https://github.com/user-attachments/assets/1f79c385-ba54-4f9e-9837-2dfbf0e4c92d" />
<img width="1496" height="893" alt="Screenshot 2025-08-31 at 5 13 19 PM" src="https://github.com/user-attachments/assets/8c9c1d43-b234-4ad5-9aa2-b0173d104a07" />
<img width="1482" height="889" alt="Screenshot 2025-08-31 at 5 13 43 PM" src="https://github.com/user-attachments/assets/307ac855-121d-4848-9839-199ae6f5de6d" />
<img width="1470" height="844" alt="Screenshot 2025-08-31 at 5 13 59 PM" src="https://github.com/user-attachments/assets/b79478c7-4350-4c64-aa00-d4ddfd9eee52" />


### Dark Mode

<img width="1492" height="892" alt="Screenshot 2025-08-31 at 5 09 50 PM" src="https://github.com/user-attachments/assets/855ae8d8-beb8-40a1-ae27-e97025580c55" />
<img width="1487" height="891" alt="Screenshot 2025-08-31 at 5 10 33 PM" src="https://github.com/user-attachments/assets/0abe15c6-db6d-4e03-bd77-ca34010a276d" />
<img width="1491" height="891" alt="Screenshot 2025-08-31 at 5 11 01 PM" src="https://github.com/user-attachments/assets/285c3708-513a-422a-a328-b6674db52e47" />
<img width="1484" height="892" alt="Screenshot 2025-08-31 at 5 12 58 PM" src="https://github.com/user-attachments/assets/23dc39fd-2c36-4ba7-8770-8eddc31b297e" />
<img width="1487" height="888" alt="Screenshot 2025-08-31 at 5 14 15 PM" src="https://github.com/user-attachments/assets/7a62bed0-2521-468f-8d58-2cec99c1e0e9" />


## 🚀 Features

SyncSpace is packed with features designed to be both functional and delightful to use.

### Core Mindfulness & Productivity Features:
- 🧘 **Mindful Minute**: A guided 1-minute breathing exercise with calming animations and optional ambient sound.
- 💡 **Quote of the Minute**: Fetches random motivational quotes from a live API, with caching for performance.
- 😊 **Mood Tracker & Journal**: Log your daily mood with emojis and write a corresponding journal entry. All data is saved to your browser's local storage.
- 📰 **Tech News Feed**: A Tinder-style swipable card stack of the latest technology news.
- ⭐ **Favorites Page**: Save your favorite quotes and news articles to a dedicated page to revisit them later.
- 📖 **Journal Page**: View and manage all your past mindfulness journal entries.

### Technical & UX Features:
- 🎨 **Dynamic 3D Background**: An animated particle system built with three.js that represents the balance between the calm of inner peace and the structure of the digital world.
- 📱 **Fully Responsive Design**: A seamless experience on all devices, with a dedicated multi-page layout and animated navigation for mobile.
- 🌗 **Light & Dark Mode**: A sleek, themeable interface that respects user preferences.
- ⚡ **High Performance**: Utilizes API caching, skeleton loaders, and lazy loading for a fast and smooth experience.
- 👆 **Haptic Feedback**: Subtle vibrations on interactive elements for a more tactile experience on supported mobile devices.

## 🛠️ Tech Stack

This project uses a modern, professional frontend stack.

- **Framework**: ReactJS (with Vite)
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion, React Type Animation, SwiperJS
- **3D Graphics**: Three.js, React Three Fiber, React Three Drei
- **Icons**: Lucide React
- **APIs**:
  - [dummyjson](https://dummyjson.com) for random quotes
  - [GNews](https://gnews.io) for live technology news
- **Local Storage**: Browser localStorage for persisting mood data, journal entries, and favorites

## 🧠 My Thought Process & Approach

The objective was to create a simple single-page website, but I saw it as an opportunity to build a product that solves a real problem for students and professionals: the difficulty of staying mindful in a hyper-connected world. The name **SyncSpace** was chosen to reflect this core idea: a digital space to synchronize your inner state with the external world.

### Design and Animation Philosophy

The design is inspired by the "liquid glass" aesthetic of modern interfaces like macOS and Samsung's OneUI. This meant using:

- `backdrop-blur` and semi-transparent backgrounds to create a sense of depth
- Generous padding and rounded corners (`rounded-full`, `rounded-3xl`) for a soft, friendly feel
- **Framer Motion** was chosen for all UI animations. The alternative was simple CSS transitions, but Framer Motion's `layoutId` feature was essential for creating the beautiful, seamless "sliding pill" animation in both the desktop and mobile navigation bars
- **SwiperJS** was selected for the news feed specifically for its "cards" effect, which provides an intuitive, mobile-friendly way to browse content

### Component Architecture

I started with a single component and refactored it into a modular, component-based architecture. This separation of concerns is crucial for scalability and maintainability.

```
/src
├── /assets
├── /components
│   ├── Clock.jsx
│   ├── DynamicBackground.jsx
│   ├── Favorites.jsx
│   ├── Footer.jsx
│   ├── Header.jsx
│   ├── Journal.jsx
│   ├── Loader.jsx
│   ├── MindfulMinute.jsx
│   ├── MobileMenu.jsx
│   ├── MoodTracker.jsx
│   ├── NewsSection.jsx
│   ├── NewsSkeleton.jsx
│   └── QuoteSkeleton.jsx
├── /constants
│   └── data.js
├── /hooks
│   ├── useCachedFetch.js
│   ├── useDarkMode.js
│   ├── useHapticFeedback.js
│   ├── useIsMobile.js
│   ├── useLocalStorage.js
│   └── useScrollSpy.js
└── App.jsx
```

### State Management and Custom Hooks

Instead of keeping all logic in `App.jsx`, I created custom hooks to manage distinct pieces of functionality. This is a more advanced approach that leads to cleaner, more reusable code.

- **`useDarkMode.js`**: Encapsulates all logic for toggling the theme and saving the user's preference to localStorage
- **`useIsMobile.js`**: Centralizes the logic for checking screen size, enabling the switch between desktop and mobile layouts
- **`useScrollSpy.js`**: Solves the problem of the navbar not updating on manual scroll
  - **Alternative Approach**: Listening directly to the `window.onscroll` event. I rejected this because it can be performance-intensive, as the event fires hundreds of times during a scroll
  - **Chosen Approach**: I implemented the modern Intersection Observer API. This is far more efficient as the browser handles the detection, and I wrapped this logic in a custom hook to keep `App.jsx` clean
- **`useLocalStorage.js`**: Creates a reusable hook that syncs a React state variable with localStorage, which is used for both Favorites and the Journal
- **`useCachedFetch.js`**: Manages API caching to improve performance and reduce API calls

### API Integration and Security

For fetching data, I chose free and reliable APIs. A critical decision was how to handle the news API key.

- **Alternative Approach**: The simplest way is to hardcode the key directly in `NewsSection.jsx`. However, this is a major security risk, as the key would be exposed if the code were ever pushed to a public GitHub repository
- **Chosen Approach**: I used a `.env` file to store the API key as an environment variable. Vite automatically makes variables prefixed with `VITE_` available in the `import.meta.env` object. I then added `.env` to the `.gitignore` file. This is the industry-standard method for keeping secrets secure

## 📦 Setup and Installation

To run this project locally, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone https://https://github.com/mdnm18/syncspace-app.git
   cd syncspace-app
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up your API key:**
   - Create a new file in the root of the project named `.env`
   - Get a free API key from [GNews.io](https://gnews.io)
   - Add your key to the `.env` file:
     ```env
     VITE_GNEWS_API_KEY="YOUR_API_KEY_HERE"
     ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. The application will be available at `http://localhost:5173`

## 📞 Contact

Thank you for reviewing my submission!

**Md Nayaj Mondal**
- **GitHub:** [@mdnm18](https://github.com/mdnm18)
- **LinkedIn:** [Md Nayaj Mondal](https://linkedin.com/in/your-profile)

---

⭐ **If you found this project helpful, please give it a star!**






<br>
<hr>
<br>










# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
