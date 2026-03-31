const mongoose = require("mongoose");

const API_URL = "http://127.0.0.1:5001/api/users";
const email = `testuser_${Date.now()}@example.com`;
const password = "password123";
const phone = "1234567890";
const name = "Test User";

async function testAuthFlow() {
  try {
    console.log(`1. Testing Signup for ${email}...`);
    let res = await fetch(`${API_URL}/register`, {
      method: "POST", headers: {"Content-Type":"application/json"},
      body: JSON.stringify({ email, password, phone, name })
    });
    let data = await res.json();
    console.log("Signup Response:", data);
    if(!res.ok) throw new Error(JSON.stringify(data));

    console.log("Connecting to DB to fetch OTP");
    await mongoose.connect("mongodb+srv://kalagotlasindhuja06_db_user:woKY53Oy973fC4rI@cluster0.zty8v9v.mongodb.net/findmyitem");
    const db = mongoose.connection;
    const user = await db.collection("users").findOne({ email });
    const otp = user.otp;
    console.log("2. Retrieved OTP from DB:", otp);

    console.log("3. Testing Verify OTP...");
    res = await fetch(`${API_URL}/verify-otp`, {
       method: "POST", headers: {"Content-Type":"application/json"},
       body: JSON.stringify({ email, otp })
    });
    data = await res.json();
    console.log("Verify OTP Response:", data);
    if(!res.ok) throw new Error(JSON.stringify(data));

    console.log("4. Testing Login...");
    res = await fetch(`${API_URL}/login`, {
       method: "POST", headers: {"Content-Type":"application/json"},
       body: JSON.stringify({ email, password })
    });
    data = await res.json();
    console.log("Login Response:", { success: data.success, message: data.message, token: !!data.token });
    if(!res.ok) throw new Error(JSON.stringify(data));

    console.log("✅ All Auth Flows Success");
    process.exit(0);

  } catch (error) {
    console.error("❌ Error running auth flow:");
    console.error(error);
    process.exit(1);
  }
}

testAuthFlow();
