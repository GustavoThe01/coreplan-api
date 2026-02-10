package com.taskflow.service;

import com.taskflow.domain.Task;
import com.taskflow.domain.User;
import com.taskflow.dto.TaskDTO;
import com.taskflow.exception.ResourceNotFoundException;
import com.taskflow.repository.TaskRepository;
import com.taskflow.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class TaskService {

    private final TaskRepository taskRepository;
    private final UserRepository userRepository;

    public List<TaskDTO> findAll() {
        return taskRepository.findAll().stream()
                .map(this::toDTO)
                .toList();
    }

    @Transactional
    public TaskDTO create(TaskDTO dto) {
        User user = null;
        if (dto.userId() != null) {
            user = userRepository.findById(dto.userId())
                    .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        }

        Task task = Task.builder()
                .title(dto.title())
                .description(dto.description())
                .status(dto.status())
                .priority(dto.priority())
                .user(user)
                .build();

        return toDTO(taskRepository.save(task));
    }

    @Transactional
    public TaskDTO update(Long id, TaskDTO dto) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Task not found"));

        task.setTitle(dto.title());
        task.setDescription(dto.description());
        task.setPriority(dto.priority());
        
        // Handle Logic for completion date
        if (dto.status() == Task.TaskStatus.CONCLUIDA && task.getStatus() != Task.TaskStatus.CONCLUIDA) {
            task.setCompletedAt(LocalDateTime.now());
        } else if (dto.status() == Task.TaskStatus.PENDENTE) {
            task.setCompletedAt(null);
        }
        task.setStatus(dto.status());

        if (dto.userId() != null) {
            User user = userRepository.findById(dto.userId())
                    .orElseThrow(() -> new ResourceNotFoundException("User not found"));
            task.setUser(user);
        }

        return toDTO(taskRepository.save(task));
    }

    @Transactional
    public void delete(Long id) {
        if (!taskRepository.existsById(id)) {
            throw new ResourceNotFoundException("Task not found");
        }
        taskRepository.deleteById(id);
    }

    // Mapper method (In real projects, consider MapStruct)
    private TaskDTO toDTO(Task task) {
        return new TaskDTO(
            task.getId(),
            task.getTitle(),
            task.getDescription(),
            task.getStatus(),
            task.getPriority(),
            task.getUser() != null ? task.getUser().getId() : null,
            task.getCreatedAt(),
            task.getCompletedAt()
        );
    }
}