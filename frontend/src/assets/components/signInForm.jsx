export function SignIn() {
    return (
        <div className="transaction-display panel">
            <h4 style={{textAlign:"center"}}>YOUR ACCOUNT AWAITS YOU</h4>
            <form>
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