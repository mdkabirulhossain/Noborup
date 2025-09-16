
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
import Navbar from './components/Navbar'
import Login from './pages/Login'
import Footer from './components/Footer'
import Search from './components/Search'
import { ToastContainer, toast } from 'react-toastify';
import Signup from './pages/Signup'

function App() {


  return (
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
      <ToastContainer />
      <Navbar />
      <Search />
      <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/collection' element={<Collection />}></Route>
          <Route path='/product/:productId' element={<Product />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/placeorder' element={<PlaceOrder />} />
          <Route path='/orders' element={<Orders />} />
          <Route path='/cart' element={<Cart />}/>
      </Routes>
      <Footer />
    </div>
  )
}

export default App
