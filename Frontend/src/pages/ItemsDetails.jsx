import React, { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import axios from "axios"
import { FaMapMarkerAlt, FaComments } from "react-icons/fa"
import BackButton from "../components/BackButton"
import { API_URL } from "../config"

const ItemsDetails = () => {
  const navigate = useNavigate()
  const [item, setItem] = useState(null)
  const { id } = useParams()

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/items/${id}`)
        setItem(res.data)
      } catch (error) {
        console.error("Error fetching item", error)
      }
    }
    fetchItem()
  }, [id])

  if (!item) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-slate-50">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-full bg-slate-50 font-sans pb-24">
      <div className="max-w-5xl mx-auto px-4 md:px-8 py-8">
        <div className="mb-6"><BackButton /></div>
        
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col md:flex-row">
          <div className="md:w-1/2 bg-slate-100 flex items-center justify-center p-6 lg:p-10 border-b md:border-b-0 md:border-r border-slate-200 relative">
            <span className={`absolute top-6 left-6 px-4 py-1.5 text-sm font-bold rounded-full ${item.type === 'lost' ? 'bg-red-100 text-red-700' : 'bg-emerald-100 text-emerald-700'}`}>
              {item.type.charAt(0).toUpperCase() + item.type.slice(1)} Item
            </span>
            <img src={item.image} alt={item.itemName} className="w-full max-w-sm rounded-2xl shadow-md object-cover aspect-square" />
          </div>

          <div className="md:w-1/2 p-8 lg:p-12 flex flex-col">
            <div className="mb-6 flex gap-3 flex-wrap">
              <span className="bg-slate-100 text-slate-700 text-xs font-bold px-3 py-1 rounded-lg uppercase">{item.category}</span>
              <span className="text-slate-500 text-sm font-medium pt-0.5">{new Date(item.date).toLocaleDateString()}</span>
            </div>

            <h1 className="text-3xl font-bold text-slate-900 mb-4">{item.itemName}</h1>
            
            <p className="text-slate-600 leading-relaxed mb-8">{item.description}</p>

            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 mb-8 flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 shrink-0">
                <FaMapMarkerAlt />
              </div>
              <div>
                <p className="text-xs text-slate-500 font-bold uppercase">Location</p>
                <p className="text-slate-800 font-medium">{item.location}</p>
              </div>
            </div>

            {item.tags && item.tags.length > 0 && (
              <div className="mb-8">
                <p className="text-sm font-bold text-slate-700 mb-3">Tags</p>
                <div className="flex flex-wrap gap-2">
                  {item.tags.map((tag, idx) => (
                    <span key={idx} className="bg-slate-100 text-slate-600 px-3 py-1 rounded-lg text-sm">{tag}</span>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-auto">
              <button 
                onClick={() => navigate(`/chat/${item.user}`)}
                className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white px-6 py-4 rounded-xl hover:bg-indigo-700 transition-colors font-semibold text-lg" 
              >
                <FaComments /> Message Finder
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default ItemsDetails