
import React from "react";
import UserProfile from "./UserProfile";
import ActivityTracker from "./ActivityTracker";
import WorkoutRecommendations from "./WorkoutRecommendations";
import AchievementBadges from "./AchievementBadges";
import CommunityForum from "./CommunityForum";
import { useWorkoutData } from "@/hooks/useWorkoutData";
import { useIsMobile } from "@/hooks/use-mobile";

const Dashboard: React.FC = () => {
  const {
    activity,
    userBadges,
    recommendations,
    posts,
    userData,
    isLoading,
    completeWorkout,
    likePost,
    addPost,
  } = useWorkoutData();
  
  const isMobile = useIsMobile();

  return (
    <div className="container py-6">
      <h1 className="text-3xl font-bold mb-8 px-4 md:px-0">Your Fitness Dashboard</h1>
      
      <div className="space-y-8 px-4 md:px-0">
        <UserProfile userData={userData} isLoading={isLoading} />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <ActivityTracker activity={activity} isLoading={isLoading} />
          <WorkoutRecommendations 
            recommendations={recommendations} 
            isLoading={isLoading}
            onCompleteWorkout={completeWorkout}
          />
        </div>
        
        <AchievementBadges badges={userBadges} isLoading={isLoading} />
        
        <CommunityForum 
          posts={posts} 
          isLoading={isLoading} 
          onLikePost={likePost}
          onAddPost={addPost}
        />
      </div>
    </div>
  );
};

export default Dashboard;
