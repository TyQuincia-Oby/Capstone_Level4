

export default function Home({user, setUser, view, VIEWS}){
    return (
        <>
            <h2>WELCOME BACK TO THE SYSTEM {user.email}</h2>
            <br />
            <div className="transaction-display panel">
                <h3>TOTAL BALANCE ${user.balance}</h3>
            </div>
        </>
    )
}