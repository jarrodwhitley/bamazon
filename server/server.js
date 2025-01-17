import dotenv from 'dotenv';
import express from 'express';
import path from 'path';
import mysql from 'mysql2/promise';
import process from 'process';

dotenv.config();

const app = express();
app.use(express.json());
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
// Function to process reviews
function processReviews(row) {
    const reviews = [];
    let index = 0;

    while (row[`reviews_${index}_rating`] !== undefined) {
        reviews.push({
            rating: row[`reviews_${index}_rating`],
            comment: row[`reviews_${index}_comment`],
            date: row[`reviews_${index}_date`],
            reviewerName: row[`reviews_${index}_reviewerName`],
            reviewerEmail: row[`reviews_${index}_reviewerEmail`]
        });
        index++;
    }
    return reviews;
}
function processImages(row) {
    return row.images ? row.images.split(',') : [];
}
function processTags(row) {
    return row.tags ? row.tags.split(',') : [];
}

initializeDatabase();

// API route to query the database
app.get('/api/products', async (req, res) => {
    try {
        if (!db) {
            return res.status(500).send('Database connection not established');
        }
        const [rows] = await db.execute('SELECT * FROM products');
        // Convert the images column from a comma-separated string to an array
        const formattedRows = rows.map(row => ({
            ...row,
            images: processImages(row),
            tags: processTags(row),
            reviews: processReviews(row)
        }));
        res.json(formattedRows);
    } catch (error) {
        console.error('Error querying the database:', error);
        res.status(500).send('Internal Server Error');
    }
});

// API route to handle checkout and update stock values
app.put('/api/checkout', async (req, res) => {
    const { items } = req.body;

    try {
        if (!db) {
            return res.status(500).json({ error: 'Database connection not established' });
        }

        // Start a transaction
        await db.beginTransaction();

        // Update stock values for each item in the cart
        for (const item of items) {
            const [rows] = await db.execute('SELECT stock FROM products WHERE id = ?', [item.id]);
            if (rows.length === 0) {
                throw new Error(`Product with id ${item.id} not found`);
            }

            const currentStock = rows[0].stock;
            console.log('Current stock:', currentStock);
            console.log('item.quantity', item.quantity);
            if (currentStock < item.quantity) {
                throw new Error(`Insufficient stock for product with id ${item.id}`);
            }

            await db.execute('UPDATE products SET stock = stock - ? WHERE id = ?', [item.quantity, item.id]);
        }

        // Commit the transaction
        await db.commit();

        res.status(200).json({ message: 'Checkout successful and stock updated' }); // Send JSON response
    } catch (error) {
        // Rollback the transaction in case of error
        await db.rollback();
        console.error('Error during checkout:', error);
        res.status(500).json({ error: 'Internal Server Error' }); // Send JSON response
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