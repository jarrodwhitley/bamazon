import admin from "firebase-admin";
const serviceAccount = import.meta.env.serviceAccount;

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: import.meta.env.databaseURL
});

export default admin;