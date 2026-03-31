import React, { useEffect, useState } from 'react'
import { FaUser, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaSignOutAlt, FaTrashAlt } from 'react-icons/fa'
import axios from 'axios'
import { API_URL } from "../config"

const Profile = () => {
  const [user, setUser] = useState(null)
  const [items, setItems] = useState([])

  useEffect(()=>{
    const storedUser = JSON.parse(localStorage.getItem("user"))
    setUser(storedUser)
    if(storedUser) fetchUserItems(storedUser._id)
  },[])

  const fetchUserItems = async (userId) => {
    try{
      const res = await axios.get(`${API_URL}/api/items/user/${userId}`)
      setItems(res.data)
    }catch(err){
      console.log(err)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("user")
    localStorage.removeItem("token")
    window.location.href="/login"
  }

  const handleDelete = async (id) => {
    try{
      await axios.delete(`${API_URL}/api/items/${id}`)
      setItems(items.filter(item => item._id !== id))
    }catch(error){
      console.log(error)
    }
  }

  if(!user) return (
    <div className="min-h-screen flex justify-center items-center bg-slate-50">
      <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-indigo-600"></div>
    </div>
  )

  return (
    <div className='min-h-full bg-slate-50 px-4 md:px-8 py-10 flex flex-col pb-24 font-sans'>
      <div className="max-w-6xl mx-auto w-full flex-grow flex flex-col items-center">
        
        <div className='bg-white border border-slate-200 shadow-sm rounded-3xl p-8 mb-12 w-full max-w-3xl flex flex-col md:flex-row items-center gap-8'>
          <div className="w-24 h-24 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-500 shrink-0">
            <FaUser className='w-10 h-10' />
          </div>
          
          <div className="text-center md:text-left flex-grow">
            <h2 className='text-2xl md:text-3xl font-bold text-slate-900 mb-2'>{user.name}</h2>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-6 text-sm text-slate-600">
              <div className="flex items-center gap-2"><FaEnvelope className="text-indigo-400" /> <span>{user.email}</span></div>
              <div className="flex items-center gap-2"><FaPhoneAlt className="text-indigo-400" /> <span>{user.phone}</span></div>
            </div>
            
            <button onClick={handleLogout} className='bg-slate-100 text-slate-700 hover:bg-slate-200 px-6 py-2.5 rounded-xl font-medium transition-colors flex items-center gap-2 w-full sm:w-auto justify-center'>
              <FaSignOutAlt /> Logout
            </button>
          </div>
        </div>

        <div className="w-full">
          <div className="flex items-center justify-between mb-8">
            <h2 className='text-2xl font-bold text-slate-900'>Your Reports</h2>
            <span className="bg-indigo-50 text-indigo-700 text-xs font-bold px-3 py-1 rounded-lg">
              {items.length} Items
            </span>
          </div>

          {items.length === 0 ? (
            <div className="text-center bg-white border border-slate-200 p-16 rounded-3xl shadow-sm">
               <h3 className="text-lg font-bold mb-2 text-slate-800">No reports yet</h3>
               <p className="text-slate-500 text-sm">You haven't reported any lost or found items.</p>
            </div>
          ) : (
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
                {items.map((item)=>(
                    <div key={item._id} className='bg-white border border-slate-200 rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow flex flex-col'>
                        <div className="h-40 rounded-xl overflow-hidden bg-slate-100 mb-4 relative">
                          <img src={item.image} alt={item.itemName} className='w-full h-full object-cover'></img>
                          <span className={`absolute top-2 left-2 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase ${item.type==="lost" ? "bg-red-100 text-red-700":"bg-emerald-100 text-emerald-700"}`}>
                            {item.type}
                          </span>
                        </div>
                        <div className='flex flex-col flex-grow'>
                            <h3 className='text-base font-bold text-slate-900 mb-1 line-clamp-1'>{item.itemName}</h3>
                            <p className='text-slate-500 text-xs flex items-center gap-1.5 mb-4'><FaMapMarkerAlt className="text-slate-400" /> <span className="truncate">{item.location}</span></p>
                            <div className="mt-auto pt-4 border-t border-slate-100">
                              <button onClick={()=>handleDelete(item._id)} className="w-full bg-red-50 text-red-600 font-medium py-2 rounded-xl hover:bg-red-100 transition-colors flex items-center justify-center gap-2 text-sm">
                                <FaTrashAlt /> Delete
                              </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
export default Profile
