import express from 'express';
import connectToDatabase from '../lib/db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
const router = express.Router();
router.post('/register',async(req,res) =>{
    const {username, email, password} = req.body;
    try{
        const db = await connectToDatabase();
        const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        if (rows.length > 0){
            return res.status(409).json({message:"user already esisted"})
        }
        const hashPassword = await bcrypt.hash(password,10);
        await db.query("INSERT INTO users (username, email, password) VALUES(?,?,?)",[username, email, hashPassword])
        return res.status(201).json({message:"user created successfully"})

    }catch(err){
        return res.status(500).json(err);
    }
})
router.post('/login',async(req,res) =>{
    const {email, password} = req.body;
    try{
        const db = await connectToDatabase();
        const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        if (rows.length === 0){
            return res.status(409).json({message:"user doesn't exist"})        
        }
        const isMatch = await bcrypt.compare(password,rows[0].password)
        if(!isMatch){
            return res.status(401).json({message:"wrong password"})
        }
        const token =jwt.sign({id:rows[0].id},"jwt-secret-key",{expiresIn:'3h'})
        
        return res.status(201).json({token:token})

    }catch(err){
        return res.status(500).json(err);
    }
})
const verifyToken = (req,res,next) =>{
    try{
        const token = req.headers['authorization'].split(' ')[1];
        if(!token){
            return res.status(403).json({message:"No Token Provided"})
        }
        const decoded = jwt.verify(token,"jwt-secret-key")
        req.userid = decoded.id;
        next()
    }catch(err){
        return res.status(500).json({message: "server error"})
    }
}
export default router;
router.get('/profile', verifyToken, async(req, res) =>{
    try{
        const db = await connectToDatabase();
        const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [req.userId]);
        if (rows.length === 0){
            return res.status(409).json({message:"user doesn't exist"})        
        }
        return res.status(201).json({user: rows[0]})
    }catch(err){
        return res.status(500).json({message: "server error"})
    }
})

// Forgot Password Route
router.post('/forgot-password', async (req, res) => {
    const { email } = req.body;
    try {
        const db = await connectToDatabase();
        const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        
        if (rows.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        // Generate reset token
        const resetToken = jwt.sign({ id: rows[0].id }, "jwt-secret-key", { expiresIn: '1h' });
        
        // Create transporter for sending email
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'busit.org@gmail.com',
                pass: 'nzed vldu enmj kofs'
            }
        });

        // Email content
        const mailOptions = {
            from: 'busit.org@gmail.com',
            to: email,
            subject: 'Password Reset Request',
            html: `
                <h1>Password Reset Request</h1>
                <p>Click the link below to reset your password:</p>
                <a href="http://localhost:5173/reset-password/${resetToken}">Reset Password</a>
                <p>This link will expire in 1 hour.</p>
            `
        };

        // Send email
        await transporter.sendMail(mailOptions);
        
        return res.status(200).json({ message: "Password reset link sent to your email" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Error sending reset email" });
    }
});

// Reset Password Route
router.post('/reset-password', async (req, res) => {
    const { token, newPassword } = req.body;
    try {
        const decoded = jwt.verify(token, "jwt-secret-key");
        const db = await connectToDatabase();
        
        const hashPassword = await bcrypt.hash(newPassword, 10);
        await db.query('UPDATE users SET password = ? WHERE id = ?', [hashPassword, decoded.id]);
        
        return res.status(200).json({ message: "Password updated successfully" });
    } catch (err) {
        return res.status(500).json({ message: "Invalid or expired token" });
    }
});