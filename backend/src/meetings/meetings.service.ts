import { Injectable } from '@nestjs/common';
import { Meeting } from '@prisma/client';
import { prisma } from '../db';

export type { Meeting };

@Injectable()
export class MeetingsService {
  create(meeting: Omit<Meeting, 'id'>) {
    return prisma.meeting.create({ data: meeting });
  }

  findAll() {
    return prisma.meeting.findMany();
  }
}
