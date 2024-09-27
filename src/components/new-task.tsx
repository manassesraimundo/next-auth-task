"use client";

import React from 'react';
import styles from '@/styles/new-task.module.css'

import { useSession } from 'next-auth/react';

import { useRouter } from 'next/navigation';

import { toast } from 'sonner';

import { IoCloseSharp } from 'react-icons/io5';
import { IoMdAdd } from "react-icons/io";

const NewTaskModal = ({ isOpen, closeModal }: any) => {

    const router = useRouter();
    const { data } = useSession();

    const [title, setTitle] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [chack, setCheck] = React.useState({
        normal: true,
        important: false
    });

    // Vaidar os Inputs
    const handleIvalid = (e: any) => {
        e.target.setCustomValidity('Por favor preencha este campo!')
    }

    const handleInput = (e: any) => {
        e.target.setCustomValidity('')
    }

    const handleOverlayClick = (e: any) => {
        if (e.target === e.currentTarget) {
            closeModal();
            setTitle('');
            setDescription('');
            setCheck({
                normal: true,
                important: false
            });
        }
    }

    const handlerCheckboxChange = (evt: any) => {
        const { name } = evt.target;
        setCheck({
            normal: name === 'Normal' ? true : false,
            important: name === 'Importante' ? true : false
        });
    }

    // Funcao que vai fechar o Modal e limpar os Inputs
    const handleCloseModal = () => {
        closeModal();
        setTitle('');
        setDescription('');
        setCheck({
            normal: true,
            important: false
        });
    }

    const handlerSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch("api/task/create-task", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title,
                    description,
                    completed: false,
                    important: chack.important,
                    userId: data?.user.id
                })
            });

            if (response.ok) {
                toast.success('Task criado com sucesso!')
                handleCloseModal();
                router.refresh();
            }
        } catch (error) {
            toast.error(error as string)
        }
    }

    // Fechar o Modal
    if (!isOpen) return null

    return (
        <div className={styles.container} onClick={handleOverlayClick}>
            <form className={`${styles.form}`} onSubmit={handlerSubmit}>
                <div className={styles.headerModal}>
                    <h2>Add Nova Task</h2>
                    <button onClick={handleCloseModal} style={{ backgroundColor: '#181818', padding: '8px' }}>
                        <IoCloseSharp size={22} color="#fb0707" />
                    </button>

                </div>

                <div className={styles.divTitle}>
                    <input
                        type="text"
                        placeholder='Title'
                        required
                        onInvalid={handleIvalid}
                        onInput={handleInput}
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                </div>

                <div>
                    <textarea
                        placeholder='Description'
                        required
                        onInvalid={handleIvalid}
                        onInput={handleInput}
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    ></textarea>
                </div>

                <div className={styles.checkbox}>
                    <label htmlFor="Normal" className={styles.cursor}>Tipo Normal</label>
                    <input
                        type="checkbox"
                        name="Normal"
                        id="Normal"
                        checked={chack.normal}
                        onClick={handlerCheckboxChange}
                        className={styles.cursor}
                    />
                </div>
                <div className={styles.checkbox}>
                    <label htmlFor="Importante" className={styles.cursor}>Tipo Importante</label>
                    <input
                        type="checkbox"
                        name="Importante"
                        id="Importante"
                        checked={chack.important}
                        onClick={handlerCheckboxChange}
                        className={styles.cursor}
                    />
                </div>

                <div>
                    <button className={styles.Add}>
                        <IoMdAdd size={20} color="#fff" />
                        Add Task
                    </button>
                </div>
            </form>
        </div>
    )
}

export default NewTaskModal;
