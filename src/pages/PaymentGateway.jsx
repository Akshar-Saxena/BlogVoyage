import React, { useEffect } from 'react'
import bcrypt from 'bcryptjs'
import { useLocation, useNavigate } from 'react-router-dom'

export default function PaymentGateway() {
    const token = localStorage.getItem('token')
    const navigate = useNavigate()
    const location = useLocation()  
    if(bcrypt.compareSync(import.meta.env.VITE_AUTH_TRUE, token)){
        return (
            <>
            <h1 className='headingPayment'>Payment Gateway</h1>
            <div className='productDetails'>
                <h3>Product: {location.state.itemName}</h3>
                <p>Price: {location.state.price}</p>
                <div className="paymentModes">
                    <button className='paymentModesButton'>Pay with UPI <img src="./upi.png" alt="" /></button>
                    <button className='paymentModesButton'>Pay with Credit Card <img src="./card.png" alt="" /></button>
                    <button className='paymentModesButton'>Pay with Net Banking</button>
                </div>
            </div>
            </>
        )
    }
    else{
        useEffect(()=>{
            navigate("/login")
        })
    }
}
