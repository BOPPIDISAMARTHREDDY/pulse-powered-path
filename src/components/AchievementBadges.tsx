
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/utils/mockData";
import { Progress } from "@/components/ui/progress";
import { Activity, Award, Calendar, Flame, Heart, MessageSquare } from "lucide-react";

interface AchievementBadgesProps {
  badges: Badge[];
  isLoading?: boolean;
}

const AchievementBadges: React.FC<AchievementBadgesProps> = ({ badges, isLoading }) => {
  // Map badge icon names to actual icons
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "activity":
        return <Activity className="h-5 w-5" />;
      case "flame":
        return <Flame className="h-5 w-5" />;
      case "heart":
        return <Heart className="h-5 w-5" />;
      case "dumbbell":
        return <Activity className="h-5 w-5" />;
      case "message":
        return <MessageSquare className="h-5 w-5" />;
      case "calendar":
        return <Calendar className="h-5 w-5" />;
      default:
        return <Award className="h-5 w-5" />;
    }
  };

  // Get color class based on badge color
  const getColorClass = (color: string) => {
    switch (color) {
      case "yellow":
        return "bg-fitness-yellow text-black";
      case "orange":
        return "bg-fitness-accent text-white";
      case "blue":
        return "bg-fitness-blue text-white";
      case "red":
        return "bg-fitness-red text-white";
      case "purple":
        return "bg-fitness-primary text-white";
      case "green":
        return "bg-fitness-green text-white";
      default:
        return "bg-fitness-primary text-white";
    }
  };

  return (
    <Card className="fitness-card">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center text-xl">
          <Award className="w-5 h-5 mr-2 text-fitness-primary" /> Achievements
        </CardTitle>
        <CardDescription>Collect badges by reaching milestones</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse p-4 rounded-lg bg-muted flex flex-col items-center space-y-3">
                <div className="rounded-full h-12 w-12 bg-muted-foreground/20"></div>
                <div className="h-4 bg-muted-foreground/20 rounded w-20"></div>
                <div className="h-2 bg-muted-foreground/20 rounded w-full"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {badges.map((badge) => (
              <div 
                key={badge.id} 
                className={`rounded-lg p-4 flex flex-col items-center text-center space-y-3 ${
                  badge.earned 
                    ? "bg-fitness-soft-purple border border-fitness-primary/30" 
                    : "bg-muted/50"
                }`}
              >
                <div className={`${getColorClass(badge.color)} rounded-full p-3 ${
                  badge.earned ? "animate-pulse-badge" : ""
                }`}>
                  {getIcon(badge.icon)}
                </div>
                <h4 className="font-medium">{badge.title}</h4>
                <p className="text-xs text-muted-foreground">{badge.description}</p>
                <Progress 
                  value={(badge.progress / badge.totalNeeded) * 100} 
                  className="w-full h-1.5" 
                />
                <span className="text-xs font-medium">
                  {badge.progress} / {badge.totalNeeded} {badge.earned && "✓"}
                </span>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AchievementBadges;
