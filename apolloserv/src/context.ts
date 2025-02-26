import { PrismaClient } from "@prisma/client";
import { User } from "@prisma/client";
export type Context = {
  dataSources: {
    db: PrismaClient,
  };
};