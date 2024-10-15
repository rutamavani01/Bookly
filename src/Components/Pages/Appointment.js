import React, { useState } from 'react';
import { useEffect } from 'react';
import { faPlus, faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrashCan, faBars } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import moment from 'moment';
import { Button, Modal, Form, Row, Col, Pagination } from 'react-bootstrap';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const Appointment = () => {

    const [showModal, setShowModal] = useState(false);
    const [modalMode, setModalMode] = useState('add'); // 'add' or 'edit'
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [selectedEvent, setSelectedEvent] = useState(null);

    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const [showColumnModal, setShowColumnModal] = useState(false);
    const [columnVisibility, setColumnVisibility] = useState({
        ID: true,
        No: false,
        'Appointment date': true,
        Employee: true,
        'Customer name': true,
        'Customer phone': true,
        'Customer email': true,
        Service: true,
        Duration: true,
        Status: true,
        Payment: true,
        Notes: true,
        Created: true,
        'Internal note': false,
        'Customer address': true,
        'Customer birthday': true,
        'Online meeting': true
    });

    useEffect(() => {
        const savedVisibility = localStorage.getItem('columnVisibility');
        if (savedVisibility) {
            setColumnVisibility(JSON.parse(savedVisibility));
        }
    }, []);


    const totalItems = 50;
    const itemsPerPage = 10;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const [currentPage, setCurrentPage] = useState(1);

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

    // hide & unhide columns
    const ColumnVisibilityModal = ({ show, handleClose, columnVisibility, setColumnVisibility }) => {
        const [tempVisibility, setTempVisibility] = useState(columnVisibility);

        const handleCheckboxChange = (column) => {
            setTempVisibility(prev => ({ ...prev, [column]: !prev[column] }));
        };

        const handleSave = () => {
            setColumnVisibility(tempVisibility);
            localStorage.setItem('columnVisibility', JSON.stringify(tempVisibility));
            handleClose();
        };

        const onDragEnd = (result) => {
            console.log("okok")
            if (!result.destination) return;

            const items = Array.from(Object.keys(tempVisibility));
            const [reorderedItem] = items.splice(result.source.index, 1);
            items.splice(result.destination.index, 0, reorderedItem);

            const newVisibility = {};
            items.forEach(key => {
                newVisibility[key] = tempVisibility[key];
            });

            setTempVisibility(newVisibility);
        };


        return (
            <Modal show={show} onHide={handleClose} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Table settings</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="d-flex justify-content-between mb-3">
                        <div><b>Column</b></div>
                        <div><b>Show</b></div>
                    </div>
                    <DragDropContext onDragEnd={onDragEnd}>
                        <Droppable droppableId="columns">
                            {(provided) => (
                                <div {...provided.droppableProps} ref={provided.innerRef}>
                                    {Object.keys(tempVisibility).map((column, index) => (
                                        <Draggable key={column} draggableId={column} index={index}>
                                            {(provided) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    className="d-flex align-items-center justify-content-between p-1"
                                                >
                                                    <div className="d-flex align-items-center">
                                                        <div {...provided.dragHandleProps} className="me-3">
                                                            <FontAwesomeIcon icon={faBars} />
                                                        </div>
                                                        <span>{column}</span>
                                                    </div>
                                                    <Form.Check
                                                        type="checkbox"
                                                        id={`checkbox-${column}`}
                                                        checked={tempVisibility[column]}
                                                        onChange={() => handleCheckboxChange(column)}
                                                        className="m-0"
                                                    />
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </DragDropContext>
                </Modal.Body>
                <Modal.Footer>
                    <Button className='btn-newCust' onClick={handleSave}>
                        Save
                    </Button>
                    <Button className='btnClose' onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    };

    const handleShowColumnModal = () => setShowColumnModal(true);
    const handleCloseColumnModal = () => setShowColumnModal(false);

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
                        <button className='btn-appointment' onClick={handleShowColumnModal}>
                            <FontAwesomeIcon icon={faEye} />
                        </button>

                        <ColumnVisibilityModal
                            show={showColumnModal}
                            handleClose={handleCloseColumnModal}
                            columnVisibility={columnVisibility}
                            setColumnVisibility={setColumnVisibility}
                        />
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

                <div className='col-lg-12 d-flex justify-content-between align-items-center appointment-btn'>
                    <div className='col-lg-1'>
                        <input type='text' className='w-90 sm-input m-0 p-1' placeholder='ID' />
                    </div>
                    <div className='col-lg-2'>
                        <input type='date' />
                    </div>
                    <div className='col-lg-2'>
                        <input type='date' />
                    </div>
                    <div className='col-lg-2 '>
                        <select id="displayName" className="form-select appointment-dropdown">
                            <option value="">Employee</option>
                        </select>
                    </div>
                    <div className='col-lg-2 '>
                        <select id="displayName" className="form-select appointment-dropdown">
                            <option value="">Customer</option>
                        </select>
                    </div>
                    <div className='col-lg-2'>
                        <select id="displayName" className="form-select appointment-dropdown">
                            <option value="">Service</option>
                        </select>
                    </div>
                    <div className='col-lg-1'>
                        <select id="displayName" className="form-select appointment-dropdown">
                            <ul>
                                <li>All Status</li>
                                <li>Pending</li>
                                <li>Approved</li>
                            </ul>
                        </select>
                    </div>
                </div>
                <hr></hr>

                {/* Table */}
                <div className='col-12 appointment-table text-start'>
                    <table className='table table-striped '>
                        <thead>
                            <tr>
                                {Object.entries(columnVisibility).map(([column, isVisible]) =>
                                    isVisible && <th key={column} scope='col'>{column}</th>
                                )}
                                <th ></th>
                                <th><input type='checkbox' /></th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedData.map((item) => (
                                <tr key={item.id}>
                                    {Object.entries(columnVisibility).map(([column, isVisible]) =>
                                        isVisible && <td key={column}>{item[column]}</td>
                                    )}
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
