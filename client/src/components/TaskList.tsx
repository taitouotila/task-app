import { Task } from '../model';
import { useEffect } from 'react';
import { v1 as uuidv1 } from 'uuid';
import { TaskItem } from './TaskItem';
import { client } from '../api';

interface Props {
    tasks: Task[];
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
    task: string,
    setTask: React.Dispatch<React.SetStateAction<string>>,
}

export function TaskList({ tasks, setTasks }: Props) {

    useEffect(() => {
        async function getTasks() {
            const response = await client.get("/api/v1/tasks");
            setTasks(response.data);
        }
        getTasks();
    }, [setTasks]);

    return (
        <div className="tasks">
            <ul>
                {tasks.map((task) => {
                    return <TaskItem {...task} key={uuidv1()} tasks={tasks} setTasks={setTasks} />;
                })}
            </ul>
        </div>
    );
}
