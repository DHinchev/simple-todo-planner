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
  state = {
    timeSlots: []
  }

  componentDidMount = () => {
    this.setState({
      timeSlots: this.generateTimeSlots()
    });
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

  render() {
    const { timeSlots } = this.state;

    return (
      <div className="time-slot-grid">
        <ul>
          <li className="time-unit">Time</li>
          {timeSlots.map((slot, index) => ( 
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