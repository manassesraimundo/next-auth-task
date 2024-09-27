"use client";

import React from "react";
import styles from "@/styles/form-login.module.css";

import { signIn } from 'next-auth/react'
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Input from "./ui/input";
import Button from "./ui/button";
import { FaGoogle } from "react-icons/fa";

import { MdLogin } from "react-icons/md";
import { z } from "zod";

// Definindo o esquema de validação com Zod
const registerSchema = z.object({
    email: z.string().email("Formato de e-mail inválido"),
    password: z.string().min(8, "A senha deve ter no mínimo 8 caracteres")
});

const FormLogin = () => {
    const route = useRouter()

    const [isPending, startTransition] = React.useTransition();
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')

    const [errors, setErrors] = React.useState<{ [key: string]: string }>({});

    const handleSumit = (e: React.FormEvent) => {
        e.preventDefault()

        setErrors({})
        // Validar os dados do formulário usando o Zod
        const result = registerSchema.safeParse({ email, password });

        if (!result.success) {
            // Exibe os erros de validação
            const errorMessages = result.error.errors.reduce((acc, err) => {
                acc[err.path[0]] = err.message;
                return acc;
            }, {} as { [key: string]: string });

            setErrors(errorMessages);
            return;
        }

        setErrors({});

        startTransition(
            async () => {
                const res = await signIn('credentials', {
                    email,
                    password,
                    redirect: false
                })

                if (res?.ok) {
                    toast.success('Login sucesso!')
                    route.replace('/home')
                    route.refresh()
                }

                if (res?.error) {
                    toast.error(res.error)
                }

            })
    }

    return (
        <form onSubmit={handleSumit}>
            <Input
                placeholder="emali@exmplo.com"
                onChange={t => setEmail(t)}
                type="email"
            />
            {errors.email && <span className={styles.error}>{errors.email}</span>}

            <Input placeholder="*********"
                onChange={t => setPassword(t)}
                type="password"
                password
            />
            {errors.password && <span className={styles.error}>{errors.password}</span>}

            <Button
                laber="Entrar" 
                type="submit"
                logn
                disabled={isPending}
            />

            {
                !isPending && (
                    <div className={styles.option}>
                        <span></span>
                        ou
                        <span></span>
                    </div>
                )
            }

            <div className={styles.buttonLoginGoogle}>
                {
                    !isPending && (
                        <button onClick={() => signIn('google')} type="button" className={styles.btnGoogle}>
                            <FaGoogle size={24} color="#4285F4" />
                            <span>Login com o Google</span>
                            <MdLogin size={24} color="#000" />
                        </button>
                    )
                }
            </div>     
        </form>
    )
}

export default FormLogin;