import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Inquiry from './models/Inquiry.js';
import User from './models/User.js';

dotenv.config();

const app = express();

// ---------- CORS ----------
const allowedOrigins = [
    'https://ssoverseas.in',
    'https://www.ssoverseas.in',
    'http://localhost:5173',
    'http://127.0.0.1:5173',

];

app.use(
    cors({
        origin: (origin, callback) => {
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error('Not allowed by CORS'));
            }
        },
        credentials: true,
    })
);

app.use(express.json());

// ---------- MongoDB ----------
mongoose
    .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('MongoDB connected'))
    .catch(e => console.error('MongoDB error:', e));

// ---------- JWT Middleware ----------
const auth = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ msg: 'No token' });

    jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
        if (err) return res.status(403).json({ msg: 'Invalid token' });
        req.user = payload;
        next();
    });
};

// ---------- Routes ----------
app.post('/api/auth/login', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ msg: 'Email & password required' });

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(400).json({ msg: 'Invalid credentials' });

        const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: '2h' });
        res.json({ token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Server error' });
    }
});

app.post('/api/inquiries', async (req, res) => {
    try {
        const inquiry = new Inquiry(req.body);
        await inquiry.save();
        res.status(201).json({ status: 'success', submissionId: inquiry.submissionId });
    } catch (e) {
        console.error(e);
        res.status(500).json({ msg: 'Server error' });
    }
});

app.get('/api/inquiries', auth, async (req, res) => {
    try {
        const list = await Inquiry.find().sort({ submissionDate: -1 });
        res.json(list);
    } catch (e) {
        res.status(500).json({ msg: 'Server error' });
    }
});

app.delete('/api/inquiries/:id', auth, async (req, res) => {
    try {
        const inquiry = await Inquiry.findById(req.params.id);
        if (!inquiry) return res.status(404).json({ msg: 'Inquiry not found' });
        await Inquiry.findByIdAndDelete(req.params.id);
        res.json({ msg: 'Inquiry deleted' });
    } catch (e) {
        console.error(e);
        res.status(500).json({ msg: 'Server error' });
    }
});

// Keep-alive ping (Render free tier)
app.get('/ping', (req, res) => res.send('OK'));

app.get('/', (req, res) => res.send('API is running...'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));