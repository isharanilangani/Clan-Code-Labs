package com.todo.todolist.service;

import com.todo.todolist.model.Todo;

import java.util.List;

public interface TodoService {

    Todo createTodo(Todo todo);

    List<Todo> getAllTodos();

    Todo getTodoById(Long id);

    boolean deleteTodo(Long id);

    Todo updateTodo(Long id, Todo todo);
}

