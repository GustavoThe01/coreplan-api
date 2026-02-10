import React, { createContext, useContext, useState, useEffect } from 'react';
import { Task, User, TaskStatus } from '../types';
import { INITIAL_TASKS, INITIAL_USERS } from '../constants';

interface TaskContextType {
  tasks: Task[];
  users: User[];
  addTask: (task: Omit<Task, 'id' | 'createdAt'>) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  addUser: (user: Omit<User, 'id'>) => void;
  deleteUser: (id: string) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // In a real app, we would fetch from the Spring Boot API here
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [users, setUsers] = useState<User[]>(INITIAL_USERS);

  const addTask = (taskData: Omit<Task, 'id' | 'createdAt'>) => {
    const newTask: Task = {
      ...taskData,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString(),
    };
    setTasks(prev => [newTask, ...prev]);
  };

  const updateTask = (id: string, updates: Partial<Task>) => {
    setTasks(prev => prev.map(task => {
      if (task.id !== id) return task;
      
      const updatedTask = { ...task, ...updates };
      // Handle status change logic (e.g., setting completedAt)
      if (updates.status === TaskStatus.CONCLUIDA && task.status !== TaskStatus.CONCLUIDA) {
        updatedTask.completedAt = new Date().toISOString();
      } else if (updates.status === TaskStatus.PENDENTE) {
        updatedTask.completedAt = undefined;
      }
      return updatedTask;
    }));
  };

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  const addUser = (userData: Omit<User, 'id'>) => {
    const newUser: User = {
      ...userData,
      id: Math.random().toString(36).substr(2, 9),
    };
    setUsers(prev => [...prev, newUser]);
  };

  const deleteUser = (id: string) => {
    setUsers(prev => prev.filter(u => u.id !== id));
    // Also unassign tasks from this user
    setTasks(prev => prev.map(t => t.userId === id ? { ...t, userId: undefined } : t));
  };

  return (
    <TaskContext.Provider value={{ tasks, users, addTask, updateTask, deleteTask, addUser, deleteUser }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
};