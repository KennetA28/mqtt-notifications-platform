import { Inject, Injectable } from '@nestjs/common';
import { MqttService } from './mqtt/mqtt.service';
import { Apk} from 'node-apk'
@Injectable()
export class AppService {
  constructor(private mqttService:MqttService){}
  getHello(): string {

    return this.mqttService.publish("/info", "Hello from nest and mqtt");
  }

 async getAPKInfo(path:string):Promise<any>{

    const apk = new Apk(path)
    const {versionCode, versionName, package:id} = await apk.getManifestInfo()
    const certs = await apk.getCertificateInfo()
    apk.close()

    return {versionCode, versionName, id, certs}
  }
}
