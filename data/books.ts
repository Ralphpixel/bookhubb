export type Review = {
  user: string;
  comment: string;
};

export type Book = {
  id: string;
  title: string;
  author: string;
  rating: number;
  genre: string;
  cover: string;
  reviews: Review[];
};

export const books: Book[] = [
  {
    id: "atomic-habits",
    title: "Atomic Habits",
    author: "James Clear",
    rating: 5,
    genre: "Self-Help",
    cover: "/images/atomic.jpg",
    reviews: [
      { user: "Alex", comment: "Life-changing habits framework." },
      { user: "Mia", comment: "Simple and practical advice." },
    ],
  },
  {
    id: "think-and-grow-rich",
    title: "Think and Grow Rich",
    author: "Napoleon Hill",
    rating: 4,
    genre: "Finance",
    cover: "/images/think.jpg",
    reviews: [
      { user: "Chris", comment: "Mindset is everything." },
    ],
  },
  {
    id: "rich-dad-poor-dad",
    title: "Rich Dad Poor Dad",
    author: "Robert Kiyosaki",
    rating: 4,
    genre: "Finance",
    cover: "/images/richdad.jpg",
    reviews: [
      { user: "Sam", comment: "Changed how I see money." },
    ],
  },
  {
    id: "deep-work",
    title: "Deep Work",
    author: "Cal Newport",
    rating: 5,
    genre: "Productivity",
    cover: "/images/deepwork.jpg",
    reviews: [
      { user: "Nina", comment: "Helped me focus better." },
    ],
  },
  {
    id: "cant-hurt-me",
    title: "Can't Hurt Me",
    author: "David Goggins",
    rating: 5,
    genre: "Motivation",
    cover: "/images/goggins.jpg",
    reviews: [
      { user: "Leo", comment: "Extreme but powerful." },
    ],
  },
  {
    id: "power-of-now",
    title: "The Power of Now",
    author: "Eckhart Tolle",
    rating: 4,
    genre: "Spirituality",
    cover: "/images/now.jpg",
    reviews: [
      { user: "Sarah", comment: "Very calming perspective." },
    ],
  },
  {
    id: "start-with-why",
    title: "Start With Why",
    author: "Simon Sinek",
    rating: 4,
    genre: "Leadership",
    cover: "/images/why.jpg",
    reviews: [
      { user: "Daniel", comment: "Great leadership insights." },
    ],
  },
  {
    id: "four-hour-workweek",
    title: "The 4-Hour Workweek",
    author: "Timothy Ferriss",
    rating: 4,
    genre: "Lifestyle",
    cover: "/images/4hour.jpg",
    reviews: [
      { user: "Amy", comment: "Interesting ideas on freedom." },
    ],
  },
  {
    id: "psychology-of-money",
    title: "The Psychology of Money",
    author: "Morgan Housel",
    rating: 5,
    genre: "Finance",
    cover: "/images/money.jpg",
    reviews: [
      { user: "Paul", comment: "Best finance book I’ve read." },
    ],
  },
  {
    id: "how-to-win-friends",
    title: "How to Win Friends & Influence People",
    author: "Dale Carnegie",
    rating: 5,
    genre: "Communication",
    cover: "/images/friends.jpg",
    reviews: [
      { user: "Grace", comment: "Timeless social skills." },
    ],
  },
];