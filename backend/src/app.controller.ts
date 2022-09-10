import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
} from '@nestjs/common';
import * as dayjs from 'dayjs';
import { MeetingsService } from './meetings/meetings.service';

@Controller('/api')
export class AppController {
  constructor(private readonly meetingsService: MeetingsService) {}

  @Get('/meetings')
  getMeetings() {
    return this.meetingsService.findAll();
  }

  @Post('/meetings')
  postMeeting(
    @Body() { title, from, to }: { title: string; from: string; to: string },
  ) {
    console.log('postMeeting', title, from, to);
    if (!title || !dayjs(from).isValid() || !dayjs(to).isValid()) {
      throw new BadRequestException('Invalid input');
    }

    return this.meetingsService.create({
      title,
      from: dayjs(from).toDate(),
      to: dayjs(to).toDate(),
      zoomLink: '',
    });
  }
}
