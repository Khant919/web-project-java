
import React, { useState } from 'react';
import { Bookmark, Clock, Heart, TrendingUp, Filter, Grid, List } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StoryCard from '@/components/StoryCard';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Library = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const readingList = [
    {
      id: '1',
      title: 'The Midnight Chronicles',
      author: 'Elena Rodriguez',
      description: 'A mysterious tale of magic and adventure.',
      coverImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop',
      genre: 'Fantasy',
      reads: 1240000,
      likes: 89000,
      comments: 12000,
      rating: 4.8,
      chapters: 25,
      isCompleted: false,
      lastUpdated: '2 hours ago',
      progress: 65
    },
    {
      id: '2',
      title: 'Love in Silicon Valley',
      author: 'Marcus Chen',
      description: 'A contemporary romance between two tech entrepreneurs.',
      coverImage: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=300&fit=crop',
      genre: 'Romance',
      reads: 890000,
      likes: 67000,
      comments: 8900,
      rating: 4.6,
      chapters: 18,
      isCompleted: true,
      lastUpdated: '1 day ago',
      progress: 100
    }
  ];

  const following = [
    {
      id: '1',
      name: 'Elena Rodriguez',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop',
      followers: 45000,
      stories: 12,
      isFollowing: true
    },
    {
      id: '2',
      name: 'Marcus Chen',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
      followers: 32000,
      stories: 8,
      isFollowing: true
    }
  ];

  const handleStoryClick = (storyId: string) => {
    console.log('Story clicked:', storyId);
    // Navigate to story detail page
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Your Library</h1>
          <p className="text-muted-foreground">Keep track of your reading journey</p>
        </div>

        <Tabs defaultValue="reading" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="reading" className="flex items-center space-x-2">
              <Clock className="w-4 h-4" />
              <span>Reading</span>
            </TabsTrigger>
            <TabsTrigger value="bookmarks" className="flex items-center space-x-2">
              <Bookmark className="w-4 h-4" />
              <span>Bookmarks</span>
            </TabsTrigger>
            <TabsTrigger value="liked" className="flex items-center space-x-2">
              <Heart className="w-4 h-4" />
              <span>Liked</span>
            </TabsTrigger>
            <TabsTrigger value="following" className="flex items-center space-x-2">
              <TrendingUp className="w-4 h-4" />
              <span>Following</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="reading" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Continue Reading</h2>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
                <div className="flex gap-1">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                  >
                    <Grid className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            <div className={`grid gap-6 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                : 'grid-cols-1'
            }`}>
              {readingList.map((story) => (
                <div key={story.id} className="relative">
                  <StoryCard {...story} onClick={() => handleStoryClick(story.id)} />
                  {story.progress && (
                    <div className="absolute bottom-2 left-2 right-2">
                      <div className="bg-black/50 rounded-full p-2">
                        <div className="flex items-center justify-between text-white text-xs mb-1">
                          <span>Progress</span>
                          <span>{story.progress}%</span>
                        </div>
                        <div className="w-full bg-white/20 rounded-full h-1">
                          <div 
                            className="bg-teal h-1 rounded-full transition-all"
                            style={{ width: `${story.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="bookmarks">
            <div className="text-center py-12">
              <Bookmark className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No bookmarks yet</h3>
              <p className="text-muted-foreground">Stories you bookmark will appear here</p>
            </div>
          </TabsContent>

          <TabsContent value="liked">
            <div className="text-center py-12">
              <Heart className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No liked stories yet</h3>
              <p className="text-muted-foreground">Stories you like will appear here</p>
            </div>
          </TabsContent>

          <TabsContent value="following" className="space-y-6">
            <h2 className="text-xl font-semibold">Following</h2>
            <div className="grid gap-4">
              {following.map((author) => (
                <div key={author.id} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <img
                      src={author.avatar}
                      alt={author.name}
                      className="w-12 h-12 rounded-full"
                    />
                    <div>
                      <h3 className="font-semibold">{author.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {author.followers.toLocaleString()} followers • {author.stories} stories
                      </p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Following
                  </Button>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
};

export default Library;
