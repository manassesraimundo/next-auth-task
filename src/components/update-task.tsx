"use client";

import React from 'react';
import styles from '@/styles/new-task.module.css'

import { useRouter } from 'next/navigation';

import { IoCloseSharp } from "react-icons/io5";
import { toast } from 'sonner';

const UpdateTask = ({ isOpen, closeModal, id, title, description, inportant }: any) => {

    const router = useRouter();

    const [titl, setTitle] = React.useState(title)
    const [descriptio, setDescription] = React.useState(description)
    const [chack, setCheck] = React.useState({
        normal: inportant === true ? false : true,
        importante: inportant
    })

    const handleIvalid = (e: any) => {
        e.target.setCustomValidity('Por favor preencha este campo!')
    }

    const handleInput = (e: any) => {
        e.target.setCustomValidity('')
    }

    const handleOverlayClick = (e: any) => {
        if (e.target === e.currentTarget) {
            closeModal();
            setCheck({
                normal: inportant === true ? false : true,
                importante: inportant
            })
        }
    };

    const handlerCheckboxChange = (evt: any) => {
        const { name } = evt.target;

        setCheck({
            normal: name === 'Normal' ? true : false,
            importante: name === 'Importante' ? true : false
        })
    }

    const handlerSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const res = await fetch('api/task/updata-task', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id,
                    title: titl,
                    description: descriptio,
                    important: chack.importante
                })
            })
            if (res.ok) {
                toast.success('Task Atualizado com sucesso!')
                closeModal()
                router.refresh()
            }
        } catch (error) {
            toast.error(error as string)
        }
    }

    const handleCloseModal = () => {
        closeModal();
        setCheck({
            normal: inportant === true ? false : true,
            importante: inportant
        })
    }

    if (!isOpen) return null

    return (
        <div className={styles.container} onClick={handleOverlayClick}>
            <form className={`${styles.form}`} onSubmit={handlerSubmit}>
                <div className={styles.headerModal}>
                    <h2>Update Task</h2>
                    <button onClick={handleCloseModal} style={{backgroundColor: '#181818', padding: '8px'}}>
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
                        value={titl}
                        onChange={e => setTitle(e.target.value)}
                    />
                </div>

                <div>
                    <textarea
                        placeholder='Description'
                        required
                        onInvalid={handleIvalid}
                        onInput={handleInput}
                        value={descriptio}
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
                        checked={chack.importante}
                        onClick={handlerCheckboxChange}
                        className={styles.cursor}
                    />
                </div>

                <div>
                    <button className={styles.Add}>Update Task</button>
                </div>
            </form>
        </div>
    )
}

export default UpdateTask;