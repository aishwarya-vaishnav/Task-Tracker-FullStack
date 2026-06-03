package com.example.tasktracker;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/tasks")
@CrossOrigin(origins = "http://localhost:5173") // Connects to your future React Vite port
public class TaskController {

    @Autowired
    private TaskRepository taskRepository;

    // 1. Get all tasks from XAMPP database
    @GetMapping
    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    // 2. Add a new task to XAMPP database
    @PostMapping
    public Task createTask(@RequestBody Task task) {
        if (task.getStatus() == null) {
            task.setStatus("Todo"); // Default status for new tasks
        }
        return taskRepository.save(task);
    }

    // 3. Delete a task using its ID
    @DeleteMapping("/{id}")
    public void deleteTask(@PathVariable Long id) {
        taskRepository.deleteById(id);
    }
}