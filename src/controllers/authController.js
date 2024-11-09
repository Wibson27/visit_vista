// src/controllers/authController.js
const User = require('../models/User');
const { comparePassword, generateToken } = require('../utils/auth');

const authController = {
    register: async (req, res) => {
        try {
            const { email, password, role, full_name } = req.body;

            // Check if user exists
            const existingUser = await User.findByEmail(email);
            if (existingUser) {
                return res.status(400).json({ error: 'Email already registered' });
            }

            // Create new user
            const user = await User.create({
                email,
                password,
                role,
                full_name
            });

            // Generate token
            const token = generateToken(user);

            res.status(201).json({ user, token });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    login: async (req, res) => {
        try {
            const { email, password } = req.body;

            // Find user
            const user = await User.findByEmail(email);
            if (!user) {
                return res.status(401).json({ error: 'Invalid credentials' });
            }

            // Check password
            const isValidPassword = await comparePassword(password, user.password);
            if (!isValidPassword) {
                return res.status(401).json({ error: 'Invalid credentials' });
            }

            // Generate token
            const token = generateToken(user);

            res.json({
                user: {
                    id: user.id,
                    email: user.email,
                    role: user.role,
                    full_name: user.full_name
                },
                token
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    getProfile: async (req, res) => {
        try {
            const user = await User.findById(req.user.id);
            res.json(user);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = authController;