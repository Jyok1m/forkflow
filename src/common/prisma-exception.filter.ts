import { Catch, ConflictException, NotFoundException } from '@nestjs/common';
import { Prisma } from '../generated/prisma/client';
// @Catch cible UNE famille d'exceptions : seules celles-ci passent par ici
@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaExceptionFilter {
  catch(err: Prisma.PrismaClientKnownRequestError) {
    if (err.code === 'P2002')
      throw new ConflictException('Valeur déjà existante');
    if (err.code === 'P2025')
      throw new NotFoundException('Ressource introuvable');
    throw err; // les autres codes restent des erreurs serveur
  }
}
