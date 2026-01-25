import {useEffect} from "react";
import "/vault.css"; //vault has own css

export default function Vault({setView, VIEWS}){ 
    //after vault animation, page will navigate 
    // to home page automatically

    useEffect(() => {
        const timer = setTimeout(() => {
            setView(VIEWS.HOME); //navigate to home page 
            // after timer is up
        }, 2500);

        return () => clearTimeout(timer);
    }, [setView, VIEWS]); //after timer is done clear timer

    return (
        <div className="vault-screen">
            <div className="vault-door">
                <div className="vault-wheel"></div>
            </div>
            <h2 className="vault-text">ACCESS GRANTED</h2>
        </div>
    );
}