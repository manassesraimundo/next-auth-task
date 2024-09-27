"use client";

import React from 'react';
import styles from '@/styles/sidebar.module.css';

import { useRouter } from 'next/navigation';

import ButtonRoutes from './button-router';
import ModalInfoUser from './modal-info-user';

import { useSession, signOut } from 'next-auth/react';
import { toast } from 'sonner';

import { MdLogin } from 'react-icons/md';
import { FaArrowLeft } from 'react-icons/fa';

const SideBar = () => {

    const route = useRouter();
    const { data } = useSession();

    const [isOpen, setIsOpen] = React.useState(false);

    const handleMenu = () => {
        const menu = document.getElementById("menu");

        menu?.classList.remove('active-menu')
    }

    const handleLogout = async () => {
        await signOut({
            redirect: false
        })
        toast.success('Logout feito com sucesso.')
        route.replace('/login')
        route.refresh()
    }

    return (
        <div className={styles.sideBarContainer}>
            <div className={styles.sidebar}>
                <div className={styles.container}>
                    <button onClick={() => setIsOpen(true)} className={styles.containerImg}>
                        {
                            data?.user.image ? (
                                <div className={styles.img}>
                                    <img
                                        src={data?.user.image}
                                        alt={data?.user.name}
                                    />
                                </div>
                            ) : (
                                <p className={styles.name}>{data?.user?.name?.charAt(0)}</p>
                            )
                        }
                        <h2>{data?.user?.name}</h2>
                    </button>

                    <ButtonRoutes />

                    <div className={styles.divButtonSignOut}>
                        <button onClick={handleLogout}>
                            <span>Sign-Out</span>
                            <MdLogin size={24} color="white" />
                        </button>
                    </div>
                </div>

                <button onClick={handleMenu} className={styles.menu}>
                    <FaArrowLeft size={15} color="#fff" />
                </button>
            </div>

            <ModalInfoUser isOpen={isOpen} closeModal={() => setIsOpen(false)} />
        </div>
    )
}

export default SideBar;