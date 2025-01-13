import express from 'express';
import path from 'path';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const __dirname = path.resolve();

// Initialize database connection
let db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
})

db.connect((err) => {
    if (err) {
      console.error('Error connecting to database: ', err);
      return;
    }
    console.log('Connected to the database');
  });
/* eslint-disable */
// async function initializeDatabase() {
//     console.log('Initializing database');
//     try {
//         db = await mysql.createConnection(process.env.JAWSDB_MARIA_URL);
//         console.log('Connected to the database');
//     } catch (error) {
//         console.error('Error connecting to the database:', error);
//         process.exit(1); // Exit the app if the database connection fails
//     }
// }
// /* eslint-enable */

// initializeDatabase();

// API route to query the database
app.get('/products', async (req, res) => {
    try {
        if (!db) {
            return res.status(500).send('Database connection not established');
        }

        const [rows] = await db.execute('SELECT * FROM products');
        res.json(rows);
    } catch (error) {
        console.error('Error querying the database:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'build')));

// Handle all other requests
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Start the server
 
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});