
import React from 'react';
import { Eye, Heart, MessageCircle, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface StoryCardProps {
  id: string;
  title: string;
  author: string;
  coverImage: string;
  reads: number;
  likes: number;
  comments: number;
  rating: number;
  onClick?: () => void;
}

const StoryCard = ({ id, title, author, coverImage, reads, likes, comments, rating, onClick }: StoryCardProps) => {
  const navigate = useNavigate();

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  const handleReadNow = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/read/${id}/1`);
  };

  return (
    <div className="group cursor-pointer" onClick={onClick}>
      <div className="relative aspect-[3/4] rounded-lg overflow-hidden mb-2">
        <img
          src={coverImage}
          alt={title}
          className="w-full h-full object-cover transition-transform group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Read Now Button - appears on hover */}
        <button
          onClick={handleReadNow}
          className="absolute bottom-2 left-2 right-2 bg-teal hover:bg-teal/90 text-white py-2 px-4 rounded-md font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0"
        >
          Read Now
        </button>
        
        {/* Stats overlay */}
        <div className="absolute top-2 right-2 flex items-center space-x-1 bg-black/50 rounded-full px-2 py-1">
          <Star className="w-3 h-3 text-yellow-400 fill-current" />
          <span className="text-xs text-white font-medium">{rating}</span>
        </div>
      </div>
      
      <div className="space-y-1">
        <h3 className="text-sm font-medium text-white line-clamp-2 leading-tight">
          {title}
        </h3>
        <p className="text-xs text-gray-400">by {author}</p>
        
        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1">
              <Eye className="w-3 h-3" />
              <span>{formatNumber(reads)}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Heart className="w-3 h-3" />
              <span>{formatNumber(likes)}</span>
            </div>
            <div className="flex items-center space-x-1">
              <MessageCircle className="w-3 h-3" />
              <span>{formatNumber(comments)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoryCard;
