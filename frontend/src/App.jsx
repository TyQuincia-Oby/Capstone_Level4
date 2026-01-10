import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTransactions(){
      try{
      const result = await fetch("http://localhost:3000/api/data/transactions");
      const data = await result.json();
      setTransactions(data);
    } catch (error){
      console.error("TRANSACTION STREAM FAILURE", error) //error handling: transaction list GET failure (appears in console)
    } finally {
      setLoading(false) //turns off loading message when list of transactions appears
    }
  }
    fetchTransactions();
  }, []);

 if (loading) {
  return (
    <div className="transaction-display panel">
      MTX BANK TRANSACTIONS LOADING…
    </div>
  );
}


  return (
    <>
      <div>
        <div className='row'>
          <div className='col'>
            <h1 className='bank-title'>MTX Bank</h1>
          </div>
          <div className="col">
            <button>HOME</button>
            <button onClick={() => window.location.reload()}>TRANSACTIONS</button>
            <button>PERSONAL</button>
            <button>REWARDS</button>
          </div>
        </div>
        <div className="display">
          <div className="transaction-display panel">
            <h4 style={{textAlign: "center"}}>REFERENCE ID || DATE || DESCRIPTION || DEPOSIT || WITHDRAWAL || BALANCE </h4>
            <div className="transaction-display2 panel">
              {transactions.map((tx) => (
              <div key = {tx.id}> 
              <p><span className="update-icon">↻</span> || {tx.trans_number}# || {tx.trans_date} || {tx.description} || ${tx.deposit} || ${tx.withdrawal} || ${tx.balance} || <span className="delete-icon">X</span>
</p>
              </div>
              ))}
            </div>
          </div>
            <div className="col"><button>NEW TRANSACTION ENTRY</button></div>
        </div>
      </div>
    </>
  )
}

export default App
