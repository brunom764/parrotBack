import { Module } from '@nestjs/common'
import { IdentityController } from './identity.controller'
import { IdentityService } from './identity.service'
import { PrismaService } from 'src/services/prisma.service'
import { IdentityDatabase } from 'src/database/identity'

@Module({
	controllers: [IdentityController],
	providers: [IdentityService, PrismaService, IdentityDatabase],
	exports: [IdentityService]
})
export class IdentityModule {}
