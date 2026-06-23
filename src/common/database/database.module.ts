import { Global, Module } from '@nestjs/common';
import { DatabaseService } from './database.service';

@Global() // Makes the database service available everywhere without re-importing
@Module({
  providers: [DatabaseService],
  exports: [DatabaseService],
})
export class DatabaseModule {}