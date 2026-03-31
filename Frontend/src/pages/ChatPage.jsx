import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import axios from "axios"
import { FaPaperPlane, FaUserCircle, FaComments } from "react-icons/fa"
import { API_URL } from "../config"

const ChatPage = () => {
  const navigate=useNavigate()
  const { userId } = useParams()

  const user = JSON.parse(localStorage.getItem("user") || "{}")
  const currentUser = user?._id

  const [messages, setMessages] = useState([])
  const [message, setMessage] = useState("")
  const [chatUsers, setChatUsers] = useState([])
  const [selectedUser, setSelectedUser] = useState(userId || null)

  const fetchChatUsers = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/messages/chats/${currentUser}`)
      setChatUsers(res.data)
    } catch (err) {
      console.log(err)
    }
  }

  const fetchMessages = async (receiverId) => {
    if (!receiverId) return
    try {
      const res = await axios.get(`${API_URL}/api/messages/${currentUser}/${receiverId}`)
      setMessages(res.data)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    if (currentUser) fetchChatUsers()
  }, [currentUser])

  useEffect(() => {
    if (selectedUser) fetchMessages(selectedUser)
  }, [selectedUser])

  const sendMessage = async () => {
    if (!message || !selectedUser) return
    try {
      await axios.post(`${API_URL}/api/messages/send`, {
        sender: currentUser,
        receiver: selectedUser,
        message
      })
      setMessage("")
      fetchMessages(selectedUser)
    } catch (err) {
      console.log(err)
    }
  }

  const selectedUserData = chatUsers.find((u) => u._id === selectedUser)

  return (
    <div className="flex h-[calc(100vh-64px)] bg-slate-50 font-sans">
      <div className="w-full max-w-6xl mx-auto flex py-6 px-4 md:px-8 gap-6 h-full pb-8">
        
        {/* Left Sidebar - Contacts */}
        <div className="w-1/3 max-w-sm hidden md:flex flex-col bg-white border border-slate-200 shadow-sm rounded-2xl overflow-hidden">
          <div className="p-5 border-b border-slate-200 bg-slate-50/50">
            <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
              <FaComments className="text-indigo-500" /> Messages
            </h2>
          </div>

          <div className="flex-1 overflow-y-auto p-3 space-y-1">
            {chatUsers.length === 0 ? (
              <div className="text-center p-6 text-slate-500 text-sm mt-4">
                No active conversations.
              </div>
            ) : (
              chatUsers.map((u) => (
                <div 
                  key={u._id} 
                  onClick={() => setSelectedUser(u._id)} 
                  className={`p-3 rounded-xl cursor-pointer transition-colors flex items-center gap-3 ${selectedUser === u._id ? "bg-indigo-50 text-indigo-700 font-semibold" : "hover:bg-slate-50 text-slate-700"}`}
                >
                  <FaUserCircle className="text-3xl text-slate-300 shrink-0" />
                  <div className="overflow-hidden">
                    <h3 className="text-sm truncate">{u.name}</h3>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right Area - Chat Window */}
        <div className="flex-1 flex flex-col bg-white border border-slate-200 shadow-sm rounded-2xl overflow-hidden">
          {selectedUser ? (
            <>
              {/* Chat Header */}
              <div className="px-6 py-4 border-b border-slate-200 bg-slate-50/50 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
                    {selectedUserData?.name?.charAt(0) || "U"}
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-slate-800 leading-tight">{selectedUserData?.name || "User"}</h2>
                    <span className="text-[10px] font-bold text-emerald-600 uppercase">Online</span>
                  </div>
                </div>
              </div>

              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50/30 flex flex-col">
                {messages.length === 0 ? (
                  <div className="m-auto text-center p-6 bg-white rounded-xl border border-slate-200">
                    <p className="text-slate-600 font-medium text-sm">Send your first message!</p>
                  </div>
                ) : (
                  messages.map((msg) => {
                    const isMe = msg.sender === currentUser
                    return (
                      <div key={msg._id} className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
                        <div className={`px-4 py-2.5 rounded-2xl max-w-[75%] md:max-w-[65%] ${isMe ? "bg-indigo-600 text-white rounded-tr-sm" : "bg-white border border-slate-200 text-slate-800 rounded-tl-sm shadow-sm"}`}>
                          <p className="text-sm leading-relaxed">{msg.message}</p>
                        </div>
                      </div>
                    )
                  })
                )}
              </div>

              {/* Input Area */}
              <div className="p-4 border-t border-slate-200 bg-white">
                <div className="relative flex items-center">
                  <input 
                    value={message} 
                    onChange={(e) => setMessage(e.target.value)} 
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                    placeholder="Message..." 
                    className="w-full bg-slate-50 border border-slate-200 rounded-full py-2.5 pl-5 pr-12 text-slate-800 focus:outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 text-sm" 
                  />
                  <button 
                    onClick={sendMessage} 
                    disabled={!message.trim()}
                    className={`absolute right-1.5 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${message.trim() ? "bg-indigo-600 text-white hover:bg-indigo-700" : "bg-slate-200 text-slate-400 cursor-not-allowed"}`}
                  >
                    <FaPaperPlane className="text-xs relative right-[1px] top-[1px]" />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center bg-slate-50/50 p-6 text-center">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                <FaComments className="text-2xl text-slate-300" />
              </div>
              <h2 className="text-xl font-bold text-slate-800 mb-2">Your Messages</h2>
              <p className="text-slate-500 text-sm">Select a conversation to start chatting.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
export default ChatPage