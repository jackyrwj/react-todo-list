import './App.css';
import './components/event.css';
import React from 'react';
import EventBar from './components/EventBar';
import TaskBox from './components/TaskBox';

function App() {
  const [events, setEvents] = React.useState([
    { title: 'Battleship', tasks: {}},
    { title: 'Reading', tasks: {}},
  ]);
  const [currentEvent, setCurrentEvent] = React.useState(events[0]);
  return (
    <div className='App'>
      <EventBar 
        events={events} 
        setEvents={setEvents} 
        currentEvent = {currentEvent}
        setCurrentEvent = {setCurrentEvent}
      />
      <TaskBox />
    </div>
  );
}

export default App;
