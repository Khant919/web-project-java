import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WelcomeBonus from '@/components/WelcomeBonus';
import StoryPreview from '@/components/StoryPreview';
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Star, Eye, BookOpen, Heart, MessageCircle } from 'lucide-react';

const Discover = () => {
  const [searchParams] = useSearchParams();
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [showWelcomeBonus, setShowWelcomeBonus] = useState(false);
  const [selectedStory, setSelectedStory] = useState(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  useEffect(() => {
    // Check if user is new and show welcome bonus
    const isNewUser = localStorage.getItem('isNewUser') === 'true';
    if (isNewUser) {
      setShowWelcomeBonus(true);
      localStorage.removeItem('isNewUser'); // Remove flag after showing
    }

    // Check for genre parameter
    const genre = searchParams.get('genre');
    if (genre) {
      setSelectedGenre(genre);
    }
  }, [searchParams]);

  const stories = [
    {
      id: '1',
      title: 'The Midnight Chronicles',
      author: 'Elena Rodriguez',
      coverImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop',
      genre: 'Fantasy',
      rating: 4.8,
      reads: 1240000,
      likes: 89000,
      comments: 12000,
      chapters: 25,
      description: 'A mysterious tale of magic and adventure in a world where midnight holds the key to everything.'
    },
    {
      id: '2',
      title: 'Echoes of the Past',
      author: 'Jameson Holt',
      coverImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=600&fit=crop',
      genre: 'Mystery',
      rating: 4.5,
      reads: 987000,
      likes: 67000,
      comments: 8900,
      chapters: 18,
      description: 'A detective haunted by his past must solve a series of perplexing murders that mirror events from decades ago.'
    },
    {
      id: '3',
      title: 'The Last Starfarer',
      author: 'Aisha Khan',
      coverImage: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=600&fit=crop',
      genre: 'Science Fiction',
      rating: 4.7,
      reads: 765000,
      likes: 54000,
      comments: 7800,
      chapters: 32,
      description: 'In a dying galaxy, a lone starfarer embarks on a perilous journey to find a new home for humanity.'
    },
    {
      id: '4',
      title: 'Crimson Hearts',
      author: 'Ricardo Silva',
      coverImage: 'https://images.unsplash.com/photo-1500673922987-e212871fec22?w=400&h=600&fit=crop',
      genre: 'Romance',
      rating: 4.2,
      reads: 654000,
      likes: 45000,
      comments: 6700,
      chapters: 22,
      description: 'Two rival artists find their lives intertwined as they compete for a prestigious scholarship, only to discover an undeniable connection.'
    },
    {
      id: '5',
      title: 'The Forgotten Prophecy',
      author: 'Ingrid Bjornstad',
      coverImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&h=600&fit=crop',
      genre: 'Fantasy',
      rating: 4.9,
      reads: 543000,
      likes: 38000,
      comments: 5600,
      chapters: 40,
      description: 'A young mage discovers an ancient prophecy that could either save the kingdom or plunge it into eternal darkness.'
    },
    {
      id: '6',
      title: 'Beneath the Surface',
      author: 'Omar Hassan',
      coverImage: 'https://images.unsplash.com/photo-1503443207922-dff7d5439e18?w=400&h=600&fit=crop',
      genre: 'Thriller',
      rating: 4.6,
      reads: 432000,
      likes: 32000,
      comments: 4500,
      chapters: 15,
      description: 'A marine biologist uncovers a sinister conspiracy while studying the effects of pollution on marine life.'
    },
    {
      id: '7',
      title: 'The Alchemist\'s Legacy',
      author: 'Svetlana Petrova',
      coverImage: 'https://images.unsplash.com/photo-1484820301354-6397b0014114?w=400&h=600&fit=crop',
      genre: 'Historical Fiction',
      rating: 4.4,
      reads: 321000,
      likes: 28000,
      comments: 3900,
      chapters: 28,
      description: 'In Renaissance Italy, a young apprentice must protect a powerful alchemical secret from falling into the wrong hands.'
    },
    {
      id: '8',
      title: 'Silent Shadows',
      author: 'Kenji Tanaka',
      coverImage: 'https://images.unsplash.com/photo-1504198453319-5ce911bafc59?w=400&h=600&fit=crop',
      genre: 'Horror',
      rating: 4.3,
      reads: 210000,
      likes: 19000,
      comments: 2800,
      chapters: 12,
      description: 'A group of friends camping in a remote forest stumble upon an ancient evil that lurks in the shadows.'
    },
    {
      id: '9',
      title: 'The Quantum Enigma',
      author: 'Lena Moreau',
      coverImage: 'https://images.unsplash.com/photo-1503614472-8c03139954ca?w=400&h=600&fit=crop',
      genre: 'Science Fiction',
      rating: 4.8,
      reads: 100000,
      likes: 12000,
      comments: 1800,
      chapters: 20,
      description: 'A brilliant physicist makes a groundbreaking discovery that challenges the very fabric of reality.'
    },
    {
      id: '10',
      title: 'Whispers of the Wind',
      author: 'Eamon O\'Connell',
      coverImage: 'https://images.unsplash.com/photo-1502694352047-b343d3f9484f?w=400&h=600&fit=crop',
      genre: 'Fantasy',
      rating: 4.6,
      reads: 90000,
      likes: 8500,
      comments: 1200,
      chapters: 35,
      description: 'A wandering bard carries the hopes and dreams of a war-torn land on his shoulders, using his music to inspire and heal.'
    }
  ];

  const filteredStories = selectedGenre === 'All' ? stories : stories.filter(story => story.genre === selectedGenre);

  const formatReads = (reads: number) => {
    if (reads >= 1000000) {
      return `${(reads / 1000000).toFixed(1)}M`;
    } else if (reads >= 1000) {
      return `${(reads / 1000).toFixed(0)}K`;
    }
    return reads.toString();
  };

  const handleStoryClick = (story) => {
    // Convert story to match StoryPreview interface
    const storyWithExtras = {
      ...story,
      isCompleted: Math.random() > 0.5, // Random completion status
      lastUpdated: `${Math.floor(Math.random() * 30) + 1} days ago`,
      comments: story.comments || Math.floor(Math.random() * 5000) + 1000
    };
    setSelectedStory(storyWithExtras);
    setIsPreviewOpen(true);
  };

  const handleClosePreview = () => {
    setIsPreviewOpen(false);
    setSelectedStory(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sage-50 via-sage-100 to-deep-navy-900">
      <Header />
      
      <WelcomeBonus 
        isOpen={showWelcomeBonus} 
        onClose={() => setShowWelcomeBonus(false)} 
      />

      {selectedStory && (
        <StoryPreview 
          story={selectedStory}
          isOpen={isPreviewOpen}
          onClose={handleClosePreview}
          onStoryClick={handleStoryClick}
        />
      )}

      <main className="container px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-deep-navy-900 mb-4">Discover New Stories</h1>
          <div className="flex items-center space-x-4">
            <Select value={selectedGenre} onValueChange={setSelectedGenre}>
              <SelectTrigger className="w-[180px] bg-deep-navy-900/80 border-sage-200 text-white">
                <SelectValue placeholder="Select genre" />
              </SelectTrigger>
              <SelectContent className="bg-deep-navy-900 border-sage-200">
                <SelectItem value="All" className="text-white hover:bg-sage-600">All Genres</SelectItem>
                <SelectItem value="Fantasy" className="text-white hover:bg-sage-600">Fantasy</SelectItem>
                <SelectItem value="Science Fiction" className="text-white hover:bg-sage-600">Science Fiction</SelectItem>
                <SelectItem value="Mystery" className="text-white hover:bg-sage-600">Mystery</SelectItem>
                <SelectItem value="Romance" className="text-white hover:bg-sage-600">Romance</SelectItem>
                <SelectItem value="Thriller" className="text-white hover:bg-sage-600">Thriller</SelectItem>
                <SelectItem value="Historical Fiction" className="text-white hover:bg-sage-600">Historical Fiction</SelectItem>
                <SelectItem value="Horror" className="text-white hover:bg-sage-600">Horror</SelectItem>
              </SelectContent>
            </Select>
            <span className="text-sage-600 text-sm">
              {filteredStories.length} stories found
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {filteredStories.map(story => (
            <div key={story.id} onClick={() => handleStoryClick(story)}>
              <Card className="bg-deep-navy-900/90 backdrop-blur-sm border-sage-200/30 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer group h-full">
                <div className="relative overflow-hidden rounded-t-lg">
                  <img
                    src={story.coverImage}
                    alt={story.title}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
                    {story.chapters} chapters
                  </div>
                  <div className="absolute top-2 left-2">
                    <span className="bg-sage-500 text-white px-2 py-1 rounded text-xs font-medium">
                      {story.genre}
                    </span>
                  </div>
                </div>
                
                <CardContent className="p-4 flex-1 flex flex-col">
                  <h3 className="font-bold text-white mb-1 line-clamp-2 group-hover:text-sage-400 transition-colors">
                    {story.title}
                  </h3>
                  <p className="text-sage-400 text-sm mb-2">by {story.author}</p>
                  
                  <p className="text-sage-300 text-xs mb-3 line-clamp-2 flex-1">
                    {story.description}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs text-sage-400 mt-auto">
                    <div className="flex items-center space-x-1">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      <span>{story.rating}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Eye className="w-3 h-3" />
                      <span>{formatReads(story.reads)}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Heart className="w-3 h-3" />
                      <span>{formatReads(story.likes)}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-xs text-sage-400 mt-1">
                    <div className="flex items-center space-x-1">
                      <MessageCircle className="w-3 h-3" />
                      <span>{formatReads(story.comments)}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <BookOpen className="w-3 h-3" />
                      <span>{story.chapters}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Discover;
