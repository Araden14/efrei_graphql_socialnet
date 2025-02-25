import { PrismaClient } from "@prisma/client";
import { hashPassword } from "../src/utils/hash.js";

const prisma = new PrismaClient();

async function main() {
  await prisma.user.create({
    data: {
      email: "test@example.com",
      password: await hashPassword("password123"),
      name: "Test User",
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });