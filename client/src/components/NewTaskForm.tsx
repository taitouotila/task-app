interface Props {
    task: string,
    setTask: React.Dispatch<React.SetStateAction<string>>,
    addTask: (e: React.FormEvent) => void;
}

export function NewTaskForm({ task, setTask, addTask }: Props) {

    function handleSubmit(e: any) {
        e.preventDefault();
        if (task === "") return;
        addTask(e);
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
