import { ConfigModule } from '@nestjs/config'
import { JwtAuthGuard } from './auth.guard'
import { Module } from '@nestjs/common'

@Module({
	imports: [ConfigModule],
	providers: [JwtAuthGuard],
	exports: [JwtAuthGuard]
})
export class AuthModule {}
