import { useState, useContext } from 'react'
import { useNavigate } from 'react-router'
import { UserContext } from '../../contexts/UserContext'
import { signIn } from '../../services/authService'

const SignInForm = () => {
  const [formData, setFormData] = useState({ username: '', password: '' })
  const [message, setMessage] = useState('')
  const { setUser } = useContext(UserContext)
  const navigate = useNavigate()
  const { username, password } = formData

  const handleChange = (e) => {
    setMessage('')
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const signedInUser = await signIn(formData)

      setUser(signedInUser)
      navigate('/')
    } catch (error) {
      setMessage(error.message)
    }
  }

  return (
    <>
    <h2>Sign In</h2>
    <p style={{ color: "red" }}>{message}</p>
    <form autoComplete="off" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          name="username"
          id="username"
          value={username}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Sign In</button>
    </form>
    </>
  )
}

export default SignInForm