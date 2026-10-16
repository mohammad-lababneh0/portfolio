
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')
    const [savedUsername, setSavedUsername] = useState('')

    const navigate = useNavigate()

    useEffect(() => {
        const savedUser = localStorage.getItem('user')

        if (savedUser) {
            try {
                const user = JSON.parse(savedUser)
                setSavedUsername(user.fullName || '')
            } catch {
                setSavedUsername('')
            }
        }
    }, [])

    function handleSubmit(event) {
        event.preventDefault()

        if (!email || !password) {
            setMessage('Please enter your email and password.')
            return
        }

        const savedUser = localStorage.getItem('user')

        if (!savedUser) {
            setMessage('No account found. Please register first.')
            return
        }

        let user

        try {
            user = JSON.parse(savedUser)
        } catch {
            setMessage('Account data is invalid. Please register again.')
            return
        }

        if (!user || email !== user.email || password !== user.password) {
            setMessage('Incorrect email or password.')
            return
        }

        localStorage.setItem('loggedInUser', JSON.stringify(user))
        localStorage.setItem('isLoggedIn', 'true')

        navigate('/home')
    }


    function handleGuest() {
        localStorage.removeItem('isLoggedIn')
        localStorage.removeItem('loggedInUser')

        window.location.href = '/home'
    }


    return (
        <main className="login-container">
            <section className="login-card">
                <h1>Welcome Back</h1>

                {savedUsername && (
                    <p>Welcome, {savedUsername}!</p>
                )}

                <p>Login to your account</p>

                <form onSubmit={handleSubmit}>
                    <label htmlFor="email">
                        Email
                    </label>

                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        placeholder="Enter your email"
                        autoComplete="email"
                        required
                    />

                    <label htmlFor="password">
                        Password
                    </label>

                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        placeholder="Enter your password"
                        autoComplete="current-password"
                        required
                    />

                    <button type="submit">
                        Login
                    </button>
                </form>

                {message && (
                    <p className="login-message" role="alert">
                        {message}
                    </p>
                )}

                <p>
                    Don't have an account?{' '}
                    <Link to="/register">
                        Create Account
                    </Link>
                </p>

                <div className="guest-login">
                    <p>Just want to explore?</p>



                    <button
                        type="button"
                        onClick={() => navigate('/home')}
                    >
                        Continue as Guest
                    </button>


                </div>
            </section>
        </main>
    )
}

export default Login
