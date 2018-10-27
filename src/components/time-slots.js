import React, { Component } from 'react';

const TimeSlot = (props) => (
  <li 
    className="time-unit"
    data-time-index={props.timeIndex}
    data-time={props.time}
  >
      {props.time}
  </li>
);

class TimeSlots extends Component {

  render() {
    const { timesSlots } = this.props;

    return (
      <div className="time-slot-grid">
        <ul>
          <li className="time-unit">Time</li>
          {timesSlots.map((slot, index) => ( 
            <TimeSlot 
              key={index}
              time={slot}
              timeIndex={index}
            />)
          )}
        </ul>
      </div>
    );
  }
}

export default TimeSlots;