"use client";

import React from "react";
import styles from "@/styles/card-task.module.css";

import { useRouter } from "next/navigation";

import { RiDeleteBin6Line } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";

import ModalDeletar from "./modal-delete-task";
import UpdateTask from "./update-task";

import { CompletedTask } from "@/action/getTasks"; 

import { toast } from "sonner";

export type taskProps = {
    id: string
    title: string
    description: string
    completed: boolean
    important: boolean
}

const CardTask = ({ id, title, description, completed, important }: taskProps) => {

    const route = useRouter();

    const [isOpne, setIsOpen] = React.useState(false);
    const [isOpneModalUpdate, setIsOpenModalUpdate] = React.useState(false);

    const clickConcluido = async () => {
        // Atualizar no bando 
        try {
            await CompletedTask(id, completed == true ? false : true);

            if (completed)
                toast.warning('Task nao concluido.')
            else
                toast.success('Task Concluido.')

            route.refresh();
        } catch (error) {
            toast.error("" + error)
        }
    }

    return (
        <>
            <div className={styles.containerCard}>
                <div>
                    <h2>{title}</h2>
                    <p>{description}</p>
                </div>

                <div className={styles.buttons}>
                    <button
                        onClick={clickConcluido}
                        className={styles.concluido}
                        style={{ 
                            backgroundColor: completed === false ? 'red' : 'rgba(3, 165, 62, 0.862)'
                        }}
                    >{completed === false ? ' Incompletid' : 'Concluido'}</button>
                    <div>
                        <button
                            className={styles.edit}
                            onClick={() => setIsOpenModalUpdate(true)}
                        >
                            <FiEdit size={22} color="#fff" />
                        </button>
                        <button
                            onClick={() => setIsOpen(true)}
                            className={styles.delete}
                        >
                            <RiDeleteBin6Line size={22} color="#fb0707" />
                        </button>
                    </div>
                </div>
            </div>

            <ModalDeletar
                isOpen={isOpne}
                closeModal={() => setIsOpen(false)}
                id={id}
                title={title}
            />
            <UpdateTask
                isOpen={isOpneModalUpdate}
                closeModal={() => setIsOpenModalUpdate(false)}
                id={id}
                title={title}
                description={description}
                inportant={important}
            />

        </>
    )
}

export default CardTask;