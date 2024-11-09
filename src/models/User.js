// src/models/User.js
const { query } = require('../config/database');
const { hashPassword } = require('../utils/auth');

const User = {
    create: async (userData) => {
        const hashedPassword = await hashPassword(userData.password);
        const result = await query(
            `INSERT INTO users (email, password, role, full_name)
             VALUES ($1, $2, $3, $4)
             RETURNING id, email, role, full_name`,
            [userData.email, hashedPassword, userData.role, userData.full_name]
        );
        return result[0];
    },

    findByEmail: async (email) => {
        const result = await query(
            'SELECT * FROM users WHERE email = $1',
            [email]
        );
        return result[0];
    },

    findById: async (id) => {
        const result = await query(
            'SELECT id, email, role, full_name FROM users WHERE id = $1',
            [id]
        );
        return result[0];
    }
};

module.exports = User;