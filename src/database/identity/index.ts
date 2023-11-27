import { PrismaService } from '@/services/prisma.service'
import { Inject, Injectable } from '@nestjs/common'

@Injectable()
export class IdentityDatabase {
	constructor(@Inject(PrismaService) protected prisma: PrismaService) {}
}
