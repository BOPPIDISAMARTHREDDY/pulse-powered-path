
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heart, MessageSquare, Send, Users } from "lucide-react";
import { CommunityPost } from "@/utils/mockData";

interface CommunityForumProps {
  posts: CommunityPost[];
  isLoading?: boolean;
  onLikePost: (postId: string) => void;
  onAddPost: (content: string, image?: string) => void;
}

const CommunityForum: React.FC<CommunityForumProps> = ({ posts, isLoading, onLikePost, onAddPost }) => {
  const [newPost, setNewPost] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPost.trim()) {
      onAddPost(newPost);
      setNewPost("");
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <Card className="fitness-card">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center text-xl">
          <Users className="w-5 h-5 mr-2 text-fitness-primary" /> Community
        </CardTitle>
        <CardDescription>Connect with other fitness enthusiasts</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="mb-6">
          <div className="flex gap-3">
            <Avatar>
              <AvatarImage src="https://source.unsplash.com/random/100x100/?portrait" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-2">
              <Textarea
                placeholder="Share your fitness journey with the community..."
                className="min-h-20"
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
              />
              <div className="flex justify-end">
                <Button type="submit" disabled={!newPost.trim()}>
                  <Send className="w-4 h-4 mr-2" /> Post
                </Button>
              </div>
            </div>
          </div>
        </form>

        <div className="space-y-6">
          {isLoading ? (
            [...Array(3)].map((_, i) => (
              <div key={i} className="animate-pulse space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="rounded-full bg-muted h-10 w-10"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-muted rounded w-32"></div>
                    <div className="h-3 bg-muted rounded w-20"></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-4 bg-muted rounded w-full"></div>
                  <div className="h-4 bg-muted rounded w-4/5"></div>
                </div>
                <div className="h-40 bg-muted rounded w-full"></div>
              </div>
            ))
          ) : (
            posts.map((post) => (
              <div key={post.id} className="border-b border-border pb-6 last:border-0 last:pb-0">
                <div className="flex items-center space-x-3 mb-3">
                  <Avatar>
                    <AvatarImage src={post.user.image} />
                    <AvatarFallback>{getInitials(post.user.name)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{post.user.name}</p>
                    <p className="text-xs text-muted-foreground">{post.timestamp}</p>
                  </div>
                </div>
                <p className="mb-3">{post.content}</p>
                {post.image && (
                  <div className="mb-3 rounded-lg overflow-hidden">
                    <img
                      src={post.image}
                      alt="Post"
                      className="w-full h-auto object-cover"
                    />
                  </div>
                )}
                <div className="flex space-x-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex items-center space-x-1 text-muted-foreground hover:text-fitness-red"
                    onClick={() => onLikePost(post.id)}
                  >
                    <Heart className="w-4 h-4" />
                    <span>{post.likes}</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex items-center space-x-1 text-muted-foreground"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>{post.comments}</span>
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

export default CommunityForum;
