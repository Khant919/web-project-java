
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Heart, MessageCircle, Share2, Bookmark, Play, Star, Users, Clock, CheckCircle } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const StoryDetail = () => {
  const { id } = useParams();
  const [isFollowing, setIsFollowing] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const story = {
    id: '1',
    title: 'The Midnight Chronicles',
    author: 'Elena Rodriguez',
    authorAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop',
    description: 'A mysterious tale of magic and adventure in a world where midnight holds the key to everything. When 17-year-old Luna discovers she has the power to manipulate time at the stroke of midnight, she becomes the target of an ancient organization that seeks to control her abilities.',
    coverImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop',
    genre: 'Fantasy',
    reads: 1240000,
    likes: 89000,
    comments: 12000,
    rating: 4.8,
    chapters: 25,
    isCompleted: false,
    lastUpdated: '2 hours ago',
    tags: ['Magic', 'Adventure', 'Time Travel', 'Young Adult', 'Romance'],
    mature: false,
    followers: 45000
  };

  const chapters = Array.from({ length: 25 }, (_, i) => ({
    id: i + 1,
    title: `Chapter ${i + 1}: ${['The Discovery', 'Midnight Awakening', 'The Ancient Order', 'Time Fractures', 'Hidden Powers'][i % 5]}`,
    reads: Math.floor(Math.random() * 50000) + 10000,
    comments: Math.floor(Math.random() * 500) + 50,
    publishedAt: `${Math.floor(Math.random() * 30) + 1} days ago`
  }));

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container px-4 py-8">
        {/* Story Header */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <img
                src={story.coverImage}
                alt={story.title}
                className="w-full max-w-sm mx-auto rounded-lg shadow-lg"
              />
              <div className="mt-6 space-y-3">
                <Button className="w-full bg-gradient-to-r from-teal to-sky-blue" size="lg">
                  <Play className="w-4 h-4 mr-2" />
                  Start Reading
                </Button>
                <div className="flex gap-2">
                  <Button
                    variant={isLiked ? "default" : "outline"}
                    className="flex-1"
                    onClick={() => setIsLiked(!isLiked)}
                  >
                    <Heart className={`w-4 h-4 mr-2 ${isLiked ? 'fill-current' : ''}`} />
                    {story.likes.toLocaleString()}
                  </Button>
                  <Button
                    variant={isBookmarked ? "default" : "outline"}
                    onClick={() => setIsBookmarked(!isBookmarked)}
                  >
                    <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
                  </Button>
                  <Button variant="outline">
                    <Share2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold mb-2">{story.title}</h1>
                <div className="flex items-center space-x-4 text-muted-foreground mb-4">
                  <div className="flex items-center space-x-2">
                    <img
                      src={story.authorAvatar}
                      alt={story.author}
                      className="w-8 h-8 rounded-full"
                    />
                    <span className="font-medium">{story.author}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 fill-gold text-gold" />
                    <span>{story.rating}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="w-4 h-4" />
                    <span>{story.reads.toLocaleString()} reads</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {story.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-teal/10 text-teal rounded-full text-sm"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              <div className="prose max-w-none">
                <p className="text-muted-foreground leading-relaxed">
                  {story.description}
                </p>
              </div>

              <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                <div className="flex items-center space-x-6">
                  <div className="text-center">
                    <div className="text-xl font-bold">{story.chapters}</div>
                    <div className="text-sm text-muted-foreground">Chapters</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold">{story.followers.toLocaleString()}</div>
                    <div className="text-sm text-muted-foreground">Followers</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold">{story.comments.toLocaleString()}</div>
                    <div className="text-sm text-muted-foreground">Comments</div>
                  </div>
                </div>
                <Button
                  variant={isFollowing ? "default" : "outline"}
                  onClick={() => setIsFollowing(!isFollowing)}
                >
                  {isFollowing ? 'Following' : 'Follow'}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Chapters List */}
        <Card>
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold mb-6">Chapters</h2>
            <div className="space-y-4">
              {chapters.map((chapter) => (
                <div
                  key={chapter.id}
                  className="flex items-center justify-between p-4 hover:bg-muted/50 rounded-lg transition-colors cursor-pointer"
                >
                  <div className="flex-1">
                    <h3 className="font-medium">{chapter.title}</h3>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
                      <span>{chapter.reads.toLocaleString()} reads</span>
                      <span>{chapter.comments} comments</span>
                      <span>{chapter.publishedAt}</span>
                    </div>
                  </div>
                  <MessageCircle className="w-4 h-4 text-muted-foreground" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
};

export default StoryDetail;
