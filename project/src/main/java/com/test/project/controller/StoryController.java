package com.test.project.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.test.project.dto.StoryRequest;
import com.test.project.model.Story;
import com.test.project.service.StoryService;

@RestController
@RequestMapping("/api/stories")
@CrossOrigin(origins = "http://localhost:8080")
public class StoryController {

    private final StoryService storyService;
    

    public StoryController(StoryService storyService) {
        this.storyService = storyService;
    }

    @GetMapping
    public List<Story> getAllStories() {
        return storyService.getAllStories();
    }

    @PostMapping
    public ResponseEntity<Story> createStory(@RequestBody StoryRequest request) {
        Story story = storyService.createStory(request); // ✅ matches method
        return ResponseEntity.ok(story);
    }

  

    
}


