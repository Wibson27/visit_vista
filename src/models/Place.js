const { query } = require('../config/database');

class Place {
    static async create({ businessId, name, description, location, city, price, capacity, category }) {
        try {
            const result = await query(
                `INSERT INTO places (
                    id, business_id, name, description, location, city,
                    price, capacity, category, created_at, updated_at
                )
                VALUES (
                    gen_random_uuid(), $1, $2, $3, $4, $5,
                    $6, $7, $8, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
                )
                RETURNING *`,
                [businessId, name, description, location, city, price, capacity, category]
            );
            return result[0];
        } catch (error) {
            throw new Error(`Error creating place: ${error.message}`);
        }
    }

    static async findById(id) {
        try {
            const result = await query(
                'SELECT * FROM places WHERE id = $1',
                [id]
            );
            return result[0];
        } catch (error) {
            throw new Error(`Error finding place: ${error.message}`);
        }
    }

    static async findByBusinessId(businessId) {
        try {
            const result = await query(
                'SELECT * FROM places WHERE business_id = $1',
                [businessId]
            );
            return result;
        } catch (error) {
            throw new Error(`Error finding places: ${error.message}`);
        }
    }

    static async updateById(id, updates) {
        const allowedUpdates = ['name', 'description', 'price', 'capacity', 'category'];
        const updateFields = Object.keys(updates)
            .filter(key => allowedUpdates.includes(key))
            .map((key, index) => `${key} = $${index + 2}`);

        if (updateFields.length === 0) return null;

        try {
            const result = await query(
                `UPDATE places
                 SET ${updateFields.join(', ')}, updated_at = CURRENT_TIMESTAMP
                 WHERE id = $1
                 RETURNING *`,
                [id, ...Object.values(updates).filter((_, index) => index < updateFields.length)]
            );
            return result[0];
        } catch (error) {
            throw new Error(`Error updating place: ${error.message}`);
        }
    }
}

module.exports = Place;