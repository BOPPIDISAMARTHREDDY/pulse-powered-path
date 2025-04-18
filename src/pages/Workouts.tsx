
import React from "react";
import Layout from "@/components/Layout";
import WorkoutRecommendations from "@/components/WorkoutRecommendations";
import { useWorkoutData } from "@/hooks/useWorkoutData";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dumbbell, History, Plus, Search, Check, ArrowLeft } from "lucide-react";
import { Input } from "@/components/ui/input";

const Workouts: React.FC = () => {
  const { 
    recommendations, 
    isLoading, 
    activeWorkout, 
    startWorkout, 
    completeWorkout 
  } = useWorkoutData();

  return (
    <Layout>
      <div className="container py-6">
        <h1 className="text-3xl font-bold mb-8 px-4 md:px-0">Workout Library</h1>
        
        <div className="space-y-8 px-4 md:px-0">
          <Card className="fitness-card">
            <CardHeader className="pb-2">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                <div>
                  <CardTitle className="flex items-center text-xl">
                    <Dumbbell className="w-5 h-5 mr-2 text-fitness-primary" /> Workouts
                  </CardTitle>
                  <CardDescription>Browse and discover new workouts</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Create
                  </Button>
                  <Button variant="outline" size="sm">
                    <Search className="h-4 w-4 mr-2" />
                    Search
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="recommendations" className="w-full">
                <TabsList className="mb-4">
                  <TabsTrigger value="recommendations">Recommended</TabsTrigger>
                  <TabsTrigger value="saved">Saved</TabsTrigger>
                  <TabsTrigger value="history">History</TabsTrigger>
                </TabsList>
                
                <TabsContent value="recommendations">
                  {activeWorkout ? (
                    <div className="space-y-6">
                      <div className="flex items-center">
                        <Button 
                          variant="ghost" 
                          onClick={() => startWorkout(null)}
                          className="gap-1"
                        >
                          <ArrowLeft className="h-4 w-4" /> Back
                        </Button>
                      </div>
                      
                      <div className="bg-fitness-soft-purple rounded-lg p-6">
                        <h2 className="text-2xl font-bold mb-4">{activeWorkout.title}</h2>
                        <p className="mb-6">{activeWorkout.description}</p>
                        
                        <div className="flex flex-wrap gap-4 mb-6">
                          <div className="bg-white/20 px-4 py-2 rounded-md">
                            <span className="block text-sm text-muted-foreground">Duration</span>
                            <span className="text-lg font-medium">{activeWorkout.duration} min</span>
                          </div>
                          <div className="bg-white/20 px-4 py-2 rounded-md">
                            <span className="block text-sm text-muted-foreground">Calories</span>
                            <span className="text-lg font-medium">{activeWorkout.calories} cal</span>
                          </div>
                          <div className="bg-white/20 px-4 py-2 rounded-md">
                            <span className="block text-sm text-muted-foreground">Difficulty</span>
                            <span className="text-lg font-medium">{activeWorkout.difficulty}</span>
                          </div>
                        </div>
                        
                        <div className="flex justify-end">
                          <Button
                            onClick={() => completeWorkout(activeWorkout)}
                            className="gap-2"
                          >
                            <Check className="h-4 w-4" />
                            Complete Workout
                          </Button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <WorkoutRecommendations 
                      recommendations={recommendations} 
                      isLoading={isLoading}
                      onStartWorkout={startWorkout}
                    />
                  )}
                </TabsContent>
                
                <TabsContent value="saved">
                  <div className="bg-muted rounded-lg p-8 text-center">
                    <History className="h-10 w-10 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-muted-foreground mb-4">You haven't saved any workouts yet.</p>
                    <Button variant="outline">Browse Workouts</Button>
                  </div>
                </TabsContent>
                
                <TabsContent value="history">
                  <div className="space-y-4">
                    <div className="flex gap-4 mb-4">
                      <Input placeholder="Search workout history..." className="max-w-sm" />
                      <Button variant="outline">Filter</Button>
                    </div>
                    
                    <div className="bg-muted rounded-lg p-8 text-center">
                      <History className="h-10 w-10 mx-auto mb-4 text-muted-foreground" />
                      <p className="text-muted-foreground mb-4">Your workout history will appear here</p>
                      <Button>Track First Workout</Button>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Workouts;
