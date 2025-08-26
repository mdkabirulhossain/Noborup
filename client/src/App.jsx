
import { Route, Routes } from 'react-router'
import './App.css'
import Home from './pages/Home'
import Collection from './pages/Collection'
import About from './pages/About'
import Contact from './pages/Contact'
import Product from './pages/Product'
import PlaceOrder from './pages/PlaceOrder'
import Cart from './pages/Cart'
import Orders from './pages/Orders'


function App() {


  return (
    <>
      <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/collection' element={<Collection />}></Route>
          <Route path='/product/:productId' element={<Product />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/login' element={<Login />} />
          <Route path='/placeorder' element={<PlaceOrder />} />
          <Route path='/order' element={<Orders />} />
          <Route path='/cart' element={<Cart />}/>
      </Routes>
    </>
  )
}

export default App
