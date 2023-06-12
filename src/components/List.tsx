import React from 'react'
import Item from './Item'

import Task from '../interfaces/task'

interface PropsList {
    tasks: Task[]
}


const List: React.FC<PropsList> = ({ tasks }) => {
    console.log(tasks);
    
    return (
        <ul>
            {tasks.map(item => <Item key={item.id} {...item}/>)}
        </ul>
    )
}

export default List