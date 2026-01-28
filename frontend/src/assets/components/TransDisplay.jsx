//GET All Transactions & GET by ID

//****STILL HAVE TO ADD FUNCTION FOR GET BY ID */
import { useEffect, useState } from 'react'
import { TransForm } from './TransForm';
import {SignIn} from './signInForm'
import { toast } from 'react-toastify';

export default function TransDisplay({user, setUser, fetchTransactions}) {

  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [selectedTx, setSelectedTx] = useState(null);

    async function fetchTransactions() {
      try {
        setLoading(true)
        const result = await fetch("http://localhost:3000/api/data/transactions");
        if (!result.ok){
          throw new Error(`Response status ${result.status}`)
        }
        const data = await result.json();
        //give data back as a json response
        setTransactions(data);
        setHasError(false)//has no error
      } catch (error) {
        setHasError(true);
        setErrorMessage(error.message)
        console.log(error.message)
        console.error("TRANSACTION STREAM FAILURE", error) //error handling: transaction list GET failure (appears in console)
      } finally {
        setLoading(false) //turns off loading message when list of transactions appears
      }
    }
    useEffect(() => {
    fetchTransactions();
  }, []);

  function handleEdit(tx){
    setSelectedTx(tx); //store transaction behind edited
    setShowForm(true); //open modal
  }

  
  async function handleDelete(id) {
    const confirmDelete = window.confirm("Delete this transaction?");
    if (!confirmDelete) return;

    try {
        const res = await fetch(`http://localhost:3000/api/data/transactions/${id}`, {
        method: "DELETE",
        });

        if (!res.ok) throw new Error("Delete failed");

        await fetchTransactions(); // refresh list
        toast.success("TRANSACTION ERASED FROM THE LEDGER");
    } catch (err) {
        console.error(err);
        toast.error("DELETION BLOCKED BY SYSTEM ERROR ❌");
    }

      if (loading) {
    return (
      <div className="transaction-display panel">
        MTX BANK TRANSACTIONS LOADING…
      </div>
    );
  }
  console.log(loading, hasError)

  if (hasError) {

    return (
      <p>{errorMessage}</p>
    )
  }

  }

  return (
    <>
    <div className="row">
      <div className="transaction-display panel col">
        <h4 style={{ textAlign: "center" }}>
          REFERENCE ID || DATE || DESCRIPTION || DEPOSIT || WITHDRAWAL || BALANCE </h4>
        <div className="transaction-display2 panel">
          {transactions.map((tx) => (
            <div key={tx.id}>
              <p>
                <button className="update-icon"
                onClick={() =>{ 
                    handleEdit(tx);
                }}    
                >
                  ↻
                </button>
                ||
                {tx.trans_number}# || {tx.trans_date} || {tx.description} ||
                {tx.deposit ? `$${tx.deposit}` : "-"} ||
                {tx.withdrawal ? `$${tx.withdrawal}` : "-"} ||
                ${tx.balance} ||
                <button className="delete-icon"
                onClick={() =>{
                  handleDelete(tx.id)
                }
              }
                >✖</button>
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="col-2">
        {/* when button is clicked new transaction form will show*/}
        <button onClick={() => {setSelectedTx(null);setShowForm(true);}} >
          NEW TRANSACTION ENTRY
        </button>
      </div>
    </div>
              {showForm && (
              <TransForm
              tx={selectedTx} 
              onClose={() => {
                setShowForm(false); 
                setSelectedTx(null);
              }}  
                onTransactionAdded={fetchTransactions}
                />
             )} 
    </>
  );
} 