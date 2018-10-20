import React, {Component} from 'react';

class TodoInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todoTitle: "",
            todoResponsible: "",
            todoDescription: "",
            todoPriority: "Lowest",
            todoDays: "Monday",
            todoDayIndex: "0",
            todoStartTime: "09:00",
            todosEndTime: "09:15"
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        if(name === 'todoDays') {
            const temp = target.selectedIndex;
            
            this.setState({
                todoDayIndex: temp
            });
        }
        this.setState({
            [name]: value
        });
    }

    checkForTimeCollision = (day,startTime,endTime) => {
        var checkForTimeCollision = false;
        let timeCollisionMessage = document.querySelector('.time-collision-warning');
        let newTaskStartTime = Date.parse('01/01/2018 ' +  startTime + ':00');
        let newTaskEndTime = Date.parse('01/01/2018 ' +  endTime + ':00');

        this.props.tasks.forEach(function(val) { 
            if(day === val.todoDays) {
                var otherTaskStartTime = Date.parse('01/01/2018 ' +  val.todoStartTime + ':00');
                var otherTaskEndTime = Date.parse('01/01/2018 ' +  val.todosEndTime + ':00');

                if((newTaskStartTime >= otherTaskStartTime && newTaskStartTime < otherTaskEndTime) ||
                 (newTaskEndTime >= otherTaskStartTime && newTaskEndTime < otherTaskEndTime) ||
                startTime === endTime) {
                    checkForTimeCollision = true;
                    if(timeCollisionMessage.classList.contains('show') !== true) {
                        setTimeout(() => {
                            timeCollisionMessage.classList.toggle('show');
                        }, 5000);
                        timeCollisionMessage.classList.toggle('show');
                    }
                }
            }
        });
        return checkForTimeCollision;
    }

    handleSubmit = (event) => {
        event.preventDefault();
        if (
            this.state.todoTitle !== "" &&
            this.state.todoResponsible !== "" &&
            this.state.todoDescription !== "" &&
            this.checkForTimeCollision(this.state.todoDays, this.state.todoStartTime, this.state.todosEndTime) !== true) {

            this.props.onAddTodo(this.state);
            this.setState({
                todoTitle: "",
                todoResponsible: "",
                todoDescription: "",
                todoPriority: "Lowest",
                todoDays: "Monday",
                todoDayIndex: "0",
                todoStartTime: "09:00",
                todosEndTime: "09:15"
            });
        }
    }

    render() {
            return ( 
                <div>
                    <h4 className="new-todo-headline"> Add New Todo </h4>
                    <form className = "form-horizontal" onSubmit = {this.handleSubmit} >
                        <div className = "form-group">
                            <label htmlFor = "inputTodoTitle" className = "col-sm-2 control-label">
                                Todo 
                            </label>
                            <div className = "col-sm-10">
                                <input name = "todoTitle" type = "text" className = "form-control" id = "inputTodoTitle"
                                value = {this.state.todoTitle} onChange = {this.handleInputChange} placeholder = "Title" />
                            </div>
                        </div>
                        <div className = "form-group">
                            <label htmlFor = "inputTodoResponsible" className = "col-sm-2 control-label">
                                Responsible
                            </label>
                            <div className = "col-sm-10">
                                <input name = "todoResponsible" type = "text" className = "form-control" id = "inputTodoResponsible"
                                value = {this.state.todoResponsible} onChange = {this.handleInputChange} placeholder = "Responsible"/>
                            </div>
                        </div>
                        <div className = "form-group">
                            <label htmlFor = "inputTodoDesc" className = "col-sm-2 control-label">
                                Description
                            </label>
                            <div className = "col-sm-10">
                                <textarea name = "todoDescription" className = "form-control" rows = "3" id = "inputTodoDesc"
                                value = {this.state.todoDescription} onChange = {this.handleInputChange}/> 
                            </div>
                        </div>
                        <div className = "form-group" >
                            <label htmlFor = "inputTodoPriority" className = "col-sm-2 control-label" >
                                Priority
                            </label>
                            <div className = "col-sm-10" >
                                <select name = "todoPriority" className = "form-control" id = "inputTodoPriority"
                                    value = {this.state.todoPriority} onChange = {this.handleInputChange}>
                                    <option> Lowest </option>
                                    <option> Low </option> <
                                    option > Medium </option>
                                    <option > High </option>
                                    <option > Highest </option>
                                </select>
                            </div>
                        </div>

                        <div className = "form-group" >
                            <label htmlFor = "inputTodoDays" className = "col-sm-2 control-label" >Days</label>
                            <div className = "col-sm-3" >
                                <select name = "todoDays" className = "form-control" id = "inputTodoPriority"
                                    value = {this.state.todoDays} onChange = {this.handleInputChange}>
                                    {this.props.days.map((value,index) =>
                                        <option data-day-index={index} key = {value}>
                                            {value}
                                        </option>)
                                    }
                                </select>
                            </div>
                        </div>

                        <div className = "form-group" >
                            <label htmlFor = "inputtodoStartTime" className = "col-sm-2 control-label">
                                Start Time
                            </label>
                            <div className = "col-sm-3" >
                                <select name = "todoStartTime" type = "text" className = "form-control" id = "inputtodoStartTime"
                                    value = {this.state.todoStartTime} onChange = {this.handleInputChange} placeholder = "Months Remaining" >
                                    {this.props.timeSlots.map(index =>
                                        <option key = {index}> {index} </option>)}
                                </select>
                            </div>
                        </div>

                        <div className = "form-group" >
                            <label htmlFor = "inputtodosEndTime" className = "col-sm-2 control-label" >
                                End Time
                            </label>
                            <div className = "col-sm-3">
                                <select name = "todosEndTime" type = "text" className = "form-control" id = "inputtodosEndTime"
                                    value = {this.state.todosEndTime} onChange = {this.handleInputChange} placeholder = "Year Remaining" >
                                    {this.props.timeSlots.map(index =>
                                        <option key = {index}>{index}</option>)}
                                </select>
                            </div>
                        </div>

                        <div className="time-collision-warning">
                            <span className="time-collision-warning-text">The set duration for this task is already booked or overlapping.Please select different time!</span>
                        </div>

                        <div className = "form-group" >
                            <div className = "col-sm-offset-2 col-sm-10" >
                                <button type = "submit" className = "btn btn-success"> Add Todo </button>
                            </div>
                        </div>
                    </form>
                </div>
            );
        }
    }

export default TodoInput;