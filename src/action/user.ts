'use server';

import { getServerSession } from "next-auth";

import { db } from "@/lib/db";

import { authOptions } from "@/lib/auth";

export async function getIdUser() {
    
    const session = await getServerSession(authOptions)

    const user = await db.user.findFirst({
        where: {
            id: session?.user.id
        }
    })

    return user?.id
}