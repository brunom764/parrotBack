import admin from 'firebase-admin'

export function initializeFirebase() {
	admin.initializeApp({
		credential: admin.credential.cert({
			projectId: process.env.FIREBASE_PROJECT_ID,
			privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/gm, '\n'),
			clientEmail: process.env.FIREBASE_CLIENT_EMAIL
		})
	})
}
