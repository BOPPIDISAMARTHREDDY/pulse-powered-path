
export const userProfile = {
  id: "user-1",
  name: "Alex Johnson",
  email: "alex.johnson@example.com",
  goal: "Weight loss & strength training",
  level: "Intermediate",
  joinedDate: "2023-02-15",
  profileImage: "https://source.unsplash.com/random/300x300/?portrait",
  stats: {
    workoutsCompleted: 78,
    totalMinutes: 2340,
    totalCalories: 18500,
    streak: 5,
  }
};

export interface ActivityData {
  day: string;
  calories: number;
  minutes: number;
}

export const weeklyActivity: ActivityData[] = [
  { day: "Mon", calories: 320, minutes: 45 },
  { day: "Tue", calories: 250, minutes: 30 },
  { day: "Wed", calories: 0, minutes: 0 },
  { day: "Thu", calories: 450, minutes: 60 },
  { day: "Fri", calories: 380, minutes: 50 },
  { day: "Sat", calories: 180, minutes: 25 },
  { day: "Sun", calories: 300, minutes: 40 },
];

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  earned: boolean;
  progress: number;
  totalNeeded: number;
}

export const badges: Badge[] = [
  {
    id: "early-bird",
    title: "Early Bird",
    description: "Complete 5 workouts before 8am",
    icon: "activity",
    color: "yellow",
    earned: true,
    progress: 5,
    totalNeeded: 5,
  },
  {
    id: "streak-master",
    title: "Streak Master",
    description: "Maintain a 7-day streak",
    icon: "flame",
    color: "orange",
    earned: false,
    progress: 5,
    totalNeeded: 7,
  },
  {
    id: "strength-champion",
    title: "Strength Champion",
    description: "Complete 10 strength workouts",
    icon: "dumbbell",
    color: "blue",
    earned: true,
    progress: 10,
    totalNeeded: 10,
  },
  {
    id: "cardio-king",
    title: "Cardio King",
    description: "Log 500 minutes of cardio",
    icon: "heart",
    color: "red",
    earned: false,
    progress: 380,
    totalNeeded: 500,
  },
  {
    id: "social-butterfly",
    title: "Social Butterfly",
    description: "Comment on 20 community posts",
    icon: "message",
    color: "purple",
    earned: false,
    progress: 12,
    totalNeeded: 20,
  },
  {
    id: "consistency",
    title: "Consistency",
    description: "Log your progress for 14 consecutive days",
    icon: "calendar",
    color: "green",
    earned: false,
    progress: 8,
    totalNeeded: 14,
  },
];

export interface WorkoutRecommendation {
  id: string;
  title: string;
  type: string;
  difficulty: string;
  duration: number;
  calories: number;
  description: string;
  aiReason: string;
}

export const workoutRecommendations: WorkoutRecommendation[] = [
  {
    id: "workout-1",
    title: "Full Body HIIT",
    type: "HIIT",
    difficulty: "Intermediate",
    duration: 30,
    calories: 350,
    description: "High intensity interval training targeting major muscle groups",
    aiReason: "Based on your goal of weight loss and your available time on weekdays"
  },
  {
    id: "workout-2",
    title: "Upper Body Strength",
    type: "Strength",
    difficulty: "Intermediate",
    duration: 45,
    calories: 280,
    description: "Focus on chest, shoulders, back, and arms with progressive overload",
    aiReason: "Complements your recent lower body workouts for balanced training"
  },
  {
    id: "workout-3",
    title: "Mobility & Recovery",
    type: "Flexibility",
    difficulty: "Beginner",
    duration: 25,
    calories: 120,
    description: "Stretching and mobility exercises to improve flexibility",
    aiReason: "Recommended after your intense workout streak to prevent injury"
  }
];

export interface CommunityPost {
  id: string;
  user: {
    id: string;
    name: string;
    image: string;
  };
  content: string;
  timestamp: string;
  likes: number;
  comments: number;
  image?: string;
}

export const communityPosts: CommunityPost[] = [
  {
    id: "post-1",
    user: {
      id: "user-2",
      name: "Morgan Chen",
      image: "https://source.unsplash.com/random/100x100/?portrait&1",
    },
    content: "Just completed my first 5K run! So proud of this achievement after months of training.",
    timestamp: "2h ago",
    likes: 24,
    comments: 7,
    image: "https://source.unsplash.com/random/600x400/?running&1",
  },
  {
    id: "post-2",
    user: {
      id: "user-3",
      name: "Sam Rodriguez",
      image: "https://source.unsplash.com/random/100x100/?portrait&2",
    },
    content: "Looking for workout buddies in the Seattle area. Anyone interested in meeting up for morning workouts?",
    timestamp: "5h ago",
    likes: 15,
    comments: 12,
  },
  {
    id: "post-3",
    user: {
      id: "user-4",
      name: "Taylor Kim",
      image: "https://source.unsplash.com/random/100x100/?portrait&3",
    },
    content: "New personal best on bench press today! 185lbs x 5 reps. Small wins add up!",
    timestamp: "1d ago",
    likes: 38,
    comments: 9,
    image: "https://source.unsplash.com/random/600x400/?gym&1",
  },
];
