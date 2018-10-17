import React, {Component} from 'react';

class Clock extends Component {
    constructor(props) {
        super(props);
        this.state = {
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0,
            time: 0
        };
    }
    componentWillMount() {
        this.getTimeUntil();
    }
    componentDidMount() {
        let deadline = this.getTime();
        this.setState({
            time: deadline
        });
        setInterval(() => {
            this.getTimeUntil(this.state.time)
        }, 1000);
    }

    zeroingTime(num) {
        return num < 10 ? "0" + num : num;
    }

    getTime() {
        const firstDayOfWeek = new Date();

        const day = firstDayOfWeek.getDay();
        const dayDiff = firstDayOfWeek.getDate() - day + (day === 0 ? -6 : 1);
        const monday = new Date(firstDayOfWeek.setDate(dayDiff)).toString().substring(8, 10);

        const presentDay = new Date();
        // get selected day
        var weekDay = this.props.dayOfWeek.substring(0, 3);
        var weekDayFormat = Number.parseInt(monday,10) + this.props.dayIndex;

        // get current month number in mm format
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const currentMonth = monthNames[presentDay.getMonth()];

        // get current year
        const currentYear = presentDay.getFullYear();

        // get star hour
        let startHour = (this.props.startTime.length) ? this.props.startTime + ':00' : '09:00:00';
        
        // get final hour
        let endHour = (this.props.endTime.length) ? this.props.endTime + ':00' : '09:00:00';
        

        const end = Date.parse(new Date(weekDay + " " + currentMonth + " " + weekDayFormat + " " + currentYear + " " + endHour + " GMT+0200 (Eastern European Standard Time)"));
        const start = Date.parse(new Date(weekDay + " " + currentMonth + " " + weekDayFormat + " " + currentYear + " " + startHour + " GMT+0200 (Eastern European Standard Time)"));
        const time = ((end - start) + (start - Date.parse(presentDay)));

        return time;
    }

    getTimeUntil(deadline) {
        var temp = deadline;

        if (temp < 0) {
            this.setState({
                days: 0,
                hours: 0,
                minutes: 0,
                seconds: 0
            });
        } else {
            temp = deadline - 1000;
            this.setState({
                time: temp
            });
            const days = Math.floor(temp / (24 * 60 * 60 * 1000));
            const seconds = Math.floor((temp / 1000) % 60);
            const minutes = Math.floor((temp / 1000 / 60) % 60);
            const hours = Math.floor((temp / (1000 * 60 * 60)) % 24);

            this.setState({
                days,
                hours,
                minutes,
                seconds
            });
        }
    }
    render() {
        return (
            <div className="clock-details">
                <div className = "Clock-days" >
                    {this.zeroingTime(this.state.days)} Day
                </div>
                <div className = "Clock-hours" >
                    {this.zeroingTime(this.state.hours)} Hours
                </div>
                <div className = "Clock-minutes" >
                    {this.zeroingTime(this.state.minutes)} Minutes
                </div>
                <div className = "Clock-seconds" >
                    {this.zeroingTime(this.state.seconds)} Seconds
                </div>
            </div>
        );
    }
}

export default Clock;