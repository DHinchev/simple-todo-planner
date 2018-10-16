import React, {Component} from 'react';
import Clock from './clock';
import TodoInput from './todoInput';
import Close from './close.svg'; 
import Plus from './plus.svg'; 

var height= [];
var top= [];

class Planner extends Component {
    constructor(props) {
        super(props);

        this.state = {
            todos: [],
            popupVisible: false
        };

        this.handleAddTodo = this.handleAddTodo.bind(this);
        this.setTasksPosition = this.setTasksPosition.bind(this);
        this.openTaskDetails = this.openTaskDetails.bind(this);
    }


    handleAddTodo = (todo) => {
        this.setState({
            todos: [...this.state.todos, todo]
        });

        var temp = [...this.state.todos];
        temp.push(todo);
        this.props.setParentState({todo: temp});
    }

    handleRemoveTodo = (index) => {
        this.setState({
            todos: this.state.todos.filter(function (e, i) {
                return i !== index;
            })
        });
    }

    closeTodoContainer = () => {
        const container = document.querySelector('.container');
        container.classList.remove('open')
    }

    openTaskDetails = (event) => {
        event.target.parentNode.classList.add('open');
    }

    closeTaskDetails = (event) => {
        event.target.parentNode.classList.remove('open');
    }


    getMatch(arr1, arr2) {
        var matches = [];
    
        for ( var i = 0; i < arr1.length; i++ ) {
            for ( var e = 0; e < arr2.length; e++ ) {
                if ( arr1[i] === arr2[e] ) matches.push( arr1[i] );
            }
        }
        return matches;
    }

    setTasksPosition = () => {
        setTimeout(function() { 
        let topPosition;
        let endPosition;
        let taskArrayStart;
        let timeSlotContainer;
        let taskArrayEnd;
        let taskArrayDay;
        let matchStart;
        let matchEnd
        let tasksArray;
        let getTasksColumnPosition;
        let taskHeight;
        let elementHeight;
        let elementTop;
        let timeSlotElementHeight;
        tasksArray = [...document.querySelectorAll('.list-group-item')];

        if(this.state.todos.length) {
            timeSlotContainer = [...document.querySelectorAll('[data-time]')].map(el => el.getAttribute('data-time'));
            timeSlotElementHeight = document.querySelectorAll('.time-unit')[1].offsetHeight;
            taskArrayStart = tasksArray.map(el => el.getAttribute('data-start'));
            taskArrayEnd = tasksArray.map(el => el.getAttribute('data-end'));
            taskArrayDay = tasksArray.map(el => el.getAttribute('data-day'));
            matchStart = timeSlotContainer.filter(element => taskArrayStart.includes(element));
            // matchStart = this.getMatch(taskArrayStart, timeSlotContainer);
            matchEnd = timeSlotContainer.filter(element => taskArrayEnd.includes(element));
            
            if(matchStart[0] === undefined) {
                matchStart[0] = '09:00';
            } else {
                topPosition = document.querySelector("[data-time=" + CSS.escape(matchStart[0]) + "]").getAttribute('data-time-index');
            }
            if(matchEnd[0] === undefined) {
                matchEnd[0] = '09:15';
            } else {
                endPosition = document.querySelector("[data-time=" + CSS.escape(matchEnd[0]) + "]").getAttribute('data-time-index');
            }
            
            taskHeight = endPosition - topPosition;
            elementHeight = taskHeight * timeSlotElementHeight;
            elementTop = topPosition * timeSlotElementHeight;
            height.push(elementHeight);
            top.push(elementTop);
            console.log(elementTop);
            tasksArray.forEach(function(val,index) { 
                getTasksColumnPosition = taskArrayDay[index];
                if(getTasksColumnPosition === "") {getTasksColumnPosition = '0'}
                document.querySelector("[data-column-name=" + CSS.escape(getTasksColumnPosition) + "]").appendChild(val);
                val.style.height = height[index] + "px";
                val.style.top = top[index] + "px";
            });  
        }
    }.bind(this), 100)
}

    render() {
        return ( 
            <div className ="container">
            <img src={Close} className="close-icon" width="35px" height="35px" alt="close icon" onClick={this.closeTodoContainer}/>
            <TodoInput days = {this.props.horizontal} timeSlots = {this.props.vertical}
            onAddTodo = {this.handleAddTodo}/>
            <hr/>
                <h4>
                    Todo Count: <span className = "badge" > {this.state.todos.length} </span>
                </h4>
                <div className="list-group">
                {this.state.todos.map((todo, index) => (
                    <div className = "list-group-item task" key = {index} data-start={todo.todoStartTime} data-end={todo.todosEndTime} data-day={todo.todoDayIndex}>
                        <img src={Plus} className="plus-icon-task" width="25px" height="25px" alt="plus icon for task" onClick={this.openTaskDetails}/>
                        <img src={Close} className="close-icon-task" width="35px" height="35px" alt="close icon for task" onClick={this.closeTaskDetails}/>
                        <h4 className = "list-group-item-heading" > 
                            {todo.todoTitle} { " " } 
                            <span className = "label label-info" > 
                                {todo.todoPriority}
                            </span>
                        </h4>
                        <p className="list-group-item-responsible">{todo.todoResponsible}</p> 
                        <p className="list-group-item-description"> {todo.todoDescription}</p>
                        <Clock startTime={todo.todoStartTime} endTime={todo.todosEndTime} dayOfWeek={todo.todoDays}  dayIndex={todo.todoDayIndex} deadline={"12, 05, 2018"}/>

                        <button className = "btn btn-danger btn-sm" onClick = {this.handleRemoveTodo.bind(this, index)} > {" "} Delete </button> 
                    </div>
                ))}{this.setTasksPosition()}
                </div>
                <hr/>
            </div>
        );
    }
}

export default Planner;