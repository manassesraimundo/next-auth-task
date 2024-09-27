"use client";

import React from "react";
import styles from "@/styles/form-register.module.css";

import { toast } from "sonner";
import { useRouter } from 'next/navigation';
import Input from "./ui/input";
import Button from "./ui/button";
import { z } from "zod";

// Definindo o esquema de validação com Zod
const registerSchema = z.object({
    name: z.string().min(1, "Nome é obrigatório"),
    email: z.string().email("Formato de e-mail inválido"),
    password: z.string().min(8, "A senha deve ter no mínimo 8 caracteres")
});

const FormRegister = () => {
    const route = useRouter();

    const [isPending, startTransition] = React.useTransition();
    const [name, setName] = React.useState<string>("");
    const [email, setEmail] = React.useState<string>("");
    const [password, setPassword] = React.useState<string>("");

    const [errors, setErrors] = React.useState<{ [key: string]: string }>({});
  
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        setErrors({});
        // Validar os dados do formulário usando o Zod
        const result = registerSchema.safeParse({ name, email, password });

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

        startTransition(async () => {
            await fetch('http://localhost:3000/api/user/create-user', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name,
                    email,
                    senha: password
                })
            })
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    if (data.message === 'sucesso') {
                        toast.success('Usuário criado com sucesso');
                        route.push('/login');
                    } else {
                        toast.error(data.message);
                        return null;
                    }
                })
                .catch(error => {
                    toast.error(error);
                });
        })
        
    };

    return (
        <form  onSubmit={handleSubmit}>
            <Input
                placeholder="Name"
                type="text"
                onChange={t => setName(t)}
            />
            {errors.name && <span className={styles.error}>{errors.name}</span>}

            <Input
                placeholder="E-mail"
                type="email"
                onChange={t => setEmail(t)}
            />
            {errors.email && <span className={styles.error}>{errors.email}</span>}

            <Input
                placeholder="********"
                type="password"
                onChange={t => setPassword(t)}
                password
            />
            {errors.password && <span className={styles.error}>{errors.password}</span>}

            <Button
                laber="Registrar-se"
                type="submit"
                registre
                disabled={isPending}
            />
        </form>
    );
};

export default FormRegister;
