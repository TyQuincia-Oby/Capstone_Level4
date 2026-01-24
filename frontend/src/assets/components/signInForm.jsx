import {useState} from 'react'
import supabase from '../../utils/supabase';

export function SignIn({user, setUser, view, VIEWS}) {
    
    
    async function handleSignIn (e){
        //prevents page from constant reloading
        e.preventDefault();

        console.log(e);

        const email = e.target.elements.email.value;
        const password = e.target.elements.password.value;

        console.log(email, password);

        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        })

        setUser(data.user)
        console.log(data.user)

        if (!error ){
        console.log("SIGN IN SUCCESSFUL" )
        } else {
            console.log("Error: " 
                + error.message)
        }

        {view === VIEWS.HOME}
        
    }


    return (
        <div className="transaction-display panel">
            {VIEWS.HOME && user && <h4 style={{textAlign:"center"}}>WELCOME {user.email}</h4>

            }

            <h4 style={{textAlign:"center"}}>YOUR ACCOUNT AWAITS YOU</h4>
            <form onSubmit={handleSignIn}>
                <label htmlFor="email">ELECTRONIC MAIL
                    <input type="text" name="email" id="email" required />
                </label>

                <br />

                <label htmlFor="password" name="password">PASSWORD
                    <input type="password" name="password" id="password" required />
                </label>

                <br />

                <button type="submit">:: ++ ENTER ++ ::</button>
            </form>
        </div>
    )
}