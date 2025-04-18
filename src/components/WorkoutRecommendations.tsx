
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Activity, Calendar, Clock, Cpu, Flame, Target } from "lucide-react";
import { WorkoutRecommendation } from "@/utils/mockData";
import { Badge } from "@/components/ui/badge";

interface WorkoutRecommendationsProps {
  recommendations: WorkoutRecommendation[];
  isLoading?: boolean;
  onStartWorkout?: (workout: WorkoutRecommendation) => void;
  onCompleteWorkout?: (workout: WorkoutRecommendation) => void;
}

const WorkoutRecommendations: React.FC<WorkoutRecommendationsProps> = ({
  recommendations,
  isLoading,
  onStartWorkout,
  onCompleteWorkout,
}) => {
  // Get badge color based on workout type
  const getWorkoutTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case "hiit":
        return "bg-fitness-accent text-white";
      case "strength":
        return "bg-fitness-blue text-white";
      case "cardio":
        return "bg-fitness-red text-white";
      case "flexibility":
        return "bg-fitness-green text-white";
      default:
        return "bg-primary";
    }
  };

  // Get difficulty color
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case "beginner":
        return "text-fitness-green";
      case "intermediate":
        return "text-fitness-yellow";
      case "advanced":
        return "text-fitness-red";
      default:
        return "text-muted-foreground";
    }
  };

  return (
    <Card className="fitness-card">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center text-xl">
          <Cpu className="w-5 h-5 mr-2 text-fitness-primary" /> AI Recommendations
        </CardTitle>
        <CardDescription>Personalized workouts just for you</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {isLoading ? (
            [...Array(3)].map((_, i) => (
              <div key={i} className="animate-pulse rounded-lg border p-4 space-y-3">
                <div className="flex justify-between">
                  <div className="h-6 bg-muted rounded w-1/3"></div>
                  <div className="h-6 bg-muted rounded w-1/4"></div>
                </div>
                <div className="h-4 bg-muted rounded w-full"></div>
                <div className="h-4 bg-muted rounded w-4/5"></div>
                <div className="flex justify-end">
                  <div className="h-10 bg-muted rounded w-1/4"></div>
                </div>
              </div>
            ))
          ) : (
            recommendations.map((workout) => (
              <div key={workout.id} className="rounded-lg border hover:border-fitness-primary/40 transition-all p-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                  <h3 className="text-lg font-semibold">{workout.title}</h3>
                  <Badge className={getWorkoutTypeColor(workout.type)}>
                    {workout.type}
                  </Badge>
                </div>
                
                <p className="text-sm mb-4">{workout.description}</p>
                
                <div className="flex flex-wrap gap-3 mb-4">
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>{workout.duration} min</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Flame className="h-4 w-4" />
                    <span>{workout.calories} cal</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm">
                    <Target className="h-4 w-4" />
                    <span className={getDifficultyColor(workout.difficulty)}>{workout.difficulty}</span>
                  </div>
                </div>
                
                <div className="mb-4 p-3 bg-fitness-soft-purple rounded-md text-sm flex items-start">
                  <Cpu className="h-4 w-4 mr-2 mt-0.5 text-fitness-primary flex-shrink-0" />
                  <p className="italic">{workout.aiReason}</p>
                </div>
                
                <div className="flex justify-end">
                  <Button 
                    className="gap-2"
                    onClick={() => onStartWorkout && onStartWorkout(workout)}
                  >
                    <Activity className="h-4 w-4" />
                    Start Workout
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default WorkoutRecommendations;
