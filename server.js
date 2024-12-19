import express from 'express';
import admin from './src/firebaseAdmin.js';

const app = express();

app.get('/update-stock', async (req, res) => {
    const dbRef = admin.database().ref('products/1');
    await dbRef.update({ stock: 15 });
    res.send('Stock updated');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});