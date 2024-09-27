import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const body = await request.json();

        const response = await db.task.create({
            data: {
                title: body.title,
                description: body.description,
                completed: body.completed,
                important: body.important,
                userId: body.userId
            }
        })

        return NextResponse.json({ message: "Succec!", response }, { status: 201 })

    } catch (error) {
        return NextResponse.json({ Error: error }, { status: 500 })
    }
}