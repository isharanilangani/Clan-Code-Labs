// Task.tsx
import React from 'react';

interface TaskProps {
    task: {
        id: number;
        title: string;
        description: string;
        completed: boolean;
    };
    deleteTask: (e: React.MouseEvent<HTMLAnchorElement>, id: number) => void;
    editTask: (e: React.MouseEvent, id: number) => void;
}

const Task: React.FC<TaskProps & { editTask: (e: React.MouseEvent<HTMLAnchorElement>, id: number) => void }> = ({ task, deleteTask, editTask }) => {
    return (
        <tr key={task.id}>
            <td className='tbetail'>
                <div className='content'>{task.title}</div>
            </td>
            <td className='tbetail'>
                <div className='content'>{task.description}</div>
            </td>
            <td className='tbetail'>
                <div className='content'>{task.completed ? 'Done' : 'Not Done'}</div>
            </td>
            <td className='tbetail-l'>
            <a onClick={(e) => editTask(e, task.id)} className='button'>
    Edit
</a>
                <a onClick={(e) => deleteTask(e, task.id)} className='button'>
                    Delete
                </a>
            </td>
        </tr>
    );
};

export default Task;
