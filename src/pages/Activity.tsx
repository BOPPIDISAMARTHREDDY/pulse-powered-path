
import React from "react";
import Layout from "@/components/Layout";
import ActivityTracker from "@/components/ActivityTracker";
import { useWorkoutData } from "@/hooks/useWorkoutData";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Calendar, TrendingUp } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ActivityPage: React.FC = () => {
  const { activity, userData, isLoading } = useWorkoutData();

  return (
    <Layout>
      <div className="container py-6">
        <h1 className="text-3xl font-bold mb-8 px-4 md:px-0">Activity Tracking</h1>
        
        <div className="space-y-8 px-4 md:px-0">
          <ActivityTracker activity={activity} isLoading={isLoading} />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="fitness-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center text-xl">
                  <TrendingUp className="w-5 h-5 mr-2 text-fitness-primary" /> Activity Trends
                </CardTitle>
                <CardDescription>Your activity patterns over time</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="week" className="w-full">
                  <TabsList className="mb-4">
                    <TabsTrigger value="week">This Week</TabsTrigger>
                    <TabsTrigger value="month">This Month</TabsTrigger>
                    <TabsTrigger value="year">This Year</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="week" className="space-y-4">
                    <p className="text-muted-foreground">
                      You've been {userData.stats.streak > 3 ? "very active" : "moderately active"} this week.
                      {userData.stats.workoutsCompleted > 0 ? ` You completed ${userData.stats.workoutsCompleted} workouts.` : ""}
                    </p>
                    <div className="h-[200px] flex items-center justify-center bg-muted rounded-md">
                      <p className="text-muted-foreground">Weekly activity visualization</p>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="month" className="space-y-4">
                    <p className="text-muted-foreground">Monthly activity data not available yet.</p>
                    <div className="h-[200px] flex items-center justify-center bg-muted rounded-md">
                      <p className="text-muted-foreground">Monthly activity visualization</p>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="year" className="space-y-4">
                    <p className="text-muted-foreground">Yearly activity data not available yet.</p>
                    <div className="h-[200px] flex items-center justify-center bg-muted rounded-md">
                      <p className="text-muted-foreground">Yearly activity visualization</p>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
            
            <Card className="fitness-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center text-xl">
                  <Calendar className="w-5 h-5 mr-2 text-fitness-primary" /> Activity Calendar
                </CardTitle>
                <CardDescription>Your workout schedule</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    You've been active on {activity.filter(day => day.minutes > 0).length} days this week.
                  </p>
                  <div className="grid grid-cols-7 gap-2">
                    {activity.map((day, i) => (
                      <div 
                        key={i} 
                        className={`aspect-square rounded-md flex items-center justify-center p-2 text-center ${
                          day.minutes > 0 
                            ? "bg-fitness-soft-purple" 
                            : "bg-muted"
                        }`}
                      >
                        <div>
                          <div className="text-sm font-medium">{day.day.charAt(0)}</div>
                          {day.minutes > 0 && (
                            <div className="text-xs mt-1">{day.minutes}m</div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ActivityPage;
