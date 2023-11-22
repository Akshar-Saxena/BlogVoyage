import React from 'react'
import { useNavigate } from 'react-router-dom'


export default function PricingCard(props) {
  const navigate = useNavigate()
  return (
    <div className="pricing-card">
      <h2>{props.title}</h2>
      <p className="price">${props.price}/month</p>
      <ul className="features">
        {props.features.map((feature, index) => (
          <li key={index}>{feature}</li>
        ))}
      </ul>
      <button onClick={()=>navigate('/payment', {state: {
        itemName: props.title,
        price: props.price
      }})} className="subscribe-button">Subscribe</button>
    </div>
  )
}
