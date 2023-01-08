import React, { useState } from 'react';
import './Cost.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function CostForm() {
    const [date, setDate] = useState(null);
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [sum, setSum] = useState('');
    const [text_msg, setText_msg] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        // if no date selected, set to today
        let today = new Date();

        if (date === null) {
            setDate(today);
        }
        const formData = {
            year: date.getFullYear(),
            month: date.getMonth() + 1,
            day: date.getDate(),
            description: description,
            category: category,
            sum: parseFloat(sum)
        };

        // check if all fields are filled
        if (description === '' || category === '' || sum === '' || date === null) {
            let str = `All fields are required `;
            setText_msg(str);
            // add class to text
            document.querySelector('.text').classList.add('error');
            document.querySelector('.text').classList.remove('success');
            return;
        }

        // append to localstorage array of objects (costs)
        const costs = JSON.parse(localStorage.getItem('costs')) || [];
        costs.push(formData);
        localStorage.setItem('costs', JSON.stringify(costs));

        setText_msg('Cost added successfully');
        // add class to text
        document.querySelector('.text').classList.add('success');
        document.querySelector('.text').classList.remove('error');
        // clear form
        setDate(null);
        setDescription('');
        setCategory('');
        setSum('');
    };

    return (
        <div className='wrapper animate__animated animate__fadeIn'>
            <form className='add-cost-form' onSubmit={handleSubmit}>
                <label htmlFor='date'>Date:</label>
                <DatePicker
                    selected={date}
                    onChange={setDate}
                    id='date'
                    dateFormat='dd/MM/yyyy'
                    placeholderText='dd/mm/yyyy'
                />
                <label htmlFor='description'>Description:</label>
                <input
                    type='text'
                    id='description'
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                    placeholder='Description of the cost'
                />
                <label htmlFor='category'>Category:</label>
                <select
                    id='category'
                    value={category}
                    onChange={(event) => setCategory(event.target.value)}
                >
                    <option value=''>-- Select category --</option>
                    <option value='food'>Food</option>
                    <option value='health'>Health</option>
                    <option value='housing'>Housing</option>
                    <option value='sport'>Sport</option>
                    <option value='education'>Education</option>
                    <option value='transportation'>Transportation</option>
                    <option value='other'>Other</option>
                </select>
                <label htmlFor='sum'>Sum:</label>
                <input
                    type='number'
                    id='sum'
                    value={sum}
                    onChange={(event) => setSum(event.target.value)}
                    placeholder='Sum of the cost'
                />
                <button className='button-50' type='submit'>
                    Add Cost
                </button>
            </form>
            <p className='text'>{text_msg}</p>
        </div>
    );
}

export default CostForm;
