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
import logo from '../public/logo-1.jpeg'
import {ToastContainer} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"



function App() {
    //variables for views
  const VIEWS = {
    HOME: "home",
    TRANSACTIONS: "transactions",
    PERSONAL: "personal",
    REWARDS: "rewards",
    VAULT: "vault",
    SIGNIN: "signin"
  }
  
  const [view, setView] = useState("")
  const [user, setUser] = useState(null);
  //variables for components to connect to views
  const pages = {
    [VIEWS.HOME]: <Home user={user} />,
    [VIEWS.TRANSACTIONS]: <TransDisplay user={user} />,
    [VIEWS.PERSONAL]: <Personal user={user} />,
    [VIEWS.REWARDS]: <Rewards user={user} />,
    [VIEWS.VAULT]: <Vault setView={setView} VIEWS={VIEWS} />,
    
  }
 
  return (
    <>
      <div>
        <div className='row'>
          <div className='col'>
            <div className='bank-title'>
              <img src="/logo-1.jpeg" alt="mtx-logo" style={{height:"150px"}} />
            </div>
          </div>

          <div className="col">
            {/* <button onClick={() => setView(VIEWS.HOME)}>
              <img src="/mtx-logo2.jpeg" alt="letter-m" style={{height:"30px"}} />
              HOME
              </button> */}
            <button onClick={() => setView(VIEWS.TRANSACTIONS)}>
              <img src="/transaction-btn.jpeg" alt="moneybag" style={{height:"30px"}}/>
              TRANSACTIONS
            </button>
            <button onClick={() => setView(VIEWS.PERSONAL)}>
              <img src="/personal.jpeg" alt="comp" style={{height:"30px"}}/>
              PERSONAL
              </button>
            {/* <button onClick={() => setView(VIEWS.REWARDS)}>
              <img src="/reward.jpeg" alt="piggy-bank" style={{height:"30px"}}/>
              REWARDS
              </button> */}
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
         {/* <SignIn user={user} view={view} setUser={setUser} VIEWS={VIEWS} setView={setView} /> */}
          {/* Show SignIn ONLY if not logged in */}
          {!user && (
            <SignIn 
              setUser={setUser}
              setView={setView}
              VIEWS={VIEWS}
            />
          )}
      </div>
    </>
  )
}

export default App
