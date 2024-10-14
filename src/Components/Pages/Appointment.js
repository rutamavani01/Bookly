import React, { useState } from 'react';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import moment from 'moment';
import { Button, Modal, Form, Row, Col, Pagination } from 'react-bootstrap';

const Appointment = () => {

    const [showModal, setShowModal] = useState(false);
    const [modalMode, setModalMode] = useState('add'); // 'add' or 'edit'
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [selectedEvent, setSelectedEvent] = useState(null);

    const totalItems = 50; // Total items you have in your data
    const itemsPerPage = 10;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const [currentPage, setCurrentPage] = useState(1);

    // Dummy data for example
    const data = [
        { id: 1, date: '2022-05-02', startTime: '10:00', endTime: '12:00', name: 'John Doe', service: 'Service A', duration: '2 hr', status: 'Approved', payment: '$35.00 PayPal Complete' },
        { id: 2, date: '2022-05-02', startTime: '10:00', endTime: '12:00', name: 'Jane Doe', service: 'Service B', duration: '1 hr', status: 'Approved', payment: '$40.00 PayPal Complete' },
        { id: 3, date: '2022-05-03', startTime: '11:00', endTime: '13:00', name: 'Alice', service: 'Service C', duration: '2 hr', status: 'Pending', payment: '$50.00 Cash' },
        { id: 4, date: '2022-05-04', startTime: '09:00', endTime: '10:00', name: 'Bob', service: 'Service D', duration: '1 hr', status: 'Canceled', payment: 'N/A' },
        { id: 5, date: '2022-05-05', startTime: '12:00', endTime: '14:00', name: 'Charlie', service: 'Service E', duration: '2 hr', status: 'Completed', payment: '$55.00 Card Complete' },
        { id: 6, date: '2022-05-06', startTime: '13:00', endTime: '15:00', name: 'David', service: 'Service F', duration: '2 hr', status: 'Approved', payment: '$60.00 PayPal Complete' },
        { id: 7, date: '2022-05-06', startTime: '13:00', endTime: '15:00', name: 'David', service: 'Service F', duration: '2 hr', status: 'Approved', payment: '$60.00 PayPal Complete' },
        { id: 8, date: '2022-05-06', startTime: '13:00', endTime: '15:00', name: 'David', service: 'Service F', duration: '2 hr', status: 'Approved', payment: '$60.00 PayPal Complete' },
        { id: 9, date: '2022-05-06', startTime: '13:00', endTime: '15:00', name: 'David', service: 'Service F', duration: '2 hr', status: 'Approved', payment: '$60.00 PayPal Complete' },
        { id: 10, date: '2022-05-06', startTime: '13:00', endTime: '15:00', name: 'David', service: 'Service F', duration: '2 hr', status: 'Approved', payment: '$60.00 PayPal Complete' },
        { id: 11, date: '2022-05-06', startTime: '13:00', endTime: '15:00', name: 'David', service: 'Service F', duration: '2 hr', status: 'Approved', payment: '$60.00 PayPal Complete' },
        // Add more records if needed
    ];

    // Paginated data based on currentPage
    const paginatedData = data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    // Functions to open and close the modal
    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    const handleEditClick = (item) => {
        setModalMode('edit');
        setSelectedEvent(item);
        handleShowModal();
    };

    // Handle page change
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Handle previous page click
    const handlePrev = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    // Handle next page click
    const handleNext = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };


    return (
        <div className='container-fluid'>
            <div className='d-flex justify-content-between align-items-center'>
                <div className='col-7'>  <h4 className='text-start'>Appoitment</h4></div>
                <div className='col-5 d-flex justify-content-between'>
                    <button className='btn-navbar'><img className='me-2' src='assets/image/questionmark.svg' />Documentation</button>
                    <button className='btn-navbar'><img className='me-2' src='assets/image/contactus.svg' />Contact Us</button>
                    <button className='btn-navbar'><img className='me-2' src='assets/image/feature.svg' />Feature request</button>
                    <button className='btn-navbar'><img className='me-2' src='assets/image/feedback.svg' />Feedback</button>
                    <button className='btn-navbar'><img src='assets/image/warning.svg' /></button>
                </div>
            </div>

            <div className='appointment'>
                <div className='col-12 d-flex justify-content-end'>
                    <div className='d-flex justify-content-center align-items-center'>
                        <button className='btn-appointment'><img src='assets/image/appointment/csv.svg' className='me-2' />Export to CSV...</button>
                        <button className='btn-appointment '><img src='assets/image/appointment/print.svg' className='me-2' />Print</button>
                        <button className='btn-appointment' onClick={handleShowModal}><FontAwesomeIcon icon={faPlus} /> New appointment</button>
                        <button className='btn-appointment'><img src='assets/image/appointment/eye.svg' /></button>
                    </div>

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

                {/* Table */}
                <div className='col-12 appointment-table'>
                    <table className='table table-bordered'>
                        <thead>
                            <tr>
                                <th scope='col'>ID</th>
                                <th scope='col'>Appointment date</th>
                                <th scope='col'>Start Time</th>
                                <th scope='col'>End Time</th>
                                <th scope='col'>Customer name</th>
                                <th scope='col'>Service</th>
                                <th scope='col'>Duration</th>
                                <th scope='col'>Status</th>
                                <th scope='col'>Payment</th>
                                <th scope='col'></th>
                                <th scope='col'><input type='checkbox' /></th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedData.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.date}</td>
                                    <td>{item.startTime}</td>
                                    <td>{item.endTime}</td>
                                    <td>{item.name}</td>
                                    <td>{item.service}</td>
                                    <td>{item.duration}</td>
                                    <td>{item.status}</td>
                                    <td>{item.payment}</td>
                                    <td>
                                        <button className='edit-btn' onClick={() => handleEditClick(item)}>
                                            <FontAwesomeIcon icon={faPenToSquare} /> Edit
                                        </button>
                                    </td>
                                    <td><input type='checkbox' /></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Pagination */}
                    <div className='d-flex justify-content-between'>
                        <Pagination>
                            <Pagination.First onClick={() => setCurrentPage(1)} disabled={currentPage === 1} />
                            <Pagination.Prev onClick={handlePrev} disabled={currentPage === 1} />

                            {/* Dynamically generate pagination items */}
                            {Array.from({ length: totalPages }, (_, index) => (
                                <Pagination.Item
                                    key={index + 1}
                                    active={index + 1 === currentPage}
                                    onClick={() => handlePageChange(index + 1)}
                                >
                                    {index + 1}
                                </Pagination.Item>
                            ))}

                            <Pagination.Next onClick={handleNext} disabled={currentPage === totalPages} />
                            <Pagination.Last onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages} />
                        </Pagination>
                        <div>
                            <button className='btn btn-danger'> <FontAwesomeIcon icon={faTrashCan} className='me-1' />Delete..</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Appointment;
