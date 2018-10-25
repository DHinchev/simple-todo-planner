import React, { Component } from 'react';
import DayGrid from './dayGrid';
import TimeSlotGrid from './time-slots';
import GridPlanner from './gridPlanner';
import Planner from './planner';

class App extends Component {
  state = {
    timesList: [],
    dayList: [],
    todos: JSON.parse(localStorage.getItem('todos')) || [],
    daysNum: '',
    timeSlotLength: '',
    openPlanner: false,
    days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
  };

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

  render() {
    const { openPlanner, dayList, timesList, todos, days } = this.state;

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
        <div className="grid-times">
          <TimeSlotGrid/>
          <div className="grid-days">
            <DayGrid days={days}/>
            <GridPlanner
              horizontal={dayList}
              vertical={timesList}
              tasks={todos}
            />
          </div>
        </div>
        <div className="menu-planner">
          {todos.todoStartTime}
          <Planner
            todos={todos}
            open={openPlanner}
            closePlanner={this.closePlanner}
            horizontal={dayList}
            vertical={timesList}
            setParentState={this.storeTodos}
          />
        </div>
      </div>
    );
  }
}

export default App;

