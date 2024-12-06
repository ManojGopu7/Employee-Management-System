import React, { Component } from 'react'
import EmployeeService from '../services/EmployeeService';
import {Link} from "react-router-dom"

export default class EmployeeListComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            employees: []
        }
    }

    componentDidMount() {
        EmployeeService.getEmployees().then((res) => {
            this.setState({ employees: res.data });
        })
    }

    deleteEmployee=(employeeId)=>
    {
        EmployeeService.deleteEmployee(employeeId).then((res)=>
        {
            EmployeeService.getEmployees().then((res)=>
            {
                this.setState({employees:res.data});
            })
        })

    }

    render() {
        return (
            <div className='container mt-3'>
                <h4 className='text-center'>Employees List</h4>
                <div className='row mt-4'>
                <Link to="/add-employee" className='btn btn-primary mb-3'>Add Employee</Link>
                    <table className='table table-bordered table-striped'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>FIRST-NAME</th>
                                <th>SECOND-NAME</th>
                                <th>EMAIL</th>
                                <th>ACTION</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.employees.map((employee) => {
                                    return <tr>
                                        <td>{employee.id}</td>
                                        <td>{employee.firstName}</td>
                                        <td>{employee.lastName}</td>
                                        <td>{employee.email}</td>
                                        <td>
                                            <Link to={`/update-employee/${employee.id}`} className='btn btn-info'>Update</Link>
                                            <button className='btn btn-danger' style={{marginLeft:"15px"}} onClick={()=>this.deleteEmployee(employee.id)}>Delete</button>
                                        </td>
                                    </tr>
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}
