import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import './ReportView.css';
import LocalStorage from './LocalStorage';

ChartJS.register(ArcElement, Tooltip, Legend);

function ReportView(props) {
  const { year, month } = props;
  const [costs, setCosts] = useState([]);
  const [flag, setFlag] = useState(false);
  const [popUp, setPopUp] = useState(false);

  useEffect(() => {
    // retrieve the data from local storage with the class LocalStorage
    LocalStorage.getItem('costs').then((data) => {

    if (data) {
      // set it to the state only with same year and month
      const costs = JSON.parse(data).filter(cost => cost.year == year && cost.month == month);
      if (costs.length > 0) {
        setFlag(true);
      }
      // calculate the total sum for each category
      const food = costs.filter(cost => cost.category == 'food').reduce((sum, cost) => sum + cost.sum, 0);
      const health = costs.filter(cost => cost.category == 'health').reduce((sum, cost) => sum + cost.sum, 0);
      const housing = costs.filter(cost => cost.category == 'housing').reduce((sum, cost) => sum + cost.sum, 0);
      const sport = costs.filter(cost => cost.category == 'sport').reduce((sum, cost) => sum + cost.sum, 0);
      const education = costs.filter(cost => cost.category == 'education').reduce((sum, cost) => sum + cost.sum, 0);
      const transportation = costs.filter(cost => cost.category == 'transportation').reduce((sum, cost) => sum + cost.sum, 0);
      const other = costs.filter(cost => cost.category == 'other').reduce((sum, cost) => sum + cost.sum, 0);

      setCosts([food, health, housing, sport, education, transportation, other].map(cost => parseFloat(cost)));
    } else {
      // if no data, set the state to an empty array
      setCosts([]);
      setFlag(false);
    }
  }).catch
  (err => console.log(err));
}, []);

  function mapMonth(month) {

    // map month to the month name based on the month number
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return months[month-1];
  }

  const data = {
    labels: ['Food', 'Health', 'Housing', 'Sport', 'Education', 'Transportation', 'Other'],
    datasets: [
      {
        data: costs,
        backgroundColor: [
          '#FF9E9E',
          '#96C5F5',
          '#FFFF92',
          '#96F5F5',
          '#F57C7C',
          '#81C784',
          '#9E96FF'
        ],
        hoverBackgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#00b8d4',
          '#e53935',
          '#43A047',
          '#6200EE',
        ],
      },
    ],
  };


  function showCosts() {
    // retrieve the data from local storage
    const data = localStorage.getItem('costs');

    if (data) {
      // set it to the state only with same year and month
      let costs = JSON.parse(data).filter(cost => cost.year == year && cost.month == month);

      // sort the costs by day 
      costs = costs.sort((a, b) => a.day - b.day);

      if (costs.length > 0) {
        return costs.map(cost => <tr className='cost'>
          <td>{cost.day}.{cost.month}.{cost.year}</td>
          <td>{cost.category}</td>
          <td>{cost.description}</td>
          <td>{cost.sum}</td>
        </tr>)
      }}
  }

  return (
    <div className='viewCont animate__animated animate__fadeIn'>
      <p>Showing Report for {mapMonth(parseInt(month))}, {year}</p>
      {!flag && <div>No costs in {mapMonth(parseInt(month))}, {year}</div>}
      {flag && <div>
        <Pie data={data}
          options={{
            plugins: {
              legend: {
                position: 'bottom',
              },
              title: {
                display: true,
                text: 'Costs by Category',
              },
            },
          }}
        />
        <table>
          <thead>
            <tr>
              <th>Category</th>
              <th>Sum</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Food</td>
              <td>{costs[0]}</td>
            </tr>
            <tr>
              <td>Health</td>
              <td>{costs[1]}</td>
            </tr>
            <tr>
              <td>Housing</td>
              <td>{costs[2]}</td>
            </tr>
            <tr>
              <td>Sport</td>
              <td>{costs[3]}</td>
            </tr>
            <tr>
              <td>Education</td>
              <td>{costs[4]}</td>
            </tr>
            <tr>
              <td>Transportation</td>
              <td>{costs[5]}</td>
            </tr>
            <tr>
              <td>Other</td>
              <td>{costs[6]}</td>
            </tr>
          </tbody>
        </table>

        <button className='btn-full-costs button-39' onClick={setPopUp}>View full costs of {mapMonth(parseInt(month))}, {year}</button>
        {popUp && <div className='popUp animate__animated animate__fadeIn'>
          
          <h4>Showing full costs of {mapMonth(parseInt(month))}</h4>
      <label>Sorted by date</label>

          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Category</th>
                <th>Description</th>
                <th>Sum</th>
              </tr>
            </thead>
            <tbody>
          {showCosts()}
            </tbody>
          </table>
        <button className='closePopup' onClick={() => setPopUp(false)}>x</button>
        </div>}
      </div>}
    </div>
  );
}

export default ReportView;