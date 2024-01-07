import React from "react"
import { useState } from "react";
import axios from "axios";

export default function Employee({ employee, getEmployees }) {
    const [updateEmail, setUpdateEmail] = useState('');
    const [isUpdating, setIsUpdating] = useState(false);

    const handleEmployeeDelete = (employee) => {
        axios.delete('http://localhost:8080/api/employee', {
            data: {
                id: employee.id,
                name: employee.name,
                departmentId: employee.departmentId,
                managerId: employee.managerId,
                email: employee.email,
                enrollDate: employee.enrollDate
            }
        }, {})
            .then(() => {
                getEmployees();
            })
    }

    const handleUpdateEmployee = () => {
        console.log(employee.id);
        console.log(employee);
        axios.patch('http://localhost:8080/api/employee', {
            id: employee.id,
            name: employee.name,
            departmentId: employee.departmentId,
            managerId: employee.managerId,
            email: updateEmail,
            enrollDate: employee.enrollDate
        }
            , {})
            .then(() => {
                getEmployees();
                setIsUpdating(!isUpdating);
            });
    }
    return (
        <div className="tb-row">
            <div className="tc-name">{employee.name}</div>
            <div className="tc-email">
                {isUpdating ? <input type="text" onChange={e => setUpdateEmail(e.target.value)} /> : employee.email}
            </div>
            <div className="tc-department">{employee.departmentId}</div>
            <div className="tc-enroll-date">{employee.enrollDate}</div>
            <div className="tc-controls">
                {
                    isUpdating ?
                        <button onClick={() => handleUpdateEmployee()}>Confirm</button>
                        :
                        <button onClick={() => setIsUpdating(!isUpdating)}>Edit</button>

                }
                <button onClick={() => handleEmployeeDelete(employee)}>Delete</button>
            </div>
        </div>
    )
}