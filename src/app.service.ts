import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Welcome to forkflow-api ! For GraphQL, call 911 (lol, no ! Call : POST - http<s>://<ip>:<port>/graphql';
  }
}
