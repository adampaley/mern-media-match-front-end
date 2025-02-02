import { useState, useContext } from 'react'
import { useNavigate } from 'react-router'
import { UserContext } from '../../contexts/UserContext'
import { signUp } from '../../services/authService'

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    passwordConfirm: '',
  })
  const [message, setMessage] = useState('')
  const { setUser } = useContext(UserContext)
  const navigate = useNavigate()
  // const allowedCharacters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "_"]

  const { username, password, passwordConfirm } = formData

  const handleChange = (e) => {
    setMessage('')
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // if (username.includes(!allowedCharacters)) {
    //   setMessage('Invalid username')
    //   return
    // }

    try {
      const newUser = await signUp(formData)
      setUser(newUser)
      navigate('/')
    } catch (err) {
      setMessage(err.message)
    }
  }

  const isSignUpValid = () => {
    return !(username && password && password.length > 6 && password === passwordConfirm)
  }

  return (
    <>
      <h1>Sign Up</h1>
      <p style={{ color: "red" }}>{message}</p>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="name"
            name="username"
            value={username}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="confirm">Confirm Password:</label>
          <input
            type="password"
            id="confirm"
            name="passwordConfirm"
            value={passwordConfirm}
            onChange={handleChange}
            required
          />
        </div>
        <button disabled={isSignUpValid()}>Sign Up</button>
      </form>
    </>
  )
}

export default SignUpForm