import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MqttModule } from './mqtt/mqtt.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MqttService } from './mqtt/mqtt.service';

@Module({
  imports: [ConfigModule.forRoot({
    envFilePath:'.env',
    isGlobal:true
  })],
  controllers: [AppController],
  providers: [AppService, ConfigService, MqttService],
})
export class AppModule {}
