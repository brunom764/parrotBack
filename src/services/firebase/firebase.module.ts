import * as admin from 'firebase-admin'
import { Module, Global } from '@nestjs/common'
import { FirebaseService } from './firebase.service'
import { ConfigModule, ConfigService } from '@nestjs/config'

const firebaseProvider = {
	provide: 'FIREBASE_APP',
	inject: [ConfigService],
	useFactory: (configService: ConfigService) => {
		const firebaseConfig = {
			type: configService.get<string>('FIREBASE_TYPE'),
			projectId: configService.get<string>('FIREBASE_PROJECT_ID'),
			privateKeyId: configService.get<string>('FIREBASE_PRIVATE_KEY_ID'),
			privateKey: configService
				.get<string>('FIREBASE_PRIVATE_KEY')
				.replace(/\\n/gm, '\n'),
			clientEmail: configService.get<string>('FIREBASE_CLIENT_EMAIL'),
			clientId: configService.get<string>('FIREBASE_CLIENT_ID'),
			authUri: configService.get<string>('FIREBASE_AUTH_URI'),
			tokenUri: configService.get<string>('FIREBASE_TOKEN_URI'),
			authProviderCertURL: configService.get<string>('FIREBASE_AUTH_PROVIDER_CERT_URL'),
			clientCertURL: configService.get<string>('FIREBASE_CLIENT_CERT_URL')
		} as admin.ServiceAccount

		return admin.initializeApp({
			credential: admin.credential.cert(firebaseConfig),
			databaseURL: `https://${firebaseConfig.projectId}.firebaseio.com`,
			storageBucket: `${firebaseConfig.projectId}.appspot.com`
		})
	}
}

@Global()
@Module({
	imports: [ConfigModule],
	providers: [firebaseProvider, FirebaseService],
	exports: [FirebaseService]
})
export class FirebaseModule {}
