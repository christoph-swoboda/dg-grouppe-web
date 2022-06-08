import React from "react"
// import '../../../style/addEmployeeForm.scss'

const AddEmployee = () => {
    return (
        <div>
            <label>First Name</label>
           <input type='text' placeholder='First Name'/>
            <label>Last Name</label>
            <input type='text' placeholder='Last Name'/>
            <label>Email </label>
            <input type='email' placeholder='Yourmail@domain'/>
            <label>Gender </label>
            <select>
                <option>Male</option>
                <option>Female</option>
                <option>Others</option>
            </select>
            <label>Phone Number </label>
            <input type='number' maxLength='11' placeholder='xxxxxxxxxxx'/>
            <label>Address  </label>
            <input type='text'  placeholder='St, Town, Country'/>
            <label>Car </label>
            <input type='checkbox'/>

        </div>
    )
}

export default AddEmployee
