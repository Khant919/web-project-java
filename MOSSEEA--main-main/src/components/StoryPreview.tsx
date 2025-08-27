
import React from 'react';
import { X, Eye, Heart, MessageCircle, Star, Clock, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface Story {
  id: string;
  title: string;
  author: string;
  description: string;
  coverImage: string;
  genre: string;
  reads: number;
  likes: number;
  comments: number;
  rating: number;
  chapters: number;
  isCompleted: boolean;
  lastUpdated: string;
}

interface StoryPreviewProps {
  story: Story;
  isOpen: boolean;
  onClose: () => void;
  onStoryClick: (story: Story) => void;
}

const StoryPreview = ({ story, isOpen, onClose, onStoryClick }: StoryPreviewProps) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  const handleReadNow = () => {
    navigate(`/read/${story.id}/1`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-navy rounded-xl overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex flex-col md:flex-row h-full">
          {/* Cover Image */}
          <div className="md:w-1/3 h-64 md:h-auto relative">
            <img
              src={story.coverImage}
              alt={story.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          </div>

          {/* Content */}
          <div className="flex-1 p-6 overflow-y-auto">
            <div className="space-y-4">
              {/* Header */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-1 bg-teal/20 text-teal text-xs rounded-full">
                    {story.genre}
                  </span>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    story.isCompleted 
                      ? 'bg-green-500/20 text-green-400' 
                      : 'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {story.isCompleted ? 'Completed' : 'Ongoing'}
                  </span>
                </div>
                
                <h2 className="text-2xl font-bold text-white mb-2">{story.title}</h2>
                <p className="text-teal font-medium mb-4">by {story.author}</p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center space-x-2 text-gray-300">
                  <Eye className="w-4 h-4" />
                  <span className="text-sm">{formatNumber(story.reads)}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-300">
                  <Heart className="w-4 h-4" />
                  <span className="text-sm">{formatNumber(story.likes)}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-300">
                  <MessageCircle className="w-4 h-4" />
                  <span className="text-sm">{formatNumber(story.comments)}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-300">
                  <Star className="w-4 h-4 text-yellow-400" />
                  <span className="text-sm">{story.rating}</span>
                </div>
              </div>

              {/* Additional Info */}
              <div className="flex items-center gap-4 text-sm text-gray-400">
                <div className="flex items-center space-x-1">
                  <BookOpen className="w-4 h-4" />
                  <span>{story.chapters} chapters</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>Updated {story.lastUpdated}</span>
                </div>
              </div>

              {/* Description */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Description</h3>
                <p className="text-gray-300 leading-relaxed">{story.description}</p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <Button
                  onClick={handleReadNow}
                  className="flex-1 bg-teal hover:bg-teal/90 text-white font-medium"
                >
                  Read Now
                </Button>
                <Button
                  variant="outline"
                  className="px-6 border-gray-600 text-gray-300 hover:bg-gray-700"
                >
                  <Heart className="w-4 h-4 mr-2" />
                  Like
                </Button>
                <Button
                  variant="outline"
                  className="px-6 border-gray-600 text-gray-300 hover:bg-gray-700"
                >
                  <BookOpen className="w-4 h-4 mr-2" />
                  Library
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoryPreview;
