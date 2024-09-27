import { NextResponse } from "next/server";
import bcrypt from 'bcrypt'
import { db } from "@/lib/db";

export async function POST(request: Request) {
    try {
        const { name, email, senha } = await request.json();

        const emailExist = await db.user.findUnique({
            where: {
                email
            }
        })
        if (emailExist) return NextResponse.json({ message: 'E-mail ja cadastrado' })

        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(senha, salt)

        const newUser = await db.user.create({
            data: {
                name,
                email,
                password: hashPassword
            }
        })

        const { password, ...result } = newUser

        return NextResponse.json({ message: 'sucesso', user: result }, { status: 201 })
    } catch (error) {
        return NextResponse.json({ erro: 'Falha no servidor' }, { status: 500 })
    }
}