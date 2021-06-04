const express = require('express');
const cors= require('cors');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();
const stripe=require('stripe')('sk_test_51Iy7W8SA7oOTXMGwd6P3vsvUJL4UkkMavty97BsOtsgigItgikXJP9xAcxozaIuCBvlupCJLnpZ9YlNfghpJp7gu005h4sLnVL')

const app= express();

app.use(express.json());
app.use(cors());


// app.get('/', (req,res) => res.send('Running'));

app.post('/payment', (req,res) =>{
    console.log("body",req.body);
    // We are passing a product and a Token from the frontEnd, Token contains all the information in it
    // Anything You want to pass from frontend can be extracted by "req.body" 
    
    const{product, token}=req.body;
    // OR const product=req.body, const token=req.body

    console.log('Product',product);
    console.log('Price',product.price);
    // const idempotencyKey=uuidv4();

     stripe.customers.create({
        email:token.email,
        source:token.id
    })
    .then( (customer) => {
        stripe.charges.create({
            amount:product.price*100,
            currency:"inr",
            customer:customer.id,
            receipt_email:token.email,
            description:"First Payment",
            shipping:{
                name:token.card.name,
                address:{
                    line1:token.card.address_line1,
                    city:token.card.address_city,
                    postal_code:token.card.address_zip,
                    country:token.card.address_country
                }
            }
        })
    })
    .then((res)=>res.status(200).send(res))
    .catch((err)=>console.log(err));
})


app.listen(7000, ()=>console.log('Server is Ready'));