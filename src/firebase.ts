import firebase from "firebase/app";
import "firebase/app";
import "firebase/firestore";
import "firebase/auth";

// const firebaseApp = firebase.initializeApp({
// 	apiKey: process.env.NEXT_PUBLIC_APIKEY,
// 	authDomain: process.env.NEXT_PUBLIC_AUTHDOMAIN,
// 	databaseUrl: process.env.NEXT_PUBLIC_DATABASE_URL,
// 	projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
// 	storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
// 	SenderId: process.env.NEXT_PUBLIC_SENDER_ID,
// 	appId: process.env.NEXT_PUBLIC_APP_ID,
// });
const config = {
	apiKey: process.env.NEXT_PUBLIC_APIKEY,
	authDomain: process.env.NEXT_PUBLIC_AUTHDOMAIN,
	databaseUrl: process.env.NEXT_PUBLIC_DATABASE_URL,
	projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
	storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
	SenderId: process.env.NEXT_PUBLIC_SENDER_ID,
	appId: process.env.NEXT_PUBLIC_APP_ID,
}

const firebaseApp = !firebase.apps.length ? firebase.initializeApp(config) : firebase.app();
// const firebaseApp = !firebase.apps.length && firebase.initializeApp(config);

export const db = firebaseApp.firestore();
export const auth = firebase.auth();
