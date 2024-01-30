// Edittask.tsx
import React, { useState, useEffect, useRef, Fragment } from 'react';
import { Transition, Dialog } from '@headlessui/react';

interface TaskProps {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

interface EdittaskProps {
  task: TaskProps;
  closeModal: () => void;
  fetchUpdatedTasks: () => void;
}

const Edittask: React.FC<EdittaskProps> = ({ task, closeModal, fetchUpdatedTasks }) => {
  const TASK_API_BASE_URL = "http://localhost:8080/api/v1/todos";
  const [editedTask, setEditedTask] = useState({
    id: task.id,
    title: task.title,
    description: task.description,
  });

  const titleInputRef = useRef<HTMLInputElement | null>(null);
  const descriptionInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    // Set the initial focus when the dialog opens
    titleInputRef.current?.focus();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedTask((prevTask) => ({ ...prevTask, [name]: value }));
  };

  const reset = () => {
    closeModal();
  };

  const updateTask = async (e: React.FormEvent) => {
    e.preventDefault();

    const url = `${TASK_API_BASE_URL}/${editedTask.id}`;
    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedTask),
      });

      if (!response.ok) {
        throw new Error(`Failed to update task. Server returned ${response.status} ${response.statusText}`);
      }

      fetchUpdatedTasks();
      reset();
    } catch (error) {
      console.error("Error updating task:", error.message);
    }
  };

  return (
    <Transition appear show={true} as={Fragment}>
      <Dialog onClose={closeModal} className="dialog" initialFocus={titleInputRef}>
        <div className='dialogcontent'>
          <Dialog.Title as="h3" className="new">
            Update Task
          </Dialog.Title>
          <div className='interdialog'>
            <div className='dialog2'>
              <div className='dialogtopic'>
                <label className='dialogcontent3'>Title</label>
                <input
                  type="text"
                  name='title'
                  value={editedTask.title}
                  onChange={handleChange}
                  className='inputdialog'
                  ref={titleInputRef}
                />
              </div>
              <div className='dialogtopic'>
                <label className='dialogcontent3'>Description</label>
                <input
                  type="text"
                  name='description'
                  value={editedTask.description}
                  onChange={handleChange}
                  className='inputdialog'
                  ref={descriptionInputRef}
                />
              </div>
              <div className='butcon'>
                <button className='save' onClick={updateTask}>
                  Save
                </button>
                <button className='close' onClick={reset}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Edittask;
