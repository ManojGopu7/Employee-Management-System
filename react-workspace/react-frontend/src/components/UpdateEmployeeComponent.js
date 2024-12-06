import React from 'react'
import { useState,useEffect } from 'react'
import EmployeeService from '../services/EmployeeService';
import { useNavigate, useParams } from 'react-router-dom';

function UpdateEmployeeComponent() {

    const navigate=useNavigate();

    const [firstName,setFirstName]=useState("");
    const [lastName,setlastName]=useState("");
    const [email,setEmail]=useState("");
    const {id}=useParams();

    useEffect(()=>
    {
    EmployeeService.getEmployeeId(id).then((res)=>
    {
        setFirstName(res.data.firstName);
        setlastName(res.data.lastName);
        setEmail(res.data.email)
    })    
    },[])

    const updateHandler=(e)=>
    {
      e.preventDefault();
      const employee={firstName,lastName,email};

      if(id)
      {
        EmployeeService.updateEmployee(id,employee).then((res)=>
        {
          navigate('/employees');
        })
      }
      else{
        EmployeeService.addEmployee(employee).then((res)=>
        {
          navigate("/employees");
        })
      }
      
    }

    const cancelHandle=(e)=>
    {
        e.preventDefault();
        navigate("/employees");
    }

  return (
    <div className="container">
    <div className="row mt-2">
      <div className="col-6 offset-md-3">
        <div className="card p-5">
          <h3 className="text-center">Update Employee</h3>
          <form>
            <div className="form-group">
              <label htmlFor="firstName" className="my-3">
                First Name:
              </label>
              <input type="text" name="firstName" id="firstName" className="form-control" value={firstName} onChange={(e)=>setFirstName(e.target.value)} required/>

              <label htmlFor="lastName" className="my-3">
                Last Name:
              </label>
              <input type="text" name="lastName" id="lastName" className="form-control"  value={lastName} onChange={(e)=>setlastName(e.target.value)} required/>

              <label htmlFor="email" className="my-3">
                Email:
              </label>
              <input type="email" name="email" id="email" className="form-control"  value={email} onChange={(e)=>setEmail(e.target.value)} required/>

              <button className="mt-3 btn btn-danger" onClick={cancelHandle}>cancel</button>
              <button className=" mt-3 btn btn-success ms-3" onClick={updateHandler}>submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  )
}

export default UpdateEmployeeComponent
