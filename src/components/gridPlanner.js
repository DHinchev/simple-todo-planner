import React, { Component } from 'react';

class GridPlanner extends Component {
  constructor(props){
    super(props);
    this.state = {
      todos: []
    }
    // this.getTasksValues = this.getTasksValues.bind(this);
  }

  // componentDidUpdate(prevProps, prevState) {
  //     this.getTasksValues();
  //     console.log(this.getTasksValues());
  //     this.updateStates();
  // }

  // getTasksValues() {
  //   var temp = [];
  //   // var taskTitle;
  //   // var taskDescription;
  //   // var startTime;
  //   // var endTime;
  //   // var taskResponsible;
  //   // var taskPriority;
  //   // var taskDays;
  //   temp.push(...this.props.tasks,this.props.tasks);

  //   if(temp.length) {
  //     // Object.values(this.props.tasks).forEach(function(val,index) { 
  //     //   console.log(Object.values(val));
  //     //   taskTitle =  Object.values(val).map(a => a.todoTitle);
  //     //   taskDescription =  Object.values(val).map(a => a.todoDescription);
  //     //   startTime =  Object.values(val).map(a => a.todoStartTime);
  //     //   endTime =  Object.values(val).map(a => a.todosEndTime);
  //     //   taskResponsible =  Object.values(val).map(a => a.todoResponsible);
  //     //   taskPriority = Object.values(val).map(a => a.todoPriority);
  //     //   taskDays = Object.values(val).map(a => a.todoDays);
  //       // console.log(taskTitle);
  //       // console.log(taskDescription);
  //       // console.log(taskResponsible);
  //       // console.log(taskPriority);
  //       // console.log(taskDays);
  //       // console.log(startTime);
  //       // console.log(endTime);
  //       // });

  //   }
  //   return temp;
  // }

  // updateStates() {
  //   var taskTitle;
  //   var taskDescription;
  //   var startTime;
  //   var endTime;
  //   var taskResponsible;
  //   var taskPriority;
  //   var taskDays;
  //   var array = [];
  //   if(this.props.tasks !== nextProps.tasks) {
  //     array.push(...this.props.tasks,this.props.tasks);
  //   }
    
  //   console.log(array);

  //   if(array.length) {
  //     Object.values(array).forEach(function(val,index) { 
  //       console.log(Object.values(val));
  //       taskTitle =  Object.values(val).map(a => a.todoTitle);
  //       taskDescription =  Object.values(val).map(a => a.todoDescription);
  //       startTime =  Object.values(val).map(a => a.todoStartTime);
  //       endTime =  Object.values(val).map(a => a.todosEndTime);
  //       taskResponsible =  Object.values(val).map(a => a.todoResponsible);
  //       taskPriority = Object.values(val).map(a => a.todoPriority);
  //       taskDays = Object.values(val).map(a => a.todoDays);
  //       console.log(taskTitle);
  //       console.log(taskDescription);
  //       console.log(taskResponsible);
  //       console.log(taskPriority);
  //       console.log(taskDays);
  //       console.log(startTime);
  //       console.log(endTime);
  //       });

  //       // this.setState(prevState => ({
  //       //   todoTitle: taskTitle,
  //       //   todoDescription: taskDescription,
  //       //   startTime: startTime,
  //       //   endTime: endTime,
  //       //   todoResponsible: taskResponsible,
  //       //   todoPriority: taskPriority,
  //       //   todoDays: taskDays
  //       // }));

  //   }
  // }

  render() {
    return (
      <div className="gridPlanner">
          {this.props.horizontal.map((val,indexColumn) => 
            <div className="columns" key={val} data-column-name={indexColumn}>
              
            </div>)}   
      </div>
    );
  }
}

export default GridPlanner;