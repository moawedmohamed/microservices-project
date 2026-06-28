import { Injectable } from '@nestjs/common';

@Injectable()
export class MediaService {
  ping() {
    return {
      ok: true,
      service: "catalog ",
      new: new Date().toISOString()
    };
  }
}
