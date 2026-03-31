const API_URL = "http://127.0.0.1:5001/api/users";
const email = `testuser_${Date.now()}@example.com`;
const password = "password123";
const phone = "1234567890";
const name = "Test User";

async function testAuthFlow() {
  try {
    console.log(`\n--- 1. Testing Signup for ${email} ---`);
    let res = await fetch(`${API_URL}/register`, {
      method: "POST", headers: {"Content-Type":"application/json"},
      body: JSON.stringify({ email, password, phone, name })
    });
    let data = await res.json();
    console.log("Signup Response:", data);
    if(!res.ok || !data.success) throw new Error("Signup failed");

    // We modified the backend to return exactly this OTP for local testing
    const otp = data.otp;
    console.log("-> OTP Retrieved:", otp);

    console.log(`\n--- 2. Testing Verify OTP ---`);
    res = await fetch(`${API_URL}/verify-otp`, {
       method: "POST", headers: {"Content-Type":"application/json"},
       body: JSON.stringify({ email, otp })
    });
    data = await res.json();
    console.log("Verify OTP Response:", data);
    if(!res.ok || !data.success) throw new Error("Verify OTP failed");

    console.log(`\n--- 3. Testing Login ---`);
    res = await fetch(`${API_URL}/login`, {
       method: "POST", headers: {"Content-Type":"application/json"},
       body: JSON.stringify({ email, password })
    });
    data = await res.json();
    console.log("Login Response:", { success: data.success, message: data.message, token: !!data.token });
    if(!res.ok || !data.success) throw new Error("Login failed");

    console.log("\n✅ All Auth Flows Success");
    process.exit(0);

  } catch (error) {
    console.error("\n❌ Error running auth flow:", error.message || error);
    process.exit(1);
  }
}

testAuthFlow();
