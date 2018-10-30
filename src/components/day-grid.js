import React, { Component } from 'react';

class DayGrid extends Component {

  render() {
    const Days = (props) => <li className="day-unit">{props.weekDays}</li>
    const { days } = this.props;
    return (
      <div className="day-grid">
        <ul>
          {days.map(index => <Days key={index} weekDays={index} />)}
        </ul>
      </div>
    );
  }
}

export default DayGrid;