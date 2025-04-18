
import { useState, useEffect } from 'react';
import { 
  ActivityData, 
  Badge, 
  CommunityPost, 
  WorkoutRecommendation, 
  badges, 
  communityPosts, 
  userProfile, 
  weeklyActivity, 
  workoutRecommendations 
} from '@/utils/mockData';
import { toast } from '@/components/ui/use-toast';

export function useWorkoutData() {
  const [activity, setActivity] = useState<ActivityData[]>(weeklyActivity);
  const [userBadges, setUserBadges] = useState<Badge[]>(badges);
  const [recommendations, setRecommendations] = useState<WorkoutRecommendation[]>(workoutRecommendations);
  const [posts, setPosts] = useState<CommunityPost[]>(communityPosts);
  const [userData, setUserData] = useState(userProfile);
  const [isLoading, setIsLoading] = useState(false);
  const [activeWorkout, setActiveWorkout] = useState<WorkoutRecommendation | null>(null);

  // Simulate fetching data
  useEffect(() => {
    setIsLoading(true);
    // Simulate API delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Start a workout
  const startWorkout = (workout: WorkoutRecommendation | null) => {
    setActiveWorkout(workout);
    if (workout) {
      toast({
        title: "Workout Started!",
        description: `You've started "${workout.title}" workout. Keep it up!`,
      });
    }
  };

  // Complete a workout
  const completeWorkout = (workout: WorkoutRecommendation) => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      // Update user stats
      setUserData(prev => ({
        ...prev,
        stats: {
          ...prev.stats,
          workoutsCompleted: prev.stats.workoutsCompleted + 1,
          totalMinutes: prev.stats.totalMinutes + workout.duration,
          totalCalories: prev.stats.totalCalories + workout.calories,
          streak: prev.stats.streak + 1,
        }
      }));

      // Update today's activity
      const today = new Date().getDay();
      const dayIndex = today === 0 ? 6 : today - 1; // Convert to 0-6 index (Mon-Sun)
      
      setActivity(prev => {
        const newActivity = [...prev];
        newActivity[dayIndex] = {
          ...newActivity[dayIndex],
          calories: newActivity[dayIndex].calories + workout.calories,
          minutes: newActivity[dayIndex].minutes + workout.duration
        };
        return newActivity;
      });
      
      // Check for badge progress
      const updatedBadges = userBadges.map(badge => {
        // This is a simplified version - in a real app we'd have more complex logic
        if (!badge.earned && badge.id === "cardio-king" && workout.type === "HIIT") {
          const newProgress = Math.min(badge.progress + workout.duration, badge.totalNeeded);
          const newEarned = newProgress >= badge.totalNeeded;
          
          if (newEarned) {
            // Notify user of new badge
            toast({
              title: "New Badge Earned!",
              description: `Congratulations! You've earned the ${badge.title} badge.`,
            });
          }
          
          return {
            ...badge,
            progress: newProgress,
            earned: newEarned
          };
        }
        return badge;
      });
      
      setUserBadges(updatedBadges);
      
      // Clear active workout
      setActiveWorkout(null);
      
      // Show completion message
      toast({
        title: "Workout Completed!",
        description: `Great job finishing "${workout.title}"!`,
      });
      
      setIsLoading(false);
    }, 1000);
  };

  // Like a community post
  const likePost = (postId: string) => {
    setPosts(prev => 
      prev.map(post => 
        post.id === postId 
          ? { ...post, likes: post.likes + 1 } 
          : post
      )
    );
  };

  // Add a new community post
  const addPost = (content: string, image?: string) => {
    const newPost: CommunityPost = {
      id: `post-${Date.now()}`,
      user: {
        id: userData.id,
        name: userData.name,
        image: userData.profileImage,
      },
      content,
      timestamp: 'Just now',
      likes: 0,
      comments: 0,
      image,
    };
    
    setPosts(prev => [newPost, ...prev]);
    
    toast({
      title: "Post Created",
      description: "Your post has been shared with the community!",
    });
  };

  return {
    activity,
    userBadges,
    recommendations,
    posts,
    userData,
    isLoading,
    activeWorkout,
    startWorkout,
    completeWorkout,
    likePost,
    addPost,
  };
}
