import { PrismaClient } from "@prisma/client";
import { hashPassword } from "../src/utils/hash.ts";

const prisma = new PrismaClient();

async function main() {
  try {
    console.log("🌱 Insertion des données de test...");

    // Création de l'utilisateur
    const user = await prisma.user.create({
      data: {
        email: "test@example.com",
        password: await hashPassword("password123"),
        username: "TestUser",
      },
    });

    console.log("✅ Utilisateur créé :", user);

    // Création d'un post lié à cet utilisateur
    const post = await prisma.post.create({
      data: {
        title: "Mon premier post",
        content: "It's incredible",
        authorId: user.id,
      },
    });

    console.log("✅ Post créé :", post);

    // Création d'un commentaire sur ce post
    const comment = await prisma.comment.create({
      data: {
        content: "Super post !",
        authorId: user.id,
        postId: post.id,
      },
    });

    console.log("✅ Commentaire ajouté :", comment);

    // Ajout d'un like sur ce post
    const like = await prisma.like.create({
      data: {
        userId: user.id,
        postId: post.id,
      },
    });

    console.log("✅ Like ajouté :", like);

    console.log("🌱 Seeding terminé avec succès !");
  } catch (error) {
    console.error("❌ Erreur lors du seeding :", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

// Exécuter le script
main();
