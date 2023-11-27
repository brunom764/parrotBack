import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { AuthUser } from './auth.guard'

export const User = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
	const request = ctx.switchToHttp().getRequest()
	return request.user as AuthUser
})
