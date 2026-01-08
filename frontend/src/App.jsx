import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <h1 className='bank-title'>MTX Bank</h1>
        <div className="display">
          <div className="transaction-display">Transactions will be here...</div>
        </div>
        
      </div>
    </>
  )
}

export default App
