import { React, useState, useEffect } from 'react';
import { PieChart, Pie, Cell, Legend } from 'recharts';

import '../App.css'

export default function Datapage({data}) {
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [participant, setparticipant] = useState(0);
  const [tableData, setTableData] = useState([]);
  const [chartData, setChartData] = useState([])  

  useEffect(() => {
    // Fetch data from API
    fetch('/api/user-list/')
      .then(response => response.json())
      .then(data => {
        // Map data to table and chart formats
        const tableRows = data.map(({ firstname, lastname, participant }) => ({
          firstname,
          lastname,
          participant
        }));

        const chartData = data.map(({ firstname, lastname, participant }) => ({
          name: `${firstname} ${lastname}`,
          value: participant
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
    const newRow = { firstname, lastname, participant };
    setTableData([...tableData, newRow]);
    // Add new data to chart data array
    const newChartData = { name: firstname + ' ' + lastname, value: participant };
    setChartData([...chartData, newChartData]);
    // Clear input fields
    setFirstName('');
    setLastName('');
    setparticipant(0);
  };


    console.log(chartData)

    return (
        <div>
            <div className="form-container">
            <form className="main-form flex justify-evenly" onSubmit={handleSubmit}>
            <input type='text' placeholder='Firstname' value={firstname} onChange={(e) => setFirstName(e.target.value)} />

            <input type='text' placeholder='Lastname' value={lastname} onChange={(e) => setLastName(e.target.value)} />

            <input type='number' placeholder='participant' value={participant} onChange={(e) => setparticipant(parseInt(e.target.value))} />

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
              <th>participant</th>
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
        {chartData.length > 0 && (
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
        )}
        </div>
      </div>
        </div>
    );
  }