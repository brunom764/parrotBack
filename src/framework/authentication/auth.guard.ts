import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier'
import { auth } from 'firebase-admin'

export type AuthUser = DecodedIdToken

@Injectable()
export class JwtAuthGuard implements CanActivate {
	canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest()
		return this.validateRequest(request)
	}

	protected async validateRequest(request: any): Promise<boolean> {
		try {
			if (!request.headers.authorization) {
				return false
			}

			if (!request.headers.authorization.startsWith('Bearer ')) {
				return false
			}

			const token = request.headers.authorization.split(' ')[1]
			const decodedToken = await auth().verifyIdToken(token, true)
			request.user = decodedToken
			return true
		} catch (error) {
			return false
		}
	}
}
