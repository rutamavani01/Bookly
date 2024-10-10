import React from 'react';
import { useState, useEffect } from 'react';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';

const localizer = momentLocalizer(moment);

const scheduleData = [
    {
        provider: 'Nick Knight',
        appointments: [
            {
                time: '8:00 am - 9:00 am',
                procedure: 'Crown and Bridge',
                dentist: 'Peter White',
                contact: '+14855695124',
            },
        ],
    },
    {
        provider: 'Jane Howard',
        appointments: [
            {
                time: '9:00 am - 11:00 am',
                procedure: 'Teeth Whitening',
                dentist: 'Peter White',
                contact: '+14855695124',
            },
        ],
    },
    {
        provider: 'Emily Taylor',
        appointments: [
            {
                time: '8:00 am - 11:30 am',
                procedure: 'Orthodontics',
                dentist: 'Peter White',
                contact: '+14065551212',
            },
        ],
    },
];

// Utility function to convert time string to a Date object
const parseTimeRange = (date, timeRange) => {
    const [startTime, endTime] = timeRange.split(' - ');
    const start = new Date(`${date} ${startTime}`);
    const end = new Date(`${date} ${endTime}`);
    return { start, end };
};

// Convert scheduleData to events for react-big-calendar
const getEvents = (schedule) => {
    let events = [];
    const baseDate = '2024-10-10';  // Base date for appointments

    schedule.forEach(provider => {
        provider.appointments.forEach(appointment => {
            const { start, end } = parseTimeRange(baseDate, appointment.time);
            events.push({
                title: `${appointment.procedure} by ${appointment.dentist}`,
                start,
                end,
                allDay: false,
                dentist: appointment.dentist,
                contact: appointment.contact
            });
        });
    });

    return events;
};

const events = getEvents(scheduleData);

export const Calendar = () => {
    const [currentTime, setCurrentTime] = useState(new Date());

    const formatDateTime = (date) => {
        const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    };

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <div className='container-fluid'>
            <div className=' d-flex justify-content-between align-items-center'>
                <div className='col-7'>  <h4 className='text-start'>Calender</h4></div>
                <div className='col-5 d-flex justify-content-between'>
                    <button className='btn-navbar'><img className='me-2' src='assets/image/questionmark.svg' />Documentation</button>
                    <button className='btn-navbar'><img className='me-2' src='assets/image/contactus.svg' />Contact Us</button>
                    <button className='btn-navbar'><img className='me-2' src='assets/image/feature.svg' />Feature request</button>
                    <button className='btn-navbar'><img className='me-2' src='assets/image/feedback.svg' />Feedback</button>
                    <button className='btn-navbar'><img src='assets/image/warning.svg' /></button>
                </div>
            </div>

            <div className='col-12 calender'>
                <div className='d-flex justify-content-between align-items-center'>
                    <div className='col-7'>
                    </div>
                    <div className='col-3 d-flex justify-content-between'>
                        <div className='calender-dropdown'>
                            <button className='btn btn-navbar dropdown-toggle' type='button' id='staffDropdown' data-bs-toggle='dropdown' aria-expanded='false'>
                                <img className='me-2' src='assets/image/all staff.svg' />All staff
                            </button>
                            <ul className='dropdown-menu' aria-labelledby='staffDropdown'>
                                <li><a className='dropdown-item' href='#'>Staff 1</a></li>
                                <li><a className='dropdown-item' href='#'>Staff 2</a></li>
                            </ul>
                        </div>

                        <div className='calender-dropdown'>
                            <button className='btn btn-navbar dropdown-toggle' type='button' id='servicesDropdown' data-bs-toggle='dropdown' aria-expanded='false'>
                                <img className='me-2' src='assets/image/all service.svg' />All services
                            </button>
                            <ul className='dropdown-menu' aria-labelledby='servicesDropdown'>
                                <li><a className='dropdown-item' href='#'>Service 1</a></li>
                                <li><a className='dropdown-item' href='#'>Service 2</a></li>
                            </ul>
                        </div>

                        <div className='calender-dropdown'>
                            <button className='btn btn-navbar dropdown-toggle' type='button' id='refreshDropdown' data-bs-toggle='dropdown' aria-expanded='false'>
                                <img className='me-2' src='assets/image/refresh.svg' />
                            </button>
                            <ul className='dropdown-menu' aria-labelledby='refreshDropdown'>
                                <li><a className='dropdown-item' href='#'>Refresh Option 1</a></li>
                                <li><a className='dropdown-item' href='#'>Refresh Option 2</a></li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className='col-12 calender-profile d-flex justify-content-start'>
                    <div className='calender-all'>
                        <img src='assets/image/calender-profile.svg' className='d-block' />All
                    </div>
                    <div className='calender-all-icon'>
                        <img src='assets/image/1.png' /><p>Nick Knight</p>
                    </div>
                    <div className='calender-all-icon'>
                        <img src='assets/image/2.png' /><p>Jane Howard</p>
                    </div>
                    <div className='calender-all-icon'>
                        <img src='assets/image/3.png' /><p>Ashley Stamp</p>
                    </div>
                    <div className='calender-all-icon'>
                        <img src='assets/image/4.png' /><p>Bradley Tannen</p>
                    </div>
                    <div className='calender-all-icon'>
                        <img src='assets/image/5.png' /><p>Wayne Turner</p>
                    </div>
                    <div className='calender-all-icon'>
                        <img src='assets/image/6.png' /><p>Emily Taylor</p>
                    </div>
                    <div className='calender-all-icon'>
                        <img src='assets/image/7.png' /><p>Hugh Canberg</p>
                    </div>
                    <div className='calender-all-icon'>
                        <img src='assets/image/1.png' /><p>Jim Gonzalez</p>
                    </div>
                    <div className='calender-all-icon'>
                        <img src='assets/image/8.png' /><p>Hugh Canberg</p>
                    </div>
                    <div className='calender-all-icon'>
                        <img src='assets/image/9.png' /><p>Hugh Canberg</p>
                    </div>
                </div>

                <div className='col-12 d-flex justify-content-between align-items-center'>
                    <div className='col-4 d-flex justify-content-start  '>
                        <div className='arrow-box-left'> <img src="assets/image/left arrow.svg" /></div>
                        <div className='arrow-box-right'> <img src="assets/image/right arrow.svg" /></div>
                        <div ><button className='today-btn'>Today</button></div>
                    </div>
                    <div className='col-4'>
                        <h5>{formatDateTime(currentTime)}</h5>
                    </div>
                    <div className='col-4'>
                        <div className='d-flex justify-content-center'>
                            <button className='today-day1'>Mon</button>
                            <button className='today-day2'>Week</button>
                            <button className='today-day3'>Day</button>
                            <button className='today-day4'>Timeline</button>

                            <button className='today-btn'>List</button>
                        </div>
                    </div>
                </div>

                <div className='col-12'>
                    <div className="App">
                        <BigCalendar
                            localizer={localizer}
                            events={events}
                            startAccessor="start"
                            endAccessor="end"
                            style={{ height: 600 }}
                            defaultView="work_week"
                            views={['day', 'work_week', 'month']}
                            step={30}  // To show 30-minute time slots
                            timeslots={2}  // Split each hour into 2 slots
                            defaultDate={new Date(2024, 9, 10)}  // October 10th, 2024
                            components={{
                                event: ({ event }) => (
                                    <span>
                                        <strong>{event.title}</strong><br />
                                        Dentist: {event.dentist}<br />
                                        Contact: {event.contact}
                                    </span>
                                ),
                            }}
                        />
                    </div>
                </div>

            </div>
        </div>
    )

}