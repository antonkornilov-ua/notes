import { useState } from 'react';
import Task from '../interfaces/task';

interface ItemsProps {
    title: string;
    id: string;
    status: boolean;
}

const Item: React.FC<ItemsProps> = ({ title, id, status }) => {
    const [checked, setChecked] = useState(status);
    const classes = ['todo'];

    if (checked) {
        classes.push('status');
    }

    const updateStatus = () => {
        setChecked(!checked);
        const storedTodos = JSON.parse(localStorage.getItem('tasks')|| 'null');
        storedTodos.map((el:ItemsProps) => {
            if (el.id === id) {
                el.status = !checked
                
            }
            return true
        })
        localStorage.setItem('tasks', JSON.stringify(storedTodos))
        
    };

    const [visible, setVisible] = useState(true)
    const removeElement = () => {
        setVisible((prev) => !prev);
        const storedTodos = JSON.parse(localStorage.getItem('tasks') || 'null')
        let removedTodos: Task[] = storedTodos.filter((item: ItemsProps) => {
            if (item.id !== id) {
                return true
            }
            return false
        })
        localStorage.setItem('tasks', JSON.stringify(removedTodos))

    }


    return (

        <>
            {visible && (

        <li className={classes.join(' ')}>
            <label>
                <input type='checkbox' checked={checked} onChange={updateStatus} />
                <span>{title}</span>
                <i className='material-icons red-text' onClick={removeElement}>X</i>
            </label>
        </li>
            )}
        </>
    );
};

export default Item;
