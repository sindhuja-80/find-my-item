import React,{useState} from "react"
import axios from "axios"
import {useLocation,useNavigate} from "react-router-dom"
import { API_URL } from "../config"

const VerifyOTP = () => {

const [otp,setOtp] = useState("")
const [error, setError] = useState("")
const location = useLocation()
const navigate = useNavigate()
const email = location.state?.email

const handleVerify = async(e)=>{
    console.log("Sending to verify:", { email, otp });
e.preventDefault()

try{
const res = await axios.post(
`${API_URL}/api/users/verify-otp`,
{email,otp}
)


alert(res.data.message)

navigate("/login")

}catch(err){
setError(err.response?.data?.message || "Invalid OTP")
}

}

return (
  <div className="min-h-screen flex items-center justify-center bg-slate-50 relative overflow-hidden px-4">
    
    {/* Decorative Background Elements */}
    <div className="absolute top-20 -left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob"></div>
    <div className="absolute bottom-20 -right-20 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-2000"></div>

    <div className="bg-white/70 backdrop-blur-lg sm:p-10 p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-white/50 w-[90%] max-w-md relative z-10 transition-all duration-300">
      <h2 className='text-3xl font-black text-center mb-2 bg-gradient-to-r from-pink-600 to-indigo-600 bg-clip-text text-transparent'>
        Verify Email
      </h2>

      <p className='text-gray-500 text-center mb-8 font-medium'>
        We've sent a 6-digit code to <span className="font-bold text-gray-700">{email}</span>
      </p>

      <form className='flex flex-col gap-6' onSubmit={handleVerify}>
        
        {/* OTP Code */}
        <div className="flex flex-col gap-2">
          <label className="text-sm text-gray-700 font-bold ml-1">
            Verification Code
          </label>
          <input
            type="text"
            placeholder="Enter 6-digit OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full p-3.5 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-indigo-400 focus:border-transparent focus:outline-none placeholder:text-gray-400 text-gray-800 bg-white/50 backdrop-blur-sm transition-all shadow-sm tracking-widest text-center text-lg font-bold"
            maxLength={6}
          />
        </div>

        {error && (
          <p className='text-red-500 text-sm font-semibold text-center mt-1 bg-red-50 p-2 rounded-lg border border-red-100'>
            {error}
          </p>
        )}

        <button
          type='submit'
          className='w-full bg-gradient-to-r from-pink-500 to-indigo-600 text-white p-4 rounded-2xl hover:shadow-[0_8px_20px_rgba(99,102,241,0.3)] hover:-translate-y-0.5 active:scale-95 transition-all duration-200 font-bold text-lg mt-2'
        >
          Confirm OTP
        </button>

      </form>

      <p className='text-center text-gray-600 font-medium mt-8'>
        Didn't receive the code?
        <span className='font-bold text-indigo-600 cursor-pointer hover:text-indigo-800 ml-2 transition-colors' onClick={() => navigate("/register")}>
          Resend Error? Back to Signup
        </span>
      </p>

    </div>
  </div>
)

}

export default VerifyOTP