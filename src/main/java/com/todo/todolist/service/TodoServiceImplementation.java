package com.todo.todolist.service;

import com.todo.todolist.entity.TodoEntity;
import com.todo.todolist.model.Todo;
import com.todo.todolist.repository.TodoRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TodoServiceImplementation implements TodoService {

    private final TodoRepository todoRepository;

    public TodoServiceImplementation(TodoRepository todoRepository) {
        this.todoRepository = todoRepository;
    }

    @Override
    public Todo createTodo(Todo todo) {
        TodoEntity todoEntity = new TodoEntity();
        BeanUtils.copyProperties(todo, todoEntity);
        todoRepository.save(todoEntity);
        return todo;
    }

    @Override
    public List<Todo> getAllTodos() {
        List<TodoEntity> todoEntities = todoRepository.findAll();

        List<Todo> todos = todoEntities.stream()
                .map(todoEntity -> new Todo(
                        todoEntity.getId(),
                        todoEntity.getTitle(),
                        todoEntity.getDescription(),
                        todoEntity.isCompleted()
                ))
                .collect(Collectors.toList());

        return todos;
    }

    @Override
    public Todo getTodoById(Long id) {
        TodoEntity todoEntity = todoRepository.findById(id).orElse(null);
        if (todoEntity == null) {
            return null;
        }
        Todo todo = new Todo();
        BeanUtils.copyProperties(todoEntity, todo);
        return todo;
    }

    @Override
    public boolean deleteTodo(Long id) {
        TodoEntity todoEntity = todoRepository.findById(id).orElse(null);
        if (todoEntity == null) {
            return false;
        }
        todoRepository.delete(todoEntity);
        return true;
    }

    @Override
    public Todo updateTodo(Long id, Todo todo) {
        TodoEntity todoEntity = todoRepository.findById(id).orElse(null);
        if (todoEntity == null) {
            return null;
        }
        todoEntity.setTitle(todo.getTitle());
        todoEntity.setDescription(todo.getDescription());
        todoEntity.setCompleted(todo.isCompleted());

        todoRepository.save(todoEntity);
        return todo;
    }

}

