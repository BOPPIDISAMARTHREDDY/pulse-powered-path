
import React from "react";
import Layout from "@/components/Layout";
import CommunityForum from "@/components/CommunityForum";
import { useWorkoutData } from "@/hooks/useWorkoutData";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageSquare, Search, User, Users } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Community: React.FC = () => {
  const { posts, isLoading, likePost, addPost } = useWorkoutData();

  return (
    <Layout>
      <div className="container py-6">
        <h1 className="text-3xl font-bold mb-8 px-4 md:px-0">Community</h1>
        
        <div className="space-y-8 px-4 md:px-0">
          <Card className="fitness-card">
            <CardHeader className="pb-2">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                <div>
                  <CardTitle className="flex items-center text-xl">
                    <Users className="w-5 h-5 mr-2 text-fitness-primary" /> Fitness Community
                  </CardTitle>
                  <CardDescription>Connect with like-minded fitness enthusiasts</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Input placeholder="Search posts..." className="max-w-[200px]" />
                  <Button variant="outline" size="icon">
                    <Search className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="feed" className="w-full">
                <TabsList className="mb-4">
                  <TabsTrigger value="feed">Feed</TabsTrigger>
                  <TabsTrigger value="groups">Groups</TabsTrigger>
                  <TabsTrigger value="friends">Friends</TabsTrigger>
                </TabsList>
                
                <TabsContent value="feed">
                  <CommunityForum 
                    posts={posts} 
                    isLoading={isLoading} 
                    onLikePost={likePost}
                    onAddPost={addPost}
                  />
                </TabsContent>
                
                <TabsContent value="groups">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[
                      { name: "Morning Runners", members: 234, image: "https://source.unsplash.com/random/300x200/?running" },
                      { name: "Yoga Enthusiasts", members: 187, image: "https://source.unsplash.com/random/300x200/?yoga" },
                      { name: "Weight Training", members: 312, image: "https://source.unsplash.com/random/300x200/?weights" }
                    ].map((group, index) => (
                      <div key={index} className="border rounded-lg overflow-hidden hover:border-fitness-primary/40 transition-all">
                        <div 
                          className="h-32 bg-cover bg-center"
                          style={{ backgroundImage: `url(${group.image})` }}
                        ></div>
                        <div className="p-4">
                          <h3 className="font-medium mb-1">{group.name}</h3>
                          <p className="text-xs text-muted-foreground mb-3">{group.members} members</p>
                          <Button size="sm" variant="outline">Join Group</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="friends">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium">Your Network</h3>
                      <Button variant="outline" size="sm">Add Friends</Button>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {[
                        { name: "Sarah Miller", status: "Active", image: "https://source.unsplash.com/random/100x100/?portrait,woman,1" },
                        { name: "John Davis", status: "Last active 2h ago", image: "https://source.unsplash.com/random/100x100/?portrait,man,1" },
                        { name: "Emma Wilson", status: "Active", image: "https://source.unsplash.com/random/100x100/?portrait,woman,2" }
                      ].map((friend, index) => (
                        <div key={index} className="flex items-center gap-4 p-3 rounded-lg border hover:bg-muted/50">
                          <Avatar>
                            <AvatarImage src={friend.image} />
                            <AvatarFallback>{friend.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{friend.name}</p>
                            <p className="text-xs text-muted-foreground">{friend.status}</p>
                          </div>
                        </div>
                      ))}
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

export default Community;
