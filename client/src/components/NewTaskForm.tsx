import { client } from '../api';
import { Task } from '../model';

interface Props {
    task: string,
    setTask: React.Dispatch<React.SetStateAction<string>>,
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

export function NewTaskForm({ task, setTask, setTasks }: Props) {

    async function addTask() {
        const response = await client.post("/api/v1/tasks", { title: task });
        setTasks(prevTasks => ([...prevTasks, ...response.data]));
    }

    function handleSubmit(e: any) {
        e.preventDefault();
        if (task === "") return;
        addTask();
        setTask("");
    }

    return (
        <div className="add-task">
            <form className="add-task__form" onSubmit={handleSubmit}>
                <input className="add-task__form__input"
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                    type='text'
                    maxLength={45}
                    placeholder='Add a new task...'
                />
                <div className="button">
                    <button className="add-task__form__button">Add</button>
                </div>
            </form>
        </div>
    );
}
