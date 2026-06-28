import { registerEnumType } from '@nestjs/graphql';
import { Period } from '../generated/prisma/client';

registerEnumType(Period, { name: 'Period' });

export { Period };
