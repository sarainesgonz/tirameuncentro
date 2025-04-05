'use server';

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function getMembers() {
    const session = await auth();
    if (!session?.user) {
        return null;
    }
    try {
        // fetch all members except the logged-in user
        return prisma.member.findMany({
            where: {
                NOT: {
                    userId: session.user.id
                }
            }
        })
    } catch (error) {
        console.error(error);
    }
}