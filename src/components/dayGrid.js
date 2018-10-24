import React, { Component } from 'react';

class DayGrid extends Component {

  state = {
    days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
  }

  componentDidMount() {
    this.propagateToParent();
  }

  propagateToParent = () =>{
    this.props.setParentState({ dayList: this.state.days});
  }

  render() {
    const Days = (props) => <li className="day-unit">{props.weekDays}</li>
    return (
      <div className="day-grid">
        <ul>
          {this.state.days.map(index => <Days key={index} weekDays={index} />)}
        </ul>
      </div>
    );
  }
}

export default DayGrid;