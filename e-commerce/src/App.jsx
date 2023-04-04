import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import{Header, Footer} from './components/index'
import { Home, Login, Register, Reset} from './pages/index'



function App() {
  
  return(
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/register" element={<Register />}/>
          <Route path="/reset" element={<Reset />}/>
          <Route path="/" element={<Home />}/>
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
