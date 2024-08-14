import AddTaskButton from "./AddTaskButton";
import Task from "./Task";
import { Droppable, Draggable } from 'react-beautiful-dnd';
import uuid from 'react-uuid';

const Column = ({tag,currentEvent,setEvents,events}) => {
    const handleAdd = () => {
        const name = prompt('Enter task name:')
        const details = prompt('Enter details:')
        if (!(name && details)) return;
        setEvents((prev) => {
            const arrCopy = [...prev];
            const index = prev.findIndex(
                (event) => event.title === currentEvent.title
            )
            const eventCopy = arrCopy[index];
            arrCopy.splice(index,1,{
                title:currentEvent.title,
                task: [...eventCopy.tasks,           
                    { name: name, id: uuid(), details: details, state: tag },
                ],
            })
            return arrCopy;
        })
        
    }
    return (
        <div className="column">
            {tag}
            <AddTaskButton handleClick={handleAdd}/>
            <Droppable droppableId={tag}>
                {(provided, snapshot) => {
                return (
                    <div
                    className='task-container'
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    >
                    {events
                        .find((event) => event.title === currentEvent.title)
                        ?.tasks.map((item, index) => {
                        if (item.state === tag) {
                            return (
                            <Draggable
                                key={item.id}
                                draggableId={item.id}
                                index={index}
                            >
                                {(provided, snapshot) => {
                                return (
                                    <Task
                                    name={item.name}
                                    details={item.details}
                                    provided={provided}
                                    snapshot={snapshot}
                                    />
                                );
                                }}
                            </Draggable>
                            );
                        }
                        })}
                    {provided.placeholder}
                    </div>
                );
                }}
            </Droppable>

            
            {/* <div className='task-container'>
                {events
                .find((event) => event.title === currentEvent.title)
                ?.tasks.map((item) => {
                    if(item.state === tag){
                        return(
                            <Task key={item.name} name={item.name} details={item.details}/>
                        );
                    }
                })}
            </div> */}
            



        </div>
    );
};
export default Column;