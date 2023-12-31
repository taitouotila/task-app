import { useState } from 'react';
import './App.css';
import { NewTaskForm } from './components/NewTaskForm';
import { TaskList } from './components/TaskList';
import { Task } from './model';

function App() {
    const [task, setTask] = useState("");
    const [tasks, setTasks] = useState<Task[]>([]);

    return (
        <div className="App">
            <h1>todo.app</h1>
            <NewTaskForm task={task} setTask={setTask} setTasks={setTasks} />
            <TaskList task={task} setTask={setTask} tasks={tasks} setTasks={setTasks} />
        </div>
    );
}

export default App;
