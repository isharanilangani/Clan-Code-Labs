// Tasklist.tsx
import React, { useEffect, useState } from 'react';
import Task from './Task';
import Edittask from './Edittask';
import Addtask from './Addtask'; // Import the Addtask component

export interface TaskProps {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

interface TasklistProps {
  tasks: TaskProps[];
  onNewTaskAdded: (newTask: TaskProps) => void;
}

function Tasklist({ tasks: initialTasks, onNewTaskAdded }: TasklistProps) {
  const TASK_API_BASE_URL = "http://localhost:8080/api/v1/todos";
  const [tasks, setTasks] = useState<TaskProps[]>(initialTasks);
  const [loading, setLoading] = useState(true);
  const [selectedTask, setSelectedTask] = useState<TaskProps | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(TASK_API_BASE_URL, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const tasksData = await response.json();
        setTasks(tasksData);
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  const deleteTask = (e: React.MouseEvent<HTMLAnchorElement>, id: number) => {
    e.preventDefault();
    fetch(TASK_API_BASE_URL + "/" + id, {
      method: "DELETE",
    }).then((res) => {
      if (tasks) {
        setTasks((prevElement) => {
          return prevElement?.filter((task) => task.id !== id) || [];
        });
      }
    });
  };

  const editTask = (e: React.MouseEvent<HTMLAnchorElement>, id: number) => {
    e.preventDefault();
    const selected = tasks?.find((task) => task.id === id);
    setSelectedTask(selected || null);
  };

  const handleNewTaskAdded = async (newTask: TaskProps) => {
    const isNewTaskAlreadyAdded = tasks.some((task) => task.id === newTask.id);

    if (!isNewTaskAlreadyAdded) {
      setTasks((prevTasks) => [...prevTasks, newTask]);
    }

    fetchUpdatedTasks();
  };

  const fetchUpdatedTasks = async () => {
    try {
      const response = await fetch(TASK_API_BASE_URL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch updated tasks");
      }

      const updatedTasks = await response.json();
      setTasks(updatedTasks);
    } catch (error) {
      console.error("Error fetching updated tasks:", error.message);
      // Handle the error, e.g., show a notification to the user
    }
  };

  const closeModal = () => {
    setSelectedTask(null);
  };

  return (
    <>
    
      <div className='container'>
      <div className="add-task-button">
            <Addtask onNewTaskAdded={handleNewTaskAdded} />
          </div>
        <div className='table-container'>
          <table className='tabl'>
            <thead className='tablehead'>
              <tr>
                <th className='colum'>Title</th>
                <th className='colum'>Description</th>
                <th className='colum'>Status</th>
                <th className='colum-l'>Action</th>
              </tr>
            </thead>
            {!loading && (
              <tbody className='tablebody'>
                {tasks.map((task) => (
                  <Task
                    key={task.id}
                    task={task}
                    deleteTask={deleteTask}
                    editTask={(e) => editTask(e, task.id)}
                  />
                ))}
              </tbody>
            )}
          </table>
        </div>
      </div>
      {selectedTask !== null && (
        <Edittask task={selectedTask} closeModal={closeModal} fetchUpdatedTasks={fetchUpdatedTasks} />
      )}
    </>
  );
}

export default Tasklist;
