import {useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {setUser, setIsLoggedIn, setIsLoading} from '../../store/authSlice'
import axios from 'axios'

export default function LoginForm() {
    const [email, setEmail] = useState('elliot@neverneverland.com')
    const [password, setPassword] = useState('hashedpassword')
    const [error, setError] = useState(null)
    const dispatch = useDispatch()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post('/api/register', {email, password})
            console.log('Register response:', response)
            if (response.status === 200) {
                dispatch(setUser(response.data))
                dispatch(setIsLoggedIn(true))
                dispatch(setIsLoading(true))
            } else if (response.status === 409) {
                setError('User already exists')
            }
        } catch (error) {
            setError('Could not create account')
            console.error(error)
        }
    }

    return (
        <>
            <h2 className={'form-heading'}>Register</h2>
            <form className={'login-form'} onSubmit={handleSubmit}>
                <span className={'email input-container'}>
                    <label>Email</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="peter@neverneverland.com" />
                </span>
                <span className={'password input-container'}>
                    <label>Password</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                </span>
                <button type="submit">Create Account</button>
                {error && <p>{error}</p>}
            </form>
        </>
    )
}
