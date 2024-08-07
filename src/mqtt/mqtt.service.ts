import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { connect, MqttClient } from 'mqtt';
import { debug, error, info } from 'ps-logger';

@Injectable()
export class MqttService implements OnModuleInit {
    private mqttClient: MqttClient
    
   
    onModuleInit() {
        info("Run mqtt init configuration")
        const host = process.env.MQTT_HOST
        const port = process.env.MQTT_PORT
        const clientId = process.env.MQTT_CLIENT_ID
        const username = process.env.MQTT_USER
        const password = process.env.MQTT_PASS

        if (!host || !port || !clientId || !username || !password) {
            throw Error("MQTT config isn't valid, please check it")
        }
        info(`Connecting with: ${host}`)
        const connectUrl = `mqtts://${host}:${port}`
        this.mqttClient = connect(connectUrl, {
            clientId,
            clean: true,
            connectTimeout: 2000,
            username,
            password,
            reconnectPeriod: 1000,
           log(...args) {
               debug(args)
           },
        })
        this.mqttClient.on("connect", function () {
            info("Connected to CloudMQTT");
          });
      
          this.mqttClient.on("error", function (e) {
            error("Error in connecting to CloudMQTT:"+e.message,);
          });
    }


    publish(topic: string, payload: string): string {
        info(`Publishing to ${topic}`);
        this.mqttClient.publish(topic, payload);
        return `Publishing to ${topic}`;
      }
}
