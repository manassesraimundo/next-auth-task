"use client";

import React from 'react';
import styles from '@/styles/button-route.module.css';

import Link from 'next/link';
import { usePathname } from 'next/navigation'

import { AiFillHome, AiFillCheckCircle } from "react-icons/ai";
import { MdPriorityHigh } from "react-icons/md";

const ButtonRoutes = () => {

    const pathname = usePathname();

    const setActiveLink = (path: string) => {
        const home = document.getElementById("home");
        const complited = document.getElementById("complited");
        const important = document.getElementById("important");

        home?.classList.remove(styles.activeLink);
        complited?.classList.remove(styles.activeLink);
        important?.classList.remove(styles.activeLink);

        if (path === '/home') {
            home?.classList.add(styles.activeLink);
        } else if (path === '/complited') {
            complited?.classList.add(styles.activeLink);
        } else if (path === '/important') {
            important?.classList.add(styles.activeLink);
        }
    }

    React.useEffect(() => {
        setActiveLink(pathname);
    }, [pathname]);

    return (
        <div className={styles.routes}>
            <Link id='home' href='/home'>
                <AiFillHome size={24} color='#fff' />
                Home
            </Link>
            <Link  id='complited' href='/complited'>
                <AiFillCheckCircle size={24} color='#fff' />
                Concluída
            </Link>
            <Link  id='important' href='/important'>
                <MdPriorityHigh size={24} color='#fff' />
                Importante
            </Link>
        </div>
    )
}

export default ButtonRoutes;