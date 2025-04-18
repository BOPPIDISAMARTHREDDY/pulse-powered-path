
import React from "react";
import Layout from "@/components/Layout";
import AchievementBadges from "@/components/AchievementBadges";
import { useWorkoutData } from "@/hooks/useWorkoutData";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, Medal, Star, Trophy } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Achievements: React.FC = () => {
  const { userBadges, userData, isLoading } = useWorkoutData();
  
  // Calculate overall progress (simple example based on earned badges)
  const earnedBadges = userBadges.filter(badge => badge.earned).length;
  const totalBadges = userBadges.length;
  const overallProgress = Math.round((earnedBadges / totalBadges) * 100);

  return (
    <Layout>
      <div className="container py-6">
        <h1 className="text-3xl font-bold mb-8 px-4 md:px-0">Achievements</h1>
        
        <div className="space-y-8 px-4 md:px-0">
          <Card className="fitness-card">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-xl">
                <Trophy className="w-5 h-5 mr-2 text-fitness-primary" /> Your Progress
              </CardTitle>
              <CardDescription>Track your fitness achievements</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <div className="bg-fitness-soft-purple p-4 rounded-lg text-center">
                  <div className="mb-2">
                    <Award className="h-8 w-8 mx-auto text-fitness-primary" />
                  </div>
                  <div className="text-2xl font-bold">{earnedBadges}</div>
                  <div className="text-sm text-muted-foreground">Badges Earned</div>
                </div>
                
                <div className="bg-fitness-soft-green p-4 rounded-lg text-center">
                  <div className="mb-2">
                    <Star className="h-8 w-8 mx-auto text-fitness-green" />
                  </div>
                  <div className="text-2xl font-bold">{userData?.stats?.workoutsCompleted || 0}</div>
                  <div className="text-sm text-muted-foreground">Workouts Completed</div>
                </div>
                
                <div className="bg-fitness-soft-blue p-4 rounded-lg text-center">
                  <div className="mb-2">
                    <Medal className="h-8 w-8 mx-auto text-fitness-blue" />
                  </div>
                  <div className="text-2xl font-bold">{userData?.stats?.streak || 0}</div>
                  <div className="text-sm text-muted-foreground">Day Streak</div>
                </div>
                
                <div className="bg-fitness-soft-orange p-4 rounded-lg text-center">
                  <div className="mb-2">
                    <Trophy className="h-8 w-8 mx-auto text-fitness-accent" />
                  </div>
                  <div className="text-2xl font-bold">{overallProgress}%</div>
                  <div className="text-sm text-muted-foreground">Overall Progress</div>
                </div>
              </div>
              
              <Tabs defaultValue="all" className="w-full">
                <TabsList className="mb-4">
                  <TabsTrigger value="all">All Badges</TabsTrigger>
                  <TabsTrigger value="earned">Earned</TabsTrigger>
                  <TabsTrigger value="progress">In Progress</TabsTrigger>
                </TabsList>
                
                <TabsContent value="all">
                  <AchievementBadges badges={userBadges} isLoading={isLoading} />
                </TabsContent>
                
                <TabsContent value="earned">
                  <AchievementBadges 
                    badges={userBadges.filter(badge => badge.earned)} 
                    isLoading={isLoading} 
                  />
                </TabsContent>
                
                <TabsContent value="progress">
                  <AchievementBadges 
                    badges={userBadges.filter(badge => !badge.earned && badge.progress > 0)} 
                    isLoading={isLoading} 
                  />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
          
          <Card className="fitness-card">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-xl">
                <Star className="w-5 h-5 mr-2 text-fitness-yellow" /> Challenges
              </CardTitle>
              <CardDescription>Upcoming events and challenges</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { 
                    title: "30-Day Cardio Challenge", 
                    description: "Complete 30 minutes of cardio every day for 30 days",
                    progress: 8,
                    total: 30,
                    color: "bg-fitness-red"
                  },
                  { 
                    title: "Weight Training Mastery", 
                    description: "Complete 20 strength training workouts",
                    progress: 12,
                    total: 20,
                    color: "bg-fitness-blue"
                  },
                  { 
                    title: "Early Bird", 
                    description: "Complete 15 morning workouts before 8am",
                    progress: 4,
                    total: 15,
                    color: "bg-fitness-yellow"
                  }
                ].map((challenge, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-medium">{challenge.title}</h3>
                      <span className="text-sm text-muted-foreground">
                        {challenge.progress}/{challenge.total}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{challenge.description}</p>
                    <Progress 
                      value={(challenge.progress / challenge.total) * 100} 
                      className="h-1.5"
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Achievements;
