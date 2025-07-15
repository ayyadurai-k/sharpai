require('dotenv').config();

const { clerkClient } = require('@clerk/clerk-sdk-node');
const { ClerkExpressWithAuth } = require('@clerk/express');

// Environment Variables Check
if (!process.env.CLERK_API_KEY || !process.env.CLERK_JWT_KEY) {
    console.error("❌ Missing Clerk API keys. Ensure CLERK_API_KEY and CLERK_JWT_KEY are set in the .env file.");
    process.exit(1);
}

console.log("✅ Clerk API Key and JWT Key loaded successfully.");

// Clerk Authentication Middleware
const clerkAuthMiddleware = new ClerkExpressWithAuth({
    secretKey: process.env.CLERK_API_KEY,
    jwtKey: process.env.CLERK_JWT_KEY,
    onError: (err, req, res, next) => {
        console.error('❌ Clerk Auth Error:', err.message);
        return res.status(401).json({ message: 'Unauthorized: Invalid token.' });
    },
});

// Custom Middleware to Check Authentication
const requireAuth = (req, res, next) => {
    const { auth } = req;
    if (!auth?.userId) {
        console.warn("⚠️ Unauthorized access attempt detected.");
        return res.status(401).json({ message: 'Unauthorized: No valid user session found.' });
    }
    next();
};

module.exports = { clerkClient, clerkAuthMiddleware, requireAuth };
