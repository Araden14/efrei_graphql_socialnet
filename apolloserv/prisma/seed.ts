import { PrismaClient } from "@prisma/client";
import { hashPassword } from "../src/utils/hash.ts";

const prisma = new PrismaClient();

async function main() {
  try {
    console.log("🌱 Insertion des données de test...");

    // Création des utilisateurs
    const users = await Promise.all([
      prisma.user.create({
        data: {
          email: "alice@example.com",
          password: await hashPassword("password123"),
          username: "Alice",
        },
      }),
      prisma.user.create({
        data: {
          email: "bob@example.com",
          password: await hashPassword("password123"),
          username: "Bob",
        },
      }),
    ]);

    console.log("✅ Utilisateurs créés :", users);

    // Création des posts
    const posts = await Promise.all([
      prisma.post.create({
        data: {
          title: "Hello World",
          content: "Mon premier post!",
          authorId: users[0].id,
        },
      }),
      prisma.post.create({
        data: {
          title: "Deuxième post",
          content: "Un autre super post!",
          authorId: users[1].id,
        },
      }),
    ]);

    console.log("✅ Posts créés :", posts);

    // Création des commentaires
    const comments = await Promise.all([
      prisma.comment.create({
        data: {
          content: "Super post Alice!",
          authorId: users[1].id,
          postId: posts[0].id,
        },
      }),
      prisma.comment.create({
        data: {
          content: "Merci Bob!",
          authorId: users[0].id,
          postId: posts[1].id,
        },
      }),
    ]);

    console.log("✅ Commentaires ajoutés :", comments);

    // Ajout de likes
    const likes = await Promise.all([
      prisma.like.create({
        data: {
          userId: users[0].id,
          postId: posts[1].id,
        },
      }),
      prisma.like.create({
        data: {
          userId: users[1].id,
          postId: posts[0].id,
        },
      }),
    ]);

    console.log("✅ Likes ajoutés :", likes);

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
