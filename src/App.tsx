import { useEffect, useState } from 'react';
import Task from './interfaces/task';
import { v4 as uuidv4 } from 'uuid';

import monthNames from './helpers/dates';

import List from './components/List';

const App = () => {
    const [tasks, setTasks] = useState<Task[]>(() => {
        const storedTodos = localStorage.getItem('tasks');
        if (!storedTodos) {
            return [];
        } else {
            return JSON.parse(storedTodos) as Task[];
        }
    });
    const [tasksTitle, setTasksTitle] = useState('');

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    const addTask = (): void => {
        if (tasksTitle.trim() !== '') {
            setTasks((prevTasks) => [
                ...prevTasks,
                {
                    id: uuidv4(),
                    title: tasksTitle,
                    status: false,
                },
            ]);
            setTasksTitle('');
        }
    };

    const date = new Date();

    const month = monthNames[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();

    return (
        <div className='container'>
            <h1>Note your tasks</h1>
            <span>{month + ' ' + day + ', ' + year}</span>
            <div className='input-field'>
                <input
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            addTask();
                        }
                    }}
                    type='text'
                    value={tasksTitle}
                    onChange={(event) => setTasksTitle(event.target.value)}
                />
                <label>Type your note</label>
            </div>
            <button className='btn' onClick={addTask}>Add Task</button>
            <List tasks={tasks} />
        </div>
    );
};

export default App;
