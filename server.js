import express from 'express';
import path from 'path';
import admin from './src/firebaseAdmin.js';

const app = express();
const __dirname = path.resolve();

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'build')));

app.get('/api/update-stock', async (req, res) => {
    const dbRef = admin.database().ref('products/1');
    await dbRef.update({ stock: 15 });
    res.send('Stock updated');
});

// Handles any requests that don't match the ones above
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});