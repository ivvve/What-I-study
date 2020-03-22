import { Injectable } from '@nestjs/common';

@Injectable()
export class FcmPushSender {
  async send(receiverFcmToken: string, message: string): Promise<void> {
    // tslint:disable-next-line:no-console
    console.log('Sending fcm token', receiverFcmToken, message);
  }
}
