import React, { useState } from "react";
import {useNavigate} from "react-router-dom";
import EmployeeService from "../services/EmployeeService";

function CreateEmployeeComponent() {

  let navigate=useNavigate();
  
  const [employee,setEmployee]=useState({
    firstName:"",
    lastname:"",
    email:""
  })

  const handleChange=(e)=>
  {
    const name=e.target.name;
    const value=e.target.value;

    setEmployee({...employee,[name]:value});
  }

  const saveHandle=(e)=>
  {
    e.preventDefault();

    EmployeeService.addEmployee(employee).then((res)=>
    {
      navigate("/employees");
    })
  }

  const cancelHandle=()=>
  {
    navigate("/employees");
  }
  return (
    <div className="container">
      <div className="row mt-2">
        <div className="col-6 offset-md-3">
          <div className="card p-5">
            <h3 className="text-center">Add Employee</h3>
            <form>
              <div className="form-group">
                <label htmlFor="firstName" className="my-3">
                  First Name:
                </label>
                <input type="text" name="firstName" id="firstName" className="form-control" required value={employee.firstName} onChange={handleChange}/>

                <label htmlFor="lastName" className="my-3">
                  Second Name:
                </label>
                <input type="text" name="lastName" id="lastName" className="form-control" required value={employee.lastName} onChange={handleChange} />

                <label htmlFor="email" className="my-3">
                  Email:
                </label>
                <input type="email" name="email" id="email" className="form-control" required value={employee.email} onChange={handleChange}/>

                <button className="mt-3 btn btn-danger" onClick={cancelHandle}>cancel</button>
                <button className=" mt-3 btn btn-success ms-3" onClick={saveHandle}>submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateEmployeeComponent;
