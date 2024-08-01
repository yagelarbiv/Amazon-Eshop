import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/homepage';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import ProductPage from './pages/productpage';
import Cart from './pages/cart';
import Shipping from './pages/shipping';
import Payment from './pages/payment';
import OrderSummaryPage from './pages/ordersummarypage';
import OrderPage from './pages/submitorderpage';
import SearchPage from './pages/searchpage';

function Router() {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/signin' element={<SignIn/>}/>
      <Route path='/signup' element={<SignUp/>}/>
      <Route path='/product/:token' element={<ProductPage />} />
      <Route path='/cart' element={<Cart />} />
      <Route path='/shipping' element={<Shipping />} />
      <Route path='/payment' element={<Payment />} />
      <Route path='/placeorder' element={<OrderSummaryPage />} />
      <Route path='/order/:id' element={<OrderPage />} />
      <Route path='/search' element={<SearchPage />} />
    </Routes>
  )
}

export default Router
