import dotenv from 'dotenv';
import express from 'express';
import path from 'path';
import mysql from 'mysql2/promise';
import process from 'process';

dotenv.config();

const app = express();
const __dirname = path.resolve();

// Initialize database connection
let db;
async function initializeDatabase() {
    console.log('Initializing database');
    try {
        db = await mysql.createConnection(process.env.JAWSDB_MARIA_URL || process.env.DB_URL);
        console.log('Connected to the database');
    } catch (error) {
        console.error('Error connecting to the database:', error);
        process.exit(1); // Exit the app if the database connection fails
    }
}

initializeDatabase();

// API route to query the database
app.get('/api/products', async (req, res) => {
    console.log('API endpoint /api/products hit');
    try {
        if (!db) {
            console.log('Database connection not established');
            return res.status(500).send('Database connection not established');
        }

        const [rows] = await db.execute('SELECT * FROM products');
        console.log('Database query successful');
        res.json(rows);
    } catch (error) {
        console.error('Error querying the database:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Serve static files from the React app in production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../build')));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../build', 'index.html'));
    });
} else if (process.env.NODE_ENV === 'development') {
    app.use(express.static(path.join(__dirname, '../client')));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../client', 'index.html'));
    });
}

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});