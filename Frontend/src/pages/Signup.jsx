import React, { useState } from 'react'
import axios from "axios"
import { FaEyeSlash,FaEye } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { API_URL } from "../config"

const Signup = () => {
  const [name,setName]=useState("")
  const [email,setEmail]=useState("")
  const [phone,setPhone]=useState("")
  const [password,setPassword]=useState("")
  const [confirmPassword,setConfirmPassword]=useState("")
  const [showPassword,setShowPassword]=useState(false)
  const [showConfirmPassword,setShowConfirmPassword]=useState(false)
  const [error,setError]=useState("")
  const navigate=useNavigate()

  const handleSignup =async (e)=>{
    e.preventDefault()
    setError("")

     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
     const phoneRegex = /^[0-9]{10}$/

    if(!name || !email || !phone || !password){
      setError("All fields are required")
      return
    }
    if(password !== confirmPassword){
      setError("Passwords do not match")
      return
    }
    if(password.length<8){
      setError("Password must be atleast 6 characters")
      return
    }
     if(!emailRegex.test(email)){
    setError("Please enter a valid email address")
    return
  }
   if(!phoneRegex.test(phone)){
    setError("Phone number must be 10 digits")
    return
  }

    try{
      const res=await axios.post(`${API_URL}/api/users/register`,{name,email,phone,password})
      if(res.data.success){
        alert("Registered successfully")
        navigate("/login")
      }
    }catch(err){
      console.log(err)
      setError(err.response?.data?.message || err.message || "Signup Failed")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 relative overflow-hidden px-4 py-12">
      
      {/* Decorative Background Elements */}
      <div className="absolute top-10 -left-10 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob"></div>
      <div className="absolute bottom-10 -right-10 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-2000"></div>

      <div className="bg-white/70 backdrop-blur-lg sm:p-10 p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-white/50 w-full max-w-md relative z-10 transition-all duration-300 mt-8 mb-8">

        <h2 className='text-3xl font-black text-center mb-2 bg-gradient-to-r from-pink-600 to-indigo-600 bg-clip-text text-transparent'>
          Create Account
        </h2>

        <p className='text-gray-500 text-center mb-8 font-medium'>
          Join FindMyItem community today
        </p>

        <form className='flex flex-col gap-5' onSubmit={handleSignup}>

          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-700 font-bold ml-1">Full Name</label>
            <input
              type='text'
              placeholder='John Doe'
              className='w-full p-3.5 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-indigo-400 focus:border-transparent focus:outline-none placeholder:text-gray-400 text-gray-800 bg-white/50 backdrop-blur-sm transition-all shadow-sm'
              value={name}
              onChange={(e)=>setName(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-700 font-bold ml-1">Email Address</label>
            <input
              type='email'
              placeholder='name@example.com'
              className='w-full p-3.5 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-indigo-400 focus:border-transparent focus:outline-none placeholder:text-gray-400 text-gray-800 bg-white/50 backdrop-blur-sm transition-all shadow-sm'
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-700 font-bold ml-1">Phone Number</label>
            <input
              type='tel'
              placeholder='10-digit number'
              className='w-full p-3.5 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-indigo-400 focus:border-transparent focus:outline-none placeholder:text-gray-400 text-gray-800 bg-white/50 backdrop-blur-sm transition-all shadow-sm'
              value={phone}
              onChange={(e)=>setPhone(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-700 font-bold ml-1">Password</label>

            <div className='relative rounded-2xl bg-white/50 backdrop-blur-sm border border-gray-200 focus-within:ring-2 focus-within:ring-indigo-400 focus-within:border-transparent transition-all shadow-sm'>
              <input
                type={showPassword ? "text" :"password"}
                placeholder='Create a password'
                className='w-full p-3.5 focus:outline-none text-gray-800 placeholder:text-gray-400 rounded-2xl bg-transparent'
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
              />

              <span
                className='absolute right-4 top-4 cursor-pointer text-gray-400 hover:text-indigo-500 transition-colors'
                onClick={()=>setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-700 font-bold ml-1">Confirm Password</label>

            <div className='relative rounded-2xl bg-white/50 backdrop-blur-sm border border-gray-200 focus-within:ring-2 focus-within:ring-indigo-400 focus-within:border-transparent transition-all shadow-sm'>
              <input
                type={showConfirmPassword ? "text" :"password"}
                placeholder='Confirm your password'
                className='w-full p-3.5 focus:outline-none text-gray-800 placeholder:text-gray-400 rounded-2xl bg-transparent'
                value={confirmPassword}
                onChange={(e)=>setConfirmPassword(e.target.value)}
              />

              <span
                className='absolute right-4 top-4 cursor-pointer text-gray-400 hover:text-indigo-500 transition-colors'
                onClick={()=>setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>

          {error && (
            <p className='text-red-500 text-sm font-semibold text-center mt-2 bg-red-50 p-2 rounded-lg border border-red-100'>
              {error}
            </p>
          )}

          <button
            type='submit'
            className='w-full bg-gradient-to-r from-pink-500 to-indigo-600 text-white p-4 rounded-2xl hover:shadow-[0_8px_20px_rgba(99,102,241,0.3)] hover:-translate-y-0.5 active:scale-95 transition-all duration-200 font-bold text-lg mt-4'
          >
            Sign Up
          </button>

        </form>

        <p className='text-center text-gray-600 font-medium mt-8'>
          Already have an Account?
          <span className='font-bold text-indigo-600 cursor-pointer hover:text-indigo-800 ml-2 transition-colors' onClick={()=>navigate("/login")}>
            Sign In
          </span>
        </p>

      </div>
    </div>
  )
}

export default Signup