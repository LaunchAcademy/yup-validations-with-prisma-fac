import prisma from "./prisma.js";

const main = async () => {
  console.log("Seeding Hobbies");
  await prisma.unicorn.createMany({
    data: [
      {
        name: "Charlie",
        magicalAbility: "Chaos and rainbows",
        age: 205,
      },
    ],
  });
};

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
