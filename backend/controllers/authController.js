import transporter from "../configs/nodemailer.js";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

// -------------------- REGISTER --------------------
export const register = async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.json({ success: false, message: "Missing details" });
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.json({ success: false, message: "User already exists" });
        }

        const user = new User({
            name,
            email,
            password_hash: password,
        });

        await user.save();

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });

        //Sending welcome email
        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: email,
            subject: 'Welcome to Serenity',
            html: `
                    <div style="font-family: Arial, sans-serif; color: #333;">
                    <h2 style="color: #5712E0;">🌿 Welcome to Serenity, ${user.name}!</h2>
                    <p>We're so glad you're here.</p>
                    
                    <p><strong>Serenity</strong> is your personal space for:</p>
                    <ul>
                        <li>🧘 Mindful sessions</li>
                        <li>💫 Healing practices</li>
                        <li>🌱 Personal growth</li>
                    </ul>

                    <p>Your journey to wellness begins now. Start by exploring your 
                        <a href="https://serenity.example.com/dashboard" style="color: #D9239F; text-decoration: none;">Dashboard</a> and creating your first session!</p>

                    <p>If you have any questions or need help, feel free to reply to this email.</p>

                    <hr style="margin: 20px 0; border: none; border-top: 1px solid #ddd;" />

                    <p style="font-size: 13px; color: #888;">With gratitude,<br/>The Serenity Team</p>
                    <p style="font-size: 13px;">
                        <a href="https://serenity.example.com" style="color: #5712E0;">serenity.example.com</a>
                    </p>
                    </div>
                `,

        }

        await transporter.sendMail(mailOptions)

        return res.json({
            success: true,
            message: "Registration successful",
            user: {
                id: user._id,
                email: user.email,
                name: user.name,
            },
        });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// -------------------- LOGIN --------------------
export const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.json({
            success: false,
            message: "Email and password are required",
        });
    }

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.json({ success: false, message: "Invalid email or password" });
        }

        const isMatch = await user.matchPassword(password);

        if (!isMatch) {
            return res.json({ success: false, message: "Invalid email or password" });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        return res.json({
            success: true,
            message: "Login successful",

            user: {
                id: user._id,
                email: user.email,
                name: user.name,
            },
        });
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};

export const logout = async (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        })

        return res.json({ success: true, message: "Logged Out" })

    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
}

// Send verification OTP to the user's email
export const sendVerifyOtp = async (req, res) => {
    try {
        const { userId } = req.body

        const user = await User.findById(userId);
        if (user.isVerified) {
            return res.json({ success: false, message: "Account already verified" })
        }

        const otp = String(Math.floor(100000 + Math.random() * 900000))
        user.verifyOtp = otp
        user.verifyOtpExpireAt = Date.now() + 24 * 60 * 60 * 1000
        await user.save()

        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: 'Account verification OTP',
            text: `Your OTP is ${otp}. Verify your account using this OTP`
        }

        await transporter.sendMail(mailOptions)

        res.json({success: true, message: 'Verification OTP sent on email'})


    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

// Verify the e-mail using otp
export const verifyEmail = async (req, res) => {
    const {userId, otp} = req.body
    console.log(userId, otp)

    if(!userId || !otp){
        return res.json({success:false, message:"Missing details"})
    }

    try {
        const user = await User.findById(userId);
        if(!user){
            return  res.json({success:false, message:"User not found"})
        }

        if(user.verifyOtp === '' || user.verifyOtp != otp){
            return  res.json({success:false, message:"Invalid OTP"})
        }

        if(user.verifyOtpExpireAt < Date.now)
            return  res.json({success:false, message:"OTP expired"})

        user.isVerified = true;
        user.verifyOtp = '';
        user.verifyOtpExpireAt = 0

        await user.save();

        return res.json({success:true, message:"Account verified successfully"})


    } catch (error) {
        return res.json({success:false, message:error.message})
    }
}

// Check if user is authenticated
export const isAuthenticated = async (req, res) => {
    try {
        return res.json({success: true})

    } catch (error) {
         return res.json({success:false, message:error.message})
    }
}

// Send password resend OTP
export const sendResetOTP = async (req, res) => {
    const {email} = req.body;

    if(!email)
        return res.json({success:false, message:"Email is required"})

    try {
        const user = await User.findOne({email})

        if(!user){
            return res.json({success:false, message:"User not found"})
        }

        const otp = String(Math.floor(100000 + Math.random() * 900000))
        user.resetOtp = otp
        user.resetOtpExpireAt = Date.now() + 15 * 60 * 1000
        await user.save()

        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: 'Password Reset OTP',
            text: `Your OTP for resetting your password is ${otp}. Use this OTP to proceed with resetting you password`
        }

        await transporter.sendMail(mailOptions)

        return res.json({success: true, message:"OTP sent to your email"})


    } catch (error) {
        return res.json({success:false, message:error.message})
    }
}

export const resetPassword = async (req, res) => {
    const {email, otp, newPassword} = req.body;

    if(!email || !otp || !newPassword){
        return res.json({success:false, message:"Email, OTP and new password are required"})
    }

    try {
        const user = await User.findOne({email})

        if(!user){
            return res.json({success:false, message:"User not found"})
        }

        if(!user.resetOtp || user.resetOtp !== otp)
            return res.json({success:false, message:"Invalid OTP"})

        if(user.resetOtpExpireAt < Date.now())
            return res.json({success:false, message:"OTP expired"})

         user.password_hash = newPassword
         user.resetOtp = ''
         user.resetOtpExpireAt = 0

         await user.save()

         return res.json({success: true, message:"Password has been reset successfully"})

    } catch (error) {
        return res.json({success:false, message:error.message})
    }
}