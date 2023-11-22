import React, { useEffect } from 'react'
import bcrypt from 'bcryptjs'
import { useNavigate } from 'react-router-dom'
import PricingCard from '../components/PricingCard'

export default function PricingPage() {
    const token = localStorage.getItem('token')
    const navigate = useNavigate()
    if(bcrypt.compareSync(import.meta.env.VITE_AUTH_TRUE, token)){
        return (
            <div>
                <button id='backButton' onClick={()=>navigate('/profile')}>{"<"}</button>
                <h1 className='heading-pricing'>Pricing</h1>
                <div className="pricingCardHolder">
                    <PricingCard title="Basic" price="Rs.99" features={['20 Blogs per Month', 'Length of words : 1000 words', 'Videos not supported']}/>
                    <PricingCard title="Super" price="Rs.199" features={['50 Blogs per Month', 'Length of words : 3000 words', '480p Video supported']}/>
                    <PricingCard title="Premium" price="Rs.399" features={['Unlimited Blogs per Month', 'Length of words : Unlimited words', '1080p Video supported']}/>
                </div>
            </div>
        )
    }
    useEffect(()=>{
        navigate('/login')
    })
}
