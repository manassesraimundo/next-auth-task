'use client';

import styles from '@/styles/input.module.css';
import React from 'react';
import { MdEmail, MdLock } from 'react-icons/md';
import { MdVisibility, MdVisibilityOff } from 'react-icons/md';

type InputPros = {
    placeholder: string
    type: 'text' | 'email' | 'password'
    icon?: string
    password?: boolean
    onChange: (newvalue: string) => void
}

const Input = ({
    type = 'text',
    placeholder,
    password,
    onChange
}: InputPros) => {

    const [showPassword, setShowPassword] = React.useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    return (
        <div className={styles.containerInput}>
            {
                !password && type === 'email' && (
                    <div>
                        <MdEmail size={24} color="gray" />
                    </div>

                )
            }
            {
                password && (
                    <div>
                        <MdLock size={24} color="gray" />
                    </div>

                )
            }
            <input
                className={styles.input}
                type={type === 'password' && !showPassword ? 'password' : type === 'email' ? 'email' : 'text'}
                placeholder={placeholder}
                onChange={e => onChange(e.target.value)}
            />

            <span onClick={togglePasswordVisibility}>
                {
                    password && showPassword && (
                        <MdVisibility size={24} />
                    )
                }
                {
                    password && !showPassword && (
                        <MdVisibilityOff size={24} />
                        
                    )
                }
            </span>

        </div>
    )
}

export default Input;