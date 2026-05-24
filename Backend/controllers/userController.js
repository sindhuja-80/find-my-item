import User from "../models/User.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
// OTP/email util removed — signup is immediate verified now



/* ================= REGISTER USER ================= */

export const registerUser = async (req, res) => {

  try {

    const { name, email, password, phone } = req.body

    const existingUser = await User.findOne({ email })

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists. Please login"
      })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 8)

    // Create new user and mark as verified (no OTP flow)
    const user = new User({
      name,
      email,
      phone,
      password: hashedPassword,
      isVerified: true
    })

    await user.save()

    res.status(201).json({
      success: true,
      message: "Registered successfully"
    })

  } catch (error) {

    console.log("Register error:", error)

    res.status(500).json({
      success: false,
      message: "Registration failed"
    })
  }
}





// verifyOTP removed — email verification handled differently (immediate verify on signup)




/* ================= LOGIN USER ================= */

export const loginUser = async (req, res) => {

  try {

    const { email, password } = req.body

    const user = await User.findOne({ email })

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found"
      })
    }


    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid password"
      })
    }


    if (!user.isVerified) {
      return res.status(400).json({
        success: false,
        message: "Please verify your email first"
      })
    }


    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    )


    res.status(200).json({
      success: true,
      message: "Logged In",
      token,
      user
    })


  } catch (error) {

    console.log("Login error:", error)

    res.status(500).json({
      success: false,
      message: "Login failed"
    })
  }
}