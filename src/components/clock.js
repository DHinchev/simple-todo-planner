import React, {Component} from 'react';

class Clock extends Component {
    state = {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        time: 0
    };

    componentWillMount = () => {
        this.getTimeUntil();
    }

    componentDidMount = () => {
        const deadline = this.getTime();
        this.setState({
            time: deadline
        });
        setInterval(() => {
            this.getTimeUntil(this.state.time)
        }, 1000);
    }

    zeroingTime = num => {
        return num < 10 ? "0" + num : num;
    }

    getTime = () => {
        const { startTime, endTime, dayOfWeek, dayIndex } = this.props;

        const getNewTime = new Date();
        const dayInNumeral = getNewTime.getDay();
        const dayDiff = getNewTime.getDate() - dayInNumeral + (dayInNumeral === 0 ? -6 : 1);
        const monday = new Date(getNewTime.setDate(dayDiff)).toString().substring(8, 10);
        const presentDay = new Date();
        var weekDayInShortName= dayOfWeek.substring(0, 3);
        var weekDayFormat = Number.parseInt(monday,10) + dayIndex;
        const monthsNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const currentMonth = monthsNames[presentDay.getMonth()];
        const currentYear = presentDay.getFullYear();
        const startHour = (startTime.length) ? startTime + ':00' : '09:00:00';
        const endHour = (endTime.length) ? endTime + ':00' : '09:00:00';
        const end = Date.parse(new Date(weekDayInShortName + " " + currentMonth + " " + weekDayFormat + " " + currentYear + " " + endHour + " GMT+0200 (Eastern European Standard Time)"));
        const start = Date.parse(new Date(weekDayInShortName + " " + currentMonth + " " + weekDayFormat + " " + currentYear + " " + startHour + " GMT+0200 (Eastern European Standard Time)"));
        const time = ((end - start) + (start - Date.parse(presentDay)));

        return time;
    }

    getTimeUntil = deadline => {
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
        const { days, hours, minutes, seconds } = this.state;
        return (
            <div className="clock-details">
                <div className = "clock-days" >
                    {this.zeroingTime(days)} Day
                </div>
                <div className = "clock-hours" >
                    {this.zeroingTime(hours)} Hours
                </div>
                <div className = "clock-minutes" >
                    {this.zeroingTime(minutes)} Minutes
                </div>
                <div className = "clock-seconds" >
                    {this.zeroingTime(seconds)} Seconds
                </div>
            </div>
        );
    }
}

export default Clock;