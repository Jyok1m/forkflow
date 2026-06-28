import { registerEnumType } from '@nestjs/graphql';
import { Status } from '../generated/prisma/client';

registerEnumType(Status, { name: 'Status' });

export { Status };
