
import React, { useState, useRef } from 'react';
import { ArrowLeft, Save, Eye, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { useNavigate } from 'react-router-dom';
import FontSettings from '@/components/write/FontSettings';
import FormattingControls from '@/components/write/FormattingControls';
import ImageUpload from '@/components/write/ImageUpload';
import PreviewRenderer from '@/components/write/PreviewRenderer';
import BackgroundSettings from '@/components/write/BackgroundSettings';

const Write = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [fontSize, setFontSize] = useState(16);
  const [fontFamily, setFontFamily] = useState('Inter');
  const [backgroundColor, setBackgroundColor] = useState('gradient-sage-navy');
  const [textColor, setTextColor] = useState('white');
  const [showPreview, setShowPreview] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [isSaved, setIsSaved] = useState(false);
  
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const getBackgroundClass = (bgColor: string) => {
    switch (bgColor) {
      case 'gradient-sage-navy': return 'bg-gradient-to-br from-emerald-900 via-slate-800 to-slate-900';
      case 'gradient-purple': return 'bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900';
      case 'gradient-blue': return 'bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900';
      case 'dark-navy': return 'bg-slate-900';
      case 'sage-green': return 'bg-emerald-900';
      default: return 'bg-gradient-to-br from-emerald-900 via-slate-800 to-slate-900';
    }
  };

  const getTextColorClass = (txtColor: string) => {
    switch (txtColor) {
      case 'white': return 'text-white';
      case 'cream': return 'text-amber-50';
      case 'sage': return 'text-emerald-200';
      case 'sky': return 'text-sky-200';
      case 'warm': return 'text-gray-200';
      default: return 'text-white';
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target?.result) {
            setImages(prev => [...prev, e.target!.result as string]);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const insertImageAtCursor = (imageUrl: string) => {
    const textarea = textareaRef.current;
    if (textarea) {
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const imageTag = `\n[Image: ${imageUrl}]\n`;
      const newContent = content.substring(0, start) + imageTag + content.substring(end);
      setContent(newContent);
      
      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + imageTag.length;
        textarea.focus();
      }, 0);
    }
  };

  const applyFormatting = (format: string) => {
    const textarea = textareaRef.current;
    if (textarea) {
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const selectedText = content.substring(start, end);
      
      if (selectedText.length === 0) {
        alert('Please select some text to format');
        return;
      }
      
      let formattedText = selectedText;
      
      switch (format) {
        case 'bold':
          formattedText = `**${selectedText}**`;
          break;
        case 'italic':
          formattedText = `*${selectedText}*`;
          break;
        case 'underline':
          formattedText = `__${selectedText}__`;
          break;
        case 'list':
          formattedText = selectedText.split('\n').map(line => `• ${line}`).join('\n');
          break;
        case 'numbered':
          formattedText = selectedText.split('\n').map((line, index) => `${index + 1}. ${line}`).join('\n');
          break;
      }
      
      const newContent = content.substring(0, start) + formattedText + content.substring(end);
      setContent(newContent);
      
      setTimeout(() => {
        textarea.selectionStart = start;
        textarea.selectionEnd = start + formattedText.length;
        textarea.focus();
      }, 0);
    }
  };

  const saveStory = async () => {
    if (!title.trim() || !content.trim()) {
    alert("Title and Content are required before saving!");
    return;
  }
  const storyData = {
    title,
    content,
    fontSize,
    fontFamily,
    backgroundColor,
    textColor,
    images,
    createdAt: new Date().toISOString()
  };

  try {
    const response = await fetch("http://localhost:8081/api/stories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(storyData),
    });

    if (!response.ok) {
      const errorText = await response.text(); // get raw response
      throw new Error(`Failed to save story: ${response.status} - ${errorText}`);
    }

    // Try to parse JSON only if there is content
    let result;
    const text = await response.text();
    if (text) {
      result = JSON.parse(text);
    }

    console.log("Story saved:", result);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);

    alert("Story saved successfully!");
  } catch (error: any) {
    console.error("Error saving story:", error);
    alert("Error saving story: " + error.message);
  }
};




  return (
    <div className={`min-h-screen ${getBackgroundClass(backgroundColor)}`}>
      <header className="sticky top-0 z-50 border-b bg-black/20 backdrop-blur">
        <div className="container flex items-center justify-between h-16 px-4">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/10" onClick={() => navigate('/discover')}>
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <h1 className="font-semibold text-white">Write Your Story</h1>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-white hover:bg-white/10"
              onClick={() => setShowPreview(!showPreview)}
            >
              <Eye className="w-4 h-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className={`text-white hover:bg-white/10 transition-all duration-300 ${
                isSaved ? 'bg-cyan-500/30 text-cyan-300 shadow-lg shadow-cyan-500/20 scale-105' : ''
              }`}
              onClick={saveStory}
            >
              <Save className={`w-4 h-4 transition-all duration-300 ${isSaved ? 'scale-110' : ''}`} />
            </Button>
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <Card className="lg:col-span-1 bg-white/10 backdrop-blur border-white/20">
            <CardContent className="p-6 space-y-6">
              <BackgroundSettings
                backgroundColor={backgroundColor}
                textColor={textColor}
                onBackgroundColorChange={setBackgroundColor}
                onTextColorChange={setTextColor}
              />

              <FontSettings
                fontSize={fontSize}
                fontFamily={fontFamily}
                onFontSizeChange={setFontSize}
                onFontFamilyChange={setFontFamily}
              />

              <FormattingControls onApplyFormatting={applyFormatting} />

              <ImageUpload
                images={images}
                onImageUpload={handleImageUpload}
                onInsertImage={insertImageAtCursor}
              />
            </CardContent>
          </Card>

          <Card className="lg:col-span-3 bg-white/10 backdrop-blur border-white/20">
            <CardContent className="p-6">
              {!showPreview ? (
                <div className="space-y-4">
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Story Title..."
                    className={`w-full text-2xl font-bold bg-transparent border-none outline-none ${getTextColorClass(textColor)} placeholder-white/60`}
                    style={{ fontFamily: fontFamily }}
                  />
                  
                  <Textarea
                    ref={textareaRef}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Start writing your story..."
                    className={`min-h-[600px] bg-transparent border-white/20 ${getTextColorClass(textColor)} placeholder-white/60 resize-none`}
                    style={{ fontSize: `${fontSize}px`, fontFamily: fontFamily }}
                  />
                </div>
              ) : (
                <div className="space-y-4">
                  <h1 
                    className={`text-2xl font-bold ${getTextColorClass(textColor)}`}
                    style={{ fontFamily: fontFamily }}
                  >
                    {title || 'Story Title'}
                  </h1>
                  <PreviewRenderer
                    content={content}
                    fontSize={fontSize}
                    fontFamily={fontFamily}
                    textColor={textColor}
                  />
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Write;
