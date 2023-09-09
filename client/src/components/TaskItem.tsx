import { MdDelete } from 'react-icons/md';
import { Task } from '../model';
import { client } from '../api';
import CSS from 'csstype';
import { useState } from 'react';
import { MdEdit } from 'react-icons/md';

interface Props {
    id: number;
    title: string;
    completed: boolean;
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
    tasks: Task[];
}

export function TaskItem({ id, title, completed, tasks, setTasks }: Props) {

    const [editing, setEditing] = useState(false);
    const [updateInput, setUpdateInput] = useState(title);

    let viewMode: CSS.Properties = {};
    let editMode: CSS.Properties = {};
    let completedStyle: CSS.Properties = {};
    let completedItemStyle: CSS.Properties = {};

    (editing) ? viewMode.display = 'none' : editMode.display = 'none';

    if (completed) {
        completedStyle.textDecoration = 'line-through';
        completedItemStyle.backgroundColor = '#121212';
    } else {
        completedStyle.textDecoration = 'none';
    }

    function toggleEditing() {
        if (editing) {
            setEditing(false);
        } else {
            setEditing(true);
        }
    }

    async function editTask(id: number, title: string) {
        const response = await client.put(`/api/v1/tasks/${id}`, { title: title });

        setTasks(tasks.map((task) => {
            if (task.id === id) {
                task.title = response.data;
            }
            return task;
        }))

        setEditing(false);
    }

    async function toggleCompleted(id: number, completed: boolean) {
        const response = await client.put(`/api/v1/tasks/${id}/complete`, { completed: completed });
        setTasks((currentTasks) => {
            return currentTasks.map((task) => {
                if (task.id === id) {
                    return { ...task, completed };
                }
                return task;
            });
        });
    }

    async function deleteTask(id: number) {
        const response = await client.delete(`/api/v1/tasks/${id}`);
        setTasks((currentTasks) => {
            return currentTasks.filter((task) => task.id !== id);
        })
    }

    return (
        <div className="task" style={completedItemStyle}>
            <li>
                <input
                    className="task__checkbox"
                    type="checkbox"
                    checked={completed}
                    onChange={(e) => toggleCompleted(id, e.target.checked)} />
                <div className="task__title  task__title--view" style={viewMode}>
                    <span style={completedStyle} onClick={() => toggleEditing()}>{updateInput}</span>
                </div>
                <div className="task__title task__title--edit">
                    <input
                        ref={input => input && input.focus()}
                        className="task__title--edit--input"
                        style={editMode}
                        type="text"
                        maxLength={46}
                        value={updateInput}
                        onChange={(e) => setUpdateInput(e.target.value)}
                        onKeyUp={(e) => { if (e.key === 'Enter') editTask(id, updateInput) }}
                        onBlur={() => editTask(id, updateInput)} />
                </div>
                <div className="task__buttons">
                    <div className="task_buttons__edit">
                        <MdEdit className="task__button task__button--edit" onClick={() => toggleEditing()} />
                    </div>
                    <div className="task_buttons__delete">
                        <MdDelete className="task__button task__button--delete" onClick={() => deleteTask(id)} />
                    </div>
                </div>
            </li>
        </div>

    );
}

