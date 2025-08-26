import { Brain, Quote, Heart, Newspaper } from "lucide-react";

// Navigation items data with icons
export const navItems = [
  { name: "Mindful", icon: Brain },
  { name: "Quotes", icon: Quote },
  { name: "Mood", icon: Heart },
  { name: "News", icon: Newspaper },
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
  { text: "Stay hungry, stay foolish.", author: "Steve Jobs" },
  {
    text: "The future belongs to those who believe in the beauty of their dreams.",
    author: "Eleanor Roosevelt",
  },
  {
    text: "It is during our darkest moments that we must focus to see the light.",
    author: "Aristotle",
  },
];

// Sample tech news to be used as a fallback if the API fails
export const sampleNews = [
  {
    title: "Revolutionary AI Breakthrough in 2024",
    description:
      "Scientists achieve unprecedented advances in artificial intelligence, opening new possibilities for human-machine collaboration.",
    urlToImage:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=200&fit=crop",
    source: { name: "Tech Today" },
    url: "#",
  },
  {
    title: "Quantum Computing Milestone Reached",
    description:
      "Major tech companies announce significant progress in quantum computing development, promising revolutionary changes.",
    urlToImage:
      "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=200&fit=crop",
    source: { name: "Quantum Weekly" },
    url: "#",
  },
  {
    title: "Sustainable Tech Innovations Lead 2024",
    description:
      "Green technology solutions dominate the tech landscape, focusing on environmental sustainability and clean energy.",
    urlToImage:
      "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=400&h=200&fit=crop",
    source: { name: "Green Tech News" },
    url: "#",
  },
];
