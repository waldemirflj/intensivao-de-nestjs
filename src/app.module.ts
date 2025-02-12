import { Module } from '@nestjs/common';

import { UserModule } from './user/user.module';

@Module({
  imports: [UserModule],
  providers: [],
  controllers: [],
})
export class AppModule {}
