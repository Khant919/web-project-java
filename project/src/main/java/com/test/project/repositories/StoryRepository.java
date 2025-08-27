package com.test.project.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.test.project.model.Story;

public interface StoryRepository extends JpaRepository<Story, Long> {
}
