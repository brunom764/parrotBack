import { Global, Module } from '@nestjs/common'
import { AssemblyService } from './assembly.service'

@Global()
@Module({
	providers: [AssemblyService],
	exports: [AssemblyService]
})
export class AssemblyModule {}
