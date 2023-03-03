import {React, useEffect, useState} from "react";
import '../App'

export default function Datapage ({data}) {

    const [firstName, setFirstName] = useState([])
    const [lastName, setLastName] = useState([])
    const [participants, setParticipants] = useState([0])
    const [tableData, setTableData] = useState([])
    
    const handleSubmit = (event) => {
        event.preventDefault()
        // Add new row to table data array
        const newRow = { firstName, lastName, participants }
        setTableData([...tableData, newRow])
        // clear input fields
        setFirstName('')
        setLastName('')
        setParticipants(0)
    }

    useEffect(() => {
        getUser()
    }, [])

    const getUser = async () => {
        const response = await fetch('/api/user-list/')
        const data = await response.json()
        console.log(data)
        setTableData(data)
    }

    return (
        <div>
            <div className="form-container">
            <form className="main-form flex justify-evenly" onSubmit={handleSubmit}>
                <input className=""
                 type="text" 
                 placeholder="Firstname" 
                 value={firstName}
                 onChange={(e) => setFirstName(e.target.value)}
                 /> 

                <input className="" type="text" placeholder="Lastname"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                 />  

                <input className="" type="number" placeholder="Participants"
                value={participants}
                onChange={(e) => setParticipants(parseInt(e.target.value))}
                 />

                <button className="bg-black text-white" type="submit">Send</button>
            </form>
        </div>

      <div className="container">
        <div className="table-container">
            <table className="">
                <thead>
                    <tr>
                        <th>Firstname</th>
                        <th>Lastname</th>
                        <th>Participants</th>
                    </tr>
                </thead>
                <tbody>
                {tableData.map((row, index) => (
                <tr key={index}>
                    <td>{row.firstName}</td>
                    <td>{row.lastName}</td>
                    <td>{row.participants}%</td>
                </tr>
            ))}
                    
                </tbody>
            </table>
        </div>
      </div>
        </div>
    );
  }