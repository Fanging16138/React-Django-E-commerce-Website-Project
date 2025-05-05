import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css'
import Home from './Pages/Home'
import Product from './Pages/Product'
import Detail from './Pages/Detail'
import Cart from './Pages/Cart'
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/products" element={<Product />} />
        <Route path="/products/:id" element={<Detail />} /> {/*在这里的路由套用Detail组件*/}
        <Route path="/cart" element={<Cart />} />
        <Route path="/" element={<Navigate to="/home" />} />
      </Routes>
    </Router>
  )
}

export default App
