import axios from "axios";
import { useEffect, useState } from "react";
import Employee from "./Employee";
import "./App.css";

function App() {

  const [employees, setEmployees] = useState([]);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [departmentId, setDepartmentId] = useState(0);
  const [managerId, setManagerId] = useState(0);

  useEffect(() => {
    getEmployees()
  }, [])

  const getEmployees = () => {
    axios.get('http://localhost:8080/api/employee', {}, {})
      .then((resp) => {
        setEmployees(resp.data);
      })
      .catch(err => console.log(err));
  }

  const handleEmployeeAdd = (event) => {
    event.preventDefault();
    axios.post('http://localhost:8080/api/employee', {
      name: name,
      departmentId: departmentId,
      managerId: managerId,
      email: email
    })
      .then((resp) => {
        getEmployees();
      })
  }



  return (
    <div className="App">
      <div className="main-content">
        <div className="employee-add">
          <form className="add-form" onSubmit={(e) => handleEmployeeAdd(e)}>
            <input placeholder="Name" type="text" onChange={e => setName(e.target.value)} />
            <input placeholder="Email" type="text" onChange={e => setEmail(e.target.value)} />
            <input placeholder="DepartmentId" type="number" onChange={e => setDepartmentId(e.target.value)} />
            <input placeholder="ManagerId" type="number" onChange={e => setManagerId(e.target.value)} />
            <button type="submit">Submit</button>
          </form>
        </div>
        <div className="table-employees">
          <div className="th-container">
            <div className="th-cell">Name</div>
            <div className="th-cell">Email</div>
            <div className="th-cell">Department</div>
            <div className="th-cell">Enroll Date</div>
            <div className="th-cell">Controls</div>
          </div>
          <div className="tb-content">
            {
              employees.map((employee) => {
                return <Employee key={employee.id} employee={employee} getEmployees={getEmployees} />
              })
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;