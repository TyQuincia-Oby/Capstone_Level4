import { useState} from 'react'
import './App.css'
import TransDisplay from './assets/components/TransDisplay.jsx';
import Home from './assets/pages/home.jsx';
import Personal from './assets/pages/personal.jsx'
import Rewards from './assets/pages/rewards.jsx'
import { TransForm } from './assets/components/TransForm.jsx';
import { SignIn } from './assets/components/signInForm.jsx'
import Vault from './assets/pages/vault.jsx'
import supabase from './utils/supabase.js';



function App() {
    //variables for views
  const VIEWS = {
    HOME: "home",
    TRANSACTIONS: "transactions",
    PERSONAL: "personal",
    REWARDS: "rewards",
    VAULT: "vault"
  }
  
  const [view, setView] = useState("transactions")
  const [user, setUser] = useState(null);
  //variables for components to connect to views
  const pages = {
    [VIEWS.HOME]: <Home user={user} />,
    [VIEWS.TRANSACTIONS]: <TransDisplay />,
    [VIEWS.PERSONAL]: <Personal />,
    [VIEWS.REWARDS]: <Rewards />,
    [VIEWS.VAULT]: <Vault setView={setView} VIEWS={VIEWS} />
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

          {/* {view === VIEWS.TRANSACTIONS &&
            <div className="col">
              <button >NEW TRANSACTION ENTRY</button>
            </div>
          } */}

          
        </div>
         {/* <TransForm /> */}
         {/* Signin component controls what
         the user will see after signing in */}
         <SignIn user={user} view={view} setUser={setUser} VIEWS={VIEWS} setView={setView} />
      </div>
    </>
  )
}

export default App
