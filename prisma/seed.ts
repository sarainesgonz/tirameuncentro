import { PrismaClient } from "@prisma/client";
import { usersData } from "./usersData";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

async function seedUsers() {
    await Promise.all(
     usersData.map( async user => {
            return await prisma.user.create({
                data: {
                    email: user.email,
                    emailVerified: new Date(),
                    name: user.name,
                    passwordHash: await hash('password', 10),
                    image: user.image,
                    createdAt: new Date(user.created),
                    updatedAt: new Date(user.lastActive),
                    member: {
                        create: {
                            dob: new Date(user.dob),
                            gender: user.gender,
                            name: user.name,
                            createdAt: new Date(user.created),
                            updatedAt: new Date(user.lastActive),
                            description: user.description,
                            city: user.city,
                            country: user.country,
                            image: user.image,
                            photos: {
                                create:
                                {
                                    url: user.image,
                                }
                            },

                        }
                    }
                },
            })
        })
    )
};

async function main() {
    await seedUsers();
    console.log("dabatase seeded");

}

main().catch(e => {
    console.error(e);
    process.exit(1);
}).finally(async () => {
    await prisma.$disconnect();
});