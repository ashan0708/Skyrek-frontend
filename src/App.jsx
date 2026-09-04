import { Route, Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

import HomePage from './pages/homePage'
import LoginPage from './pages/loginPage'
import RegisterPage from './pages/registerPage'
import AdminPage from './pages/adminPage'
import TestPage from './pages/testPage'
import { GoogleOAuthProvider } from '@react-oauth/google';
import ForgetPassword from './pages/forgetPassword'

//943022892498-sjmdk84a57p9oalevoknnl5p9uf76f5g.apps.googleusercontent.com

export default function App() {
  return (
  <GoogleOAuthProvider clientId="943022892498-sjmdk84a57p9oalevoknnl5p9uf76f5g.apps.googleusercontent.com">
    <div className='w-full h-screen'>

      <Toaster position="top-right" />

      <Routes>
        <Route path="/admin/*" element={<AdminPage />} />
        <Route path="/signin" element={<LoginPage />} />
        <Route path="/signup" element={<RegisterPage />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        
        <Route path="/test" element={<TestPage />} />
        <Route path="/*" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        
      </Routes>

    </div>
  </GoogleOAuthProvider>
  )
}