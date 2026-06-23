import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class DatabaseService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  async onModuleInit() {
    // Connects to your database when the app starts
    await this.$connect();
  }

  async onModuleDestroy() {
    // Safely disconnects when the app shuts down
    await this.$disconnect();
  }
}