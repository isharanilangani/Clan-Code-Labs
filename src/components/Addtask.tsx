
import { Transition, Dialog, FocusTrap } from '@headlessui/react';
import React, { Fragment, useState, useEffect, useRef } from 'react';

interface TaskProps {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

interface AddtaskProps {
  onNewTaskAdded: (newTask: TaskProps) => void;
}

function Addtask({ onNewTaskAdded }: AddtaskProps) {
  const TASK_API_BASE_URL = "http://localhost:8080/api/v1/todos";
  const [isOpen, setIsOpen] = useState(false);
  const [task, setTask] = useState({
    id: "",
    title: "",
    description: "",
    completed: false,
  });

  const titleInputRef = useRef<HTMLInputElement | null>(null);
  const descriptionInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      titleInputRef.current?.focus();
    }
  }, [isOpen]);

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTask((prevTask) => ({ ...prevTask, [name]: value }));
  };

  const reset = () => {
    setTask({
      id: "",
      title: "",
      description: "",
      completed: false,
    });
    setIsOpen(false);
  };

  const saveTask = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch(TASK_API_BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    });

    if (!response.ok) {
      throw new Error("Something went wrong");
    }

    // Notify the parent component with the new task data
    const newTask = await response.json();
    onNewTaskAdded(newTask);

    reset();
  };

  return (
    <>
      <div className='addtask'>
        <div className='taskde'>
          <button className='butt' onClick={openModal}>
            Add Task
          </button>
        </div>
      </div>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="dialog"
          onClose={closeModal}
          initialFocus={titleInputRef}
        >
          <div className='dialogcontent'>
            <Dialog.Title as="h3" className="new">
              Add New Task
            </Dialog.Title>
            <div className='interdialog'>
              <div className='dialog2'>
                <div className='dialogtopic'>
                  <label className='dialogcontent3'>Title</label>
                  <input
                    ref={titleInputRef}
                    type="text"
                    name='title'
                    value={task.title}
                    onChange={handleChange}
                    className='inputdialog'
                  />
                </div>
                <div className='dialogtopic'>
                  <label className='dialogcontent3'>Description</label>
                  <input
                    ref={descriptionInputRef}
                    type="text"
                    name='description'
                    value={task.description}
                    onChange={handleChange}
                    className='inputdialog'
                  />
                </div>
                <div className='butcon'>
                  <button className='save' onClick={saveTask}>
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
    </>
  );
}

export default Addtask;
