// prisma/seed.ts
import { PrismaClient } from '../src/generated/prisma/client';
import { Period } from '../src/generated/prisma/enums';
import { PrismaPg } from '@prisma/adapter-pg';

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }),
});

async function main() {
  // On repart propre à chaque seed (ordre inverse des dépendances)
  await prisma.reservation.deleteMany();
  await prisma.serviceSlot.deleteMany();
  await prisma.table.deleteMany();
  await prisma.diner.deleteMany();
  await prisma.restaurant.deleteMany();

  // Helper : construit un horaire TIME (la date du jour importe peu, seule l'heure compte)
  const time = (h: number, m = 0) => new Date(Date.UTC(1970, 0, 1, h, m));
  const day = (iso: string) => new Date(`${iso}T00:00:00.000Z`);

  // ─── Restaurant 1 : bistrot parisien ───────────────────────────────
  await prisma.restaurant.create({
    data: {
      name: 'Le Petit Comptoir',
      line1: '14 rue Oberkampf',
      line2: '',
      city: 'Paris',
      postCode: '75011',
      country: 'France',
      tables: {
        create: [
          { number: 1, seats: 2 },
          { number: 2, seats: 2 },
          { number: 3, seats: 4 },
          { number: 4, seats: 4 },
          { number: 5, seats: 6 },
          { number: 6, seats: 8 },
        ],
      },
      serviceSlots: {
        create: [
          {
            date: day('2026-06-24'),
            period: Period.LUNCH,
            openingTime: time(12, 0),
            closingTime: time(14, 30),
            capacity: 26, // somme des couverts ci-dessus
          },
          {
            date: day('2026-06-24'),
            period: Period.DINNER,
            openingTime: time(19, 0),
            closingTime: time(22, 30),
            capacity: 26,
          },
          {
            date: day('2026-06-25'),
            period: Period.DINNER,
            openingTime: time(19, 0),
            closingTime: time(22, 30),
            capacity: 26,
          },
        ],
      },
    },
  });

  // ─── Restaurant 2 : table gastronomique lyonnaise ──────────────────
  await prisma.restaurant.create({
    data: {
      name: 'Maison Garance',
      line1: '8 quai Saint-Antoine',
      line2: '2e étage',
      city: 'Lyon',
      postCode: '69002',
      country: 'France',
      tables: {
        create: [
          { number: 1, seats: 2 },
          { number: 2, seats: 2 },
          { number: 3, seats: 2 },
          { number: 4, seats: 4 },
          { number: 5, seats: 4 },
        ],
      },
      serviceSlots: {
        create: [
          {
            date: day('2026-06-24'),
            period: Period.DINNER,
            openingTime: time(19, 30),
            closingTime: time(22, 0),
            capacity: 14,
          },
          {
            date: day('2026-06-26'),
            period: Period.LUNCH,
            openingTime: time(12, 0),
            closingTime: time(13, 30),
            capacity: 14,
          },
        ],
      },
    },
  });

  // ─── Quelques convives, avec un profil "no-show" pour le J5 ─────────
  await prisma.diner.createMany({
    data: [
      {
        email: 'camille.roux@example.com',
        phone: '+33611223344',
        firstName: 'Camille',
        lastName: 'Roux',
      },
      {
        email: 'noah.lefevre@example.com',
        phone: '+33622334455',
        firstName: 'Noah',
        lastName: 'Lefèvre',
      },
      {
        email: 'lina.moreau@example.com',
        phone: '+33633445566',
        firstName: 'Lina',
        lastName: 'Moreau',
      },
      {
        email: 'tom.girard@example.com',
        phone: '+33644556677',
        firstName: 'Tom',
        lastName: 'Girard',
      },
    ],
  });

  console.log('✅ Seed terminé');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
