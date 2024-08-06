import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import {ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

//components
import{Header, Footer} from './components/index'

// pages
import { Home, Login, Register, Reset, Admin} from './pages/index'
import AdminOnlyRoute from "./components/adminOnlyRoute/AdminOnlyRoute";
import ProductDetails from './components/product/productDetails/ProductDetails';
import Cart from './pages/cart/Cart'
import Checkout from './pages/checkout/Checkout'
import CheckoutDetails from './pages/checkout/CheckoutDetails'
import CheckoutSuccess from './pages/checkout/CheckoutSuccess'
import OrderHistory from './pages/orderHistory/OrderHistory'
import OrderDetails from './pages/orderdetails/OrderDetails'
import ReviewProducts from './components/reviewProducts/ReviewProduct'
import NotFound from './pages/notFound/NotFound'




function App() {
  
  return(
    <>
      <BrowserRouter>
       <ToastContainer />
        <Header />
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/register" element={<Register />}/>
          <Route path="/reset" element={<Reset />}/>
          <Route path="/" element={<Home />}/>

        {/* Admin route will be added here */}
        <Route
            path="/admin/*"
            element={
              <AdminOnlyRoute>
                <Admin />
              </AdminOnlyRoute>
            }
          />

          <Route path="/product-details/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout-details" element={<CheckoutDetails />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/checkout-success" element={<CheckoutSuccess />} />
          <Route path="/order-history" element={<OrderHistory />} />
          <Route path="/order-details/:id" element={<OrderDetails />} />
          <Route path="/review-product/:id" element={<ReviewProducts />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
