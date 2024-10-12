import React from 'react';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle, faPenToSquare, } from '@fortawesome/free-solid-svg-icons';

export const StaffMember = () => {
  return (
    <div className='container-fluid'>
      <div className='d-flex justify-content-between align-items-center'>
        <div className='col-7'>  <h4 className='text-start'>Staff Members (10)</h4></div>
        <div className='col-5 d-flex justify-content-between'>
          <button className='btn-navbar'><img className='me-2' src='assets/image/questionmark.svg' />Documentation</button>
          <button className='btn-navbar'><img className='me-2' src='assets/image/contactus.svg' />Contact Us</button>
          <button className='btn-navbar'><img className='me-2' src='assets/image/feature.svg' />Feature request</button>
          <button className='btn-navbar'><img className='me-2' src='assets/image/feedback.svg' />Feedback</button>
          <button className='btn-navbar'><img src='assets/image/warning.svg' /></button>
        </div>
      </div>

      <div className='staffmember'>
        <div className='col-12 d-flex justify-content-end'>
          <div className='d-flex justify-content-center align-items-center'>
            <button className='btn-appointment'><img src='assets/image/appointment/csv.svg' className='me-2' />Export to CSV...</button>
            <button className='btn-appointment '><img src='assets/image/appointment/print.svg' className='me-2' />Print</button>
            <button className='btn-appointment'><FontAwesomeIcon icon={faPlus} /> New appointment</button>
            <button className='btn-appointment'><img src='assets/image/appointment/eye.svg' /></button>
          </div>
        </div>
        <div className='col-9 d-flex justify-content-between align-items-start staffmember-btn'>
          <div className='col-sm-2'>
            <input type='text' className='sm-input' placeholder='Quick search staff' />
          </div>
          <div className="col-sm-3">
            <select id="displayName" className="form-select">
              <option value="">Categories</option>
            </select>
          </div>
          <div className="col-sm-2">
            <select id="displayName" className="form-select">
              <option value="">Visibility</option>
            </select>
          </div>
          <div className='col-sm-2 sm-checkbox' >
            <input type='checkbox' className='d-inline' /><p className='d-inline'>Show archived</p>
          </div>
        </div>

        <div className='col-12'>
          <table class="table table-striped table-hover">
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Category</th>
                <th>Email</th>
                <th>Phone</th>
                <th>User</th>
                <th></th>
                <th><input type='checkbox' /></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>  <FontAwesomeIcon icon={faCircle} /></td>
                <td>	Nick Knight</td>
                <td>	General</td>
                <td>nick.knight@example.com</td>
                <td>+1 406-555-1211</td>
                <td></td>
                <td><button className='edit-btn'> <FontAwesomeIcon icon={faPenToSquare} /> Edit</button></td>
                <td><input type='checkbox' /></td>
              </tr>
              <tr>
                <td>  <FontAwesomeIcon icon={faCircle} /></td>
                <td>	Nick Knight</td>
                <td>	General</td>
                <td>nick.knight@example.com</td>
                <td>+1 406-555-1211</td>
                <td></td>
                <td><button className='edit-btn'> <FontAwesomeIcon icon={faPenToSquare} /> Edit</button></td>
                <td><input type='checkbox' /></td>
              </tr>
              <tr>
                <td>  <FontAwesomeIcon icon={faCircle} /></td>
                <td>	Nick Knight</td>
                <td>	General</td>
                <td>nick.knight@example.com</td>
                <td>+1 406-555-1211</td>
                <td></td>
                <td><button className='edit-btn'> <FontAwesomeIcon icon={faPenToSquare} /> Edit</button></td>
                <td><input type='checkbox' /></td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>

    </div>
  )
}
