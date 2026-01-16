//GET All Transactions & GET by ID

//****STILL HAVE TO ADD FUNCTION FOR GET BY ID */
import { useEffect, useState } from 'react'

export default function TransDisplay() {

  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false)
  const [errorMessage, setErrorMessage] = useState(false)

  useEffect(() => {
    async function fetchTransactions() {
      try {
        const result = await fetch("http://localhost:3000/api/data/transactions");
        if (!result.ok){
          throw new Error(`Response status ${result.status}`)
        }
        const data = await result.json();
        setTransactions(data);
        console.log(data)
      } catch (error) {
        setHasError(true);
        setErrorMessage(error.message)
        console.log(error.message)
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
  console.log(loading, hasError)

  if (hasError) {

    return (
      <p>{errorMessage}</p>
    )
  }

  return (
    <>
      <div className="transaction-display panel">
        <h4 style={{ textAlign: "center" }}>REFERENCE ID || DATE || DESCRIPTION || DEPOSIT || WITHDRAWAL || BALANCE </h4>
        <div className="transaction-display2 panel">
          {transactions.map((tx) => (
            <div key={tx.id}>
              <p>
                <button className="update-icon">↻</button> ||
                {tx.trans_number}# || {tx.trans_date} || {tx.description} ||
                {tx.deposit ? `$${tx.deposit}` : "-"} ||
                ${tx.withdrawal ? `$${tx.withdrawal}` : "-"} ||
                ${tx.balance} ||
                <button className="delete-icon">✖</button>
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}