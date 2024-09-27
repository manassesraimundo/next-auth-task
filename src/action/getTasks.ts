"use server";

import { db } from "@/lib/db";

import { getIdUser } from "./user";

export async function getTasks() {

    const id = await getIdUser()

    const response = await db.task.findMany({
        where: {
            userId: id
        },
        orderBy: {
            createdAt: 'desc'
        }
    })
    return response;
}

export async function getTasksImportant() {

    const id = await getIdUser()

    const response = await db.task.findMany({
        where: {
            userId: id,
            important: true
        },
        orderBy: {
            createdAt: 'desc'
        }
    })
    return response;
}

export async function getTasksCompleted() {

    const id = await getIdUser()
    
    const response = await db.task.findMany({
        where: {
            userId: id,
            completed: true
        },
        orderBy: {
            createdAt: 'desc'
        }
    })
    return response;
}

export async function DeleteTask(id: string) {
    await db.task.delete({
        where: {
            id
        }
    })
}

export async function CompletedTask(id: string, value: boolean) {
    await db.task.update({
        where: {
            id
        },
        data: {
            completed: value
        }
    })
}
