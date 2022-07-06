import { Controller, Get, Inject, CACHE_MANAGER } from '@nestjs/common';
import { AppService } from './app.service';
import { Cache } from 'cache-manager';

@Controller()
export class AppController {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache, private readonly appService: AppService) {}

  fakeString = "My name is Yusuf";

  @Get("fake-string")
  async getSimpleString() {
    let value = await this.cacheManager.get('my-fake-string');
    if (value) {
      return {
        data: value,
        loadsFrom: 'redis cache'
      };
    }

    await this.cacheManager.set('my-fake-string', this.fakeString, { ttl: 300 });
    return {
      data: this.fakeString,
      loadsFrom: 'fake database'
    };
  }
}
