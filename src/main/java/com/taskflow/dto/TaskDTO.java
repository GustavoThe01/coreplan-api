package com.taskflow.dto;

import com.taskflow.domain.Task.TaskPriority;
import com.taskflow.domain.Task.TaskStatus;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDateTime;

// Java 17 Record feature for immutable DTOs
public record TaskDTO(
    Long id,
    
    @NotBlank(message = "Title is required")
    String title,
    
    String description,
    
    @NotNull(message = "Status is required")
    TaskStatus status,
    
    @NotNull(message = "Priority is required")
    TaskPriority priority,
    
    Long userId,
    
    LocalDateTime createdAt,
    LocalDateTime completedAt
) {}