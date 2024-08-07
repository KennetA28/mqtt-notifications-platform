import { Inject, Injectable } from '@nestjs/common';
import { MqttService } from './mqtt/mqtt.service';

@Injectable()
export class AppService {
  constructor(private mqttService:MqttService){}
  getHello(): string {

    return this.mqttService.publish("/info", "Hello from nest and mqtt");
  }
}
