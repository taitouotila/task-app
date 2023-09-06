import { Task } from '../model';
import { v1 as uuidv1 } from 'uuid';
import { TaskItem } from './TaskItem';

interface Props {
    tasks: Task[];
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
    toggleCompleted: (id: string, completed: boolean) => void;
    deleteTask: (id: string) => void;
    editTask: (id: string, newTitle: string) => void;
}


export function TaskList({tasks, setTasks, toggleCompleted, deleteTask, editTask }: Props) {
    return (
        <div className="tasks">
            <ul>
                {tasks.map((task) => {
                    return <TaskItem {...task} key={uuidv1()} toggleCompleted={toggleCompleted} deleteTask={deleteTask} editTask={editTask} />;
                })}
            </ul>
        </div>
    );
}
