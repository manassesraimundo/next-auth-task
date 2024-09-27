import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const body = await request.json()

        const { id, title, description, important } = body

        const data = await db.task.update({
            where: {
                id
            },
            data: {
                title,
                description,
                important
            }
        })

        return NextResponse.json({ data }, { status: 200 })

    } catch (error) {
        return NextResponse.json({ error }, { status: 500 })
    }
}