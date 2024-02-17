export const configuration = () => ({
	firebase: {
		type: process.env.FIREBASE_TYPE,
		projectId: process.env.FIREBASE_PROJECT_ID,
		privateKeyId: process.env.FIREBASE_PRIVATE_KEY_ID,
		privateKey: process.env.FIREBASE_PRIVATE_KEY,
		clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
		clientId: process.env.FIREBASE_CLIENT_ID,
		authUri: process.env.FIREBASE_AUTH_URI,
		tokenUri: process.env.FIREBASE_TOKEN_URI,
		authProviderCertURL: process.env.FIREBASE_AUTH_PROVIDER_CERT_URL,
		clientCertURL: process.env.FIREBASE_CLIENT_CERT_URL
	}
})

export type AppConfig = ReturnType<typeof configuration>
