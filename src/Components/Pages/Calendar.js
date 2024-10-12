import React, { useState, useCallback, useEffect } from 'react';
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { Modal, Button, Form, Row, Col, OverlayTrigger, Popover } from 'react-bootstrap';
import { faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';

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
                time: '12:00 pm - 2:00 pm',
                procedure: 'Teeth Whitening',
                dentist: 'row light',
                contact: '+8563265412',
            },
        ],
    },
    {
        provider: 'Emily Taylor',
        appointments: [
            {
                time: '4:00 pm - 5:00 pm',
                procedure: 'Arthopedic',
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

// custome buttons
const CustomToolbar = ({ date, onNavigate, onView }) => {
    const goToBack = useCallback(() => {
        onNavigate('PREV');
    }, [onNavigate]);

    const goToNext = useCallback(() => {
        onNavigate('NEXT');
    }, [onNavigate]);

    const goToToday = useCallback(() => {
        onNavigate('TODAY');
    }, [onNavigate]);

    const handleDateChange = useCallback((e) => {
        onNavigate('DATE', new Date(e.target.value));
    }, [onNavigate]);

    return (
        <div className="rbc-toolbar">
            <span className="rbc-btn-group">
                <button type="button" onClick={goToBack}><FontAwesomeIcon icon={faChevronLeft} /></button>
                <button type="button" onClick={goToNext}><FontAwesomeIcon icon={faChevronRight} /></button>
                <button type="button" onClick={goToToday}>Today</button>
            </span>

            <span className="rbc-toolbar-label">
                <input
                    type="date"
                    value={moment(date).format('YYYY-MM-DD')}
                    onChange={handleDateChange}
                />
            </span>

            <span className="rbc-btn-group">
                <button onClick={() => onView('month')}>Month</button>
                <button onClick={() => onView('work_week')}>Week</button>
                <button onClick={() => onView('day')}>Day</button>
            </span>
            <button className='ms-4' onClick={() => onView('list')}>List</button>
        </div>
    );
};

export const Calendar = () => {
    const [view, setView] = useState('work_week');
    const [date, setDate] = useState(new Date(2024, 9, 10));
    const [showModal, setShowModal] = useState(false);
    const [modalMode, setModalMode] = useState('add');
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [selectedEvent, setSelectedEvent] = useState(null);

    const [events, setEvents] = useState(getEvents(scheduleData));

    // Handle view change
    const handleViewChange = useCallback((newView) => {
        setView(newView);
    }, []);

    // Handle date navigation
    const handleNavigate = useCallback((newDate) => {
        setDate(newDate);
    }, []);

    const handleEditEvent = (event) => {
        setModalMode('edit');
        setSelectedEvent(event);
        setShowModal(true);
    };

    // Handle delete event action
    const handleDeleteEvent = (eventToDelete) => {
        setEvents(prevEvents => prevEvents.filter(event => event !== eventToDelete));
    };

    // Handle empty slot click
    const handleSelectSlot = useCallback((slotInfo) => {
        setModalMode('add'); // Set mode to 'add'
        setSelectedSlot(slotInfo); // Capture selected time slot info
        setShowModal(true); // Show the modal
    }, []);

    // Handle existing event click
    const handleSelectEvent = useCallback((event) => {
        setModalMode('edit'); // Set mode to 'edit'
        setSelectedEvent(event); // Capture selected event info
        setShowModal(true); // Show the modal
    }, []);

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedSlot(null);
        setSelectedEvent(null);
    };

    // hover
    const EventComponent = ({ event, onEdit, onDelete }) => {
        const [showPopover, setShowPopover] = useState(false);

        const handleMouseEnter = () => setShowPopover(true);
        const handleMouseLeave = () => setShowPopover(false);

        const popover = (
            <Popover id="event-popover">
                <Popover.Header as="h3">
                    <strong>{event.title}</strong>
                </Popover.Header>
                <Popover.Body>
                    <div><strong>Patient:</strong> {event.dentist}</div>
                    <div><strong>Contact:</strong> {event.contact}</div>
                    <div><strong>Time:</strong> {moment(event.start).format('h:mm A')} - {moment(event.end).format('h:mm A')}</div>
                    <div><strong>Status:</strong> <span className="badge bg-success">{event.status}</span></div>

                    <div className="mt-3 d-flex">
                        <Button
                            onClick={() => onEdit(event)}
                            className="btn-sm btn-success me-2"
                        >
                            <FontAwesomeIcon icon={faPenToSquare} />
                        </Button>
                        <Button
                            onClick={() => onDelete(event)}
                            className="btn-sm btn-danger"
                        >
                            <FontAwesomeIcon icon={faTrashCan} />
                        </Button>
                    </div>
                </Popover.Body>
            </Popover>
        );

        return (
            <div
                className="event-container"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <OverlayTrigger
                    trigger="click"
                    show={showPopover}
                    placement="right"
                    overlay={popover}
                >
                    <div className="p-2">
                        <strong>{event.title}</strong><br />
                        {moment(event.start).format('h:mm A')} - {moment(event.end).format('h:mm A')}
                    </div>
                </OverlayTrigger>
            </div>
        );
    };

    return (
        <div className='container-fluid'>
            <div className='d-flex justify-content-between align-items-center'>
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
                                <li><a className='dropdown-item' href='#'>Staff 3</a></li>
                                <li><a className='dropdown-item' href='#'>Staff 2</a></li>
                            </ul>
                        </div>

                        <div className='calender-dropdown'>
                            <button className='btn btn-navbar dropdown-toggle' type='button' id='servicesDropdown' data-bs-toggle='dropdown' aria-expanded='false'>
                                <img className='me-2' src='assets/image/all service.svg' />All services
                            </button>
                            <ul className='dropdown-menu' aria-labelledby='servicesDropdown'>
                                <li><a className='dropdown-item' href='#'><input type="radio" />Service 1</a></li>
                                <li><a className='dropdown-item' href='#'><input type="radio" />Service 2</a></li>
                            </ul>
                        </div>

                        <div className='calender-dropdown'>
                            <button className='btn btn-navbar dropdown-toggle' type='button' id='refreshDropdown' data-bs-toggle='dropdown' aria-expanded='false'>
                                <img className='me-2' src='assets/image/refresh.svg' />
                            </button>
                            <ul className='dropdown-menu' aria-labelledby='refreshDropdown'>
                                <li><a className='dropdown-item' href='#'><input type="radio" name="refresh" className='me-2' />Every 1 minute</a></li>
                                <li><a className='dropdown-item' href='#'><input type="radio" name="refresh" className='me-2' />Every 5 minute</a></li>
                                <li><a className='dropdown-item' href='#'><input type="radio" name="refresh" className='me-2' />Every 15 minute</a></li>
                                <li><a className='dropdown-item' href='#'><input type="radio" name="refresh" className='me-2' />Disable</a></li>
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

                <div className="col-12">
                    <div className="App">
                        <BigCalendar
                            localizer={localizer}
                            events={events}
                            startAccessor="start"
                            endAccessor="end"
                            style={{ height: 600 }}
                            view={view}
                            onView={handleViewChange}
                            date={date}
                            onNavigate={handleNavigate}
                            views={['day', 'work_week', 'month', 'timeline']}
                            selectable
                            onSelectSlot={handleSelectSlot}
                            onSelectEvent={handleSelectEvent}
                            components={{
                                event: ({ event }) => (
                                    <EventComponent
                                        event={event}
                                        onEdit={handleEditEvent}
                                        onDelete={handleDeleteEvent}
                                    />
                                ),
                                toolbar: CustomToolbar,
                            }}
                        />

                        {/* Modal for Add/Edit Appointment */}

                        <Modal show={showModal} onHide={handleCloseModal}>
                            <Modal.Header closeButton>
                                <Modal.Title>
                                    {modalMode === 'add' ? 'New Appointment' : 'Edit Appointment'}
                                </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Form>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Provider</Form.Label>
                                        <Form.Select>
                                            <option></option>
                                        </Form.Select>
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label>Service</Form.Label>
                                        <Form.Select>
                                            <option>-- Select a service --</option>
                                        </Form.Select>
                                    </Form.Group>

                                    <Row className="mb-3">
                                        <Col>
                                            <Form.Group>
                                                <Form.Label>Date</Form.Label>
                                                <Form.Control
                                                    type="date"
                                                    defaultValue={moment(selectedSlot?.start || selectedEvent?.start).format('YYYY-MM-DD')}
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Group>
                                                <Form.Label>Period</Form.Label>
                                                <div className="d-flex">
                                                    <Form.Select className="me-2">
                                                        <option>
                                                            {moment(selectedSlot?.start || selectedEvent?.start).format('h:mm A')}
                                                        </option>
                                                    </Form.Select>
                                                    <span className="align-self-center me-2">to</span>
                                                    <Form.Select>
                                                        <option>
                                                            {moment(selectedSlot?.end || selectedEvent?.end).format('h:mm A')}
                                                        </option>
                                                    </Form.Select>
                                                </div>
                                            </Form.Group>
                                        </Col>
                                    </Row>

                                    <Form.Group className="mb-3">
                                        <Form.Label>Customers</Form.Label>
                                        <div className="d-flex">
                                            <Form.Select className="form">
                                                <option>-- Search customers --</option>
                                            </Form.Select>
                                            <Button className="btn-newCust">+ New customer</Button>
                                        </div>
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label>Internal note</Form.Label>
                                        <Form.Control
                                            as="textarea"
                                            rows={2}
                                            defaultValue={modalMode === 'edit' ? selectedEvent?.internalNote : ''}
                                        />
                                        <Form.Text className="text-muted">
                                            This text can be inserted into notifications with (internal_note) code.
                                        </Form.Text>
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Check
                                            type="checkbox"
                                            label="Send notifications"
                                            defaultChecked={modalMode === 'edit' ? selectedEvent?.sendNotifications : false}
                                        />
                                    </Form.Group>
                                </Form>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button className="btn-newCust" onClick={handleCloseModal}>
                                    {modalMode === 'add' ? 'Save' : 'Update'}
                                </Button>
                                <Button className="btnClose" onClick={handleCloseModal}>
                                    Close
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </div>
                </div>

            </div>
        </div>
    )

}