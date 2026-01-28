import {useState} from 'react'
import supabase from '../../utils/supabase';




export function SignIn({user, setUser, setView, VIEWS}) {
    
    
    async function handleSignIn (e){
        //prevents page from constant reloading
        e.preventDefault();

        const email = e.target.elements.email.value;
        const password = e.target.elements.password.value;


        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        })

        if (!error ){
            setUser(data.user);//if no error log in user
            console.log(data.user);
            setView(VIEWS.VAULT);//navigate to vault screen
            console.log("SIGN IN SUCCESSFUL" )
        } else {
            console.log("Error: " 
                + error.message)
            return;
        }  
    }


    return (
        <div className="transaction-display panel" >

            <h2 style={{textAlign:"center"}}>YOUR ACCOUNT AWAITS YOU</h2>
            <p style={{textAlign:"center"}}>Identity verification required to proceed...</p>
            <div className="row mt-3 p-2 ">
                <div className="col-4 text-center">
                    <h4 style={{textAlign:"center"}}>DECRYPT & ENTER</h4>
                    <img src="/login-btn.jpeg" alt="shield" style={{height: "50%"}} />
                    <form onSubmit={handleSignIn}>

                            <label htmlFor="email" style={{textAlign:"center"}}>ELECTRONIC MAIL
                                <input type="text" name="email" id="email" placeholder='[ELECTRONIC MAIL]' className='form-control' required />
                            </label>

                        <br />

                            <label htmlFor="password" name="password" style={{textAlign:"center"}}>PASSWORD
                                <input type="password" name="password" id="password" placeholder='[PASSWORD]' className='form-control' required />
                            </label>

                        <br />

                        <button type="submit">:: ++ ACCESS ++ ::</button>
                    </form>
                </div>
                <div className="col text-center">
                    <h4 style={{textAlign:"center"}}>MTX APP FEATURES</h4>
                    <img src="/feature.jpeg" alt="lock" style={{height:"50%", margin:"auto"}} />
                    <ul className='p-5'>
                        <li>Protected by third-party encryption verification, your transactions move through a secure digital channel.</li>
                        <li>The system tracks, updates, and balances your records automatically.</li>
                        <li>Each entry receives a unique cryptic identity to prevent duplication, while giving you full control to add, edit, or remove data at will.</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}