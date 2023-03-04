import { React, useState, useEffect } from 'react';
import { PieChart, Pie, Cell, Legend } from 'recharts';

import '../App.css'

export default function Datapage({data}) {
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [participants, setParticipants] = useState(0);
  const [tableData, setTableData] = useState([]);
  const [chartData, setChartData] = useState([])  

  useEffect(() => {
    // Fetch data from API
    fetch('/api/user-list/')
      .then(response => response.json())
      .then(data => {
        // Map data to table and chart formats
        const tableRows = data.map(({ firstName, lastName, participants }) => ({
          firstName,
          lastName,
          participants
        }));

        const chartData = data.map(({ firstName, lastName, participants }) => ({
          name: `${firstName} ${lastName}`,
          value: participants
        }));

        setTableData(data);
        setChartData(chartData);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault(); // prevent default form submission behavior
    // Add new row to table data array
    const newRow = { firstName, lastName, participants };
    setTableData([...tableData, newRow]);
    // Add new data to chart data array
    const newChartData = { name: firstName + ' ' + lastName, value: participants };
    setChartData([...chartData, newChartData]);
    // Clear input fields
    setFirstName('');
    setLastName('');
    setParticipants(0);
  };


    console.log(chartData[0])

    return (
        <div>
            <div className="form-container">
            <form className="main-form flex justify-evenly" onSubmit={handleSubmit}>
            <input type='text' placeholder='Firstname' value={firstName} onChange={(e) => setFirstName(e.target.value)} />

            <input type='text' placeholder='Lastname' value={lastName} onChange={(e) => setLastName(e.target.value)} />

            <input type='number' placeholder='Participants' value={participants} onChange={(e) => setParticipants(parseInt(e.target.value))} />

            <button type='submit'>Submit</button>
            </form>
        </div>

        

      <div className="container">
        <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Participants</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, index) => (
              <tr key={row.id}>
                <td>{row.firstname}</td>
                <td>{row.lastname}</td>
                <td>{row.participant}%</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="chart-data">
          <PieChart width={400} height={400}>
            <Legend />
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              labelLine={false}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </div>
        </div>
      </div>
        </div>
    );
  }