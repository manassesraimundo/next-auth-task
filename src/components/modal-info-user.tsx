"use client"

import styles from "@/styles/modal-info-user.module.css";

import { useSession } from 'next-auth/react';

import { IoCloseSharp } from "react-icons/io5";

const ModalInfoUser = ({ isOpen, closeModal }: any) => {

    const { data } = useSession();

    const handleOverlayClick = (e: any) => {
        if (e.target === e.currentTarget) {
            closeModal();
        }
    };

    if (!isOpen) return null

    return (
        <div className={styles.containerModal} onClick={handleOverlayClick}>
            <div className={styles.divInfo}>
                <button onClick={closeModal} style={{ backgroundColor: '#fff' }}>
                    <IoCloseSharp size={20} color="#fb0707" />
                </button>
                <div>
                    <h6>E-mail:</h6>
                    <p>{data?.user?.email}</p>
                    <h6>Name:</h6>
                    <p>{data?.user?.name}</p>
                </div>
            </div>
        </div>
    )
}

export default ModalInfoUser;