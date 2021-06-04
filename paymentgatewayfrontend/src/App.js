import React,{useState} from 'react'
import logo from './logo.svg';
import './App.css';
import StripeCheckout from 'react-stripe-checkout';

require('dotenv').config();


function App() {

  const[product, setProduct]= useState({name:"ipod", price: 100, company:"apple"});

  const makePayment=(token)=>{
   const body={
     token,
     product
   };
   const headers={
     "Content-Type":"application/json"
   }
   return fetch('http://localhost:7000/payment',{
     method:'POST',
     headers,
     body:JSON.stringify(body)
   }).then(res=>{
     const {status}=res        //      OR const status=res.status;
     console.log('STATUS',status);
   }).catch(err=>console.log(err));
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      
        <a
          className="App-link"
          href="#"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <StripeCheckout
        token={makePayment}   // It is another way to call a function "makePayment" which is defined above
        stripeKey='pk_test_51Iy7W8SA7oOTXMGw8T5JGJc46YlmqW3Uy2OO3gSyMgjuHps5yohEQkwCdgizMsQxPEwHxAkICFP7fPvnpQnov6RF00iiFEQo8b'
        amount={product.price * 100}
        name="Buy React"
        shippingAddress
      />
      </header>
    </div>
  );
}

export default App;
