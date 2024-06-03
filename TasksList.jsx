import { tasksData } from '../data/tasksData';
import { useState } from 'react';

export function TasksList() {
    const [tasks, setTasks] = useState(tasksData);
    const [completedTasks, setCompletedTasks] = useState([]);
    const [newTaskTitle, setNewTaskTitle] = useState('');

    const deleteTask = index => {
        const newTasks = [...tasks];
        newTasks.splice(index, 1);
        setTasks(newTasks);
    };

    const completeTask = index => {
        const newTask = [...tasks];
        newTask[index].completed = true;
        setTasks(newTask);

        const taskToMove = newTask.splice(index, 1)[0];
        setCompletedTasks([...completedTasks, taskToMove]);
    };

    const addTask = () => {
        if (newTaskTitle.trim() !== '') {
            const newTasks = [...tasks];
            newTasks.push({
                title: newTaskTitle,
                description: 'opis zadania',
                completed: false,
            });
            setTasks(newTasks);
            setNewTaskTitle('');
        }
    };

    return (
        <div>
            <input
                type="text"
                value={newTaskTitle}
                onChange={e => setNewTaskTitle(e.target.value)}
                placeholder="Podaj zadanie"
            />
            <button onClick={addTask}>Add task</button>
            <ul>
                {tasks.map(({ title, completed }, index) => {
                    return (
                        <li key={index} style={{ textDecoration: completed ? 'line-through' : 'none' }}>
                            {title}
                            <button onClick={() => deleteTask(index)}>Delete</button>
                            <button onClick={() => completeTask(index)}>Complete</button>
                        </li>
                    );
                })}
            </ul>
            <h2>Skończone zadania</h2>
            <ul>
                {completedTasks.map(({ title, completed }, index) => {
                    return (
                        <li key={index} style={{ textDecoration: completed ? 'line-through' : 'none' }}>
                            {title}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
