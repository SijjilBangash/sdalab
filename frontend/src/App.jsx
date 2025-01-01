import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Product from './pages/Product';
import Orders from './pages/Orders';
import Placeorder from './pages/Placeorder';
import Contact from './pages/Contact';
import Collection from './pages/Collection';
import About from './pages/About';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Footer from './components/Footer';
import SearchBar from './components/SearchBar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Verify from './pages/Verify';
import Wishlist from './pages/WishList';

const App = () => {
  return (
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
      <ToastContainer />
      <Navbar />
      <SearchBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/product/:productId" element={<Product />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/placeorder" element={<Placeorder />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/about" element={<About />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/wishlist" element={<Wishlist />}/>
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
