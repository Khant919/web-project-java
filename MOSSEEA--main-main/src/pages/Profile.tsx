import React, { useEffect, useState } from "react";
import {
  Edit,
  Settings,
  Share2,
  Users,
  BookOpen,
  Heart,
  MessageCircle,
  Calendar,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StoryCard from "@/components/StoryCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";

interface User {
  id: number;
  email: string;
  username: string;
  name?: string;
  avatar?: string;
  bio?: string;
  location?: string;
  joinDate?: string;
  followers?: number;
  following?: number;
  totalReads?: number;
  stories?: number;
  isVerified?: boolean;
}

const Profile = () => {
  const id = localStorage.getItem("userId") || "";
  const [user, setUser] = useState<User | null>(null);
  const [isOwnProfile, setIsOwnProfile] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:8081/api/users/${id}`)
        .then((res) => {
          if (!res.ok) throw new Error("User not found");
          return res.json();
        })
        .then((data: User) => setUser(data))
        .catch((err) => console.error(err));
    }
  }, [id]);

  const myStories = [
    {
      id: "1",
      title: "The Midnight Chronicles",
      author: "Elena Rodriguez",
      description: "A mysterious tale of magic and adventure.",
      coverImage:
        "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop",
      genre: "Fantasy",
      reads: 1240000,
      likes: 89000,
      comments: 12000,
      rating: 4.8,
      chapters: 25,
      isCompleted: false,
      lastUpdated: "2 hours ago",
    },
  ];

  const achievements = [
    { name: "Rising Star", description: "Reached 1K followers", icon: "⭐" },
    { name: "Bestseller", description: "Story reached 1M reads", icon: "📚" },
    { name: "Community Favorite", description: "100K likes received", icon: "❤️" },
    { name: "Consistent Writer", description: "Published for 30 days straight", icon: "🔥" },
  ];

  const handleStoryClick = (storyId: string) => {
    console.log("Story clicked:", storyId);
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container px-4 py-8">
        {/* Profile Header */}
        <div className="bg-gradient-to-r from-teal/10 to-sky-blue/10 rounded-2xl p-8 mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center space-y-6 md:space-y-0 md:space-x-8">
            <div className="relative">
              <img
                src={
                  user.avatar ||
                  "https://via.placeholder.com/150?text=No+Avatar"
                }
                alt={user.name || user.username}
                className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover object-center"
              />
              {user.isVerified && (
                <div className="absolute -top-1 -right-1 w-8 h-8 bg-teal rounded-full flex items-center justify-center text-white text-sm font-bold">
                  ✓
                </div>
              )}
            </div>

            <div className="flex-1">
              <div className="flex flex-col md:flex-row justify-between items-start">
                <div>
                  <h1 className="text-3xl font-bold mb-2">
                    {user.name || "Unknown User"}
                  </h1>
                  <p className="text-lg text-muted-foreground mb-2">
                    @{user.username}
                  </p>
                  {user.bio && (
                    <p className="text-muted-foreground mb-4 max-w-md">
                      {user.bio}
                    </p>
                  )}
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    {user.location && <span>{user.location}</span>}
                    <span>•</span>
                    {user.joinDate && (
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>Joined {user.joinDate}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex space-x-2 mt-4 md:mt-0">
                  {isOwnProfile ? (
                    <>
                      <Button variant="outline">
                        <Edit className="w-4 h-4 mr-2" />
                        Edit Profile
                      </Button>
                      <Button variant="outline" size="icon">
                        <Settings className="w-4 h-4" />
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        variant={isFollowing ? "outline" : "default"}
                        onClick={() => setIsFollowing(!isFollowing)}
                      >
                        <Users className="w-4 h-4 mr-2" />
                        {isFollowing ? "Following" : "Follow"}
                      </Button>
                      <Button variant="outline" size="icon">
                        <Share2 className="w-4 h-4" />
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8 pt-8 border-t border-white/20">
            <div className="text-center">
              <div className="text-2xl font-bold text-teal">
                {user.followers ?? 0}
              </div>
              <div className="text-sm text-muted-foreground">Followers</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-teal">
                {user.following ?? 0}
              </div>
              <div className="text-sm text-muted-foreground">Following</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-teal">
                {user.totalReads ?? 0}
              </div>
              <div className="text-sm text-muted-foreground">Total Reads</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-teal">
                {user.stories ?? 0}
              </div>
              <div className="text-sm text-muted-foreground">Stories</div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="stories" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="stories" className="flex items-center space-x-2">
              <BookOpen className="w-4 h-4" />
              <span>Stories</span>
            </TabsTrigger>
            <TabsTrigger value="achievements" className="flex items-center space-x-2">
              <Heart className="w-4 h-4" />
              <span>Achievements</span>
            </TabsTrigger>
            <TabsTrigger value="activity" className="flex items-center space-x-2">
              <MessageCircle className="w-4 h-4" />
              <span>Activity</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="stories" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Published Stories</h2>
              {isOwnProfile && (
                <Button>
                  <Edit className="w-4 h-4 mr-2" />
                  Write New Story
                </Button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {myStories.map((story) => (
                <StoryCard
                  key={story.id}
                  {...story}
                  onClick={() => handleStoryClick(story.id)}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="achievements" className="space-y-6">
            <h2 className="text-xl font-semibold">Achievements</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {achievements.map((achievement, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="text-3xl">{achievement.icon}</div>
                      <div>
                        <h3 className="font-semibold">{achievement.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {achievement.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="activity" className="space-y-6">
            <h2 className="text-xl font-semibold">Recent Activity</h2>
            <div className="space-y-4">
              <div className="flex items-center space-x-4 p-4 bg-muted/30 rounded-lg">
                <div className="w-2 h-2 bg-teal rounded-full"></div>
                <div>
                  <p className="font-medium">Updated "The Midnight Chronicles"</p>
                  <p className="text-sm text-muted-foreground">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-4 p-4 bg-muted/30 rounded-lg">
                <div className="w-2 h-2 bg-gold rounded-full"></div>
                <div>
                  <p className="font-medium">Received 500 new likes</p>
                  <p className="text-sm text-muted-foreground">1 day ago</p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
};

export default Profile;
