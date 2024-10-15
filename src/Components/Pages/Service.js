import React from 'react';
import { faEye, faPlus, faPenToSquare, faClone } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const Service = () => {
    return (
        <div className='container-fluid'>
            {/* Header Section */}
            <div className='d-flex justify-content-between align-items-center'>
                <div className='col-7'>
                    <h4 className='text-start'>Services</h4>
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

            <div className='service'>
                <div className='col-12 d-flex justify-content-end'>
                    <div className='d-flex'>
                        <button className='btn-appointment' >Staff members order</button>
                        <button className='btn-appointment' >Categories</button>
                        <button className='btn-appointment'>
                            <FontAwesomeIcon icon={faPlus} />
                            New staff
                        </button>
                        <button className='btn-appointment'>
                            <FontAwesomeIcon icon={faEye} />
                        </button>
                    </div>
                </div>


                <div className='col-9 d-flex justify-content-start align-items-center staffmember-btn'>
                    <div className='col-md-6 text-start'>
                        <input type='text' className='sm-input' placeholder='Quick search staff' />
                    </div>
                    <div className='col-md-2 search-dropdown col-lg-3'>
                        <select className='form-select'>
                            <option value="">Categories1</option>
                            <option value="">Categories2</option>
                            <option value="">Categories3</option>
                            <option value="">Categories4</option>
                        </select>
                    </div>

                </div>
                <hr></hr>

                <div className='col-12'>
                    <table class="table table-striped text-start">
                        <thead>
                            <tr>
                                <th scope="col"></th>
                                <th scope="col">Title</th>
                                <th scope="col">Category</th>
                                <th scope="col">Duration</th>
                                <th scope="col">Price</th>
                                <th scope="col"></th>
                                <th scope="col"></th>
                                <th scope="col" className=''><input type='checkbox' /></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td scope="row">1</td>
                                <td>Crown and brige</td>
                                <td>Costomatic Dentistry</td>
                                <td>1 h</td>
                                <td>$35.00</td>
                                <td><button className='edit-btn'> <FontAwesomeIcon icon={faPenToSquare} /> Edit</button></td>
                                <td><button className='edit-btn'><FontAwesomeIcon icon={faClone} /> Duplicate..</button></td>
                                <td><input type='checkbox' /></td>
                            </tr>
                            <tr>
                                <td scope="row">2</td>
                                <td>Crown and brige</td>
                                <td>Costomatic Dentistry</td>
                                <td>1 h</td>
                                <td>$35.00</td>
                                <td><button  className='edit-btn'> <FontAwesomeIcon icon={faPenToSquare} /> Edit</button></td>
                                <td><button  className='edit-btn'><FontAwesomeIcon icon={faClone} /> Duplicate..</button></td>
                                <td><input type='checkbox' /></td>
                            </tr>
                            <tr>
                                <td scope="row">3</td>
                                <td>Crown and brige</td>
                                <td>Costomatic Dentistry</td>
                                <td>1 h</td>
                                <td>$35.00</td>
                                <td><button  className='edit-btn'> <FontAwesomeIcon icon={faPenToSquare} /> Edit</button></td>
                                <td><button  className='edit-btn'><FontAwesomeIcon icon={faClone} /> Duplicate..</button></td>
                                <td><input type='checkbox' /></td>
                            </tr>
                            <tr>
                                <td scope="row">4</td>
                                <td>Crown and brige</td>
                                <td>Costomatic Dentistry</td>
                                <td>1 h</td>
                                <td>$35.00</td>
                                <td><button  className='edit-btn'> <FontAwesomeIcon icon={faPenToSquare} /> Edit</button></td>
                                <td><button  className='edit-btn'><FontAwesomeIcon icon={faClone} /> Duplicate..</button></td>
                                <td><input type='checkbox' /></td>
                            </tr>
                            <tr>
                                <td scope="row">5</td>
                                <td>Crown and brige</td>
                                <td>Costomatic Dentistry</td>
                                <td>1 h</td>
                                <td>$35.00</td>
                                <td><button  className='edit-btn'> <FontAwesomeIcon icon={faPenToSquare} /> Edit</button></td>
                                <td><button  className='edit-btn'><FontAwesomeIcon icon={faClone} /> Duplicate..</button></td>
                                <td><input type='checkbox' /></td>
                            </tr>
                            <tr>
                                <td scope="row">6</td>
                                <td>Crown and brige</td>
                                <td>Costomatic Dentistry</td>
                                <td>1 h</td>
                                <td>$35.00</td>
                                <td><button  className='edit-btn'> <FontAwesomeIcon icon={faPenToSquare} /> Edit</button></td>
                                <td><button  className='edit-btn'><FontAwesomeIcon icon={faClone} /> Duplicate..</button></td>
                                <td><input type='checkbox' /></td>
                            </tr>
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    )
}
