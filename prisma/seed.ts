// prisma/seed.ts
import { PrismaClient, Prisma } from '../src/generated/prisma/client';
import { Period, Status } from '../src/generated/prisma/enums';
import { PrismaPg } from '@prisma/adapter-pg';
import { fakerFR as faker } from '@faker-js/faker';
import * as argon2 from 'argon2';

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }),
});

faker.seed(42); // mêmes données à chaque run (sauf les dates, désormais relatives à aujourd'hui)

// ─── Helpers ─────────────────────────────────────────────────────────
const time = (h: number, m = 0) => new Date(Date.UTC(1970, 0, 1, h, m));
const randInt = (min: number, max: number) => faker.number.int({ min, max });
const pick = <T>(arr: T[]): T => faker.helpers.arrayElement(arr);

// 14 jours À PARTIR DE DEMAIN (toujours dans le futur, peu importe la date du run)
const serviceDates = Array.from({ length: 14 }, (_, i) => {
  const d = new Date();
  d.setUTCHours(0, 0, 0, 0);
  d.setUTCDate(d.getUTCDate() + i + 1); // +1 = à partir de demain ; mets +i pour inclure aujourd'hui
  return d;
});

// ─── Pool d'images de bannière (restaurants / food) ──────────────────
const BANNER_IDS = [
  '1517248135467-4c7edcad34c4', // salle de resto
  '1414235077428-338989a2e8c0', // resto cosy
  '1551632436-cbf8dd35adfa', // intérieur lumineux
  '1559339352-11d035aa65de', // bar / comptoir
  '1466978913421-dad2ebd01d17', // table dressée
  '1552566626-52f8b828add9', // brasserie
  '1424847651672-bf20a4b0982b', // terrasse
  '1564844536308-5b2a3b4e8c0f', // plat gastro
  '1517919008402-25a5f6e94e9f', // ambiance tamisée
  '1555396273-367ea4eb4db5', // cuisine ouverte
  '1565299624946-b28f40a0ae38', // pizza / food
  '1504674900247-0877df9cc836', // assiette
  '1540189549336-e6e99c3679fe', // healthy bowl
  '1466637574441-749b8f19452f', // marché / frais
];

// Teste une fois quelles images du pool répondent (200), pour ne jamais assigner une URL morte
async function buildLiveBannerPool(): Promise<string[]> {
  const live = await Promise.all(
    BANNER_IDS.map(async (id) => {
      try {
        const res = await fetch(
          `https://images.unsplash.com/photo-${id}?w=100`,
          { method: 'HEAD', signal: AbortSignal.timeout(3000) },
        );
        return res.ok ? id : null;
      } catch {
        return null;
      }
    }),
  );
  return live.filter((id): id is string => id !== null);
}

// URL de bannière : pool resto si dispo, sinon fallback Picsum (déterministe par resto)
function makeBannerUrl(i: number, livePool: string[]): string {
  if (livePool.length > 0) {
    const id = livePool[i % livePool.length];
    return `https://images.unsplash.com/photo-${id}?w=1200&h=400&fit=crop&q=80&sig=${i}`;
  }
  return `https://picsum.photos/seed/forkflow-${i}/1200/400`;
}

const RESTAURANT_STYLES = [
  'Chinese',
  'French',
  'British',
  'Italian',
  'American',
  'Greek',
  'Spanish',
  'Brazilian',
  'Japanese',
  'Korean',
  'Moroccan',
  'Tunisian',
  'Algerian',
];

async function main() {
  await prisma.reservation.deleteMany();
  await prisma.serviceSlot.deleteMany();
  await prisma.table.deleteMany();
  await prisma.restaurant.deleteMany();
  await prisma.diner.deleteMany();

  const RESTAURANT_COUNT = 100;
  const DINER_COUNT = 1000;

  const testHash = await argon2.hash('password123');

  // ─── Admins (diners avec compte, gérant les restaurants) ───────────
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

  // ─── Pool d'images : calculé UNE SEULE FOIS, avant la boucle ───────
  const livePool = await buildLiveBannerPool();
  console.log(
    `✅ ${livePool.length}/${BANNER_IDS.length} bannières valides${
      livePool.length === 0 ? ' → fallback Picsum' : ''
    }`,
  );

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
        bannerUrl: makeBannerUrl(i, livePool),
        style: pick(RESTAURANT_STYLES),
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
