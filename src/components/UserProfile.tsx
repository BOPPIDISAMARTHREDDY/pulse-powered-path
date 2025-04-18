
import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Flame, Target, Trophy } from "lucide-react";

interface UserProfileProps {
  userData: {
    name: string;
    goal: string;
    level: string;
    profileImage: string;
    stats: {
      workoutsCompleted: number;
      totalMinutes: number;
      totalCalories: number;
      streak: number;
    };
  };
  isLoading?: boolean;
}

const UserProfile: React.FC<UserProfileProps> = ({ userData, isLoading }) => {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  if (isLoading) {
    return (
      <Card className="fitness-card animate-pulse">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="h-20 w-20 rounded-full bg-muted"></div>
            <div className="space-y-3 text-center sm:text-left">
              <div className="h-7 w-32 bg-muted rounded"></div>
              <div className="h-5 w-40 bg-muted rounded"></div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="fitness-card">
      <CardContent className="p-6">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
          <Avatar className="h-20 w-20 border-2 border-fitness-primary">
            <AvatarImage src={userData.profileImage} />
            <AvatarFallback className="text-xl">{getInitials(userData.name)}</AvatarFallback>
          </Avatar>
          
          <div className="space-y-3 text-center sm:text-left flex-1">
            <div>
              <h2 className="text-2xl font-bold">{userData.name}</h2>
              <div className="flex flex-wrap gap-2 justify-center sm:justify-start mt-2">
                <Badge variant="outline" className="flex gap-1">
                  <Target className="h-3.5 w-3.5" />
                  {userData.goal}
                </Badge>
                <Badge variant="outline" className="flex gap-1">
                  <Trophy className="h-3.5 w-3.5" />
                  {userData.level}
                </Badge>
              </div>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
              <div className="bg-fitness-soft-purple p-3 rounded-lg text-center">
                <div className="flex justify-center mb-1">
                  <Calendar className="h-5 w-5 text-fitness-primary" />
                </div>
                <div className="text-xl font-bold">{userData.stats.workoutsCompleted}</div>
                <div className="text-xs text-muted-foreground">Workouts</div>
              </div>
              
              <div className="bg-fitness-soft-blue p-3 rounded-lg text-center">
                <div className="flex justify-center mb-1">
                  <Clock className="h-5 w-5 text-fitness-blue" />
                </div>
                <div className="text-xl font-bold">{userData.stats.totalMinutes}</div>
                <div className="text-xs text-muted-foreground">Minutes</div>
              </div>
              
              <div className="bg-fitness-soft-orange p-3 rounded-lg text-center">
                <div className="flex justify-center mb-1">
                  <Flame className="h-5 w-5 text-fitness-accent" />
                </div>
                <div className="text-xl font-bold">{userData.stats.totalCalories}</div>
                <div className="text-xs text-muted-foreground">Calories</div>
              </div>
              
              <div className="bg-fitness-soft-green p-3 rounded-lg text-center">
                <div className="flex justify-center mb-1">
                  <Trophy className="h-5 w-5 text-fitness-green" />
                </div>
                <div className="text-xl font-bold">{userData.stats.streak} days</div>
                <div className="text-xs text-muted-foreground">Streak</div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserProfile;
