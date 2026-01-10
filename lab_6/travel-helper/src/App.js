import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import Item from "./pages/Item";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Success from "./pages/Success";

import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/item/:id" element={<Item />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/success" element={<Success />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
