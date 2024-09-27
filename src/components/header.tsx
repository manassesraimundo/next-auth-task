"use client";

import React from "react";
import styles from "@/styles/header.module.css";

import NewTask from "./new-task";

import { IoMdAdd } from "react-icons/io";
import { FaArrowRight } from "react-icons/fa";

type HeaderProps = {
    children: React.ReactNode
}

const Header = ({ children }: HeaderProps) => {
    const [isOpen, setIsOpen] = React.useState(false);

    const handleMenu = () => {
        const menu = document.getElementById("menu");
        menu?.classList.add('active-menu')
    }

    return (
        <div style={{ width: '100%' }}>
            <header className={styles.containerHeader}>
                <div>
                    <button onClick={handleMenu}>
                        <FaArrowRight size={15} color="#fff" />
                    </button>
                    {children}
                </div>
                <button onClick={() => setIsOpen(true)} className={styles.buttonAddHeader}>
                    <IoMdAdd size={20} color="#fff" />
                    Add
                </button>
            </header>

            <NewTask isOpen={isOpen} closeModal={() => setIsOpen(false)} />
        </div>
    )
}

export default Header;