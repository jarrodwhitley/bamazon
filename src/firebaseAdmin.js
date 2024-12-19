import admin from "firebase-admin";

const serviceAccount = JSON.parse(import.meta.env.VITE_FIREBASE_SERVICE_ACCOUNT);

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL
});

export { admin }
export default admin;