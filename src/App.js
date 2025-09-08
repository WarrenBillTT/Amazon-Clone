import './App.css';
import React, { useEffect } from 'react';
import Header from './Header';
import Home from './Home';
import Checkout from './Checkout';
import Login from './Login';
import Payment from './Payment';
import Orders from './Orders';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useStateValue } from './StateProvider';
import { auth } from './firebase';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

const promise = loadStripe("pk_test_51RySMhJqwDhX1W2bzVuWa3iP4msbawf9q08ZIRDLSJ7IKAmR7JvqshnFnyBIcrxgaeujCRRMqdVXNLYUWYV5tjwN00mAkZDmV9");

function App() {
  const [{}, dispatch] = useStateValue();

  useEffect(() => {
    auth.onAuthStateChanged(authUser => {
      console.log('THE USER IS >>> ', authUser);

      if(authUser){
        dispatch({
          type: 'SET_USER',
          user: authUser
        })
      }
      else{
        dispatch({
          type: 'SET_USER',
          user: null
        })
      }
    })
  }, [])

  return (
    // BEM
    <Router>
      <div className="app">
        <Routes>
          <Route path="/orders" element={
            <>
              <Header />
              <Orders />
            </>
          }/>
          <Route path="/login" element={
            <>
              <Login />
            </>
          }/>
          <Route path="/checkout" element={
            <>
              <Header />
              <Checkout />
            </>
          }/>
          <Route path="/payment" element={
            <>
              <Header />
              <Elements stripe={promise}>
                <Payment />
              </Elements>
            </>
          }/>
          <Route path="/" element={
            <>
              <Header />
              <Home />
            </>
          }/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
