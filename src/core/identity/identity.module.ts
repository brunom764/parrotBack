import { Module } from '@nestjs/common'
import { IdentityController } from './identity.controller'
import { IdentityService } from './identity.service'
import { IdentityRepository } from './identity.repository'

@Module({
	controllers: [IdentityController],
	providers: [IdentityService, IdentityRepository],
	exports: [IdentityService]
})
export class IdentityModule {}
