import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import User from "./models/User.js";

dotenv.config();

const createAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("✅ Connected to MongoDB");

        // 👇 check if user already exists
        const existing = await User.findOne({ email: "admin@example.com" });
        if (existing) {
            console.log("⚠️ Admin already exists. Deleting old record...");
            await User.deleteOne({ email: "admin@example.com" });
        }

        const hashedPassword = await bcrypt.hash("admin123", 10);

        const user = new User({
            email: "admin@example.com",
            password: hashedPassword,
        });

        await user.save();
        console.log("✅ New Admin Created:");
        console.log("Email: admin@example.com");
        console.log("Password: admin123");
        console.log("Hashed:", hashedPassword);

        process.exit(0);
    } catch (err) {
        console.error("❌ Error:", err);
        process.exit(1);
    }
};

createAdmin();
