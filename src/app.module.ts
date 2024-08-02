import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MqttModule } from './mqtt/mqtt.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [MqttModule,ConfigModule.forRoot({
    envFilePath:'.env',
    isGlobal:true
  })],
  controllers: [AppController],
  providers: [AppService, ConfigService],
})
export class AppModule {}
