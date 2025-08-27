import {
  Brain,
  Quote,
  Heart,
  Newspaper,
  Bookmark,
  BookOpen,
} from "lucide-react";

// Navigation items data with icons for all sections
export const navItems = [
  { name: "Mindful", icon: Brain },
  { name: "Quotes", icon: Quote },
  { name: "Mood", icon: Heart },
  { name: "News", icon: Newspaper },
  { name: "Favorites", icon: Bookmark },
  { name: "Journal", icon: BookOpen },
];

// Moods data for the Mood Tracker component
export const moods = [
  { emoji: "😊", label: "Happy", color: "from-yellow-400 to-orange-500" },
  { emoji: "😔", label: "Sad", color: "from-blue-400 to-blue-600" },
  { emoji: "😰", label: "Stressed", color: "from-red-400 to-red-600" },
  { emoji: "😌", label: "Calm", color: "from-green-400 to-green-600" },
  { emoji: "🤩", label: "Excited", color: "from-purple-400 to-pink-500" },
];

// Sample quotes to be used as a fallback if the API fails
export const sampleQuotes = [
  {
    text: "The only way to do great work is to love what you do.",
    author: "Steve Jobs",
  },
  {
    text: "Innovation distinguishes between a leader and a follower.",
    author: "Steve Jobs",
  },
  {
    text: "The future belongs to those who believe in the beauty of their dreams.",
    author: "Eleanor Roosevelt",
  },
];

// Sample tech news to be used as a fallback if the API fails
export const sampleNews = [
  {
    title: "Revolutionary AI Breakthrough in 2024",
    description:
      "Scientists achieve unprecedented advances in artificial intelligence.",
    urlToImage:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=200&fit=crop",
    source: { name: "Tech Today" },
    url: "#",
  },
  {
    title: "Quantum Computing Milestone Reached",
    description:
      "Major tech companies announce significant progress in quantum computing.",
    urlToImage:
      "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=200&fit=crop",
    source: { name: "Quantum Weekly" },
    url: "#",
  },
];
