import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faCircle, faPenToSquare, faTrashCan, faUser, faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';
import { Pagination, Modal, Button, Form, InputGroup, Image } from 'react-bootstrap';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

export const StaffMember = () => {
  const [showStaffOrderModal, setShowStaffOrderModal] = useState(false);
  const [showCategoriesModal, setShowCategoriesModal] = useState(false);

  // const [showModal, setShowModal] = useState(false);
  // const [modalMode, setModalMode] = useState('add');
  // const [selectedStaff, setSelectedStaff] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);

  const [showNewStaffModal, setShowNewStaffModal] = useState(false);

  const [categories, setCategories] = useState([
    { id: 1, name: 'General' },
    { id: 2, name: 'Admin' },
    { id: 3, name: 'Support' }
  ]);
  const [newCategory, setNewCategory] = useState('');

  // Sample data
  const [data, setData] = useState([
    { id: 1, name: '1 Nick Knight', category: 'General', email: 'nick.knight@example.com', phone: '+1 406-555-1211' },
    { id: 2, name: '2 John Doe', category: 'Admin', email: 'john.doe@example.com', phone: '+1 123-456-7890' },
    { id: 3, name: '3 Jane Smith', category: 'Support', email: 'jane.smith@example.com', phone: '+1 987-654-3210' },
    { id: 4, name: '4 Emily Davis', category: 'General', email: 'emily.davis@example.com', phone: '+1 456-789-0123' },
    { id: 5, name: '5 Michael Brown', category: 'Admin', email: 'michael.brown@example.com', phone: '+1 321-654-9870' },
    { id: 6, name: '6 Sarah Johnson', category: 'Support', email: 'sarah.johnson@example.com', phone: '+1 654-321-0987' },
    { id: 7, name: '7 David Wilson', category: 'General', email: 'david.wilson@example.com', phone: '+1 789-012-3456' },
    { id: 8, name: '8 Nick Knight', category: 'General', email: 'nick.knight@example.com', phone: '+1 406-555-1211' },
    { id: 9, name: '9 John Doe', category: 'Admin', email: 'john.doe@example.com', phone: '+1 123-456-7890' },
    { id: 10, name: '10 Jane Smith', category: 'Support', email: 'jane.smith@example.com', phone: '+1 987-654-3210' },
    { id: 11, name: '11 Emily Davis', category: 'General', email: 'emily.davis@example.com', phone: '+1 456-789-0123' },
    { id: 12, name: '12 Michael Brown', category: 'Admin', email: 'michael.brown@example.com', phone: '+1 321-654-9870' },
    { id: 13, name: '13 Sarah Johnson', category: 'Support', email: 'sarah.johnson@example.com', phone: '+1 654-321-0987' },
  ]);

  const totalItems = data.length;
  const itemsPerPage = 10;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const paginatedData = data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleNewStaff = (newStaffData) => {
    setData([...data, { id: data.length + 1, ...newStaffData }]);
    setShowNewStaffModal(false);
  };

  // Modal components
  const StaffOrderModal = () => (
    <Modal show={showStaffOrderModal} className='staffModal' onHide={() => setShowStaffOrderModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Staff members order</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ul>
          {data.map((staff) => (
            <li key={staff.id} className='m-1'><img src='assets/image/staffmember/3line.svg' width={"2%"} className='me-2' />{staff.name}</li>
          ))}
        </ul>
        <p>Adjust the order of staff members in your booking form</p>
      </Modal.Body>
      <Modal.Footer>
        <Button className='submit-btn ' onClick={() => setShowStaffOrderModal(false)}>
          Save
        </Button>
        <Button className="btnClose" onClick={() => setShowStaffOrderModal(false)}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );

  // category modal logic
  const addCategory = () => {
    if (newCategory) {
      setCategories([...categories, { id: categories.length + 1, name: newCategory }]);
      setNewCategory('');
    }
  };
  const deleteCategory = (id) => setCategories(categories.filter(category => category.id !== id));
  const toggleCategory = (id) => {
    setCategories(categories.map(category =>
      category.id === id ? { ...category, isOpen: !category.isOpen } : category
    ));
  };
  // category modal
  const CategoriesModal = () => (
    <Modal show={showCategoriesModal} onHide={() => setShowCategoriesModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Categories</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {categories.map(category => (
          <div key={category.id}>
            <InputGroup className="mb-3">
              <Form.Control type="text" value={category.name} readOnly />
              <Button variant="danger" onClick={() => deleteCategory(category.id)}>
                <FontAwesomeIcon icon={faTrashCan} />
              </Button>
              <Button variant="outline-secondary" onClick={() => toggleCategory(category.id)}>
                <FontAwesomeIcon icon={category.isOpen ? faCaretUp : faCaretDown} />
              </Button>
            </InputGroup>

            {category.isOpen && (
              <div className="mb-3">
                <Form.Control as="textarea" placeholder="Insert additional details..." />
              </div>
            )}
          </div>
        ))}

        <InputGroup className="mb-3">
          <Form.Control
            type="text"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder="Add new category"
          />
          <Button variant="success" onClick={addCategory}>+ Add category</Button>
        </InputGroup>
        <p>Adjust the order of categories in your booking form</p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => alert('Categories saved!')}>Save</Button>
        <Button onClick={() => setShowCategoriesModal(false)}>Close</Button>
      </Modal.Footer>
    </Modal>
  );

  // new staff modal
  const NewStaffModal = () => {
    const [newStaff, setNewStaff] = useState({
      fullName: '',
      user: '',
      email: '',
      phone: '',
      info: '',
      color: '#6366f1',
      visibility: 'public',
      category: 'Uncategorized',
      paymentMethod: 'default',
      availableMethods: ['All methods'],
      methodsList: ['Local', 'PayPal']
    });

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setNewStaff(prevData => ({
        ...prevData,
        [name]: value
      }));
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      handleNewStaff(newStaff);
    };

    const handlePhoneChange = (value) => {
      setNewStaff((prevState) => ({
        ...prevState,
        phone: value,
      }));
    };

    const handleCheckboxChange = (method) => {
      let updatedMethods;
      if (newStaff.availableMethods.includes(method)) {
        updatedMethods = newStaff.availableMethods.filter(m => m !== method);
      } else {
        updatedMethods = [...newStaff.availableMethods, method];
      }
      setNewStaff({ ...newStaff, availableMethods: updatedMethods });
    };

    return (
      <Modal show={showNewStaffModal} onHide={() => setShowNewStaffModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Create staff</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>

            <div className='col-12 d-flex justify-content-between'>
              <div className='col-2'>
                <img className='' src="assets/image/staffmember/camera.png" height="90" />
              </div>
              <div className='col-10'>
                <Form.Group className="mb-3">
                  <Form.Label>Full name</Form.Label>
                  <InputGroup className=''>
                    <Form.Control
                      type="text"
                      name="fullName"
                      value={newStaff.fullName}
                      onChange={handleInputChange}
                      className='d-inline'
                    />
                  </InputGroup>
                </Form.Group>
              </div>
            </div>

            <Form.Group className="mb-3">
              <Form.Label>User</Form.Label>
              <Form.Select
                name="user"
                value={newStaff.user}
                onChange={handleInputChange}
              >
                <option>Select from WordPress users</option>
                {/* Add WordPress users options here */}
              </Form.Select>
              <Form.Text className="text-muted">
                If this field is empty, no WordPress user account is created for this staff member. User with "Administrator" role will have access to calendars and settings of all staff members, user with another role will have access only to personal calendar and settings. If you leave this field blank, this staff member will not be able to access personal calendar using WP backend.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={newStaff.email}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Phone</Form.Label>
              <PhoneInput
                country={'in'}
                value={newStaff.phone}
                onChange={handlePhoneChange}
                inputStyle={{ width: '100%' }}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Info</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="info"
                value={newStaff.info}
                onChange={handleInputChange}
              />
              <Form.Text className="text-muted">
                This text can be inserted into notifications with {'{staff_info}'} code
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3  selectColor" >
              <Form.Label className='d-block'>Color</Form.Label>
              <div className='d-flex align-items-center'>
                <Form.Control
                  inline
                  type="color"
                  className='d-inline'
                  name="color"
                  value={newStaff.color}
                  onChange={handleInputChange}
                />
                <div className='d-inline select-color'>Select Color</div>
              </div>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Visibility</Form.Label>
              <div>
                <Form.Check
                  block
                  type="radio"
                  label="Public"
                  name="visibility"
                  value="public"
                  checked={newStaff.visibility === 'public'}
                  onChange={handleInputChange}
                />
                <Form.Check
                  block
                  type="radio"
                  label="Private"
                  name="visibility"
                  value="private"
                  checked={newStaff.visibility === 'private'}
                  onChange={handleInputChange}
                />
                <Form.Check
                  block
                  type="radio"
                  label="Archive"
                  name="visibility"
                  value="archive"
                  checked={newStaff.visibility === 'archive'}
                  onChange={handleInputChange}
                />
              </div>
              <Form.Text className="text-muted">
                To make staff member invisible to your customers set the visibility to "Private"
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Select
                name="category"
                value={newStaff.category}
                onChange={handleInputChange}
              >
                <option>Uncategorized</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Available payment methods</Form.Label>
              <div>
                <Form.Check
                  type="radio"
                  label="Default"
                  name="paymentMethod"
                  value="default"
                  checked={newStaff.paymentMethod === 'default'}
                  onChange={handleInputChange}
                />
                <Form.Check
                  type="radio"
                  label="Custom"
                  name="paymentMethod"
                  value="custom"
                  checked={newStaff.paymentMethod === 'custom'}
                  onChange={handleInputChange}
                />
              </div>
              {newStaff.paymentMethod === 'custom' && (
                <div className="col-sm-12">
                  <select
                    id="paymentMethods"
                    className="form-select"
                    onChange={(e) => handleCheckboxChange(e.target.value)}
                  >
                    <option><img src='assets/image/staffmember/payment.svg' />All Methods</option>
                    {newStaff.methodsList.map((method, index) => (
                      <option key={index} value={method}>
                        {method}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button className='"btn-newCust ' onClick={handleSubmit}>
            Save
          </Button>
          <Button className="btnClose" onClick={() => setShowNewStaffModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

  return (
    <div className='container-fluid'>
      {/* Header Section */}
      <div className='d-flex justify-content-between align-items-center'>
        <div className='col-7'>
          <h4 className='text-start'>Staff Members ({totalItems})</h4>
        </div>
        <div className='col-5 d-flex justify-content-between'>
          <button className='btn-navbar'>
            <img className='me-2' src='assets/image/questionmark.svg' alt='Documentation' />
            Documentation
          </button>
          <button className='btn-navbar'>
            <img className='me-2' src='assets/image/contactus.svg' alt='Contact Us' />
            Contact Us
          </button>
          <button className='btn-navbar'>
            <img className='me-2' src='assets/image/feature.svg' alt='Feature Request' />
            Feature request
          </button>
          <button className='btn-navbar'>
            <img className='me-2' src='assets/image/feedback.svg' alt='Feedback' />
            Feedback
          </button>
          <button className='btn-navbar'>
            <img src='assets/image/warning.svg' alt='Warning' />
          </button>
        </div>
      </div>

      {/* Main Section */}
      <div className='staffmember'>
        <div className='col-12 d-flex justify-content-end'>
          <div className='d-flex'>
            <button className='btn-appointment' onClick={() => setShowStaffOrderModal(true)}>Staff members order</button>
            <button className='btn-appointment' onClick={() => setShowCategoriesModal(true)}>Categories</button>
            <button className='btn-appointment' onClick={() => setShowNewStaffModal(true)}>
              <FontAwesomeIcon icon={faPlus} /> New staff
            </button>
            <button className='btn-appointment'>
              <img src='assets/image/appointment/eye.svg' alt='View' />
            </button>
          </div>
        </div>

        {/* Search & Filters */}
        <div className='col-9 d-flex justify-content-between align-items-start staffmember-btn'>
          <div className='col-sm-2'>
            <input type='text' className='sm-input' placeholder='Quick search staff' />
          </div>
          <div className='col-sm-3'>
            <select className='form-select'>
              <option value="">Categories</option>
              {/* Add more categories here */}
            </select>
          </div>
          <div className='col-sm-2'>
            <select className='form-select'>
              <option value="">Visibility</option>
              {/* Add visibility options here */}
            </select>
          </div>
          <div className='col-sm-2 sm-checkbox'>
            <input type='checkbox' className='d-inline' />
            <p className='d-inline'>Show archived</p>
          </div>
        </div>

        {/* Staff Table */}
        <div className='col-12'>
          <table className='table table-striped table-hover'>
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Category</th>
                <th>Email</th>
                <th>Phone</th>
                <th></th>
                <th><input type='checkbox' /></th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((staff) => (
                <tr key={staff.id}>
                  <td><FontAwesomeIcon icon={faCircle} /></td>
                  <td>{staff.name}</td>
                  <td>{staff.category}</td>
                  <td>{staff.email}</td>
                  <td>{staff.phone}</td>
                  <td>
                    <button className='edit-btn'>
                      <FontAwesomeIcon icon={faPenToSquare} /> Edit
                    </button>
                  </td>
                  <td><input type='checkbox' /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className='d-flex justify-content-between'>
          <Pagination>
            <Pagination.First onClick={() => setCurrentPage(1)} disabled={currentPage === 1} />
            <Pagination.Prev onClick={handlePrev} disabled={currentPage === 1} />
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
            <button className='btn btn-danger'>
              <FontAwesomeIcon icon={faTrashCan} className='me-1' />Delete..
            </button>
          </div>
        </div>
      </div>
      {/* Modals */}
      <StaffOrderModal />
      <CategoriesModal />
      <NewStaffModal />
    </div>
  );
};
