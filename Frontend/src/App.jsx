import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ItemsList from "./pages/ItemsList.jsx";
import ItemDetails from "./pages/ItemsDetails.jsx";
import SuggestedMatches from "./pages/SuggestedMatches.jsx";
import ChatPage from "./pages/ChatPage.jsx";
import SignUp from "./pages/Signup.jsx"
import Login from "./pages/Login.jsx"
import ProtectedRoute from "./components/ProtectedRute.jsx";
import SubmitItem from "./pages/SubmitItem.jsx";
import Profile from "./pages/Profile.jsx";
import VerifyOTP from "./pages/VerifyOTP.jsx";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";

const App = () => {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/register" element={<SignUp></SignUp>}></Route>
        <Route path="/verify-otp" element={<VerifyOTP></VerifyOTP>}></Route>
        <Route path="/" element={<ItemsList />} />
        <Route path="/profile" element={<ProtectedRoute><Profile></Profile></ProtectedRoute>}></Route>
        <Route path="/submit-item" element={<ProtectedRoute><SubmitItem></SubmitItem></ProtectedRoute>}></Route>
        <Route path="/items/:id" element={<ProtectedRoute><ItemDetails /></ProtectedRoute>} />
        <Route path="/matches" element={<ProtectedRoute><SuggestedMatches/></ProtectedRoute>}></Route>
       <Route path="/chat/:userId" element={<ProtectedRoute><ChatPage></ChatPage></ProtectedRoute>}></Route>
        <Route path="/chat" element={<ProtectedRoute><ChatPage /></ProtectedRoute>} />
        <Route path="/chat/:userId" element={<ProtectedRoute><ChatPage /></ProtectedRoute>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;