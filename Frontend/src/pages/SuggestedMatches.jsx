import axios from 'axios'
import React,{useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { FaSearch, FaExchangeAlt, FaComments } from 'react-icons/fa'
import { API_URL } from "../config"

const SuggestedMatches = () => {
    const [matches,setMatches] = useState([])
    const [search,setSearch] = useState("")
    const navigate=useNavigate()

    useEffect(()=>{
       fetchMatches()
    },[])

    const fetchMatches = async () =>{
        try{
            const res= await axios.get(`${API_URL}/api/matches`)
            setMatches(res.data.matches)
        }catch(err){
            console.error("Error fetching matches",err)
        }
    }

    const filteredMatches = matches.filter((item)=>
       item.lostItem.itemName.toLowerCase().includes(search.toLowerCase()) ||
       item.foundItem.itemName.toLowerCase().includes(search.toLowerCase())
    )

  return (
    <div className="min-h-full bg-slate-50 font-sans pb-24">
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-10">
        
        {/* Header */}
        <div className="mb-10 text-center md:text-left flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">Smart Matches</h1>
            <p className="text-slate-500 font-medium">Potential links between lost and found items.</p>
          </div>
          
          {/* Search */}
          <div className="relative w-full md:w-96">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <FaSearch className="text-slate-400" />
            </div>
            <input
              type="text"
              placeholder="Search matches..."
              className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-shadow shadow-sm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Grid */}
        {filteredMatches.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="text-xl font-bold text-slate-800 mb-2">No matches yet</h3>
            <p className="text-slate-500">We'll notify you when a potential match arises!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredMatches.map((match, index) => (
               <div key={index} className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow p-5 flex flex-col sm:flex-row gap-6 items-start sm:items-center overflow-hidden">
                  
                  <div className="w-full sm:w-40 h-40 shrink-0 relative rounded-xl overflow-hidden bg-slate-100">
                      <img src={match.foundItem.image} alt="found item" className="w-full h-full object-cover"/>
                  </div>

                  <div className='flex flex-col flex-grow w-full h-full justify-between'>
                      <div>
                          <div className="inline-flex items-center gap-1.5 bg-indigo-50 text-indigo-700 px-3 py-1 rounded-md text-xs font-bold uppercase mb-4">
                            <FaExchangeAlt /> Potential Match
                          </div>
                          
                          <div className="space-y-3 mb-5">
                              <div className="flex flex-col">
                                  <span className="text-[10px] text-red-500 font-bold uppercase">Lost Item</span>
                                  <span className="text-slate-900 font-bold line-clamp-1">{match.lostItem.itemName}</span>
                              </div>
                              <div className="flex flex-col pt-3 border-t border-slate-100">
                                  <span className="text-[10px] text-emerald-600 font-bold uppercase">Found Item</span>
                                  <span className="text-slate-900 font-bold line-clamp-1">{match.foundItem.itemName}</span>
                              </div>
                          </div>
                      </div>

                      <button 
                          onClick={()=>navigate(`/chat/${match.foundItem.user}`)} 
                          className="w-full bg-slate-900 text-white px-4 py-3 rounded-xl hover:bg-slate-800 transition-colors font-semibold flex items-center justify-center gap-2 text-sm"
                      > 
                          <FaComments /> Contact Finder
                      </button>
                  </div>
               </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
export default SuggestedMatches
