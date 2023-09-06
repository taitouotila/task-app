import { useState, useEffect } from 'react';
import './App.css';
import { NewTaskForm } from './components/NewTaskForm';
import { TaskList } from './components/TaskList';
import { Task } from './model';
import axios from 'axios';

const client = axios.create({
    baseURL: 'http://localhost:8081',
});

function App() {
    const [task, setTask] = useState("");
    const [tasks, setTasks] = useState<Task[]>([]);

    useEffect(() => {
        async function getTasks() {
            const response = await client.get("/api/v1/tasks");
            setTasks(response.data);
        }
        getTasks();
    }, []);

    async function addTask(e: React.FormEvent) {
        const response = await client.post("/api/v1/tasks", { title: task });
        // setTasks([...tasks, response.data]);
        setTasks(prevTasks => ([...prevTasks,  ...response.data]));
    }

    function deleteTask(id: string) {
        setTasks((currentTasks) => {
            return currentTasks.filter((task) => task.id !== id);
        })
    }

    function editTask(id: string, title: string) {
        setTasks((currentTasks) => {
            return currentTasks.map((task) => {
                if (task.id === id) {
                    return { ...task, title };
                }
                return task;
            });
        });
    }

    function toggleCompleted(id: string, completed: boolean) {
        setTasks((currentTasks) => {
            return currentTasks.map((task) => {
                if (task.id === id) {
                    return { ...task, completed };
                }
                return task;
            });
        });
    }

    console.log(tasks);

    return (
        <div className="App">
            <h1>TaskApp</h1>
            <NewTaskForm task={task} setTask={setTask} addTask={addTask} />
            <TaskList tasks={tasks} setTasks={setTasks} toggleCompleted={toggleCompleted} deleteTask={deleteTask} editTask={editTask} />
        </div>
    );
}

export default App;
