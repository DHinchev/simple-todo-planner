import React, { Component } from 'react';
import './App.css';
import DayGrid from './components/dayGrid';
import TimeSlotGrid from './components/timeSlotGrid';
import GridPlanner from './components/gridPlanner';
import Planner from './components/planner';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {

    constructor() {
      super();
      this.state = {
        timesList: [],
        dayList: [],
        todos: [],
        daysNum: '',
        timeSlotLength: ''
      }
    }

  handleTasks = (value) => {
      this.setState({todos: value});
  }
 
  openTodoContainer = () => {
    const todoContainer = document.querySelector('.container');
    todoContainer.classList.add('open');
}

  render() {
    return (
      <div className="App">
        <div className="gridTimes">
          <TimeSlotGrid setParentState={this.setState.bind(this)} />
          <div className="gridDays">
            <DayGrid setParentState={this.setState.bind(this)} />
            <GridPlanner horizontal={this.state.dayList} vertical={this.state.timesList} tasks={this.state.todos}/>
          </div>
        </div>
        <div className="menuOrganiser">
          <button className="createTask" onClick={this.openTodoContainer}>+</button>
        </div>
        <div className="menuPlanner">{this.state.todos.todoStartTime}
          <Planner horizontal={this.state.dayList} vertical={this.state.timesList} setParentState={this.handleTasks} />
        </div>
      </div>
    );
  }
}

export default App;

