import {useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {setUser, setIsLoggedIn, setIsLoading} from '../../store/authSlice'
import axios from 'axios'
import {setModal} from '../../store/uiSlice'

export default function LoginForm() {
    const [email, setEmail] = useState('peter@neverneverland.com')
    const [password, setPassword] = useState('hashedpassword')
    const [error, setError] = useState(null)
    const dispatch = useDispatch()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post('/api/login', {email, password})
            console.log('Login response:', response)
            if (response.status === 200) {
                dispatch(setUser(response.data))
                dispatch(setIsLoggedIn(true))
                dispatch(setIsLoading(true))
            }
        } catch (error) {
            setError('Invalid email or password')
            console.error(error)
        }
    }

    const handleLaunchModal = (modalType) => () => {
        dispatch(setModal(modalType))
    }

    return (
        <>
            <h2 className={'form-heading'}>Login</h2>
            <form className={'login-form'} onSubmit={handleSubmit}>
                <span className={'email input-container'}>
                    <label>Email</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="peter@neverneverland.com" />
                </span>
                <span className={'password input-container'}>
                    <label>Password</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                </span>
                <span className={'grid grid-cols-2 gap-4'}>
                    <span className={'w-fit justify-self-end cursor-pointer'}>Forgot Password?</span>
                    <span className={'w-fit justify-self-start cursor-pointer'} onClick={handleLaunchModal('register')}>
                        Create Account
                    </span>
                </span>
                <button type="submit">Login</button>
                {error && <p>{error}</p>}
            </form>
        </>
    )
}
