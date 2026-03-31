import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { FaMapMarkerAlt, FaCalendarAlt, FaSearch } from "react-icons/fa"
import { API_URL } from "../config"

const ItemsList = () => {
  const [items, setItems] = useState([])
  const [search, setSearch] = useState("")
  const navigate = useNavigate()
  
  const fetchItems = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/items`)
      setItems(res.data)
    } catch (error) {
      console.error("Error fetching items", error)
    }
  }

  useEffect(() => {
    fetchItems()
  }, [])

  const filteredItems = items.filter((item) => 
    item.itemName.toLowerCase().includes(search.toLowerCase()) ||
    item.description.toLowerCase().includes(search.toLowerCase()) ||
    item.location.toLowerCase().includes(search.toLowerCase()) ||
    item.category.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="min-h-full bg-slate-50 font-sans pb-24">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-10">
        
        {/* Header */}
        <div className="mb-10 text-center md:text-left flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">Lost & Found</h1>
            <p className="text-slate-500 font-medium">Browse the latest community items.</p>
          </div>
          
          {/* Search */}
          <div className="relative w-full md:w-96">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <FaSearch className="text-slate-400" />
            </div>
            <input
              type="text"
              placeholder="Search items..."
              className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-shadow shadow-sm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="text-xl font-bold text-slate-800 mb-2">No items found</h3>
            <p className="text-slate-500">Try adjusting your search criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item) => (
              <div
                key={item._id} 
                onClick={() => navigate(`/items/${item._id}`)}
                className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden flex flex-col"
              >
                <div className="relative h-48 bg-slate-100 shrink-0">
                  <img src={item.image} alt={item.itemName} className="w-full h-full object-cover" />
                  <div className="absolute top-3 left-3">
                    <span className={`px-3 py-1 text-xs font-bold rounded-full ${item.type === 'lost' ? 'bg-red-100 text-red-700' : 'bg-emerald-100 text-emerald-700'}`}>
                      {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                    </span>
                  </div>
                </div>

                <div className="p-5 flex flex-col flex-grow">
                  <h2 className="text-lg font-bold text-slate-900 line-clamp-1 mb-1">{item.itemName}</h2>
                  <span className="text-xs font-medium text-slate-500 mb-3">{item.category}</span>
                  
                  <p className="text-slate-600 text-sm line-clamp-2 mb-4 flex-grow">
                    {item.description}
                  </p>

                  <div className="space-y-2 pt-4 border-t border-slate-100 text-xs font-medium text-slate-500">
                    <div className="flex items-center gap-2">
                      <FaMapMarkerAlt className="text-slate-400" />
                      <span className="truncate">{item.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaCalendarAlt className="text-slate-400" />
                      <span>{new Date(item.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
export default ItemsList
