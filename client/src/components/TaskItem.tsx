import { MdDelete } from 'react-icons/md';
import CSS from 'csstype';
import { useState } from 'react';
import { MdEdit } from 'react-icons/md';

interface Props {
    id: string;
    title: string;
    completed: boolean;
    toggleCompleted: (id: string, completed: boolean) => void;
    deleteTask: (id: string) => void;
    editTask: (id: string, newTitle: string) => void;
}

export function TaskItem({ id, title, completed, toggleCompleted, deleteTask, editTask }: Props) {

    const [editing, setEditing] = useState(false);

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

    return (
        <div className="task" style={completedItemStyle}>
            <li>
                <input
                    className="task__checkbox"
                    type="checkbox"
                    checked={completed}
                    onChange={(e) => toggleCompleted(id, e.target.checked)} />
                <div className="task__title  task__title--view" style={viewMode}>
                    <span style={completedStyle} onClick={() => toggleEditing()}>{title}</span>
                </div>
                <div className="task__title task__title--edit">
                    <input
                        ref={input => input && input.focus()}
                        className="task__title--edit--input"
                        style={editMode}
                        type="text"
                        maxLength={46}
                        value={title}
                        onChange={(e) => editTask(id, e.target.value)}
                        onKeyUp={(e) => { if (e.key === 'Enter') setEditing(false) }}
                        onBlur={() => setEditing(false)} />
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

