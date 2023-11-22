import './App.css'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import MiddleWare from './pages/MiddleWare'
import ProfilePage from './pages/ProfilePage'
import PricingPage from './pages/PricingPage'
import PaymentGateway from './pages/PaymentGateway'


function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/login" element={<LoginPage />} />
        <Route exact path="/signup" element={<SignupPage />} />
        <Route exact path="/m" element={<MiddleWare />} />
        <Route exact path="/profile" element={<ProfilePage />} />
        <Route exact path="/pricing" element={<PricingPage />} />
        <Route exact path="/payment" element={<PaymentGateway />} />
      </Routes>
    </Router>
  )
}

export default App
