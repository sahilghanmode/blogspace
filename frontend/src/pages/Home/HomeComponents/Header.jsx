import React, { useState } from 'react';
import { Search, Edit3, Bell, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SignupSignIn from './SignupSignIn';
import OTPvalidation from './OTPvalidation';

export default function Header() {

  const navigate=useNavigate()

  const [showSignupSignInModal, setShowSignupSignInModal]=useState(false)
  const [isAuthenticated,setIsAuthenticated]=useState(false)
  const [mode,setMode]=useState('signin')
  const [optvalidation,setOtpvalidation]=useState(false)
  const [formData,setFormData]=useState({
    username:"",
    email:"sahilghanmode1903@gmail.com",
    password:"",
    confirmPassword:""
  })

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left side - Logo and Navigation */}
          <div className="flex items-center space-x-8">
            <div className="flex items-center cursor-pointer" onClick={()=>navigate('/')}>
              <h1 className="text-2xl font-bold text-black">BlogSpace</h1>
            </div>
            <nav className="hidden md:flex space-x-6">
              <a href="#" className="text-gray-600 hover:text-black transition-colors">Following</a>
              <a href="#" className="text-gray-600 hover:text-black transition-colors">Topics</a>
            </nav>
          </div>

          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search Medium"
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button className="hidden md:flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-full transition-colors cursor-pointer">
              <Edit3 className="w-4 h-4" />
              <span>Write</span>
            </button>
            
            {isAuthenticated ?
            <div>
              <button className="p-2 text-gray-600 hover:text-black transition-colors cursor-pointer">
                <Bell className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-600 hover:text-black transition-colors cursor-pointer">
                <User className="w-5 h-5" />
              </button> 
            </div> 
            : 
            <div className='flex flex-col-2'>
              <button className='text-gray-600 hover:text-black transition-colors cursor-pointer font-medium hover:underline' onClick={()=>{
                setMode('signup')
                setShowSignupSignInModal(true)
              }}>
                SignUp/
              </button>
              <button className='text-gray-600 hover:text-black transition-colors font-medium pl-0.5 cursor-pointer hover:underline' onClick={()=>{
                setMode('signin')
                setShowSignupSignInModal(true)
              }}>
                login
              </button>
            </div> }

            <SignupSignIn 
              isOpen={showSignupSignInModal}
              onClose={()=>setShowSignupSignInModal(false)}
              mode={mode}
              setMode={setMode}
              setOtpvalidation={setOtpvalidation}
              formData={formData}
              setFormData={setFormData}
            />

            <OTPvalidation 
              isOpen={optvalidation}
              onClose={()=>setOtpvalidation(false)}
              formData={formData}
            />
            
          </div>
        </div>
      </div>
    </header>
  );
}