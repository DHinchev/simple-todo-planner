import React, { Component } from 'react';
import DayGrid from './day-grid';
import TimeSlotGrid from './time-slots';
import GridPlanner from './todo-card';
import Planner from './todo-modal-container';

class App extends Component {
  state = {
    timesList: [],
    todos: JSON.parse(localStorage.getItem('todos')) || [],
    daysNum: '',
    timeSlotLength: '',
    openPlanner: false,
    days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    width: window.innerWidth,
    dayOfWeek: 'Monday'
  };

  componentDidMount = () => {
    this.setState({
      timesList: this.generateTimeSlots()
    });
  }

  componentWillMount() {
    window.addEventListener('resize', this.handleWindowSizeChange);
  }

  componentWillUnmount() {
      window.removeEventListener('resize', this.handleWindowSizeChange);
  }

  storeTodos = (value) => {
    localStorage.setItem('todos', JSON.stringify(value));
    localStorage.setItem('todosLength', JSON.stringify(value.length));

    this.setState({ todos: JSON.parse(localStorage.getItem('todos'))});
  }

  openPlanner = () => {
    this.setState({ openPlanner: true });
  }

  closePlanner = () => {
    this.setState({ openPlanner: false });
  }

  getTimeSlotsBetween = (startTime, endTime) => {
    const arr = [];
    const timeGapMinutes = 15;
    const startTimeClone = new Date(startTime.getTime());

    while(startTimeClone <= endTime) {
      arr.push(startTimeClone.toTimeString().substring(0,5));
      startTimeClone.setMinutes(startTimeClone.getMinutes() + timeGapMinutes);
    }
  
    return arr;
  }

  generateTimeSlots = () => {
    const startTimeSlot = { 
      hours: 9,
      minutes: 0,
      seconds: 0,
      miliseconds: 0
    };

    const endTimeSlot = {
      hours: 18,
      minutes: 0,
      seconds: 0,
      miliseconds: 0
    };

   const startTime = new Date();
   startTime.setHours(...Object.values(startTimeSlot));

   const endTime = new Date();
   endTime.setHours(...Object.values(endTimeSlot)); 

   const timeSlotsBetween = this.getTimeSlotsBetween(startTime, endTime);

   return timeSlotsBetween;
  }

  handleWindowSizeChange = () => {
    this.setState({ width: window.innerWidth });
  };

  handleChange = (event) => {
      this.setState({dayOfWeek: event.target.value});
  }

  render() {
    const { openPlanner, timesList, todos, days, dayOfWeek, width } = this.state;
    const isMobile = width <= 1100;
    let dropdownElement;

    if(isMobile) {
      dropdownElement = <div>
        <select className="drop-down-days-selector" value={dayOfWeek} onChange={this.handleChange}>
          {days.map(index => <option key={index} value={index}>{index}</option>)}
        </select>
      </div>
    } else {
      dropdownElement = <div></div>
    }

    return (
      <div className="App">
        <div className="menu-organizer">
          <button
            className="create-task"
            onClick={this.openPlanner}
          >
            Create new task
          </button>
        </div>
        <div className="todo-count-tasks">
          <h4>
            Todo Count: <span> {todos.length} </span>
          </h4>
        </div>
        <div className="select-day">
          {dropdownElement}
        </div>
        <div className="grid-times">
          <TimeSlotGrid timesSlots={timesList}/>
          <div className="grid-days">
            <DayGrid days={days}/>
            <GridPlanner
              timeSlotRows={days}
              dayColumns={this.generateTimeSlots()}
              tasks={todos}
              setParentState={this.storeTodos}
              mobileDaySelection={dayOfWeek}
              checkMobile={isMobile}
            />
          </div>
        </div>
        <div className="menu-planner">
          {todos.todoStartTime}
          <Planner
            todos={todos}
            open={openPlanner}
            closePlanner={this.closePlanner}
            timeSlotRows={days}
            dayColumns={this.generateTimeSlots()}
            setParentState={this.storeTodos}
          />
        </div>
      </div>
    );
  }
}

export default App;

