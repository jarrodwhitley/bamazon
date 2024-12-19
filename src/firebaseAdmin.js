import admin from "firebase-admin";
import dotenv from "dotenv";
dotenv.config();

const serviceAccount = JSON.parse(process.env.VITE_FIREBASE_SERVICE_ACCOUNT);
console.log('serviceAccount', serviceAccount)
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.VITE_FIREBASE_DATABASE_URL
});

export { admin }
export default admin;