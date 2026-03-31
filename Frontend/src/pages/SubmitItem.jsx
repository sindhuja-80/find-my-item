import React, { useState } from 'react'
import axios from 'axios'
import { FaCloudUploadAlt } from 'react-icons/fa'
import { API_URL } from "../config"

const SubmitItem = () => {
  const [image, setImage] = useState(null)
  const [formData, setFormData] = useState({
    itemName: "", description: "", date: "", location: "", category: "", tags: "", type: "lost",
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const data = new FormData()
      const user = JSON.parse(localStorage.getItem("user"))
      data.append("userId", user._id)
      data.append("itemName", formData.itemName)
      data.append("description", formData.description)
      data.append("date", formData.date)
      data.append("location", formData.location)
      data.append("category", formData.category)
      data.append("tags", formData.tags)
      data.append("type", formData.type)
      data.append("image", image)
      
      await axios.post(`${API_URL}/api/items/add`, data, { headers: { "Content-Type": "multipart/form-data" } })
      alert("Item submitted successfully!")
      setFormData({ itemName: "", description: "", date: "", location: "", category: "", tags: "", type: "lost" })
      setImage(null)
    } catch (error) {
      console.error(error)
      alert("Failed to submit item")
    }
  }

  return (
    <div className='min-h-full bg-slate-50 font-sans pb-24'>
      <div className="max-w-3xl mx-auto px-4 md:px-8 py-10">
        
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-slate-900 mb-3">Report an Item</h2>
          <p className="text-slate-500">Add details about the lost or found item below.</p>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 md:p-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700">Report Type</label>
                <select className="w-full p-3 border border-slate-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-slate-700" value={formData.type} onChange={(e)=>setFormData({...formData,type:e.target.value})} required>
                  <option value="lost">Lost</option>
                  <option value="found">Found</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700">Category</label>
                <select className="w-full p-3 border border-slate-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-slate-700" value={formData.category} onChange={(e)=>setFormData({...formData,category:e.target.value})} required>
                  <option value="" disabled>Select Category</option>
                  <option value="electronics">Electronics</option>
                  <option value="clothing">Clothing</option>
                  <option value="accessories">Accessories</option>
                  <option value="documents">Documents</option>
                  <option value="books">Books</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-700">Item Name</label>
              <input className="w-full p-3 border border-slate-300 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent" type="text" placeholder='e.g., iPhone 13 Pro' value={formData.itemName} onChange={(e)=>setFormData({...formData,itemName:e.target.value})} required />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-700">Description</label>
              <textarea className="w-full p-3 border border-slate-300 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent min-h-[120px]" placeholder='Provide identifying details...' value={formData.description} onChange={(e)=>setFormData({...formData,description:e.target.value})} required></textarea>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700">Date</label>
                <input className="w-full p-3 border border-slate-300 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent" type="date" value={formData.date} onChange={(e)=>setFormData({...formData,date:e.target.value})} required />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700">Location</label>
                <input className="w-full p-3 border border-slate-300 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent" type="text" placeholder='e.g., Central Park' value={formData.location} onChange={(e)=>setFormData({...formData,location:e.target.value})} required />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-700">Tags</label>
              <input className="w-full p-3 border border-slate-300 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent" type="text" placeholder='comma separated' value={formData.tags} onChange={(e)=>setFormData({...formData,tags:e.target.value})} />      
            </div>

            <div className="space-y-1.5 mt-2">
              <label className="text-sm font-semibold text-slate-700">Upload Image</label>
              <div className="flex items-center justify-center w-full">
                <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-32 border-2 border-slate-300 border-dashed rounded-xl cursor-pointer bg-slate-50 hover:bg-slate-100 transition-colors">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6 text-slate-500">
                    <FaCloudUploadAlt className="w-8 h-8 mb-2" />
                    <p className="text-sm"><span className="font-semibold">Click to upload</span></p>
                    <p className="text-xs">{image ? image.name : "PNG, JPG up to 5MB"}</p>
                  </div>
                  <input id="dropzone-file" type="file" className="hidden" accept="image/*" onChange={(e)=>{if(e.target.files[0]) setImage(e.target.files[0])}}/>
                </label>
              </div>
            </div>

            <div className="pt-4">
              <button className="w-full bg-indigo-600 text-white py-4 rounded-xl hover:bg-indigo-700 transition-colors font-semibold text-lg" type='submit'>
                Submit Report
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
export default SubmitItem
