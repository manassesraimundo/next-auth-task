import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    try {
        const response = await db.task.findMany({
            // include: {
            //     Task: {
            //         orderBy: {
            //             createdAt: 'desc'
            //         }
            //     }
            // }
        })
        return NextResponse.json({ data: response }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: error }, { status: 500 })
    }
}