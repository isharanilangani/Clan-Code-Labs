package com.todo.todolist.repository;

import com.todo.todolist.entity.TodoEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface TodoRepository extends JpaRepository<TodoEntity, Long> {

}

