// prisma/seed.ts
import { PrismaClient, Prisma } from '../src/generated/prisma/client';
import { Period, Status } from '../src/generated/prisma/enums';
import { PrismaPg } from '@prisma/adapter-pg';
import { fakerFR as faker } from '@faker-js/faker';
import * as argon2 from 'argon2';

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }),
});

faker.seed(42); // mêmes données à chaque run (retire pour du pur aléatoire)

// ─── Helpers ─────────────────────────────────────────────────────────
const time = (h: number, m = 0) => new Date(Date.UTC(1970, 0, 1, h, m));
const randInt = (min: number, max: number) => faker.number.int({ min, max });
const pick = <T>(arr: T[]): T => faker.helpers.arrayElement(arr);

const serviceDates = Array.from({ length: 14 }, (_, i) => {
  const d = new Date(Date.UTC(2026, 5, 24));
  d.setUTCDate(d.getUTCDate() + i);
  return d;
});

async function main() {
  await prisma.reservation.deleteMany();
  await prisma.serviceSlot.deleteMany();
  await prisma.table.deleteMany();
  await prisma.restaurant.deleteMany();
  await prisma.diner.deleteMany();

  const RESTAURANT_COUNT = 300;
  const DINER_COUNT = 2000;

  const testHash = await argon2.hash('password123');

  // ─── Admins (diners avec compte, gérant les restaurants) ───────────
  // un admin par restaurant (ou un pool partagé si un admin gère plusieurs)
  const admins = await Promise.all(
    Array.from({ length: RESTAURANT_COUNT }, () => {
      const firstName = faker.person.firstName();
      const lastName = faker.person.lastName();
      return prisma.diner.create({
        data: {
          firstName,
          lastName,
          email: faker.internet.email({ firstName, lastName }).toLowerCase(),
          phone: faker.phone.number({ style: 'international' }),
          passwordHash: testHash, // les admins ont toujours un compte
        },
      });
    }),
  );
  console.log(`✅ ${admins.length} admins créés`);

  // ─── Restaurants (tables + créneaux + admin) ───────────────────────
  for (let i = 0; i < RESTAURANT_COUNT; i++) {
    const tableCount = randInt(4, 12);
    const tables = Array.from({ length: tableCount }, (_, idx) => ({
      number: idx + 1,
      seats: pick([2, 2, 2, 4, 4, 6, 8]),
    }));
    const capacity = tables.reduce((sum, t) => sum + t.seats, 0);

    const openDays = faker.helpers.arrayElements(serviceDates, randInt(5, 14));
    const serviceSlots: Prisma.ServiceSlotCreateWithoutRestaurantInput[] =
      openDays.flatMap((d) => {
        const slots: Prisma.ServiceSlotCreateWithoutRestaurantInput[] = [];
        if (faker.datatype.boolean(0.7)) {
          slots.push({
            date: d,
            period: Period.LUNCH,
            openingTime: time(12, 0),
            closingTime: time(14, 30),
            capacity,
          });
        }
        if (faker.datatype.boolean(0.9)) {
          slots.push({
            date: d,
            period: Period.DINNER,
            openingTime: time(19, 0),
            closingTime: time(22, 30),
            capacity,
          });
        }
        return slots;
      });

    await prisma.restaurant.create({
      data: {
        name: `${pick(['Le', 'La', 'Chez', 'Bistrot', 'Maison'])} ${faker.person.lastName()}`,
        line1: `${randInt(1, 200)} ${faker.location.street()}`,
        line2: faker.datatype.boolean(0.3) ? `${randInt(1, 5)}e étage` : null,
        city: faker.location.city(),
        postCode: faker.location.zipCode('#####'),
        country: 'France',
        admin: { connect: { id: admins[i].id } }, // un admin distinct par resto
        tables: { create: tables },
        serviceSlots: { create: serviceSlots },
      },
    });
  }
  console.log(`✅ ${RESTAURANT_COUNT} restaurants créés`);

  // ─── Convives ordinaires (le reste) ────────────────────────────────
  await prisma.diner.createMany({
    data: Array.from({ length: DINER_COUNT }, () => {
      const firstName = faker.person.firstName();
      const lastName = faker.person.lastName();
      return {
        firstName,
        lastName,
        email: faker.internet.email({ firstName, lastName }).toLowerCase(),
        phone: faker.phone.number({ style: 'international' }),
        passwordHash: faker.datatype.boolean(0.3) ? testHash : null,
      };
    }),
    skipDuplicates: true,
  });
  console.log(`✅ ${DINER_COUNT} convives créés`);

  // ─── Réservations ──────────────────────────────────────────────────
  const allSlots = await prisma.serviceSlot.findMany({
    select: { id: true, capacity: true },
  });
  const allDiners = await prisma.diner.findMany({ select: { id: true } });

  const reservations: Prisma.ReservationCreateManyInput[] = [];
  for (const slot of allSlots) {
    const fillRate = faker.number.float({ min: 0.4, max: 0.9 });
    let seatsLeft = Math.floor(slot.capacity * fillRate);

    // diners distincts pour CE slot, mélangés
    const shuffledDiners = faker.helpers.shuffle(allDiners);
    let dinerIdx = 0;

    while (seatsLeft >= 2 && dinerIdx < shuffledDiners.length) {
      const pax = Math.min(randInt(1, 6), seatsLeft);
      seatsLeft -= pax;
      reservations.push({
        serviceSlotId: slot.id,
        dinerId: shuffledDiners[dinerIdx].id, // diner unique pour ce slot
        pax,
        status: pick([
          Status.PREBOOKED,
          Status.BOOKED,
          Status.BOOKED,
          Status.COMPLETE,
          Status.NO_SHOW,
        ]),
      });
      dinerIdx++;
    }
  }
  await prisma.reservation.createMany({ data: reservations });
  console.log(`✅ ${reservations.length} réservations créées`);

  console.log('🌱 Seed terminé');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
