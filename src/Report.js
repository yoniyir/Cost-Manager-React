import React, { useState } from 'react';
import ReportView from './ReportView';
import './Report.css';

function Report() {
    const [year, setYear] = useState('');
    const [month, setMonth] = useState('');
    const [validReport, setValidReport] = useState(false);

    const handleYearChange = (event) => {
        setYear(event.target.value);
        setValidReport(false);

    };

    const handleMonthChange = (event) => {
        setMonth(event.target.value);
        setValidReport(false);

    };

    const handleReport = () => {
        console.log(year, month);
        if (year === '' || month === '') {
            alert('Please select year and month');
        }
        else {
            setValidReport(true);
        }

    };

    return (
        <div className='reportCont animate__animated animate__fadeIn'>
            <div className='picks'>
               
                <select id='month' value={month} onChange={handleMonthChange}>
                    <option value=''> Select month </option>
                    <option value='1'>January</option>
                    <option value='2'>February</option>
                    <option value='3'>March</option>
                    <option value='4'>April</option>
                    <option value='5'>May</option>
                    <option value='6'>June</option>
                    <option value='7'>July</option>
                    <option value='8'>August</option>
                    <option value='9'>September</option>
                    <option value='10'>October</option>
                    <option value='11'>November</option>
                    <option value='12'>December</option>
                </select>
                <select id='year' value={year} onChange={handleYearChange}>
                    <option value=''> Select year </option>
                    <option value='2023'>2023</option>

                    <option value='2022'>2022</option>
                    <option value='2021'>2021</option>
                    <option value='2020'>2020</option>
                    <option value='2019'>2019</option>
                    <option value='2018'>2018</option>
                    <option value='2017'>2017</option>
                </select>
            </div>
            <button onClick={handleReport} className='button-50'>Generate Report</button>
            {validReport && <ReportView year={year} month={month} />}
        </div>
    );
}

export default Report;
