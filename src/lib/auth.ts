import { NextAuthOptions } from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";
import GoogleProvider from 'next-auth/providers/google';

import { PrismaAdapter } from "@next-auth/prisma-adapter";

import bcrypt from 'bcrypt'
import { db } from "@/lib/db";

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(db),
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/login"
    },

    session: {
        strategy: "jwt"
    },

    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),

        CredentialProvider({
            name: "credentials",
            credentials: {
                email: { label: "email", type: "email", placeholder: "" },
                password: { label: "password", type: "password", placeholder: "" },
            },
            async authorize(credentials, req) {
                if (!credentials?.email || !credentials?.password) throw new Error("Credencial invalida!");

                const user = await db.user.findUnique({
                    where: {
                        email: credentials?.email
                    }
                });

                if (!user) throw new Error("Usuario invalido!")

                const pass = await bcrypt.compare(credentials?.password, user.password as string)

                if (!pass) throw new Error("Senha incorrecta!")

                return {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    image: user.image
                }
            }
        })
    ],

    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                return {
                    ...token,
                    name: user.name,
                    id: user.id,
                    email: user.email,
                }
            }
            return token
        },
        async session({ session, token }) {
            return {
                ...session,
                user: {
                    ...session.user,
                    name: token.name,
                    id: token.id,
                    email: token.email
                }
            }
        },

    },
}