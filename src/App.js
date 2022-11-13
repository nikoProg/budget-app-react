import logo from './logo.svg';
import './App.css';

import { useEffect, useState } from "react";


function App() {
  const [incomeOrExpense, setIncomeOrExpense] = useState('-');
  const [title, setTitle] = useState(``);
  const [money, setMoney] = useState(0);
  const [sign, setSign] = useState('+');
  const [budget, setBudget] = useState(0);
  const [listOfIncome, setListOfIncome] = useState(null);
  const [listOfExpenses, setListOfExpenses] = useState(null);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);

  useEffect(() => {
    let totalIncome, totalExpenses;
    fetch('http://localhost:3100/data')
      .then(res => {
        if(!res.ok) {
            throw Error('could not fetch the data for that resource');
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setListOfIncome(data.filter((el) => el.type === "income"));
        setListOfExpenses(data.filter((el) => el.type === "expense"));
        
        //setTotalIncome(totalIncome=(data.listOfIncome.map(item => item.money).reduce((acc, amount) => acc + amount)));
        //setTotalExpenses(totalExpenses=(data.listOfExpenses.map(item => item.money).reduce((acc, amount) => acc + amount)));
        //setBudget(totalIncome - totalExpenses);
        
        //setIsPending(false);//important, while the data is here, we want this to hide!
        //setError(null);
      });
  }, []);

  
  const handleSubmit = (e) => {
    //e.preventDefault();//important to prevent the page from refreshing when submitting form
    const item = { title, money };
    console.log(item);

    //setIsPending(true);

    fetch('http://localhost:3100/data', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item)
    }).then(() => {
        console.log('new item added');
        //setIsPending(false);
        //history.go(-1);
        //history.push('/');//this pushes you to the main page after making a item
    })
   
  }

  return (
    <div className="App">
      <div className='header'>
        <h2>Available budget in <span>November 2022</span></h2>
        <h1>{sign} {budget}</h1>
        {/* <p>INCOME {listOfIncome.map(item => item.money).reduce((acc, amount) => acc + amount)}</p>
        <p>EXPENSES {listOfExpenses.map(item => item.money).reduce((acc, amount) => acc + amount)}</p> */}
      </div>
      <form className='form' onSubmit={handleSubmit}>
        <select
          value={incomeOrExpense}
          onChange={(e) => setIncomeOrExpense(e.target.value)}
        >
          <option value="-">-</option>
          <option value="+">+</option>
        </select>
        <input
          type="text"
          required
          value={title}
          maxLength="50"
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="number"
          required
          value={money}
          onChange={(e) => setMoney(e.target.value)}
        />
        <button>Submit</button>
      </form>
      <div className='list-display'>
        <div className='income-list'>
          <h3>INCOME</h3>
          {listOfIncome && listOfIncome.map((item) => (
            <div className="income-item" key={item.id}>
              <h3>{item.title}</h3>
              <p>+{item.money}</p>
              {/* <button onClick={() => handleDelete(item.id)}>delete item</button> */}
            </div>
          ))}
        </div>
        <div className='expenses-list'>
          <h3>EXPENSES</h3>
          {listOfExpenses && listOfExpenses.map((item) => (
            <div className="expenses-item" key={item.id}>
              <h3>{item.title}</h3>
              <p>-{item.money}</p>
              {/* <button onClick={() => handleDelete(item.id)}>delete item</button> */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
