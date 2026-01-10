import { useState} from 'react'
import './App.css'
import TransDisplay from './assets/components/TransDisplay.jsx';
import Home from './assets/pages/home.jsx';
import Personal from './assets/pages/personal.jsx'
import Rewards from './assets/pages/rewards.jsx'

  //variables for views
  const VIEWS = {
    HOME: "home",
    TRANSACTIONS: "transactions",
    PERSONAL: "personal",
    REWARDS: "rewards"
  }

function App() {

  const [view, setView] = useState("transactions")

  //variables for components to connect to views
  const pages = {
    [VIEWS.HOME]: <Home />,
    [VIEWS.TRANSACTIONS]: <TransDisplay />,
    [VIEWS.PERSONAL]: <Personal />,
    [VIEWS.REWARDS]: <Rewards />
  }
 
  return (
    <>
      <div>
        <div className='row'>
          <div className='col'>
            <h1 className='bank-title'>MTX Bank</h1>
          </div>

          <div className="col">
            <button onClick={() => setView(VIEWS.HOME)}>HOME</button>
            <button onClick={() => setView(VIEWS.TRANSACTIONS)}>TRANSACTIONS</button>
            <button onClick={() => setView(VIEWS.PERSONAL)}>PERSONAL</button>
            <button onClick={() => setView(VIEWS.REWARDS)}>REWARDS</button>
          </div>
        </div>

        <div className="display">
          {pages[view]}

          {view === VIEWS.TRANSACTIONS &&
            <div className="col">
              <button>NEW TRANSACTION ENTRY</button>
            </div>
          }
        </div>
      </div>
    </>
  )
}

export default App
