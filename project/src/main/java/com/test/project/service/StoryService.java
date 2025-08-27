package com.test.project.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;
import com.test.project.dto.StoryRequest;
import com.test.project.model.Story;
import com.test.project.repositories.StoryRepository;

@Service
public class StoryService {

    private final StoryRepository storyRepository;

    public StoryService(StoryRepository storyRepository) {
        this.storyRepository = storyRepository;
    }

    public Story createStory(StoryRequest request) {
        Story story = new Story();
        story.setTitle(request.getTitle());
        story.setContent(request.getContent());
        story.setFontSize(request.getFontSize());
        story.setFontFamily(request.getFontFamily());
        story.setBackgroundColor(request.getBackgroundColor());
        story.setTextColor(request.getTextColor());
        story.setImages(request.getImages());
        story.setCreatedAt(LocalDateTime.now());
        return storyRepository.save(story);
    }
    public List<Story> getAllStories() {
        return storyRepository.findAll();
    }

    
    

    
}
