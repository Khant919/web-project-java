
import React from 'react';
import { ChevronDown, Lock, Coins } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';

interface ChapterSelectorProps {
  currentChapter: number;
  totalChapters: number;
  userCoins: number;
  onChapterSelect: (chapter: number) => void;
  onUnlockChapter: (chapter: number) => void;
}

const ChapterSelector = ({ 
  currentChapter, 
  totalChapters, 
  userCoins, 
  onChapterSelect, 
  onUnlockChapter 
}: ChapterSelectorProps) => {
  const chapters = Array.from({ length: totalChapters }, (_, i) => ({
    number: i + 1,
    title: `Chapter ${i + 1}`,
    isPaid: i >= 10, // Chapters 11+ are paid (index 10+)
    cost: i >= 10 ? 2 : 0, // 2 coins per paid chapter
    isUnlocked: i < 10 || localStorage.getItem(`chapter_${i + 1}_unlocked`) === 'true'
  }));

  const handleChapterSelect = (value: string) => {
    const chapterNum = parseInt(value);
    const chapter = chapters.find(c => c.number === chapterNum);
    
    if (chapter && chapter.isPaid && !chapter.isUnlocked) {
      // Show unlock dialog
      return;
    }
    
    onChapterSelect(chapterNum);
  };

  const handleUnlock = (chapter: any) => {
    if (userCoins >= chapter.cost) {
      const newCoins = userCoins - chapter.cost;
      localStorage.setItem('userCoins', newCoins.toString());
      localStorage.setItem(`chapter_${chapter.number}_unlocked`, 'true');
      onUnlockChapter(chapter.number);
    } else {
      alert('Not enough coins!');
    }
  };

  return (
    <div className="flex items-center space-x-4">
      <Select value={currentChapter.toString()} onValueChange={handleChapterSelect}>
        <SelectTrigger className="w-48 bg-white/10 border-white/20 text-white">
          <SelectValue />
          <ChevronDown className="w-4 h-4" />
        </SelectTrigger>
        <SelectContent className="bg-slate-800 border-slate-700">
          {chapters.map((chapter) => (
            <SelectItem 
              key={chapter.number} 
              value={chapter.number.toString()}
              className="text-white hover:bg-slate-700"
            >
              <div className="flex items-center justify-between w-full">
                <span>{chapter.title}</span>
                {chapter.isPaid && (
                  <div className="flex items-center space-x-1 ml-2">
                    {chapter.isUnlocked ? (
                      <span className="text-green-400 text-xs">Unlocked</span>
                    ) : (
                      <div className="flex items-center space-x-1">
                        <Lock className="w-3 h-3 text-gold-400" />
                        <span className="text-gold-400 text-xs">{chapter.cost}</span>
                        <Coins className="w-3 h-3 text-gold-400" />
                      </div>
                    )}
                  </div>
                )}
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Show unlock button for locked chapters */}
      {chapters.find(c => c.number === currentChapter)?.isPaid && 
       !chapters.find(c => c.number === currentChapter)?.isUnlocked && (
        <Button
          onClick={() => handleUnlock(chapters.find(c => c.number === currentChapter))}
          className="bg-gold-500 hover:bg-gold-600 text-white"
          size="sm"
        >
          <Coins className="w-4 h-4 mr-1" />
          Unlock (2 coins)
        </Button>
      )}
    </div>
  );
};

export default ChapterSelector;
