// prisma/seed.ts
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.upsert({
    where: { email: "demo@launchbox.app" },
    update: {},
    create: {
      name: "Demo User",
      email: "demo@launchbox.app",
      image: "",
    },
  });

  await prisma.product.createMany({
    data: [
      {
        name: "Taskade",
        slogan: "taskade", 
        description: "Build a second brain for your team.",
        image: "https://via.placeholder.com/600x400",
        tags: ["AI", "Team"].join(","), 
        url: "",
        userId: user.id,
      },
      {
        name: "Framer",
        slogan: "framer",
        description: "Design stunning interactive products.",
        image: "https://via.placeholder.com/600x400",
        tags: ["Design"].join(","), 
        url: "",
        userId: user.id,
      },
    ],
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
