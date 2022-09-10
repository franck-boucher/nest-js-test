import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MeetingsService } from './meetings/meetings.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [MeetingsService],
})
export class AppModule {}
