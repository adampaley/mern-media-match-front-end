import './App.css'
import { Routes, Route, useLocation } from 'react-router'
import { useContext, useState, useEffect } from 'react'
import { UserContext } from './contexts/UserContext'
import Landing from './components/Landing/Landing'
import NavBar from './components/NavBar/NavBar'
import SignUpForm from './components/SignUpForm/SignUpForm'
import SignInForm from './components/SignInForm/SignInForm'
import ProductList from './components/ProductList/ProductList'
import UserHomePage from './components/UserHomePage/UserHomePage'
import { getEntireCart } from './services/cartService'

const App = () => {
  // hooks
  const { user } = useContext(UserContext)

  //state
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [cart, setCart] = useState([])
  const location = useLocation()
  

  // fetch cart data
  useEffect(() => {
    const fetchCart = async () => {
        try {
        const cartData = await getEntireCart(user._id)
        setCart(cartData.cart)
        } catch (err) {
        console.log('Error Fetching Cart', err)
        }
    }
    fetchCart()
},[location])

  return (
    <>
      <NavBar setIsDrawerOpen={setIsDrawerOpen} />
      <Routes>
        {user ? (
          <>
            <Route path='/' element={<UserHomePage/>} />
            <Route path='/cart' element={<ProductList productsList={cart} setProductsList={setCart}/>} />
            <Route path='/library' element={<ProductList  />} />
            <Route path='/settings' element={<UserHomePage
              isDrawerOpen={isDrawerOpen}
              setIsDrawerOpen={setIsDrawerOpen} />}
            />
          </>
        ) : (
          <>
            <Route path="/" element={<Landing />} />
            <Route path="/sign-up" element={<SignUpForm />} />
            <Route path="/sign-in" element={<SignInForm />} />
          </>
        )}
      </Routes>
    </>
  )
}

export default App