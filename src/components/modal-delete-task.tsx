"use client";

import React from "react";
import styles from "@/styles/modal-delete-task.module.css";

import { useRouter } from "next/navigation";

import { DeleteTask } from "@/action/getTasks";

import { toast } from "sonner";
import { IoCloseSharp } from "react-icons/io5";

const ModalDeletar = ({ isOpen, closeModal, id, title }: any) => {

    const route = useRouter();

    if (!isOpen) return null;

    const handlerCloseModal = async (evt: any) => {
        if (evt.target === evt.currentTarget)
            closeModal()
    }

    const deleteTask = async () => {
        try {
            await DeleteTask(id);
            toast.success("Task deletado com sucesso!");
            route.refresh();
        } catch (error) {
            toast.error(error as string)
        }
    }

    return (
        <div className={styles.containerModal} onClick={handlerCloseModal}>
            <div className={styles.body}>
                <div className={styles.headerModal}>
                    <h3>Deletar</h3>
                    <button onClick={closeModal} style={{ backgroundColor: '#fff' }}>
                        <IoCloseSharp size={20} color="#fb0707" />
                    </button>
                </div>

                <p>Detelar: <strong>{title}</strong>?</p>

                <div className={styles.delete}>
                    <button onClick={deleteTask}>Deletar</button>
                </div>
            </div>
        </div>
    )
}

export default ModalDeletar;