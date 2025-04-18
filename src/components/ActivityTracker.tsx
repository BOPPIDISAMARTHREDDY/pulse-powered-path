
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Activity, Clock, Flame } from "lucide-react";
import { ActivityData } from "@/utils/mockData";
import { cn } from "@/lib/utils";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";

interface ActivityTrackerProps {
  activity: ActivityData[];
  isLoading?: boolean;
}

const ActivityTracker: React.FC<ActivityTrackerProps> = ({ activity, isLoading }) => {
  const caloriesData = activity.map((day) => ({
    name: day.day,
    calories: day.calories,
  }));

  const minutesData = activity.map((day) => ({
    name: day.day,
    minutes: day.minutes,
  }));

  // Calculate total stats
  const totalCalories = activity.reduce((sum, day) => sum + day.calories, 0);
  const totalMinutes = activity.reduce((sum, day) => sum + day.minutes, 0);
  const averageCalories = Math.round(totalCalories / 7);
  const activeDays = activity.filter(day => day.minutes > 0).length;

  return (
    <Card className="fitness-card">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center text-xl">
          <Activity className="w-5 h-5 mr-2 text-fitness-primary" /> Weekly Activity
        </CardTitle>
        <CardDescription>Your workout activity for the past week</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="calories" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="calories">Calories</TabsTrigger>
            <TabsTrigger value="minutes">Minutes</TabsTrigger>
            <TabsTrigger value="summary">Summary</TabsTrigger>
          </TabsList>
          
          <TabsContent value="calories" className="h-[240px]">
            {isLoading ? (
              <div className="h-full flex items-center justify-center">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-fitness-primary mx-auto mb-2"></div>
                  <p className="text-muted-foreground">Loading data...</p>
                </div>
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={caloriesData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value: number) => [`${value} calories`, 'Calories Burned']} 
                    contentStyle={{ borderRadius: '8px' }}
                  />
                  <Bar 
                    dataKey="calories" 
                    fill="#9b87f5" 
                    radius={[4, 4, 0, 0]} 
                    barSize={36}
                  />
                </BarChart>
              </ResponsiveContainer>
            )}
          </TabsContent>
          
          <TabsContent value="minutes" className="h-[240px]">
            {isLoading ? (
              <div className="h-full flex items-center justify-center">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-fitness-primary mx-auto mb-2"></div>
                  <p className="text-muted-foreground">Loading data...</p>
                </div>
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={minutesData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value: number) => [`${value} minutes`, 'Workout Time']} 
                    contentStyle={{ borderRadius: '8px' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="minutes" 
                    stroke="#9b87f5" 
                    strokeWidth={3}
                    dot={{ stroke: '#9b87f5', strokeWidth: 2, fill: 'white', r: 4 }}
                    activeDot={{ stroke: '#9b87f5', strokeWidth: 2, fill: '#9b87f5', r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            )}
          </TabsContent>
          
          <TabsContent value="summary">
            <div className="grid grid-cols-2 gap-4">
              <div className={cn(
                "flex flex-col items-center justify-center p-4 rounded-lg bg-fitness-soft-purple",
                isLoading ? "animate-pulse" : ""
              )}>
                <Flame className="h-8 w-8 text-fitness-accent mb-2" />
                <span className="text-2xl font-bold">{isLoading ? "..." : totalCalories}</span>
                <span className="text-sm text-muted-foreground">calories burned</span>
              </div>
              
              <div className={cn(
                "flex flex-col items-center justify-center p-4 rounded-lg bg-fitness-soft-blue",
                isLoading ? "animate-pulse" : ""
              )}>
                <Clock className="h-8 w-8 text-fitness-blue mb-2" />
                <span className="text-2xl font-bold">{isLoading ? "..." : totalMinutes}</span>
                <span className="text-sm text-muted-foreground">active minutes</span>
              </div>
              
              <div className={cn(
                "flex flex-col items-center justify-center p-4 rounded-lg bg-fitness-soft-orange",
                isLoading ? "animate-pulse" : ""
              )}>
                <span className="text-2xl font-bold">{isLoading ? "..." : averageCalories}</span>
                <span className="text-sm text-muted-foreground">avg daily calories</span>
              </div>
              
              <div className={cn(
                "flex flex-col items-center justify-center p-4 rounded-lg bg-fitness-soft-green",
                isLoading ? "animate-pulse" : ""
              )}>
                <span className="text-2xl font-bold">{isLoading ? "..." : `${activeDays}/7`}</span>
                <span className="text-sm text-muted-foreground">active days</span>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ActivityTracker;
