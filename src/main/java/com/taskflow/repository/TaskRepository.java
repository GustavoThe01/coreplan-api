package com.taskflow.repository;

import com.taskflow.domain.Task;
import com.taskflow.domain.Task.TaskStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
    
    List<Task> findByUserId(Long userId);
    
    List<Task> findByStatus(TaskStatus status);

    @Query("SELECT t FROM Task t WHERE t.priority = 'ALTA' AND t.status = 'PENDENTE'")
    List<Task> findUrgentTasks();
}