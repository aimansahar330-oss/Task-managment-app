import crypto from "crypto";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import bcryptjs from "bcryptjs";
import { validateRegister } from "../utils/validation.js";

export const registerUser = async (req, res) => {
    console.log("REGISTER API HIT");
    console.log("BODY:", req.body);

    try {
        const { name, email, password, confirmPassword } = req.body;

        const validationError = validateRegister(
            name,
            email,
            password,
            confirmPassword
        );

        if (validationError) {
            return res.status(400).json({ message: validationError });
        }

        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({ message: "Email already exists" });
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        return res.status(201).json({
            message: "User registered successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
        });

    } catch (error) {
        console.log("REGISTER ERROR:", error);
        return res.status(500).json({ message: error.message });
    }
};


export const loginUser = async (req, res) => {
    console.log("LOGIN API HIT");
    console.log(req.body);

    try {
        let { email, password } = req.body;

        email = email.trim().toLowerCase();

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const isMatch = await bcryptjs.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        // 🔥 YAHAN TOKEN BANAYEGA (MOST IMPORTANT)
        const token = jwt.sign(
            { id: user._id },
            "secretkey",
            { expiresIn: "7d" }
        );

        return res.status(200).json({
            message: "Login successful",
            token,   // 🔥 MUST SEND TOKEN
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


// forgot password api

export const forgotPassword = async (req, res) => {
    try {
        console.log("BODY:", req.body);

        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ message: "Email required" });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        console.log("USER FOUND:", user.email);

        const resetToken = crypto.randomBytes(32).toString("hex").trim();
        user.resetToken = resetToken;
        user.resetTokenExpire = Date.now() + 10 * 60 * 1000;

        await user.save();

        return res.json({
            message: "Reset link generated",
            resetLink: `http://localhost:5173/reset-password/${resetToken}`
        });

    } catch (error) {
        console.log("FORGOT PASSWORD ERROR:", error); // 🔥 IMPORTANT
        res.status(500).json({ message: error.message });
    }
};

// reset password

export const resetPassword = async (req, res) => {
    try {
        const { token } = req.params;
        const { password } = req.body;

        console.log("TOKEN FROM URL:", token);

        const user = await User.findOne({ resetToken: token });

        console.log("USER FOUND:", user);
        if (!user) {
            return res.status(400).json({ message: "Invalid or expired token" });
        }

        const salt = await bcryptjs.genSalt(10);
        user.password = await bcryptjs.hash(password, salt);

        user.resetToken = undefined;
        user.resetTokenExpire = undefined;

        await user.save();

        res.json({ message: "Password reset successful" });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


